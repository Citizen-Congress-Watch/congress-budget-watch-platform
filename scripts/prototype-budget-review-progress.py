#!/usr/bin/env python3
"""Build a local prototype data file for the home page review progress grid.

This is intentionally a prototype:
- It reads gov_index.xlsx from the repo root.
- It scrapes public meeting rows from https://ly-budget.openfun.app/.
- It queries GraphQL by year to mark uploaded agencies.
- It writes public/data/budget-review-progress.json for the frontend mock.
"""

from __future__ import annotations

import datetime as dt
import base64
import json
import os
import re
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path
from typing import Any

import pandas as pd
from lxml import html


ROOT = Path(__file__).resolve().parents[1]
GOV_INDEX_PATH = ROOT / "gov_index.xlsx"
OUTPUT_PATH = ROOT / "public" / "data" / "budget-review-progress.json"
LY_BUDGET_BASE = "https://ly-budget.openfun.app/"
GQL_ENDPOINT = "https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql"
TARGET_YEAR = int(os.environ.get("BUDGET_REVIEW_YEAR", "115"))
MAX_PAGES = 20
EXCLUDED_PARENT_NAMES = {"直轄市及縣市政府"}
ADDITIONAL_BUDGET_REVIEW_MEETING_IDS = {
    # Source subject misses "繼續審查", but this is a 115年度 budget review meeting.
    "委員會-11-5-15-12",
}
DEFAULT_SPREADSHEET_ID = "1WAK0BiGl7_qIhIGzJirkaHJwsCL2Vp2GQCxcVYWiWwg"
GOOGLE_SHEET_ID = os.environ.get("BUDGET_REVIEW_SPREADSHEET_ID", DEFAULT_SPREADSHEET_ID)
GOOGLE_MEETING_SHEET = os.environ.get("BUDGET_REVIEW_MEETING_SHEET", "meeting")
GOOGLE_SERVICE_ACCOUNT_JSON = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "")

MEETING_HEADER_ALIASES = {
    "id": ("id", "會議id", "會議ID", "會議代碼", "會議編號"),
    "place": ("地點", "meetingPlace"),
    "category": ("類型", "meetingCategory"),
    "date": ("日期", "會議日期", "date", "meetingDate"),
    "name": ("會議名稱", "會議", "會議場次", "name", "displayName"),
    "subject": ("主旨", "會議事由", "案由", "審查事項", "subject", "description"),
    "dataUrl": (
        "議事錄轉檔網址",
        "資料",
        "資料連結",
        "轉檔網址",
        "ly-budget連結",
        "ly budget連結",
    ),
    "sourceUrl": ("來源網址", "搜尋頁網址", "sourceUrl"),
    "meetingRecordUrl": ("會議記錄連結", "會議紀錄連結", "公報連結", "meetingRecordUrl"),
    "uploadAdminUrl": ("上傳後台", "後台連結"),
    "term": ("屆", "屆期", "立法院屆別", "term"),
    "session": ("會期", "session"),
    "committee": ("委員會", "委員會名稱", "committee"),
    "meetingNumber": ("第幾次會議", "第幾次", "會議次數", "meetingNumber"),
    "meetingType": ("會議類型", "會議形式", "meetingType"),
    "year": ("年度", "預算年度", "year"),
    "dedupeKey": ("去重鍵", "dedupeKey", "key"),
}


def clean_text(value: Any) -> str:
    if value is None or pd.isna(value):
        return ""
    return re.sub(r"\s+", "", str(value).replace("\u3000", "")).strip()


def normalize_header(value: Any) -> str:
    return clean_text(value).lower()


def normalize_meeting_date(value: Any) -> str:
    value = clean_text(value)
    match = re.match(r"^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$", value)
    if not match:
        return value
    year, month, day = match.groups()
    return f"{year}-{month.zfill(2)}-{day.zfill(2)}"


def normalize_dates_in_text(value: str) -> str:
    return re.sub(
        r"(\d{4})[-/](\d{1,2})[-/](\d{1,2})",
        lambda match: f"{match.group(1)}-{match.group(2).zfill(2)}-{match.group(3).zfill(2)}",
        value,
    )


def normalize_name(value: str) -> str:
    value = clean_text(value)
    court_keywords = (
        "最高法院",
        "行政法院",
        "高等法院",
        "地方法院",
        "懲戒法院",
        "智慧財產及商業法院",
        "少年及家事法院",
    )
    if any(keyword in value for keyword in court_keywords):
        return "各級法院"
    if "檢察署" in value:
        return "各級檢察署"
    for suffix in ("主管", "及所屬", "所屬", "單位預算", "部分"):
        value = value.replace(suffix, "")
    return value


def get_match_names(agency: dict[str, Any]) -> list[str]:
    names = [agency["matchName"]]
    if agency.get("parentName") == "司法院主管" and agency["matchName"] == "各級法院":
        names.extend(["司法院及所屬", "各級法院"])
    if agency.get("parentName") == "法務部主管" and agency["matchName"] == "各級檢察署":
        names.append("各級檢察署")
    return list(dict.fromkeys(name for name in names if name))


def subject_matches(match_name: str, subject: str) -> bool:
    clean_subject = clean_text(subject)
    if match_name == "各級檢察署":
        return "各級檢察署" in clean_subject
    return match_name in clean_subject or match_name in normalize_name(subject)


def is_budget_review_meeting(meeting_id: str, subject: str) -> bool:
    if f"{TARGET_YEAR}年度" not in subject:
        return False
    if "繼續審查" in subject:
        return True
    return clean_text(meeting_id) in ADDITIONAL_BUDGET_REVIEW_MEETING_IDS


def read_agencies() -> list[dict[str, Any]]:
    df = pd.read_excel(GOV_INDEX_PATH, header=None)
    agencies: list[dict[str, Any]] = []
    parent_code = ""
    parent_name = ""

    for _, row in df.iterrows():
        code = clean_text(row.iloc[0] if len(row) > 0 else "")
        item_code = clean_text(row.iloc[1] if len(row) > 1 else "")
        name = clean_text(row.iloc[2] if len(row) > 2 else "")

        if not name or name in {"名稱", "合計"}:
            continue

        if code and code not in {"款"}:
            parent_code = code
            parent_name = name
            continue

        if item_code and parent_code and parent_name:
            if parent_name in EXCLUDED_PARENT_NAMES:
                continue
            agencies.append(
                {
                    "id": f"{parent_code}-{item_code}",
                    "parentCode": parent_code,
                    "parentName": parent_name,
                    "itemCode": item_code,
                    "name": name,
                    "matchName": normalize_name(name),
                }
            )

    return agencies


def fetch_text(url: str, payload: dict[str, Any] | None = None) -> str:
    body = None
    headers = {"User-Agent": "budget-review-progress-prototype/0.1"}
    if payload is not None:
        body = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"

    request = urllib.request.Request(url, data=body, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def scrape_meetings() -> list[dict[str, str]]:
    meetings: list[dict[str, str]] = []

    for page in range(1, MAX_PAGES + 1):
        url = LY_BUDGET_BASE if page == 1 else f"{LY_BUDGET_BASE}?page={page}"
        document = html.fromstring(fetch_text(url))
        rows = document.xpath("//table//tbody/tr")
        if not rows:
            break

        current_id = ""
        current_name = ""
        current_data_url = ""

        for row in rows:
            cells = row.xpath("./td")
            if len(cells) >= 4:
                code_cell = cells[0]
                current_id = clean_text(code_cell.xpath("text()[1]")[0] if code_cell.xpath("text()[1]") else "")
                current_name = " ".join(cells[1].xpath(".//text()")).strip()
                data_href = code_cell.xpath('.//a[normalize-space()="資料"]/@href')
                current_data_url = urllib.parse.urljoin(LY_BUDGET_BASE, data_href[0]) if data_href else ""
                date_text = clean_text(" ".join(cells[2].xpath(".//text()")))
                subject = " ".join(cells[3].xpath(".//text()")).strip()
            elif len(cells) >= 2:
                date_text = clean_text(" ".join(cells[0].xpath(".//text()")))
                subject = " ".join(cells[1].xpath(".//text()")).strip()
            else:
                continue

            if not is_budget_review_meeting(current_id, subject):
                continue

            meetings.append(
                {
                    **parse_meeting_name(current_name),
                    "id": current_id,
                    "name": current_name,
                    "date": date_text,
                    "subject": subject,
                    "dataUrl": current_data_url,
                    "sourceUrl": url,
                    "year": str(TARGET_YEAR),
                }
            )

    return meetings


def parse_meeting_name(name: str) -> dict[str, str]:
    pattern = re.compile(r"第(?P<term>\d+)屆第(?P<session>\d+)會期(?P<committee>.+?)第(?P<number>\d+)次(?P<type>.+)")
    match = pattern.search(clean_text(name))
    if not match:
        return {
            "term": "",
            "session": "",
            "committee": "",
            "meetingNumber": "",
            "meetingType": "",
        }

    return {
        "term": match.group("term"),
        "session": match.group("session"),
        "committee": match.group("committee"),
        "meetingNumber": match.group("number"),
        "meetingType": match.group("type"),
    }


def decode_service_account_json(value: str) -> dict[str, Any]:
    value = value.strip()
    if not value:
        return {}
    if value.startswith("{"):
        return json.loads(value)
    return json.loads(base64.b64decode(value).decode("utf-8"))


def quote_sheet_name(name: str) -> str:
    return "'" + name.replace("'", "''") + "'"


def meeting_key(meeting: dict[str, str], header_mapping: dict[str, int]) -> tuple[str, ...]:
    meeting_id = clean_text(meeting.get("id", ""))
    meeting_date = normalize_meeting_date(meeting.get("date", ""))
    data_url = clean_text(meeting.get("dataUrl", ""))
    dedupe_key = clean_text(meeting.get("dedupeKey", ""))

    if "dedupeKey" in header_mapping and dedupe_key:
        return ("key", dedupe_key)
    if {"id", "date"}.issubset(header_mapping) and meeting_id and meeting_date:
        return ("id-date", meeting_id, meeting_date)
    if {"date", "dataUrl"}.issubset(header_mapping) and meeting_date and data_url:
        return ("date-url", meeting_date, data_url)
    if "dataUrl" in header_mapping and data_url:
        return ("url", data_url)
    return ("fallback", meeting_id, meeting_date, data_url)


def map_meeting_headers(headers: list[str]) -> dict[str, int]:
    normalized_headers = {normalize_header(header): index for index, header in enumerate(headers)}
    mapping: dict[str, int] = {}

    for field, aliases in MEETING_HEADER_ALIASES.items():
        for alias in aliases:
            index = normalized_headers.get(normalize_header(alias))
            if index is not None:
                mapping[field] = index
                break

    return mapping


def cell_text(cell: dict[str, Any]) -> str:
    user_value = cell.get("userEnteredValue", {})
    formula = str(user_value.get("formulaValue", ""))
    if formula:
        match = re.search(r'=HYPERLINK\("([^"]+)"', formula, flags=re.IGNORECASE)
        if match:
            return match.group(1)

    if "formattedValue" in cell:
        return str(cell["formattedValue"])

    effective_value = cell.get("effectiveValue", {})
    for key in ("stringValue", "numberValue", "boolValue", "formulaValue"):
        if key in effective_value:
            return str(effective_value[key])
    return ""


def cell_links(cell: dict[str, Any]) -> list[str]:
    links = []
    user_value = cell.get("userEnteredValue", {})
    formula = str(user_value.get("formulaValue", ""))
    if formula:
        links.extend(re.findall(r'=HYPERLINK\("([^"]+)"', formula, flags=re.IGNORECASE))

    hyperlink = cell.get("hyperlink")
    if hyperlink:
        links.append(str(hyperlink))

    for run in cell.get("textFormatRuns", []) or []:
        uri = run.get("format", {}).get("link", {}).get("uri")
        if uri:
            links.append(str(uri))

    return list(dict.fromkeys(links))


def row_search_text(cells: list[dict[str, Any]]) -> str:
    parts = []
    for cell in cells:
        parts.append(cell_text(cell))
        parts.extend(cell_links(cell))
    return "\n".join(clean_text(part) for part in parts if clean_text(part))


def row_contains_meeting(search_text: str, meeting: dict[str, str]) -> bool:
    meeting_id = clean_text(meeting.get("id", ""))
    meeting_date = normalize_meeting_date(meeting.get("date", ""))
    data_url = clean_text(meeting.get("dataUrl", ""))
    encoded_id = clean_text(urllib.parse.quote(meeting_id, safe="")) if meeting_id else ""
    normalized_search_text = normalize_dates_in_text(search_text)

    if data_url and data_url in normalized_search_text and (not meeting_date or meeting_date in normalized_search_text):
        return True
    if meeting_id and meeting_date and meeting_id in normalized_search_text and meeting_date in normalized_search_text:
        return True
    if encoded_id and meeting_date and encoded_id in normalized_search_text and meeting_date in normalized_search_text:
        return True
    return False


def read_meeting_sheet_rows(service: Any) -> tuple[list[str], list[dict[str, Any]]]:
    sheet_range = f"{quote_sheet_name(GOOGLE_MEETING_SHEET)}!A:Z"
    response = service.spreadsheets().get(
        spreadsheetId=GOOGLE_SHEET_ID,
        ranges=[sheet_range],
        includeGridData=True,
    ).execute()

    sheets = response.get("sheets", [])
    row_data = []
    if sheets:
        data_blocks = sheets[0].get("data", [])
        if data_blocks:
            row_data = data_blocks[0].get("rowData", [])

    if not row_data:
        raise RuntimeError(f"Google Sheet tab {GOOGLE_MEETING_SHEET!r} has no header row.")

    headers = [cell_text(cell) for cell in row_data[0].get("values", [])]
    return headers, row_data[1:]


def sync_meetings_to_google_sheet(meetings: list[dict[str, str]]) -> None:
    if not GOOGLE_SERVICE_ACCOUNT_JSON:
        print("Skipping Google Sheet meeting sync: GOOGLE_SERVICE_ACCOUNT_JSON is not set.")
        return

    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
    except ImportError as error:
        raise RuntimeError(
            "Google Sheet sync requires google-api-python-client and google-auth."
        ) from error

    credentials_info = decode_service_account_json(GOOGLE_SERVICE_ACCOUNT_JSON)
    credentials = service_account.Credentials.from_service_account_info(
        credentials_info,
        scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    service = build("sheets", "v4", credentials=credentials, cache_discovery=False)
    values_api = service.spreadsheets().values()
    sheet_range = f"{quote_sheet_name(GOOGLE_MEETING_SHEET)}!A:Z"

    headers, existing_rows = read_meeting_sheet_rows(service)
    header_mapping = map_meeting_headers(headers)
    if "dataUrl" not in header_mapping and not {"id", "date"}.issubset(header_mapping):
        raise RuntimeError(
            "Google Sheet meeting tab needs either a 議事錄轉檔網址 column "
            "or both 會議代碼 and 會議日期 columns for duplicate detection."
        )

    existing_keys = set()
    existing_row_texts = []

    for row in existing_rows:
        cells = row.get("values", [])
        existing_row_texts.append(row_search_text(cells))
        existing_meeting = {}
        for field, index in header_mapping.items():
            cell = cells[index] if index < len(cells) else {}
            value = cell_text(cell)
            if field == "dataUrl":
                links = cell_links(cell)
                value = next((link for link in links if "ly-budget.openfun.app" in link), value)
            existing_meeting[field] = value

        key = meeting_key(existing_meeting, header_mapping)
        if any(key[1:]):
            existing_keys.add(key)

    values_to_append: list[list[str]] = []
    seen_new_keys = set()
    for meeting in meetings:
        key = meeting_key(meeting, header_mapping)
        if key in existing_keys:
            continue
        if any(row_contains_meeting(search_text, meeting) for search_text in existing_row_texts):
            continue
        if key in seen_new_keys:
            continue

        row = [""] * len(headers)
        field_values = {
            "place": "委員會",
            "category": "預算審議",
            "date": normalize_meeting_date(meeting.get("date", "")),
            "meetingRecordUrl": "",
            "dataUrl": meeting.get("dataUrl", ""),
            "session": meeting.get("session", ""),
            "committee": meeting.get("committee", ""),
        }
        for field, value in field_values.items():
            index = header_mapping.get(field)
            if index is not None:
                row[index] = value

        values_to_append.append(row)
        seen_new_keys.add(key)

    if not values_to_append:
        print("No new meetings to append to Google Sheet.")
        return

    values_api.append(
        spreadsheetId=GOOGLE_SHEET_ID,
        range=sheet_range,
        valueInputOption="USER_ENTERED",
        insertDataOption="INSERT_ROWS",
        body={"values": values_to_append},
    ).execute()
    print(f"Appended {len(values_to_append)} meetings to Google Sheet tab {GOOGLE_MEETING_SHEET!r}.")


def fetch_uploaded_governments(agencies: list[dict[str, Any]]) -> dict[str, int]:
    query = """
    query PrototypeUploadedGovernments($take: Int!, $where: ProposalWhereInput) {
      proposals(take: $take, where: $where) {
        government {
          name
        }
      }
    }
    """
    payload = {
        "query": query,
        "variables": {
            "take": 10000,
            "where": {"year": {"year": {"equals": TARGET_YEAR}}},
        },
    }

    try:
        data = json.loads(fetch_text(GQL_ENDPOINT, payload))
    except Exception as error:
        raise RuntimeError(
            f"GraphQL upload lookup failed; keeping the existing progress data: {error}"
        ) from error

    if data.get("errors"):
        raise RuntimeError(
            "GraphQL upload lookup returned errors; keeping the existing progress data: "
            f"{data['errors']}"
        )

    proposals = data.get("data", {}).get("proposals")
    if not isinstance(proposals, list) or not proposals:
        raise RuntimeError(
            "GraphQL upload lookup returned no proposals; keeping the existing progress data"
        )

    counts: dict[str, int] = defaultdict(int)
    canonical_aliases: dict[str, set[str]] = defaultdict(set)
    for agency in agencies:
        canonical = agency.get("matchName")
        if not canonical:
            continue
        canonical_aliases[canonical].update(get_match_names(agency))

    for proposal in proposals:
        government_name = normalize_name(
            (proposal.get("government") or {}).get("name") or ""
        )
        if not government_name:
            continue

        for agency_name, aliases in canonical_aliases.items():
            if any(alias == government_name or alias in government_name for alias in aliases):
                counts[agency_name] += 1

    if not counts:
        raise RuntimeError(
            "GraphQL upload lookup matched no agencies; keeping the existing progress data"
        )

    return dict(counts)


def attach_statuses(
    agencies: list[dict[str, Any]],
    meetings: list[dict[str, str]],
    uploaded_governments: dict[str, int],
) -> list[dict[str, Any]]:
    for agency in agencies:
        match_name = agency["matchName"]
        match_names = get_match_names(agency)
        reviewed_meetings = [
            {
                "id": meeting["id"],
                "date": meeting["date"],
                "name": meeting["name"],
                "dataUrl": meeting["dataUrl"],
            }
            for meeting in meetings
            if any(
                subject_matches(match_name, meeting["subject"])
                for match_name in match_names
            )
        ]
        uploaded_count = uploaded_governments.get(match_name, 0)
        status = "notReviewed"

        if reviewed_meetings:
            status = "reviewed"
        if uploaded_count > 0:
            status = "uploaded"

        agency.update(
            {
                "status": status,
                "reviewedMeetingCount": len(reviewed_meetings),
                "latestReviewDate": max((m["date"] for m in reviewed_meetings), default=None),
                "uploadedProposalCount": uploaded_count,
                "meetings": reviewed_meetings[:5],
            }
        )
        agency.pop("matchName", None)

    return agencies


def strip_generated_at(data: dict[str, Any]) -> dict[str, Any]:
    comparable = dict(data)
    comparable.pop("generatedAt", None)
    return comparable


def write_output(output: dict[str, Any]) -> None:
    if OUTPUT_PATH.exists():
        try:
            existing = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            existing = None

        if isinstance(existing, dict) and strip_generated_at(existing) == strip_generated_at(output):
            print(f"No data changes for {OUTPUT_PATH}")
            print(json.dumps(output["summary"], ensure_ascii=False, indent=2))
            return

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(output, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUTPUT_PATH}")
    print(json.dumps(output["summary"], ensure_ascii=False, indent=2))


def main() -> None:
    agencies = read_agencies()
    meetings = scrape_meetings()
    sync_meetings_to_google_sheet(meetings)
    uploaded_governments = fetch_uploaded_governments(agencies)
    agencies = attach_statuses(agencies, meetings, uploaded_governments)
    summary = {
        "totalAgencies": len(agencies),
        "reviewedAgencies": sum(1 for agency in agencies if agency["status"] in {"reviewed", "uploaded"}),
        "uploadedAgencies": sum(1 for agency in agencies if agency["status"] == "uploaded"),
        "notReviewedAgencies": sum(1 for agency in agencies if agency["status"] == "notReviewed"),
        "matchedMeetings": len(meetings),
    }

    output = {
        "year": TARGET_YEAR,
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "sources": {
            "governmentIndex": "gov_index.xlsx",
            "meetingSearch": LY_BUDGET_BASE,
            "uploadedBudgets": GQL_ENDPOINT,
        },
        "legend": [
            {"status": "uploaded", "label": "已上傳", "color": "#2da44e"},
            {"status": "reviewed", "label": "已審查，待上傳", "color": "#9be9a8"},
            {"status": "notReviewed", "label": "尚未審查", "color": "#ebedf0"},
        ],
        "summary": summary,
        "agencies": agencies,
    }

    write_output(output)


if __name__ == "__main__":
    main()
