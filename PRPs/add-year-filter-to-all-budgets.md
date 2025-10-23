# PRP: Add Year Filter to All Budgets Page

## 1. Overview

This PRP outlines the implementation of a year-based filter on the "All Budgets" page (`/all-budgets`). The goal is to allow users to select a specific year from a dropdown menu, which will then filter the list of budget proposals to display only those from the selected year.

## 2. Rationale

Currently, the "All Budgets" page displays proposals from all years, making it difficult for users to find information for a specific fiscal year. Adding a year filter will significantly improve the user experience by providing a direct way to narrow down the dataset.

## 3. Implementation Blueprint

The implementation will be broken down into four main tasks.

### Task 1: Fetch Available Years

**Goal**: Create a new GraphQL query to fetch all unique years from the `Proposal` collection.

**File to Modify**: `app/queries/proposal.queries.ts`

**Pseudocode**:
```typescript
// In app/queries/proposal.queries.ts

// 1. Define a new GraphQL query string named GET_PROPOSAL_YEARS_QUERY.
//    This query should select the `year` field from the `proposals`.
//    To get unique years, we can process this on the client-side.
export const GET_PROPOSAL_YEARS_QUERY = graphql(`
  query GetProposalYears {
    proposals(orderBy: [{ year: desc }]) {
      year
    }
  }
`);

// 2. Add a new query key for this query in `proposalQueryKeys`.
export const proposalQueryKeys = {
  // ... existing keys
  years: () => [...proposalQueryKeys.all, "years"] as const,
};
```

### Task 2: State Management with Zustand

**Goal**: Extend the existing `budget-selector` Zustand store to manage the currently selected year.

**File to Modify**: `app/stores/budget-selector.tsx`

**Pseudocode**:
```typescript
// In app/stores/budget-selector.tsx

// 1. Add `selectedYear` to the state type definitions.
type BudgetSelectProps = {
  // ... existing props
  selectedYear: number | null; // Use null for "all years"
};

// 2. Add `selectedYear` to the default props.
const DEFAULT_PROPS: BudgetSelectProps = {
  // ... existing defaults
  selectedYear: null,
};

// 3. Add `setSelectedYear` action to the state.
type BudgetSelectState = BudgetSelectProps & {
  // ... existing actions
  setSelectedYear: (year: number | null) => void;
};

// 4. Implement the `setSelectedYear` action in the store creator.
export const createBudgetSelectStore = (
  initProps: Partial<BudgetSelectProps> = {}
) => {
  // ...
  return createStore<BudgetSelectState>()((set, _get) => ({
    // ... existing state and actions
    setSelectedYear: (year: number | null) =>
      set((state) => ({ ...state, selectedYear: year })),
  }));
};

// 5. Export a new selector hook and an action hook for the year filter.
export const useSelectedYear = () =>
  useStore(defaultBudgetSelectStore, (s) => s.selectedYear);

export const useSetSelectedYear = () =>
  useStore(defaultBudgetSelectStore, (s) => s.setSelectedYear);

```

### Task 3: Create Year Filter UI Component

**Goal**: Replace the static "進度總覽" text with a dynamic year filter dropdown menu.

**File to Modify**: `app/all-budgets/index.tsx`

**Component Choice**: We will use `react-select` to maintain consistency with other dropdowns in the project, such as the one in `SortToolbar`.

**Pseudocode**:
```tsx
// In app/all-budgets/index.tsx

// 1. Import the new query, hooks, and react-select.
import { GET_PROPOSAL_YEARS_QUERY, proposalQueryKeys } from "~/queries";
import { useSelectedYear, useSetSelectedYear } from "~/stores/budget-selector";
import Select from "react-select";

// Inside the AllBudgets component:
// 2. Fetch the list of available years.
const { data: yearsData } = useQuery({
  queryKey: proposalQueryKeys.years(),
  queryFn: () => execute(GET_PROPOSAL_YEARS_QUERY),
});

// 3. Process the years data to get a unique, sorted list for the dropdown.
const yearOptions = useMemo(() => {
  if (!yearsData?.proposals) return [];
  const years = yearsData.proposals.map(p => p.year).filter(Boolean);
  const uniqueYears = [...new Set(years)].sort((a, b) => b - a); // Descending
  return [
    { value: null, label: "全部年份" },
    ...uniqueYears.map(year => ({ value: year, label: `${year}年` }))
  ];
}, [yearsData]);

// 4. Get the selected year and the setter from Zustand.
const selectedYear = useSelectedYear();
const setSelectedYear = useSetSelectedYear();

// 5. Find the selected option object for react-select.
const selectedOption = useMemo(
    () => yearOptions.find(option => option.value === selectedYear),
    [yearOptions, selectedYear]
);


// 6. In the JSX, find the div at line 197 and 219.
//    Replace the static div with the react-select component.
//    (This will need to be done for both desktop and mobile views)

{/* Desktop view example (around line 196) */}
<div className="relative mb-5 hidden items-center justify-start border-b-[2px] border-black md:flex">
    <Select
        value={selectedOption}
        onChange={(option) => setSelectedYear(option?.value ?? null)}
        options={yearOptions}
        className="w-40" // Add appropriate styling
        placeholder="選擇年份"
    />
    {/* ... rest of the elements in this div ... */}
</div>

{/* Mobile view example (around line 218) */}
<div className="mb-5 flex items-center justify-center border-b-[2px] border-black md:hidden">
    <Select
        value={selectedOption}
        onChange={(option) => setSelectedYear(option?.value ?? null)}
        options={yearOptions}
        className="w-40" // Add appropriate styling
        placeholder="選擇年份"
    />
</div>
```

### Task 4: Integrate Filter into Main Query

**Goal**: Modify the `whereFilter` logic to include the `selectedYear` when querying for proposals.

**File to Modify**: `app/all-budgets/index.tsx`

**Pseudocode**:
```tsx
// In app/all-budgets/index.tsx, inside the AllBudgets component:

// 1. Get selectedYear from the store (already done in Task 3).
const selectedYear = useSelectedYear();

// 2. Modify the `useMemo` for `whereFilter` (around line 76).
const whereFilter = useMemo((): ProposalWhereInput => {
  const filters: ProposalWhereInput = {};
  
  // ... existing filter logic for department, person, search ...

  // Add the year filter if a year is selected.
  if (selectedYear) {
    filters.year = { equals: selectedYear };
  }

  return filters;
}, [departmentId, personId, debouncedSearchedValue, selectedYear]); // <-- Add selectedYear to dependency array

// 3. Modify the main proposals queryKey to include selectedYear.
const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: proposalQueryKeys.paginated(
      currentPage,
      pageSize,
      selectedSort,
      whereFilter, // whereFilter now includes the year
      selectedYear // Explicitly add year to the key for clarity
    ),
    // ... queryFn remains the same
});

// 4. Add `selectedYear` to the dependency array of the `useEffect` that resets the page number.
useEffect(() => {
  setPage(1);
}, [selectedSort, departmentId, personId, debouncedSearchedValue, selectedYear, setPage]); // <-- Add selectedYear
```

## 4. Validation

After implementation, the following must be true:

1.  **UI**: The "All Budgets" page displays a dropdown menu with a list of years and an "All Years" option.
2.  **Functionality**:
    *   By default, "All Years" is selected, and the budget list is unfiltered by year.
    *   Selecting a specific year from the dropdown re-queries the data and displays only proposals from that year.
    *   The pagination resets to page 1 whenever the selected year is changed.
    *   The year filter works in conjunction with all other existing filters (search, department, legislator).

### Post-Implementation Validation Command

After all code changes are complete, run the following command to regenerate types and perform a type check. This ensures that all changes are type-safe.

```bash
pnpm run typecheck
```

## 5. References

*   **Zustand Documentation**: [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)
*   **TanStack Query (React Query) Documentation**: [https://tanstack.com/query/latest/docs/react/overview](https://tanstack.com/query/latest/docs/react/overview)
*   **React-Select Documentation**: [https://react-select.com/home](https://react-select.com/home)
*   **Internal Pattern Reference**:
    *   `app/all-budgets/index.tsx` for `useQuery` with filtering.
    *   `app/stores/budget-selector.tsx` for Zustand store structure.
    *   `app/components/sort-toolbar.tsx` for `react-select` usage.

---
**Confidence Score**: 9/10 - The plan is straightforward and aligns well with the existing architecture. The required changes are localized and follow established patterns within the codebase.
