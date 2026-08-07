import { SortDirection } from "~/constants/enums";
import type { SelectOption } from "~/types/visualization";

type AmountSortField = "budgetAmount" | "freezeAmount" | "reductionAmount";

type AmountSortOption = {
  value: string;
  label: string;
  field: AmountSortField;
  direction: SortDirection;
};

export const sortOptions: AmountSortOption[] = [
  {
    value: "budget-amount-desc",
    label: "預算金額 (降序)",
    field: "budgetAmount",
    direction: SortDirection.DESC,
  },
  {
    value: "budget-amount-asc",
    label: "預算金額 (升序)",
    field: "budgetAmount",
    direction: SortDirection.ASC,
  },
  {
    value: "freeze-amount-desc",
    label: "凍結金額 (降序)",
    field: "freezeAmount",
    direction: SortDirection.DESC,
  },
  {
    value: "freeze-amount-asc",
    label: "凍結金額 (升序)",
    field: "freezeAmount",
    direction: SortDirection.ASC,
  },
  {
    value: "reduction-amount-desc",
    label: "減列金額 (降序)",
    field: "reductionAmount",
    direction: SortDirection.DESC,
  },
  {
    value: "reduction-amount-asc",
    label: "減列金額 (升序)",
    field: "reductionAmount",
    direction: SortDirection.ASC,
  },
];

export type SortOption = (typeof sortOptions)[number];

export const YEAR_OPTIONS: SelectOption[] = [
  { value: "115", label: "115年度 (2026)" },
  { value: "114", label: "114年度 (2025)" },
];

export const EMPTY_PROPOSAL_RESULT_VALUE = "__empty_result__";

export const proposalResultFilterOptions = [
  { value: "passed", label: "通過" },
  { value: "reserved", label: "保留" },
  { value: "withdrawn", label: "撤案" },
  { value: EMPTY_PROPOSAL_RESULT_VALUE, label: "待審議" },
];
