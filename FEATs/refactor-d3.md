## Feats
• 重點

  - app/visualization/circle-pack-chart.tsx:246、app/visualization/circle-pack-chart.tsx:253：凍結節點的縮放目前靠 path:nth-child(2|3) CSS 選取，這在 D3
    的 <g> 裡只要有元素插入順序改動就會失效（例如之後需要再加陰影或 icon）。建議在建立 path 時就加上明確 class，例如 .append("path").attr("class","frozen-
    border frozen-border--outer")，後續 zoom 更新時直接用 class 選取，避免後續維護踩雷。
  - app/visualization/circle-pack-chart.tsx:75-83：滑鼠移入事件把圓和 path 的 stroke-width 都設成 1，預設就是 1，所以看不到任何 hover 效果；滑鼠移出還把
    path 的 filter 清掉，但進場根本沒加 filter。這段邏輯目前是空轉，應該要調整成真正的 hover 樣式（例如 stroke-width:2 或加外框/陰影），不然可以乾脆刪掉避
    免誤導。
  - app/visualization/circle-pack-chart.tsx:372-385：現在一點擊就 onNodeClick(d.data)，接著又在同個 handler 根據 isVisualizationRoute 進行 navigate。如果父
    層回呼本來就會導向（例如 /visualization 頁面），就會在同個 tick 觸發兩次 navigate。建議把導向責任統一交給父層（只呼叫 callback），或至少在內部 navigate
    前檢查 onNodeClick 是否已經處理（例如讓回呼回傳布林表示是否阻止預設行為）。

## Docs
1. https://observablehq.com/@d3/zoomable-circle-packing