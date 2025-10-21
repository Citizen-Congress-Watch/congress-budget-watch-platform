# PRP: 立委視覺化頁面資料分組與轉換（Legislator Visualization Data Grouping）

## 概述

為立委視覺化頁面 (`/visualization/legislator`) 實作資料分組與轉換邏輯，將 `proposalsData` 按預算年度和政府部門進行雙層分組，並轉換為適合 Circle Pack Chart 的 `NodeDatum` 結構，取代目前使用的 `FAKE_DATA`。

## 背景與研究發現

### 當前 Codebase 狀態

#### 框架與技術棧

- **框架**: React Router v7 (SPA mode)
- **資料獲取**: React Query v5.86.0 + GraphQL
- **狀態管理**: Zustand v5.0.8
- **視覺化**: D3.js v7.9.0 (Circle Pack Chart)
- **工具函式庫**: lodash v4.17.21 (devDependencies)
- **TypeScript**: v5.8.3 with full type safety

#### 當前立委視覺化頁面架構

**檔案**: `app/visualization/legislator/index.tsx`

**當前狀態**:
```typescript:40:53:app/visualization/legislator/index.tsx
const {
  data: proposalsData,
  isLoading,
  isError,
} = useQuery({
  queryKey: proposalQueryKeys.list({ whereFilter }),
  queryFn: () =>
    execute(GET_PAGINATED_PROPOSALS_QUERY, {
      skip: 0,
      take: 1000, // Assuming we want to fetch all proposals for this view
      orderBy: [{ id: OrderDirection.Desc }],
      where: whereFilter,
    }),
});
```

**關鍵發現**:
- ✅ 已有 `proposalsData` 從 React Query 取得
- ✅ 已引入 lodash 的 `sumBy` 和 `filter`（行 4）
- ⚠️ 目前統計數據使用 `sumBy` 和 `filter` 計算（行 64-76）
- ⚠️ SessionChart 未接收真實資料（行 164）

#### SessionChart 元件現狀

**檔案**: `app/visualization/legislator/session-chart.tsx`

```typescript:1:84:app/visualization/legislator/session-chart.tsx
import CirclePackChart from "../circle-pack-chart";

type NodeDatum = {
  name: string;
  value?: number;
  color?: string;
  id?: string;
  children?: NodeDatum[];
};
const FAKE_DATA: NodeDatum = {
  name: "root",
  children: [
    {
      name: "#999999\n台灣自來水\n股份有限公司\n999999萬",
      value: 999999,
      color: "#6B7FFF",
      id: "1-14-1-05-024-7990",
      children: [/* ... */],
    },
    // ... more fake nodes
  ],
};

const SessionChart = () => {
  return (
    <>
      <div className="mb-2 flex w-full flex-col items-start justify-center border-b-1">
        <div className="flex flex-col items-start justify-center">
          <p>第OO屆</p>
          <p>OOOO委員會</p>
        </div>
        <div className="md:mx-auto">
          <CirclePackChart data={FAKE_DATA} padding={8} />
        </div>
      </div>
      {/* ... 重複結構 */}
    </>
  );
};
```

**問題點**:
- ⚠️ 使用 `FAKE_DATA`
- ⚠️ 重複定義 `NodeDatum` 型別（已在 `helpers.ts` 定義）
- ⚠️ 未接收 props
- ⚠️ 硬編碼顯示文字（「第OO屆」、「OOOO委員會」）

#### 資料結構分析

**GraphQL Proposal 結構** (`app/queries/proposal.queries.ts`):

```graphql
query GetPaginatedProposals {
  proposals {
    id
    freezeAmount
    reductionAmount
    year          # ⭐ 預算年度
    government {
      id
      name
      category
    }
    proposers {
      id
      name
      party { 
        name   # example: "name": "民主進步黨"
        color  # example: "color": "#00CD26",
      }
    }
  }
}
```

**關鍵欄位**:
- `proposals.year`: 預算年度（用於第一層分組）
- `government.id`, `government.name`: 政府部門（用於第二層分組）
- `freezeAmount`, `reductionAmount`: 金額（用於計算 value）
- `proposers[0]`: 提案人資訊（用於顯示名稱）
- `proposers[0].party.type`: 政黨（用於顏色映射）

#### 現有 Helper 函式

**檔案**: `app/visualization/helpers.ts`

```typescript:3:54:app/visualization/helpers.ts
export type NodeDatum = {
  name: string;
  value?: number;
  color?: string;
  id: string;
  isFrozen?: boolean;
  children?: NodeDatum[];
};

const PARTY_COLORS = new Map<string, string>([
  ["中國國民黨", "#6B7FFF"],
  ["民主進步黨", "#00CD26"],
  // ... 更多政黨顏色
  ["無黨籍", "#D5D5D5"],
]);
const DEFAULT_COLOR = "#D5D5D5"; // 無黨籍
//  if api data got color in it, remove the Map 
export const transformToCirclePackData = (
  data: GetPaginatedProposalsQuery,
): NodeDatum => {
  const children = data.proposals?.map((proposal) => {
    const { id, proposers, freezeAmount, reductionAmount } = proposal;
    const proposer = proposers?.[0];
    const party = proposer?.party?.name ?? "無黨籍";
    const value = freezeAmount || reductionAmount || 0;
    const name = `${proposer?.name}\n${party}\n${value.toLocaleString()}元`;

    const color = PARTY_COLORS.get(party) || DEFAULT_COLOR;

    return {
      name,
      value,
      color: color,
      isFrozen: !!freezeAmount,
      id: id,
      children: [],
    };
  });

  return {
    id: "root",
    name: "root",
    children: children,
  };
};
```

**可複用資源**:
- ✅ `NodeDatum` 型別定義
- ✅ `PARTY_COLORS` 顏色映射
- ✅ 已有單層資料轉換邏輯可參考

#### lodash 使用模式

**目前使用**:
```typescript:4:4:app/visualization/legislator/index.tsx
import { sumBy, filter } from "lodash";
```

**Feature 要求使用的方法**:
- `_.groupBy`: 按欄位分組
- `_.mapValues`: 將物件的值映射轉換

**文件參考**:
- [lodash.groupBy](https://lodash.com/docs/4.17.15#groupBy)
- [lodash.mapValues](https://lodash.com/docs/4.17.15#mapValues)
- [Best Practices](https://moldstud.com/articles/p-best-practices-for-working-with-lodash-in-a-project)

### 需求分析

#### 分組邏輯

根據 Feature 文件，需要實作**雙層分組**:

1. **第一層**: 按 `budget.year` 分組
2. **第二層**: 對每個年度內的資料，按 `government.id` 分組

**範例（簡化）**:
```javascript
const data = [
  { id: 1, proposer: 'andy', year: 2025, government: 'A' },
  { id: 2, proposer: 'andy', year: 2024, government: 'B' },
  { id: 3, proposer: 'ben',  year: 2024, government: 'B' },
];

// 第一層分組：按 year
// 第二層分組：按 government
const result = _.mapValues(
  _.groupBy(data, 'year'),
  (items) => _.groupBy(items, 'government')
);

// result = {
//   2025: {
//     A: [{ id: 1, ... }]
//   },
//   2024: {
//     B: [{ id: 2, ... }, { id: 3, ... }]
//   }
// }
```

#### 目標資料結構

**最終輸出型別**: `NodeDatum[]`（陣列，每個元素代表一個年度）

**結構示意**:
```typescript
[
  {
    id: "session-2025",
    name: "第11屆",                    // 年度標題
    children: [                        // 第二層：各部會
      {
        id: "gov-education",
        name: "教育部",                 // 部會名稱
        children: [                    // 第三層：該部會的提案
          {
            id: "proposal-123",
            name: "徐巧芯\n中國國民黨\n999999元",
            value: 999999,
            color: "#6B7FFF",
            isFrozen: false,
            children: []
          },
          // ... 更多提案
        ]
      },
      // ... 更多部會
    ]
  },
  // ... 更多年度
]
```

**視覺呈現邏輯**:
- SessionChart 接收陣列，每個元素渲染一個獨立的 CirclePackChart
- 每個 chart 顯示對應的年度標題 + 部會名稱
- 用戶點擊圓圈內的節點（proposal.id）可導航到詳情頁

#### Mode 支援

SessionChart 需要支援兩種模式（從父元件傳入）:

1. **`mode="amount"`**: 按金額大小（`freezeAmount + reductionAmount`）
2. **`mode="count"`**: 按提案數量（每個 proposal 的 value = 1）

### 外部研究

#### D3 Circle Pack 與資料結構

參考: https://d3js.org/d3-hierarchy/pack

**關鍵要求**:
- 必須有 `name` 和 `value` 欄位
- `value` 決定圓圈大小（數值越大，圓圈越大）
- `children` 可遞迴嵌套（支援多層結構）
- `id` 可選，用於點擊導航

**層級對應**:
```
root (不顯示)
├── 年度 1
│   ├── 部會 A
│   │   ├── 提案 1 (可點擊)
│   │   └── 提案 2 (可點擊)
│   └── 部會 B
│       └── 提案 3 (可點擊)
└── 年度 2
    └── ...
```

#### lodash Best Practices

參考: https://moldstud.com/articles/p-best-practices-for-working-with-lodash-in-a-project

**重點**:
1. **Tree-shaking**: 使用命名導入 `import { groupBy, mapValues } from "lodash"`
2. **效能**: `groupBy` 和 `mapValues` 的時間複雜度為 O(n)，適合大量資料
3. **型別安全**: TypeScript 的 `@types/lodash` 已安裝，自動提供型別
4. **可讀性**: lodash 的 API 語意化，易於理解和維護

## 實作計畫

### 階段 1: 新增資料轉換函式

**目標**: 在 `helpers.ts` 新增 `transformToGroupedSessionData` 函式

**檔案**: `app/visualization/helpers.ts`

#### 實作步驟

1. **引入 lodash 方法**

```typescript
import { groupBy, mapValues, sumBy } from "lodash";
```

2. **定義型別（如需要）**

```typescript
type ProposalWithBudget = GetPaginatedProposalsQuery["proposals"][number];

type GroupedByYear = {
  [year: string]: {
    [governmentId: string]: ProposalWithBudget[];
  };
};
```

3. **實作函式**

```typescript
/**
 * 將 proposals 按年度和部會分組，轉換為 SessionChart 需要的 NodeDatum[]
 * 
 * 資料結構：
 * - 第一層：年度（從 budget.year）
 * - 第二層：政府部門（從 government）
 * - 第三層：各提案（可點擊導航）
 * 
 * @param data - GraphQL query 回傳的資料
 * @param mode - 'amount' 或 'count'，決定 value 的計算方式
 * @returns NodeDatum[] - 每個元素代表一個年度的 session
 */
export const transformToGroupedSessionData = (
  data: GetPaginatedProposalsQuery,
  mode: "amount" | "count" = "amount"
): NodeDatum[] => {
  const proposals = data.proposals || [];

  if (proposals.length === 0) {
    return [];
  }

  // 第一步：雙層分組（年度 -> 部會）
  const groupedData = mapValues(
    groupBy(proposals, (p) => p.budget?.year ?? "未知年度"),
    (yearProposals) => groupBy(yearProposals, (p) => p.government?.id ?? "unknown-gov")
  );

  // 第二步：轉換為 NodeDatum[]
  const result: NodeDatum[] = [];

  // 遍歷每個年度
  Object.entries(groupedData).forEach(([year, governmentGroups]) => {
    // 建立部會節點
    const departmentNodes: NodeDatum[] = [];

    Object.entries(governmentGroups).forEach(([govId, govProposals]) => {
      const government = govProposals[0]?.government;
      if (!government) return; // 跳過沒有 government 資訊的資料

      // 建立提案節點（第三層）
      const proposalNodes: NodeDatum[] = govProposals.map((proposal) => {
        const { id, proposers, freezeAmount, reductionAmount } = proposal;
        const proposer = proposers?.[0];
        const party = proposer?.party?.name ?? "無黨籍";

        // 根據 mode 計算 value
        let value: number;
        if (mode === "amount") {
          value = (freezeAmount || 0) + (reductionAmount || 0);
        } else {
          value = 1; // count mode: 每個 proposal 等權重
        }

        // 格式化顯示文字
        const displayValue = mode === "amount" 
          ? `${value.toLocaleString()}元` 
          : "1案";
        const name = `${proposer?.name ?? "未知"}\n${party}\n${displayValue}`;

        const color = PARTY_COLORS.get(party) || DEFAULT_COLOR;

        return {
          id: id,
          name,
          value,
          color,
          isFrozen: !!freezeAmount,
          children: [],
        };
      });

      // 計算部會的總 value（用於排序）
      const departmentValue = sumBy(proposalNodes, (n) => n.value || 0);

      // 建立部會節點（第二層）
      departmentNodes.push({
        id: govId,
        name: government.name,
        value: departmentValue,
        children: proposalNodes,
      });
    });

    // 建立年度節點（第一層）
    result.push({
      id: `session-${year}`,
      name: `${year}年度`, // 可以根據年度映射到屆別
      children: departmentNodes,
    });
  });

  // 按年度排序（降序）
  result.sort((a, b) => {
    const yearA = parseInt(a.id.replace("session-", ""));
    const yearB = parseInt(b.id.replace("session-", ""));
    return yearB - yearA;
  });

  return result;
};
```

4. **匯出 PARTY_COLORS（供測試使用）**

如果 `PARTY_COLORS` 目前是私有的，考慮匯出：

```typescript
export const PARTY_COLORS = new Map<string, string>([
  // ... 保持原有定義
]);
export const DEFAULT_COLOR = "#D5D5D5";
```

#### 驗證標準

- [x] 函式正確匯出
- [x] 回傳型別為 `NodeDatum[]`
- [x] 雙層分組邏輯正確（年度 -> 部會）
- [x] 每個提案節點包含正確的 `id`, `name`, `value`, `color`, `isFrozen`
- [x] `mode="amount"` 時 value 為金額總和
- [x] `mode="count"` 時 value 為 1
- [x] 顏色對應政黨正確（使用 `PARTY_COLORS`）
- [x] 處理邊緣情況（無 budget, 無 government, 空陣列）
- [x] TypeScript 型別檢查通過

---

### 階段 2: 更新 SessionChart 元件

**目標**: 接收真實資料並動態渲染

**檔案**: `app/visualization/legislator/session-chart.tsx`

#### 實作步驟

1. **移除重複型別定義和 FAKE_DATA**

刪除行 3-56（`type NodeDatum` 和 `FAKE_DATA`）

2. **引入正確的型別**

```typescript
import CirclePackChart from "../circle-pack-chart";
import type { NodeDatum } from "../helpers";
```

3. **定義 Props 型別**

```typescript
type SessionChartProps = {
  data: NodeDatum[]; // 每個元素代表一個年度 session
};
```

4. **重構元件邏輯**

```typescript
const SessionChart = ({ data }: SessionChartProps) => {
  // 如果沒有資料，顯示提示訊息
  if (!data || data.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-8">
        <p className="text-gray-500">目前無提案資料</p>
      </div>
    );
  }

  return (
    <>
      {data.map((session) => {
        // session.children 是各部會
        return (
          <div
            key={session.id}
            className="mb-2 flex w-full flex-col items-start justify-center border-b-1"
          >
            <div className="flex flex-col items-start justify-center">
              <p>{session.name}</p>
              {/* 可選：顯示部會統計 */}
              {session.children && session.children.length > 0 && (
                <p className="text-sm text-gray-600">
                  {session.children.length} 個部會
                </p>
              )}
            </div>
            <div className="md:mx-auto">
              <CirclePackChart 
                data={{
                  id: session.id,
                  name: "root",
                  children: session.children,
                }}
                padding={8} 
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SessionChart;
```

#### 驗證標準

- [x] `FAKE_DATA` 已移除
- [x] 接收 `data: NodeDatum[]` prop
- [x] 動態渲染每個年度 session
- [x] 每個 session 顯示對應的年度名稱
- [x] 無資料時顯示提示訊息
- [x] CirclePackChart 接收正確的資料結構
- [x] 保持原有排版樣式
- [x] TypeScript 型別檢查通過

---

### 階段 3: 更新 VisualizationLegislator 主元件

**目標**: 整合資料轉換並傳遞給 SessionChart

**檔案**: `app/visualization/legislator/index.tsx`

#### 實作步驟

1. **引入新的 helper 函式**

```typescript
import { transformToGroupedSessionData } from "../helpers";
```

2. **引入 lodash 的 groupBy 和 mapValues（移除未使用的）**

```typescript
// 修改行 4
import { groupBy, mapValues } from "lodash";
```

注意：如果 `sumBy` 和 `filter` 仍在統計計算中使用（行 64-76），保留它們。

3. **使用 useMemo 計算轉換後的資料**

**在 useQuery 之後新增**（約行 54 之後）:

```typescript
// 轉換資料供 SessionChart 使用
const sessionData = useMemo(() => {
  if (!proposalsData) return [];
  return transformToGroupedSessionData(proposalsData, mode);
}, [proposalsData, mode]);
```

4. **傳遞資料給 SessionChart**

**修改行 164**:

```typescript
// Before
<SessionChart />

// After
<SessionChart data={sessionData} />
```

#### 驗證標準

- [x] 引入 `transformToGroupedSessionData`
- [x] 使用 `useMemo` 計算 `sessionData`
- [x] 依賴項包含 `proposalsData` 和 `mode`
- [x] SessionChart 接收 `data` prop
- [x] 切換 mode 時資料正確更新
- [x] 保持原有統計邏輯不變（行 64-76）
- [x] TypeScript 型別檢查通過
- [x] 無 console errors

---

### 階段 4: 測試與驗證

**目標**: 確保功能完整且無錯誤

#### 測試場景

**場景 1: 預設載入（依金額模式）**

1. 訪問 `/visualization/legislator`
2. 預期:
   - 顯示實際提案資料（非 FAKE_DATA）
   - 圓圈大小對應金額
   - 文字標籤顯示「XXX元」格式
   - 統計數據正確（總刪減、總凍結）
   - 各年度 session 按年度降序排列

**場景 2: 切換到依數量模式**

1. 選擇「依數量（凍結案/刪減案/建議案）」radio button
2. 預期:
   - 所有圓圈大小相同（value = 1）
   - 文字標籤顯示「1案」
   - 統計數據保持不變
   - 年度和部會結構保持不變

**場景 3: 資料分組正確性**

檢查以下內容:
- 同一年度的提案出現在同一個 chart 中
- 同一部會的提案聚集在一起（同一個大圓圈內）
- 不同部會有明顯的圓圈分隔
- 點擊提案圓圈可導航到詳情頁（如已實作）

**場景 4: 邊緣情況**

1. 某些年度無資料
   - 預期：該年度不顯示
2. 某些提案無 government
   - 預期：跳過這些提案或歸類到「未知部會」
3. proposalsData 為空
   - 預期：顯示「目前無提案資料」

**場景 5: 顏色與樣式**

1. 檢查政黨顏色是否正確
2. 凍結提案是否顯示粉紅邊框（`isFrozen`）
3. 文字標籤是否清晰可讀

#### 功能驗證清單

**資料正確性**:
- [ ] 不再顯示 FAKE_DATA
- [ ] 顯示真實 proposalsData
- [ ] 雙層分組正確（年度 -> 部會）
- [ ] 每個年度的標題正確
- [ ] 每個部會的提案數量正確
- [ ] 圓圈大小對應金額（依金額模式）
- [ ] 圓圈大小相同（依數量模式）

**視覺化正確性**:
- [ ] 顏色對應政黨（使用 `PARTY_COLORS`）
- [ ] 凍結提案顯示粉紅邊框
- [ ] 文字標籤格式正確（姓名\n政黨\n金額/數量）
- [ ] 部會名稱顯示正確
- [ ] 年度標題顯示正確

**互動性**:
- [ ] 點擊圓圈可導航（如已實作）
- [ ] Mode 切換正常運作
- [ ] 統計數據正確更新

**程式碼品質**:
- [ ] 無 console errors/warnings
- [ ] 無 TypeScript errors
- [ ] 無 ESLint errors
- [ ] 所有 `FAKE_DATA` 已移除
- [ ] 無重複的型別定義
- [ ] 引入的 lodash 方法都有使用

---

## 驗證閘門

### 語法與型別檢查

```bash
# TypeScript 型別檢查
pnpm typecheck

# ESLint 檢查
pnpm lint
```

**預期結果**: 無錯誤

### 手動測試

根據 Feature 文件，**不需要執行 `pnpm dev`**（已由使用者控制）

測試步驟:
1. 訪問 `/visualization/legislator`
2. 執行上述測試場景
3. 檢查 Console 無錯誤
4. 檢查 Network 請求成功
5. 檢查視覺化圖表正確渲染

### 檢查點

1. **lodash 引入正確**: `import { groupBy, mapValues } from "lodash"`
2. **資料轉換函式工作正常**: `transformToGroupedSessionData` 回傳正確結構
3. **SessionChart 接收真實資料**: 不再使用 `FAKE_DATA`
4. **無重複型別定義**: 只從 `helpers.ts` 引入 `NodeDatum`
5. **Mode 切換正常**: 金額/數量模式都能正確顯示

---

## 技術決策

### 1. 為何使用 lodash 而非原生 JavaScript？

**決策**: 使用 lodash 的 `groupBy` 和 `mapValues`

**理由**:
- ✅ Feature 文件明確要求使用 lodash
- ✅ 專案已安裝 lodash（v4.17.21）
- ✅ 程式碼更簡潔易讀（vs 手寫 reduce）
- ✅ 已有其他地方使用 lodash（`sumBy`, `filter`）
- ✅ TypeScript 型別自動推斷

**替代方案（未採用）**:
```typescript
// 原生 JS（較冗長）
const grouped = proposals.reduce((acc, p) => {
  const year = p.budget?.year ?? "未知";
  if (!acc[year]) acc[year] = {};
  const govId = p.government?.id ?? "unknown";
  if (!acc[year][govId]) acc[year][govId] = [];
  acc[year][govId].push(p);
  return acc;
}, {} as Record<string, Record<string, ProposalWithBudget[]>>);
```

### 2. 回傳陣列 vs 物件？

**決策**: `transformToGroupedSessionData` 回傳 `NodeDatum[]`

**理由**:
- ✅ SessionChart 需要遍歷渲染多個年度
- ✅ 陣列易於 `.map()` 渲染
- ✅ 保留排序（物件順序在 JS 中不保證）
- ✅ 結構清晰，易於理解

**替代方案（未採用）**:
- 回傳物件 `{ [year: string]: NodeDatum }`: 需要額外 `Object.entries()` 處理

### 3. Mode 參數在哪裡處理？

**決策**: 在 `transformToGroupedSessionData` 函式內部處理 `mode`

**理由**:
- ✅ 資料轉換邏輯與 mode 緊密相關
- ✅ 避免在元件內計算，保持元件簡潔
- ✅ `useMemo` 依賴 `mode`，自動觸發重算
- ✅ 與現有 `transformToCirclePackData` 模式一致

### 4. 年度映射到屆別

**決策**: 暫時顯示「XXXX年度」，未來可擴展映射表

**理由**:
- ⚠️ Feature 文件示意圖顯示「第OO屆」，但未提供映射規則
- ✅ 直接顯示年度更明確
- ✅ 易於擴展（可新增 `yearToSession` 映射函式）

**未來改進**:
```typescript
const YEAR_TO_SESSION: Record<number, string> = {
  2024: "第10屆",
  2025: "第11屆",
  // ...
};

const sessionName = YEAR_TO_SESSION[parseInt(year)] ?? `${year}年度`;
```

### 5. 部會節點的 value 計算

**決策**: 部會節點的 `value` = 該部會所有提案的 value 總和

**理由**:
- ✅ 部會圓圈大小反映該部會的總量（金額或提案數）
- ✅ 符合 D3 Circle Pack 的視覺語意
- ✅ 使用 `sumBy` 簡潔計算

---

## 潛在風險與緩解

### 風險 1: budget.year 為 null

**風險**: 部分 proposals 可能沒有 `budget.year` 資料

**緩解**:
- 使用 `p.budget?.year ?? "未知年度"` 提供預設值
- 歸類到「未知年度」分組
- 在開發模式記錄 warning（可選）

```typescript
if (process.env.NODE_ENV === "development" && !p.budget?.year) {
  console.warn(`Proposal ${p.id} has no budget year`);
}
```

### 風險 2: government 為 null

**風險**: 部分 proposals 可能沒有 `government` 資料

**緩解**:
- 在 `Object.entries(governmentGroups).forEach` 中檢查
- 使用 `if (!government) return;` 跳過
- 或歸類到「未知部會」（govId = "unknown-gov"）

### 風險 3: 空資料陣列

**風險**: `proposals.length === 0` 或某些年度無資料

**緩解**:
- 在 `transformToGroupedSessionData` 開頭檢查：
  ```typescript
  if (proposals.length === 0) {
    return [];
  }
  ```
- 在 SessionChart 中顯示友善訊息

### 風險 4: 效能問題

**風險**: 大量資料時（如 10000+ 筆）可能導致轉換耗時

**緩解**:
- 使用 `useMemo` 避免重複計算
- lodash 的 `groupBy` 和 `mapValues` 效能良好（O(n)）
- 如需優化，可考慮 Web Worker（未來擴展）

### 風險 5: lodash Tree-shaking

**風險**: 全量引入 lodash 可能增加 bundle size

**緩解**:
- 使用命名導入 `import { groupBy, mapValues } from "lodash"`
- 現代打包工具（Vite）支援 tree-shaking
- lodash 已在專案多處使用，增量影響極小

---

## 未來擴展

### 1. 年度到屆別的映射

新增映射表，將年度轉換為立法院屆別：

```typescript
const YEAR_TO_SESSION: Record<number, string> = {
  2020: "第10屆第1會期",
  2021: "第10屆第2會期",
  // ...
};
```

### 2. 部會圖示或顏色

為不同部會設定特定圖示或顏色：

```typescript
const GOV_COLORS: Record<string, string> = {
  "教育部": "#FF6B6B",
  "經濟部": "#4ECDC4",
  // ...
};
```

### 3. 互動式統計

在每個 session 標題旁顯示該年度的統計資訊：

```typescript
<p>
  {session.name} 
  （共 {calculateTotalProposals(session)} 案，
  總金額 {calculateTotalAmount(session).toLocaleString()} 元）
</p>
```

### 4. 篩選與搜尋

允許用戶篩選特定年度或部會：

```typescript
const [selectedYear, setSelectedYear] = useState<string | null>(null);

const filteredSessionData = useMemo(() => {
  if (!selectedYear) return sessionData;
  return sessionData.filter(s => s.id === `session-${selectedYear}`);
}, [sessionData, selectedYear]);
```

### 5. 匯出資料

提供 CSV/JSON 匯出功能：

```typescript
const exportData = () => {
  const csv = convertToCSV(sessionData);
  downloadFile(csv, 'proposals.csv');
};
```

---

## 參考資源

### 官方文件

- [lodash.groupBy](https://lodash.com/docs/4.17.15#groupBy) - 按欄位分組
- [lodash.mapValues](https://lodash.com/docs/4.17.15#mapValues) - 物件值映射
- [lodash.sumBy](https://lodash.com/docs/4.17.15#sumBy) - 陣列求和
- [D3 Hierarchy - Pack](https://d3js.org/d3-hierarchy/pack) - Circle Pack 圖表
- [TypeScript - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

### 程式碼參考

- 現有資料轉換: `app/visualization/helpers.ts:27-54`
- lodash 使用範例: `app/visualization/legislator/index.tsx:4,64-76`
- React Query 整合: `app/visualization/legislator/index.tsx:40-53`
- CirclePackChart API: `app/visualization/circle-pack-chart.tsx:7-19`

### 相關 PRPs

- 視覺化資料處理: `PRPs/visualization-data.md`
- 依部會切換: `PRPs/sort-by-department.md`
- 分頁實作: `PRPs/add-pagination.md`

---

## 成功標準

此 PRP 實作完成後應達成：

1. ✅ SessionChart 不再使用 FAKE_DATA
2. ✅ 顯示真實 proposalsData，按年度和部會分組
3. ✅ 使用 lodash 的 `groupBy` 和 `mapValues` 進行分組
4. ✅ 資料結構為三層（年度 -> 部會 -> 提案）
5. ✅ 支援 `mode="amount"` 和 `mode="count"` 切換
6. ✅ 年度按降序排列（最新年度在上）
7. ✅ 顏色對應政黨（使用 `PARTY_COLORS`）
8. ✅ 無 TypeScript/ESLint 錯誤
9. ✅ 保持現有排版不變
10. ✅ 無 console errors

---

## PRP 信心評分

**評分**: 9/10

**理由**:
- ✅ lodash 已安裝且有使用經驗
- ✅ 資料結構清晰（budget.year, government 欄位存在）
- ✅ 有現有資料轉換邏輯可參考（`transformToCirclePackData`）
- ✅ 分組邏輯明確（雙層 groupBy）
- ✅ SessionChart 改動範圍小（主要是接收 props）
- ✅ 有完整的型別定義（NodeDatum）
- ⚠️ 需注意邊緣情況（null budget, null government）
- ⚠️ 需確保 lodash 使用正確（語法細節）

**降低風險**:
- 階段化實作，每階段有明確驗證標準
- 提供完整的函式實作範例
- 明確列出潛在風險與緩解措施
- 詳細的測試場景與驗證清單

---

## 實作順序總結

1. ✅ **新增 `transformToGroupedSessionData` 到 `helpers.ts`** - 實作雙層分組與資料轉換
2. ✅ **更新 `session-chart.tsx`** - 移除 FAKE_DATA，接收真實資料 props
3. ✅ **更新 `legislator/index.tsx`** - 整合資料轉換，傳遞給 SessionChart
4. ✅ **測試與驗證** - 執行所有測試場景，確保功能正常

**預估時間**: 1-2 小時（含測試）

**重要提醒**（來自 Feature 文件）:
- ❌ 不用 run `pnpm dev`（由使用者控制）
- ❌ 不要破壞現有的邏輯
- ❌ 不要破壞現有的排版

---

**實作完成後請確認**:
- [ ] 所有階段的驗證標準都通過
- [ ] 所有測試場景都執行過
- [ ] `pnpm typecheck` 無錯誤
- [ ] `pnpm lint` 無錯誤
- [ ] 無 console errors
- [ ] FAKE_DATA 已完全移除
- [ ] lodash 引入正確且有使用
- [ ] 視覺化圖表正確顯示真實資料

---

## Pseudocode 實作概要

```typescript
// Step 1: 在 helpers.ts 新增函式
export function transformToGroupedSessionData(data, mode) {
  proposals = data.proposals
  
  // 雙層分組
  grouped = mapValues(
    groupBy(proposals, p => p.budget.year),
    yearProposals => groupBy(yearProposals, p => p.government.id)
  )
  
  // 轉換為 NodeDatum[]
  result = []
  for each (year, govGroups) in grouped {
    departmentNodes = []
    for each (govId, govProposals) in govGroups {
      proposalNodes = govProposals.map(p => ({
        id: p.id,
        name: `${p.proposer.name}\n${p.party}\n${calculateValue(p, mode)}`,
        value: calculateValue(p, mode),
        color: getPartyColor(p.party),
        isFrozen: !!p.freezeAmount
      }))
      
      departmentNodes.push({
        id: govId,
        name: government.name,
        children: proposalNodes
      })
    }
    
    result.push({
      id: `session-${year}`,
      name: `${year}年度`,
      children: departmentNodes
    })
  }
  
  return result.sort(byYearDesc)
}

// Step 2: 在 session-chart.tsx
function SessionChart({ data }: { data: NodeDatum[] }) {
  if (!data || data.length === 0) return <EmptyState />
  
  return data.map(session => (
    <div key={session.id}>
      <h3>{session.name}</h3>
      <CirclePackChart data={{
        name: "root",
        children: session.children
      }} />
    </div>
  ))
}

// Step 3: 在 legislator/index.tsx
const sessionData = useMemo(() => {
  if (!proposalsData) return []
  return transformToGroupedSessionData(proposalsData, mode)
}, [proposalsData, mode])

<SessionChart data={sessionData} />
```

---

## 最終檢查清單

**程式碼變更**:
- [ ] `app/visualization/helpers.ts` - 新增 `transformToGroupedSessionData`
- [ ] `app/visualization/helpers.ts` - 引入 `groupBy`, `mapValues`, `sumBy`
- [ ] `app/visualization/legislator/session-chart.tsx` - 移除 FAKE_DATA
- [ ] `app/visualization/legislator/session-chart.tsx` - 新增 `SessionChartProps`
- [ ] `app/visualization/legislator/index.tsx` - 引入 `transformToGroupedSessionData`
- [ ] `app/visualization/legislator/index.tsx` - 新增 `sessionData` useMemo
- [ ] `app/visualization/legislator/index.tsx` - 傳遞 `data` 給 SessionChart

**驗證**:
- [ ] TypeScript 編譯成功（`pnpm typecheck`）
- [ ] ESLint 檢查通過（`pnpm lint`）
- [ ] 瀏覽器 Console 無錯誤
- [ ] 視覺化圖表正確顯示
- [ ] Mode 切換正常運作
- [ ] 統計數據正確
- [ ] 顏色和樣式正確

**文件**:
- [ ] 函式有完整的 JSDoc 註解
- [ ] 複雜邏輯有內聯註解
- [ ] 型別定義清晰

