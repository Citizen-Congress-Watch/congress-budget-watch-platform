import json
import runpy
import unittest
from pathlib import Path
from unittest import mock


SCRIPT_PATH = Path(__file__).with_name("prototype-budget-review-progress.py")


class FetchTextTest(unittest.TestCase):
    def setUp(self) -> None:
        module = runpy.run_path(str(SCRIPT_PATH))
        self.fetch_text = module["fetch_text"]
        self.module_globals = self.fetch_text.__globals__
        self.urllib = self.module_globals["urllib"]
        self.time = self.module_globals["time"]

    def response(self, body: bytes) -> mock.MagicMock:
        response = mock.MagicMock()
        response.__enter__.return_value.read.return_value = body
        return response

    def test_retries_timeouts_with_backoff(self) -> None:
        urlopen = mock.Mock(
            side_effect=[
                TimeoutError("first timeout"),
                TimeoutError("second timeout"),
                self.response(b"ok"),
            ]
        )

        with (
            mock.patch.object(self.urllib.request, "urlopen", urlopen),
            mock.patch.object(self.time, "sleep") as sleep,
        ):
            self.assertEqual(self.fetch_text("https://example.com"), "ok")

        self.assertEqual(urlopen.call_count, 3)
        sleep.assert_has_calls([mock.call(2), mock.call(5)])

    def test_raises_after_retryable_errors_are_exhausted(self) -> None:
        urlopen = mock.Mock(side_effect=TimeoutError("still timing out"))

        with (
            mock.patch.object(self.urllib.request, "urlopen", urlopen),
            mock.patch.object(self.time, "sleep") as sleep,
        ):
            with self.assertRaisesRegex(TimeoutError, "still timing out"):
                self.fetch_text("https://example.com")

        self.assertEqual(urlopen.call_count, 3)
        sleep.assert_has_calls([mock.call(2), mock.call(5)])

    def test_does_not_retry_non_transient_http_errors(self) -> None:
        error = self.urllib.error.HTTPError(
            "https://example.com", 400, "Bad Request", None, None
        )
        urlopen = mock.Mock(side_effect=error)

        with (
            mock.patch.object(self.urllib.request, "urlopen", urlopen),
            mock.patch.object(self.time, "sleep") as sleep,
        ):
            with self.assertRaises(self.urllib.error.HTTPError):
                self.fetch_text("https://example.com")

        urlopen.assert_called_once()
        sleep.assert_not_called()


class FetchUploadedGovernmentsTest(unittest.TestCase):
    def setUp(self) -> None:
        module = runpy.run_path(str(SCRIPT_PATH))
        self.fetch_uploaded_governments = module["fetch_uploaded_governments"]
        self.module_globals = self.fetch_uploaded_governments.__globals__
        self.original_fetch_text = self.module_globals["fetch_text"]
        self.agencies = [{"matchName": "交通部", "parentName": "交通部主管"}]

    def tearDown(self) -> None:
        self.module_globals["fetch_text"] = self.original_fetch_text

    def set_response(self, response: dict) -> None:
        self.module_globals["fetch_text"] = lambda _url, _payload: json.dumps(response)

    def test_counts_uploaded_proposals(self) -> None:
        self.set_response(
            {"data": {"proposals": [{"government": {"name": "交通部"}}]}}
        )

        self.assertEqual(
            self.fetch_uploaded_governments(self.agencies),
            {"交通部": 1},
        )

    def test_keeps_existing_data_when_request_fails(self) -> None:
        def fail_request(_url: str, _payload: dict) -> str:
            raise OSError("temporary network failure")

        self.module_globals["fetch_text"] = fail_request

        with self.assertRaisesRegex(RuntimeError, "keeping the existing progress data"):
            self.fetch_uploaded_governments(self.agencies)

    def test_keeps_existing_data_when_graphql_returns_errors(self) -> None:
        self.set_response({"errors": [{"message": "temporary backend failure"}]})

        with self.assertRaisesRegex(RuntimeError, "keeping the existing progress data"):
            self.fetch_uploaded_governments(self.agencies)

    def test_keeps_existing_data_when_no_proposals_are_returned(self) -> None:
        self.set_response({"data": {"proposals": []}})

        with self.assertRaisesRegex(RuntimeError, "keeping the existing progress data"):
            self.fetch_uploaded_governments(self.agencies)


if __name__ == "__main__":
    unittest.main()
