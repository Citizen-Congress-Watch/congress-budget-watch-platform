## PRP: 重構 D3 視覺化（CirclePackChart 互動與凍結節點）

### 概述

本 PRP 針對 `FEATs/refactor-d3.md` 中之三項問題提出可一次性落地的改造方案：
- 凍結節點邊框縮放選取改以 class，而非脆弱的 `nth-child`
- Hover 行為目前無實際效果與矛盾的 filter 清理，需修正或移除
- 點擊行為同時觸發父層導向與元件內導向，導致雙重導航風險

目標：強化可維護性、避免互動錯誤、符合專案既有模式（React + D3、Zustand 管控跨頁狀態、父層掌控導向）。

---

### 現況分析與程式碼參考

- Hover 行為目前等於無效，且 mouseout 清除 filter 但未曾加上：
```76:83:/Users/user/Documents/code/congress-budget/app/visualization/circle-pack-chart.tsx
      .on("mouseover", function () {
        d3.select(this).select("circle").attr("stroke-width", 1);
        d3.select(this).select("path").attr("stroke-width", 1);
      })
      .on("mouseout", function () {
        d3.select(this).select("circle").attr("stroke-width", 1);
        d3.select(this).select("path").style("filter", "none");
      });
```

- 凍結節點以兩個 `<path>` 疊出邊框，後續縮放用 `nth-child(2|3)` 選取，順序一變即壞：
```109:126:/Users/user/Documents/code/congress-budget/app/visualization/circle-pack-chart.tsx
    frozenNodes
      .append("path")
      .attr("d", FROZEN_PATH_D)
      .attr("fill", "#FF43D3")
      .attr(
        "transform",
        (d) => `scale(${((d.r * 2) / 55) * 1.2}) translate(-26.5, -27.5)`
      );

    // Layer 2: Inner border
    frozenNodes
      .append("path")
      .attr("d", FROZEN_PATH_D)
      .attr("fill", (d) => d.data.color ?? "#6B7FFF")
      .attr(
        "transform",
        (d) => `scale(${((d.r * 2) / 55) * 1.13}) translate(-26.5, -27.5)`
      );
```

```245:260:/Users/user/Documents/code/congress-budget/app/visualization/circle-pack-chart.tsx
      const frozenNodes = node.filter((d) => d.data.isFrozen ?? false);
      // Update outer border (first path)
      frozenNodes
        .select("path:nth-child(2)")
        .attr(
          "transform",
          (d) => `scale(${((d.r * k * 2) / 55) * 1.2}) translate(-26.5, -27.5)`
        );
      // Update inner border (second path)
      frozenNodes
        .select("path:nth-child(3)")
        .attr(
          "transform",
          (d) => `scale(${((d.r * k * 2) / 55) * 1.13}) translate(-26.5, -27.5)`
        );
      frozenNodes.select("circle").attr("r", (d) => d.r * k);
```

- 點擊時同時呼叫 `onNodeClick` 與內部 `navigate`，/visualization 下恐觸發雙重導向：
```372:391:/Users/user/Documents/code/congress-budget/app/visualization/circle-pack-chart.tsx
    node.on("click", (event, d) => {
      if (event.defaultPrevented) return;

      if (onNodeClick) {
        onNodeClick(d.data);
      }

      if (d.data.proposerId && isVisualizationRoute && !d.children) {
        navigate(`/visualization/legislator/${d.data.proposerId}`);
        event.stopPropagation();
        return;
      }
      if (focus !== d) {
        zoom(event as unknown as MouseEvent, d);
        event.stopPropagation();
      }
    });
```

- 父層目前已負責導向（可保留此單一責任）：
```127:134:/Users/user/Documents/code/congress-budget/app/visualization/index.tsx
  const handleNodeClick = useCallback(
    (node: NodeDatum) => {
      if (node.proposerId && !node.children?.length) {
        navigate(`/visualization/legislator/${node.proposerId}`);
      }
    },
    [navigate]
  );
```

---

### 外部研究與參考資源

- D3 Zoomable Circle Packing（示例與互動策略）
  - `https://observablehq.com/@d3/zoomable-circle-packing`
- d3-selection：以 class 管理狀態與選取（避免 `nth-child`）
  - `https://github.com/d3/d3-selection#selection_classed`
- d3-zoom：程式化縮放與 transform
  - `https://github.com/d3/d3-zoom#zoom`
- d3-transition：在 transition 中呼叫行為（程式化 transform）
  - `https://github.com/d3/d3-transition#transition_call`

常見陷阱與備註：
- 以 DOM 插入順序 (`nth-child`) 驗證層級在 D3 join/更新時不可靠，加入/重排會致命。
- 用 class 命名層級（outer/inner）可避免選取錯誤，且利於樣式擴充。
- 互動導向應由父層統一處理，圖表元件只負責資料視圖與互動事件的「通知」。

---

### 設計決策與藍圖

1) 凍結節點邊框：加入明確 class 並以 class 選取
- 在 append path 時加入：
  - 外圈：`frozen-border frozen-border--outer`
  - 內圈：`frozen-border frozen-border--inner`
- 在 `zoomTo` 中改為：
  - `frozenNodes.select('.frozen-border--outer')`
  - `frozenNodes.select('.frozen-border--inner')`
- 影響範圍僅為選取器與無關結構的屬性更新，視覺維持一致。

2) Hover 行為：改為可見的、低風險樣式；移除多餘 filter 清理
- 僅操作當前群組內的 `<circle>`：`stroke-width: 2`（相較預設 1 明顯），`stroke: #000`。
- 不再操作 `<path>` 也不清理 `filter`（因未曾設定）。
- 退場策略：若未來要高亮凍結節點，可在 path class 基礎上新增樣式或 `classed('is-hover', true/false)` 以利 CSS 管控。

3) 點擊與導向責任：交由父層完全掌控
- 規則：若提供 `onNodeClick`，視為父層接管導向；圖表內不再做任何 `navigate`。
- 實作：
  - 先 `onNodeClick?.(d.data)`
  - 若 `focus !== d`，仍可執行 `zoom`（保留探索互動）；否則不動作
  - 移除內部 `navigate` 區塊，避免雙重導向
- 父層目前已於 `app/visualization/index.tsx` 中導向，不需額外調整。

4) 額外微調（非必要但建議）
- 於 hover 僅針對可互動的節點顯示樣式（`pointer-events` 已依據 children/id 控制，維持現行）。

---

### Magic numbers 重構

將本元件內影響視覺與互動的數值抽為檔內常數，集中管理、易於日後調整。

- 檔案：`app/visualization/circle-pack-chart.tsx`
- 建議常數（命名示例）：
  - `FROZEN_BASE_SIZE = 55`
  - `FROZEN_OUTER_SCALE = 1.2`
  - `FROZEN_INNER_SCALE = 1.13`
  - `FROZEN_TRANSLATE_X = -26.5`, `FROZEN_TRANSLATE_Y = -27.5`
  - `LABEL_CHILDREN_OFFSET_FACTOR = 0.88`
  - `LABEL_FONT_MIN_PX = 10`, `LABEL_FONT_MAX_PX = 16`, `LABEL_FONT_DIVISOR = 5`
  - `LABEL_LINE_HEIGHT_EM = 1.1`
  - `LABEL_MAX_WIDTH_MIN_PX = 24`, `LABEL_MAX_WIDTH_RADIUS_FACTOR = 1.6`
  - `ZOOM_SCALE_EXTENT = [0.5, 10] as const`
  - `ZOOM_DURATION_MS = 750`, `ZOOM_SLOW_DURATION_MS = 7500`
  - `DEFAULT_PADDING = 3`
  - `DEFAULT_STROKE_WIDTH = 1`, `HOVER_STROKE_WIDTH = 2`
  - `COLOR_DOMAIN = [0, 5] as const`
  - `COLOR_RANGE_START = "hsl(152,80%,80%)"`, `COLOR_RANGE_END = "hsl(228,30%,40%)"`

參考用法（示意）：

```ts
// 檔案頂部
const FROZEN_BASE_SIZE = 55;
const FROZEN_OUTER_SCALE = 1.2;
const FROZEN_INNER_SCALE = 1.13;
const FROZEN_TRANSLATE_X = -26.5;
const FROZEN_TRANSLATE_Y = -27.5;
const LABEL_CHILDREN_OFFSET_FACTOR = 0.88;
const LABEL_FONT_MIN_PX = 10;
const LABEL_FONT_MAX_PX = 16;
const LABEL_FONT_DIVISOR = 5;
const LABEL_LINE_HEIGHT_EM = 1.1;
const LABEL_MAX_WIDTH_MIN_PX = 24;
const LABEL_MAX_WIDTH_RADIUS_FACTOR = 1.6;
const ZOOM_SCALE_EXTENT = [0.5, 10] as const;
const ZOOM_DURATION_MS = 750;
const ZOOM_SLOW_DURATION_MS = 7500;
const DEFAULT_PADDING = 3;
const DEFAULT_STROKE_WIDTH = 1;
const HOVER_STROKE_WIDTH = 2;
const COLOR_DOMAIN = [0, 5] as const;
const COLOR_RANGE_START = "hsl(152,80%,80%)";
const COLOR_RANGE_END = "hsl(228,30%,40%)";

// 使用示例（擷取）：
const color = d3
  .scaleLinear<string>()
  .domain(COLOR_DOMAIN)
  .range([COLOR_RANGE_START, COLOR_RANGE_END])
  .interpolate(d3.interpolateHcl);

// 標籤位置
const offsetY = -d.r * k * LABEL_CHILDREN_OFFSET_FACTOR;

// 凍結邊框 scale 與 translate
`scale(${((d.r * 2) / FROZEN_BASE_SIZE) * FROZEN_OUTER_SCALE}) translate(${FROZEN_TRANSLATE_X}, ${FROZEN_TRANSLATE_Y})`;
```

以上常數先以檔內私有常數管理；若未來需跨元件共用，再提取到 `app/constants/`。

---

### 擬實作步驟（順序）

0. 抽出本檔 magic numbers 為檔內常數（見「Magic numbers 重構」清單）
1. 在凍結節點 append 兩層 `<path>` 時加入 class：
   - 外圈：`frozen-border frozen-border--outer`
   - 內圈：`frozen-border frozen-border--inner`
2. 在 `zoomTo` 更新時，改以上述 class 選取兩層 `<path>` 並更新 transform；保留 frozen `<circle>` 半徑更新。
3. 調整 hover 事件：
   - `mouseover`：`select('circle').attr('stroke-width', 2).attr('stroke', '#000')`
   - `mouseout`：`select('circle').attr('stroke-width', 1)`；移除對 `<path>` 與 `filter` 的操作
4. 調整點擊事件：
   - 呼叫 `onNodeClick?.(d.data)`
   - 不再於元件內進行 `navigate`
   - 若 `focus !== d`，執行 `zoom`
5. 手動驗證 `/visualization` 與 `/visualization/legislator/:id` 導向正確，並確認 zoom、hover 正常。

---

### 偵錯與錯誤處理策略

- 選取器防呆：`select('.frozen-border--outer')`/`select('.frozen-border--inner')` 就算找不到也不會 throw，更新前後保持可視。
- 型別安全：維持 `onNodeClick?: (node: NodeDatum) => void` 簽名不變，避免破壞父層呼叫。
- 互動一致性：保留 `event.defaultPrevented` 檢查與 `stopPropagation()` 使用場景（保留在需要時，例如 zoom）。

---

### 驗證關卡（可執行）

```bash
# 型別與語法
pnpm typecheck
pnpm lint:check

# 建置
pnpm build

# 本地驗證（開發伺服器）
pnpm dev
# 手動步驟：
# 1) 進入 /visualization
# 2) 檢查凍結節點縮放是否正確（不受插入順序影響）
# 3) Hover 時圓形描邊變為 2，離開恢復為 1
# 4) 點擊葉節點只導向一次；點擊非葉節點執行 zoom 聚焦
```

---

### Pseudocode（關鍵變更示意）

```ts
// 1) append 時加入 class
frozenNodes
  .append('path')
  .attr('class', 'frozen-border frozen-border--outer')
  .attr('d', FROZEN_PATH_D)
  .attr('fill', '#FF43D3')
  .attr('transform', computeOuter(d));

frozenNodes
  .append('path')
  .attr('class', 'frozen-border frozen-border--inner')
  .attr('d', FROZEN_PATH_D)
  .attr('fill', d => d.data.color ?? '#6B7FFF')
  .attr('transform', computeInner(d));

// 2) zoomTo 中使用 class 選取
frozenNodes.select('.frozen-border--outer').attr('transform', computeOuterZoomed(d, k));
frozenNodes.select('.frozen-border--inner').attr('transform', computeInnerZoomed(d, k));

// 3) hover 僅變更 circle
node
  .on('mouseover', function () {
    d3.select(this).select('circle').attr('stroke', '#000').attr('stroke-width', 2);
  })
  .on('mouseout', function () {
    d3.select(this).select('circle').attr('stroke-width', 1);
  });

// 4) click 僅通知父層與（必要時）zoom
node.on('click', (event, d) => {
  if (event.defaultPrevented) return;
  onNodeClick?.(d.data);
  if (focus !== d) {
    zoom(event as unknown as MouseEvent, d);
    event.stopPropagation();
  }
});
```

---

### 驗收標準

- [功能] 凍結節點縮放在任何子元素插入順序下皆正確呈現
- [體驗] Hover 有明顯、可預期的強調（stroke 變更），且不再出現無效 filter 清理
- [路由] 點擊葉節點僅導向一次，且導向由父層完全控制
- [品質] 透過 `pnpm typecheck`、`pnpm lint:check`、`pnpm build`

---

### 風險與退場機制

- 若 UI 對凍結邊框 hover 也需高亮，建議後續以 `classed('is-hover')` 配合 CSS 管控，避免在 D3 中混入過多視覺樣式。
- 若在某路由需保留元件內導向，可新增顯式 prop（如 `enableInternalNavigate`），預設關閉以避免雙重導向。

---

### 品質檢查與一通過信心分數

- [x] 必要上下文與代碼引用已包含
- [x] 參考現有專案模式（父層導向、Zustand 使用）
- [x] 清楚任務與可執行驗證關卡
- [x] 錯誤處理與風險已列出

Confidence score: 9/10（預期可一次實作通過，視覺微調風險低）


