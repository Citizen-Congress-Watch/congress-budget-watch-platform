export type BudgetProgressStage =
  | "government-proposed"
  | "committee-review"
  | "party-negotiation"
  | "plenary-decision"
  | "final-reviewed"
  | "presidential-promulgation";

export type DataProgress = "completed" | "in-progress";

export type ProgressMeta = {
  stage: BudgetProgressStage | null | undefined;
  index: number;
  percentage: number;
  label: string;
  isValid: boolean;
};
