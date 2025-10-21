# PRP: 視覺化頁面依立委/依部會切換功能（Visualization Tab Switcher with Zustand）

## 概述

為視覺化頁面 (`/visualization`) 實作「依立委」與「依部會」的切換功能，使用 Zustand 管理狀態，並整合 React Query 確保在模式切換時正確重新渲染對應的 D3 Circle Pack Chart。預設顯示「依立委」模式。

## 背景與研究發現

### 當前 Codebase 狀態

#### 框架與技術棧

- **框架**: React Router v7 (SPA mode)
- **資料獲取**: React Query v5.86.0 + GraphQL with typed document nodes
- **狀態管理**: Zustand v5.0.8
- **視覺化**: D3.js v7.9.0 (Circle Pack Chart)
- **TypeScript**: v5.8.3 with full type safety
- **樣式**: TailwindCSS v4

#### 當前視覺化頁面架構

**檔案**: `app/visualization/index.tsx`

**當前狀態管理**:
```typescript:32:35:app/visualization/index.tsx
const Visualization = () => {
  // "department" || "legislator"
  const [activeTab, setActiveTab] = useState("legislator");
  const [mode, setMode] = useState<"amount" | "count">("amount");
```

**UI 控制項** (行 136-156):
```typescript
<button
  onClick={() => setActiveTab("legislator")}
  className={`rounded px-2.5 transition-colors ${
    activeTab === "legislator"
      ? "bg-[#3E51FF] text-white"
      : "border border-gray-300 bg-white text-gray-800"
  }`}
>
  依立委
</button>
<button
  onClick={() => setActiveTab("department")}
  className={`rounded px-2.5 transition-colors ${
    activeTab === "department"
      ? "bg-[#3E51FF] text-white"
      : "border border-gray-300 bg-white text-gray-800"
  }`}
>
  依部會
</button>
```

**當前渲染邏輯** (行 225-228):
```typescript
{activeTab === "legislator" && circlePackData && (
  <CirclePackChart data={circlePackData} />
)}
{activeTab === "department" && <DepartmentChart />}
```

**問題點**:
- ✅ UI 已經存在
- ⚠️ 使用 `useState` 管理狀態（應改用 Zustand）
- ⚠️ `DepartmentChart` 使用假資料（`FAKE_DATA`）
- ⚠️ 缺少依部會的資料聚合邏輯
- ⚠️ 切換 tab 後未正確重新獲取/轉換資料

#### 現有資料轉換邏輯

**檔案**: `app/visualization/helpers.ts`

**當前實作** (行 27-54):
```typescript
export const transformToCirclePackData = (
  data: GetPaginatedProposalsQuery,
): NodeDatum => {
  const children = data.proposals?.map((proposal) => {
    const { id, proposers, freezeAmount, reductionAmount } = proposal;
    const proposer = proposers?.[0]; // 取第一位提案人
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

**關鍵發現**:
- ✅ 已有「依立委」的轉換邏輯
- ✅ 已有政黨顏色映射表 (`PARTY_COLORS`)
- ⚠️ 缺少「依部會」的聚合函式
- ⚠️ 未處理 `mode` 參數 (`amount` vs `count`)

#### 部會元件現狀

**檔案**: `app/visualization/department/index.tsx`

```typescript:10:39:app/visualization/department/index.tsx
const FAKE_DATA: NodeDatum = {
  name: "root",
  children: [
    {
      name: "徐巧芯\n中國國民黨\n999999萬",
      value: 3,
      color: "#6B7FFF",
      isFrozen: false,
      id: "1-14-1-05-024-7990",
    },
    // ... more fake data
  ],
};

const DepartmentChart = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <div className="flex flex-col items-center justify-center gap-y-5 font-bold">
        <p>全部</p>
        <CirclePackChart data={FAKE_DATA} />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-5 font-bold">
        <p>OOOO署</p>
        <CirclePackChart data={FAKE_DATA} />
      </div>
      {/* ... 更多重複的假資料 */}
    </div>
  );
};
```

**需求**:
1. 接收真實資料 props
2. 動態渲染各部會的 chart
3. 顯示「全部」聚合 + 各部會獨立 chart

### GraphQL Schema 分析

#### Proposal 結構

**檔案**: `schema.graphql`

關鍵欄位:
```graphql
type Proposal {
  id: ID!
  freezeAmount: Int           # 凍結金額
  reductionAmount: Int        # 刪減金額
  proposalTypes: String       # 提案類型
  government: Government      # 所屬機關（部會）
  proposers: [People!]        # 提案人
}

type Government {
  id: ID!
  name: String                # 機關名稱（如：教育部）
  category: String            # 類別（如：一般行政）
}
```

#### 現有 Query

**檔案**: `app/queries/proposal.queries.ts` (行 37-81)

```graphql
query GetProposalsOrderedByIdDesc {
  proposals(orderBy: [{ id: desc }]) {
    id
    freezeAmount
    reductionAmount
    proposalTypes
    government {
      id
      name
      category
    }
    proposers {
      id
      name
      party { name }
    }
  }
}
```

✅ 已包含 `government` 資訊，可直接使用

### 現有 Zustand Store 模式

#### 全域 UI Store 範例

**檔案**: `app/stores/uiStore.ts` (行 52-165)

```typescript
export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      headerState: { isShareModalOpen: false },
      progressState: { currentStep: 0, isComplete: false },
      actions: {
        toggleShareModal: () =>
          set(
            (state) => ({ headerState: { ...state.headerState, isShareModalOpen: !state.headerState.isShareModalOpen } }),
            undefined,
            "toggleShareModal"
          ),
        // ... more actions
      },
    }),
    { name: "ui-store", enabled: process.env.NODE_ENV === "development" }
  )
);

// Selector hooks
export const useHeaderState = () => useUIStore((state) => state.headerState);
export const useUIActions = () => useUIStore((state) => state.actions);
```

**模式總結**:
- 使用 `devtools` middleware（開發模式啟用）
- Actions 分離到 `actions` 命名空間
- 提供 selector hooks 避免不必要重渲染
- 使用第三個參數命名 actions（DevTools 顯示）

#### 使用 immer 的 Store 範例

**檔案**: `app/stores/vote.store.ts`

```typescript:1:25:app/stores/vote.store.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type VoteState = {
  votes: Record<string, string>;
  actions: {
    setVote: (proposalId: string, vote: string) => void;
  };
};

export const useVoteStore = create<VoteState>()(
  immer((set) => ({
    votes: {},
    actions: {
      setVote: (proposalId, vote) =>
        set((state) => {
          state.votes[proposalId] = vote;
        }),
    },
  }))
);

export const useVotes = () => useVoteStore((state) => state.votes);
export const useVoteActions = () => useVoteStore((state) => state.actions);
```

**immer 好處**: 可直接修改 state（內部自動 immutable 轉換）

### React Query 使用模式

**檔案**: `app/all-budgets/index.tsx` (行 57-72)

```typescript
const { data, isLoading, isError, isPlaceholderData } = useQuery({
  queryKey: proposalQueryKeys.paginated(
    currentPage,
    pageSize,
    selectedSort,
    whereFilter()
  ),
  queryFn: () =>
    execute(GET_PAGINATED_PROPOSALS_QUERY, {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy,
      where: whereFilter(),
    }),
  placeholderData: keepPreviousData, // 避免切換時閃爍
});
```

**關鍵實踐**:
- 使用 hierarchical query keys
- `keepPreviousData` 避免切換時資料消失
- `useMemo` 計算 `whereFilter` 和 `orderBy`

### 資料聚合需求

#### 依立委聚合 (Legislator Mode)

✅ **已實作**: `transformToCirclePackData` in `helpers.ts`

**邏輯**:
- 每個 proposal 顯示為一個節點
- 節點名稱: `提案人名\n政黨\n金額元`
- 顏色: 根據政黨
- `isFrozen`: 是否有凍結金額

#### 依部會聚合 (Department Mode)

⚠️ **需新增**

**需求邏輯**:

1. **將 proposals 按 government.id 分組**
   ```typescript
   const proposalsByDepartment = proposals.reduce((acc, proposal) => {
     const govId = proposal.government.id
     if (!acc[govId]) {
       acc[govId] = {
         government: proposal.government,
         proposals: []
       }
     }
     acc[govId].proposals.push(proposal)
     return acc
   }, {})
   ```

2. **每個部會內，顯示該部會所有提案人**
   ```typescript
   // 對於每個部會
   departmentNode = {
     name: government.name,
     children: proposals.map(proposal => ({
       name: `${proposer.name}\n${party}\n${value}元`,
       value: calculateValue(proposal, mode),
       color: getPartyColor(party),
       isFrozen: !!proposal.freezeAmount,
       id: proposal.id
     }))
   }
   ```

3. **Mode 影響 value 計算**
   - `amount`: `value = freezeAmount + reductionAmount`
   - `count`: `value = 1` (每個 proposal 等權重)

4. **回傳結構**
   ```typescript
   return [
     {
       name: government1.name,
       children: [...]
     },
     {
       name: government2.name,
       children: [...]
     },
     // ... more departments
   ]
   ```

#### 「全部」聚合邏輯

在 `DepartmentChart` 內部實作:
```typescript
const allData: NodeDatum = {
  name: "root",
  children: departmentDataArray.flatMap(dept => dept.children || [])
}
```

### 外部研究

#### D3 Circle Pack 與資料結構

參考: https://d3js.org/d3-hierarchy/pack

**關鍵要求**:
- 必須有 `name` 和 `value` 欄位
- `value` 決定圓圈大小
- 可選 `children` 為遞迴結構

#### Zustand Best Practices

參考: https://docs.pmnd.rs/zustand/guides/typescript

**重點**:
- 使用 TypeScript 定義完整型別
- Actions 分離避免不必要重渲染
- 使用 selector hooks 提升效能

#### React Query Query Keys

參考: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

**最佳實踐**:
- 使用 hierarchical keys: `['visualization', { tab, mode, year }]`
- 相同 key 會自動快取
- key 改變會重新觸發 query

## 實作計畫

### 階段 1: 建立 Zustand Visualization Store

**目標**: 集中管理視覺化頁面的 UI 狀態

**檔案**: `app/stores/visualization.store.ts` (新建)

#### 實作步驟

1. **定義型別**

```typescript
type VisualizationTab = "legislator" | "department";
type VisualizationMode = "amount" | "count";

type VisualizationState = {
  activeTab: VisualizationTab;
  mode: VisualizationMode;
  selectedYear: string;
};

type VisualizationActions = {
  setActiveTab: (tab: VisualizationTab) => void;
  setMode: (mode: VisualizationMode) => void;
  setSelectedYear: (year: string) => void;
  reset: () => void;
};

type VisualizationStoreState = {
  state: VisualizationState;
  actions: VisualizationActions;
};
```

2. **建立 Store**

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DEFAULT_STATE: VisualizationState = {
  activeTab: "legislator",  // 預設依立委
  mode: "amount",
  selectedYear: "2025",
};

export const useVisualizationStore = create<VisualizationStoreState>()(
  devtools(
    (set) => ({
      state: DEFAULT_STATE,
      actions: {
        setActiveTab: (tab) =>
          set(
            (s) => ({ state: { ...s.state, activeTab: tab } }),
            undefined,
            "visualization/setActiveTab"
          ),
        setMode: (mode) =>
          set(
            (s) => ({ state: { ...s.state, mode } }),
            undefined,
            "visualization/setMode"
          ),
        setSelectedYear: (year) =>
          set(
            (s) => ({ state: { ...s.state, selectedYear: year } }),
            undefined,
            "visualization/setSelectedYear"
          ),
        reset: () =>
          set({ state: DEFAULT_STATE }, undefined, "visualization/reset"),
      },
    }),
    { name: "visualization-store", enabled: process.env.NODE_ENV === "development" }
  )
);
```

3. **導出 Selector Hooks**

```typescript
export const useVisualizationState = () =>
  useVisualizationStore((s) => s.state);

export const useVisualizationActions = () =>
  useVisualizationStore((s) => s.actions);

export const useActiveTab = () =>
  useVisualizationStore((s) => s.state.activeTab);

export const useVisualizationMode = () =>
  useVisualizationStore((s) => s.state.mode);

export const useSelectedYear = () =>
  useVisualizationStore((s) => s.state.selectedYear);
```

#### 驗證標準

- [x] Store 正確匯出
- [x] Selector hooks 可正常使用
- [x] DevTools 顯示正確的 action 名稱（`visualization/setActiveTab` 等）
- [x] TypeScript 型別檢查通過
- [x] 預設值為 `legislator`, `amount`, `2025`

---

### 階段 2: 擴充 Helpers - 新增依部會聚合函式

**目標**: 實作依部會的資料轉換邏輯

**檔案**: `app/visualization/helpers.ts`

#### 實作步驟

1. **新增 `aggregateByDepartment` 函式**

```typescript
/**
 * 依部會聚合 proposals
 * 回傳每個部會的 NodeDatum，每個部會內包含該部會所有提案人
 *
 * @param data - GraphQL query 回傳的資料
 * @param mode - 'amount' 或 'count'
 * @returns NodeDatum[] - 每個元素代表一個部會
 */
export const aggregateByDepartment = (
  data: GetPaginatedProposalsQuery,
  mode: "amount" | "count"
): NodeDatum[] => {
  const proposals = data.proposals || [];

  // Step 1: 按 government.id 分組
  const departmentMap = new Map<
    string,
    {
      government: { id: string; name: string; category: string };
      proposals: typeof proposals;
    }
  >();

  proposals.forEach((proposal) => {
    const gov = proposal.government;
    if (!gov) return; // 跳過沒有 government 的資料

    if (!departmentMap.has(gov.id)) {
      departmentMap.set(gov.id, {
        government: gov,
        proposals: [],
      });
    }
    departmentMap.get(gov.id)!.proposals.push(proposal);
  });

  // Step 2: 轉換為 NodeDatum[]
  const result: NodeDatum[] = [];

  departmentMap.forEach(({ government, proposals }) => {
    const children = proposals.map((proposal) => {
      const proposer = proposal.proposers?.[0];
      const party = proposer?.party?.name ?? "無黨籍";
      
      // 根據 mode 計算 value
      let value: number;
      if (mode === "amount") {
        value = (proposal.freezeAmount || 0) + (proposal.reductionAmount || 0);
      } else {
        value = 1; // count mode: 每個 proposal 等權重
      }

      const displayValue = mode === "amount" ? value.toLocaleString() + "元" : "1案";
      const name = `${proposer?.name ?? "未知"}\n${party}\n${displayValue}`;
      const color = PARTY_COLORS.get(party) || DEFAULT_COLOR;

      return {
        name,
        value,
        color,
        isFrozen: !!proposal.freezeAmount,
        id: proposal.id,
        children: [],
      };
    });

    result.push({
      id: government.id,
      name: government.name,
      children,
    });
  });

  return result;
};
```

2. **更新 `transformToCirclePackData` 支援 mode 參數**

```typescript
export const transformToCirclePackData = (
  data: GetPaginatedProposalsQuery,
  mode: "amount" | "count" = "amount"  // 新增參數
): NodeDatum => {
  const children = data.proposals?.map((proposal) => {
    const { id, proposers, freezeAmount, reductionAmount } = proposal;
    const proposer = proposers?.[0];
    const party = proposer?.party?.name ?? "無黨籍";
    
    // 根據 mode 計算 value
    let value: number;
    if (mode === "amount") {
      value = (freezeAmount || 0) + (reductionAmount || 0);
    } else {
      value = 1; // count mode
    }

    const displayValue = mode === "amount" ? value.toLocaleString() + "元" : "1案";
    const name = `${proposer?.name}\n${party}\n${displayValue}`;
    const color = PARTY_COLORS.get(party) || DEFAULT_COLOR;

    return {
      name,
      value,
      color,
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

#### 驗證標準

- [x] `aggregateByDepartment` 函式正確匯出
- [x] 回傳型別為 `NodeDatum[]`
- [x] 每個部會的 `children` 包含該部會所有提案人
- [x] `mode="amount"` 時 value 為金額總和
- [x] `mode="count"` 時 value 為 1
- [x] 顏色對應政黨正確
- [x] `isFrozen` 正確判斷
- [x] TypeScript 型別檢查通過

---

### 階段 3: 更新 Visualization 主頁面

**目標**: 從 `useState` 遷移到 Zustand store

**檔案**: `app/visualization/index.tsx`

#### 實作步驟

1. **引入 Store Hooks**

```typescript
import {
  useVisualizationState,
  useVisualizationActions,
} from "~/stores/visualization.store";
import { aggregateByDepartment } from "./helpers";
```

2. **替換 useState 為 Store**

**Before** (行 32-34):
```typescript
const [activeTab, setActiveTab] = useState("legislator");
const [mode, setMode] = useState<"amount" | "count">("amount");
const [selectOptions, setSelectOptions] = useState<OptionType[]>(yearOptions);
```

**After**:
```typescript
// 使用 Zustand store
const { activeTab, mode, selectedYear } = useVisualizationState();
const { setActiveTab, setMode, setSelectedYear } = useVisualizationActions();

// Year selector 還需要 local state (因為 VisualizationSelector 的 API)
const [selectOptions, setSelectOptions] = useState<OptionType[]>(yearOptions);
```

3. **更新 Year Selector 的 onChange**

**修改行 159-164**:
```typescript
<VisualizationSelector
  options={yearOptions}
  value={selectOptions[0]}
  onChange={(option) => {
    if (option) {
      setSelectOptions([option]);
      setSelectedYear(option.value); // 同步到 Zustand store
    }
  }}
/>
```

4. **更新資料轉換邏輯**

**修改行 110-113**:
```typescript
const circlePackData = useMemo(() => {
  if (!data) return null;
  
  if (activeTab === "legislator") {
    return transformToCirclePackData(data, mode); // 傳入 mode 參數
  } else {
    return aggregateByDepartment(data, mode); // 依部會聚合
  }
}, [data, activeTab, mode]); // 加入依賴項
```

5. **更新渲染邏輯**

**修改行 225-228**:
```typescript
{activeTab === "legislator" && circlePackData && !Array.isArray(circlePackData) && (
  <CirclePackChart data={circlePackData} />
)}
{activeTab === "department" && circlePackData && Array.isArray(circlePackData) && (
  <DepartmentChart data={circlePackData} />
)}
```

#### 驗證標準

- [x] 移除所有 `useState` 管理的 `activeTab` 和 `mode`
- [x] 使用 Zustand store hooks
- [x] Year selector onChange 同步到 store
- [x] `circlePackData` 根據 `activeTab` 計算不同資料
- [x] 傳遞正確的 `mode` 參數
- [x] TypeScript 型別檢查通過
- [x] 無 console errors

---

### 階段 4: 更新 DepartmentChart 元件

**目標**: 接收真實資料並動態渲染

**檔案**: `app/visualization/department/index.tsx`

#### 實作步驟

1. **定義 Props 型別**

```typescript
import CirclePackChart from "../circle-pack-chart";
import type { NodeDatum } from "../helpers";

type DepartmentChartProps = {
  data: NodeDatum[]; // 每個元素代表一個部會
};
```

2. **移除 FAKE_DATA**

刪除行 2-39 的 `NodeDatum` 型別定義和 `FAKE_DATA`

3. **實作元件邏輯**

```typescript
const DepartmentChart = ({ data }: DepartmentChartProps) => {
  // 「全部」的聚合資料：合併所有部會的 children
  const allData: NodeDatum = {
    id: "all-departments",
    name: "root",
    children: data.flatMap((dept) => dept.children || []),
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      {/* 全部 */}
      <div className="flex flex-col items-center justify-center gap-y-5 font-bold">
        <p className="text-xl">全部</p>
        <CirclePackChart data={allData} />
      </div>

      {/* 各部會 */}
      {data.map((department) => (
        <div
          key={department.id}
          className="flex flex-col items-center justify-center gap-y-5 font-bold"
        >
          <p className="text-xl">{department.name}</p>
          <CirclePackChart data={department} />
        </div>
      ))}
    </div>
  );
};

export default DepartmentChart;
```

#### 驗證標準

- [x] `FAKE_DATA` 已移除
- [x] 接收 `data: NodeDatum[]` prop
- [x] 「全部」chart 正確聚合所有部會資料
- [x] 動態渲染每個部會的 chart
- [x] 每個 chart 顯示對應的部會名稱
- [x] TypeScript 型別檢查通過

---

### 階段 5: 測試與驗證

**目標**: 確保功能完整且無錯誤

#### 測試場景

**場景 1: 預設載入（依立委）**

1. 訪問 `/visualization`
2. 預期:
   - 顯示「依立委」按鈕為 active 狀態（藍色背景）
   - 顯示單一 CirclePackChart
   - 統計資料顯示正確
   - Mode 預設為「依金額」

**場景 2: 切換到依部會**

1. 點擊「依部會」按鈕
2. 預期:
   - 「依部會」按鈕變為 active 狀態
   - 顯示「全部」+ 多個部會的 chart
   - 每個 chart 顯示對應的部會名稱
   - 統計資料保持不變（因為底層資料相同）

**場景 3: 切換 Mode**

1. 在「依立委」模式下，選擇「依數量」
2. 預期:
   - Circle 大小改變（不再依金額，而是等權重）
   - 文字標籤顯示「1案」而非金額
3. 切換到「依部會」
4. 預期:
   - 「依數量」模式保持選中
   - 所有 circle 大小相同

**場景 4: 切換年度**

1. 選擇「113年度 (2024)」
2. 預期:
   - 資料重新載入
   - activeTab 和 mode 狀態保持不變
   - Chart 顯示 2024 年資料

**場景 5: 狀態持久化**

1. 切換到「依部會」+ 「依數量」
2. 導航到其他頁面
3. 返回 `/visualization`
4. 預期:
   - 狀態保持為「依部會」+ 「依數量」（因為使用 Zustand 全域 store）

#### 功能驗證清單

**基礎功能**:
- [ ] 預設顯示「依立委」模式
- [ ] 「依立委」按鈕可切換
- [ ] 「依部會」按鈕可切換
- [ ] Active 按鈕顯示正確樣式（藍色背景）
- [ ] Mode radio buttons 可切換
- [ ] Year selector 可切換

**資料正確性**:
- [ ] 「依立委」顯示單一 chart
- [ ] 「依部會」顯示「全部」+ 多個部會 chart
- [ ] 每個部會 chart 顯示正確的部會名稱
- [ ] Circle 顏色對應政黨
- [ ] `isFrozen` 顯示粉紅邊框
- [ ] 「依金額」模式顯示金額文字
- [ ] 「依數量」模式顯示「1案」文字

**程式碼品質**:
- [ ] 無 console errors/warnings
- [ ] 無 TypeScript errors
- [ ] 無 ESLint errors
- [ ] 所有 `FAKE_DATA` 已移除
- [ ] 無 `useState` 管理 `activeTab` 和 `mode`

---

## 驗證閘門

### 語法與型別檢查

```bash
# TypeScript 型別檢查
pnpm typecheck

# ESLint 檢查
pnpm lint
```

### 手動測試

```bash
# 啟動開發伺服器（如需要）
# pnpm dev

# 訪問 http://localhost:5173/visualization
# 執行上述測試場景
```

### 檢查點

1. **Store 建立正確**: 在 DevTools 中看到 `visualization-store`
2. **Actions 正確命名**: DevTools 顯示 `visualization/setActiveTab` 等
3. **資料聚合正確**: 「依部會」模式顯示多個部會
4. **無假資料**: `FAKE_DATA` 已從所有檔案中移除
5. **狀態同步**: activeTab/mode 改變時 UI 正確更新

---

## 技術決策

### 1. 為何使用 Zustand 而非 useState？

**決策**: 視覺化狀態（activeTab, mode, selectedYear）使用 Zustand 全域 store

**理由**:
- ✅ 符合專案 Zustand-first 準則（見 `.cursorrules`）
- ✅ 狀態持久化：切換頁面後返回保持狀態
- ✅ 未來擴展：其他頁面可能需要讀取/控制視覺化狀態
- ✅ DevTools 調試方便
- ✅ 避免 prop drilling

**替代方案（未採用）**: 
- Local `useState`: 不符合專案準則，無法跨頁面共享
- Context API: 專案規範明確指出「避免使用 Context 取代 Zustand」

### 2. 部會聚合回傳 Array vs Object？

**決策**: `aggregateByDepartment` 回傳 `NodeDatum[]`（陣列）

**理由**:
- ✅ 每個部會需要獨立渲染一個 chart
- ✅ 「全部」chart 在 `DepartmentChart` 內二次聚合
- ✅ 結構清晰，易於 map 渲染
- ✅ 避免巢狀過深的 `children` 結構

**替代方案（未採用）**: 
- 回傳單一 `NodeDatum` 包含所有部會為 `children`: 不符合 UI 需求（需要多個獨立 chart）

### 3. Mode 參數在哪裡處理？

**決策**: 在資料轉換函式 (`transformToCirclePackData`, `aggregateByDepartment`) 處理 `mode` 參數

**理由**:
- ✅ 資料轉換邏輯與 mode 緊密相關
- ✅ 避免在元件內計算，保持元件簡潔
- ✅ 函式可重用（未來其他頁面可能需要）
- ✅ `useMemo` 依賴 `mode`，自動觸發重算

### 4. Year State 管理

**決策**: Year 使用 local `useState` + 同步到 Zustand store

**理由**:
- ⚠️ `VisualizationSelector` 元件 API 需要 local state
- ✅ onChange 時同步到 store，保持一致性
- ✅ 避免修改 `VisualizationSelector` 元件（減少影響範圍）

**未來改進**: 可重構 `VisualizationSelector` 直接使用 store

---

## 潛在風險與緩解

### 風險 1: government 為 null

**風險**: 部分 proposals 可能沒有 `government` 資料

**緩解**:
- 在 `aggregateByDepartment` 中加入 `if (!gov) return;` 檢查
- 跳過沒有 government 的資料
- 記錄 warning（開發模式）

```typescript
if (!gov) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`Proposal ${proposal.id} has no government`);
  }
  return;
}
```

### 風險 2: 部會資料為空

**風險**: 選擇的年度可能某些部會無任何 proposals

**緩解**:
- `aggregateByDepartment` 自動過濾空部會（`proposals.length === 0`）
- 在 `DepartmentChart` 中顯示「無資料」訊息（若 `data.length === 0`）

```typescript
if (data.length === 0) {
  return <div>目前無部會資料</div>;
}
```

### 風險 3: 效能問題

**風險**: 資料量大時，聚合運算可能阻塞 UI

**緩解**:
- 使用 `useMemo` 避免重複計算
- React Query 快取避免重複請求
- 若資料量 > 10000 筆，考慮 Web Worker 處理聚合

### 風險 4: 狀態不同步

**風險**: Year 的 local state 與 Zustand store 不同步

**緩解**:
- 在 `onChange` 中明確同步 `setSelectedYear(option.value)`
- 使用 `useEffect` 同步初始值（如需要）

```typescript
useEffect(() => {
  if (selectOptions[0]?.value !== selectedYear) {
    setSelectedYear(selectOptions[0].value);
  }
}, [selectOptions, selectedYear, setSelectedYear]);
```

---

## 未來擴展

### 1. URL State Sync

將 Zustand state 同步到 URL query params

```typescript
// 範例
/visualization?tab=department&mode=count&year=2024
```

**優點**: 可分享連結、瀏覽器前後導航

**實作**: 使用 `useSearchParams` + `useEffect` 雙向同步

### 2. 立委詳情頁整合

在 `/visualization/legislator/:id` 頁面也使用相同 store

**複用**: 可直接讀取 `mode` 和 `selectedYear` 狀態

### 3. 部會詳情頁

新增 `/visualization/department/:id` 頁面

**需求**: 點擊部會 chart 中的 circle 導航到詳情頁

### 4. 比較模式

並排顯示兩個年度的 chart

**需求**: 調整 store 支援多個 year 選項

---

## 參考資源

### 官方文件

- [Zustand - Getting Started](https://zustand-demo.pmnd.rs/)
- [TanStack Query - Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [D3 Hierarchy - Pack](https://d3js.org/d3-hierarchy/pack)
- [TypeScript - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### 程式碼參考

- 全域 store: `app/stores/uiStore.ts`
- immer store: `app/stores/vote.store.ts`
- React Query 整合: `app/all-budgets/index.tsx`
- 資料轉換: `app/visualization/helpers.ts`

### 相關 PRPs

- 分頁實作: `PRPs/add-pagination.md`
- 篩選實作: `PRPs/by-department-selector.md`
- 視覺化資料: `PRPs/visualization-data.md`

---

## 成功標準

此 PRP 實作完成後應達成：

1. ✅ 視覺化頁面有「依立委」/「依部會」切換按鈕
2. ✅ 預設顯示「依立委」模式
3. ✅ 切換到「依部會」後顯示「全部」+ 多個部會 chart
4. ✅ Mode（依金額/依數量）切換正常運作
5. ✅ 使用 Zustand 管理 activeTab/mode/selectedYear
6. ✅ 所有 `FAKE_DATA` 已移除
7. ✅ 資料轉換邏輯支援 mode 參數
8. ✅ 無 TypeScript/ESLint 錯誤
9. ✅ 符合專案 Zustand 模式
10. ✅ 保持現有排版不變

---

## PRP 信心評分

**評分**: 9/10

**理由**:
- ✅ 技術棧完全熟悉（Zustand, React Query 已在專案廣泛使用）
- ✅ 有清晰的實作步驟和驗證標準
- ✅ 有現有程式碼可參考（uiStore.ts, vote.store.ts）
- ✅ UI 已存在，只需整合資料邏輯
- ✅ 資料結構清晰（government 欄位存在）
- ✅ 已有立委模式的轉換邏輯可參考
- ⚠️ 部會聚合邏輯略複雜（需仔細處理分組）
- ⚠️ 需注意 government 可能為 null 的情況

**降低風險**:
- 階段化實作，每階段有明確驗證標準
- 提供完整的函式簽名和實作範例
- 明確列出潛在風險與緩解措施
- 詳細的測試場景與驗證清單

---

## 實作順序總結

1. ✅ **建立 `visualization.store.ts`** - 提供狀態管理基礎
2. ✅ **擴充 `helpers.ts`** - 新增 `aggregateByDepartment` 函式
3. ✅ **更新 `visualization/index.tsx`** - 整合 store 和資料邏輯
4. ✅ **更新 `department/index.tsx`** - 接收真實資料並渲染
5. ✅ **測試與驗證** - 執行所有測試場景

**預估時間**: 2-3 小時（含測試）

**重要提醒**:
- 不要破壞現有邏輯
- 不要破壞現有排版
- 確保所有 TypeScript 型別正確
- 確保符合專案 Zustand 準則

---

**實作完成後請確認**:
- [ ] 所有階段的驗證標準都通過
- [ ] 所有測試場景都執行過
- [ ] `pnpm typecheck` 無錯誤
- [ ] `pnpm lint` 無錯誤
- [ ] DevTools 中看到 `visualization-store`
- [ ] 無 console errors

