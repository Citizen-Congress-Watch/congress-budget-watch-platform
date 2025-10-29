import type { BudgetProgressStage, DataProgress } from "~/types/progress";

export type { BudgetProgressStage, DataProgress };

export const BUDGET_PROGRESS_STAGES = {
  GOVERNMENT_PROPOSED: "government-proposed",
  COMMITTEE_REVIEW: "committee-review",
  PARTY_NEGOTIATION: "party-negotiation",
  PLENARY_DECISION: "plenary-decision",
  FINAL_REVIEWED: "final-reviewed",
  PRESIDENTIAL_PROMULGATION: "presidential-promulgation",
} as const satisfies Record<string, BudgetProgressStage>;

export const PROGRESS_STAGE_LABELS: Record<BudgetProgressStage, string> = {
  [BUDGET_PROGRESS_STAGES.GOVERNMENT_PROPOSED]: "中央政府提出預算",
  [BUDGET_PROGRESS_STAGES.COMMITTEE_REVIEW]: "立法院委員會審議",
  [BUDGET_PROGRESS_STAGES.PARTY_NEGOTIATION]: "黨團協商",
  [BUDGET_PROGRESS_STAGES.PLENARY_DECISION]: "院會決議",
  [BUDGET_PROGRESS_STAGES.FINAL_REVIEWED]: "預算三讀通過",
  [BUDGET_PROGRESS_STAGES.PRESIDENTIAL_PROMULGATION]: "預算總統公布",
};

export const PROGRESS_STAGE_ORDER: BudgetProgressStage[] = [
  BUDGET_PROGRESS_STAGES.GOVERNMENT_PROPOSED,
  BUDGET_PROGRESS_STAGES.COMMITTEE_REVIEW,
  BUDGET_PROGRESS_STAGES.PARTY_NEGOTIATION,
  BUDGET_PROGRESS_STAGES.PLENARY_DECISION,
  BUDGET_PROGRESS_STAGES.FINAL_REVIEWED,
  BUDGET_PROGRESS_STAGES.PRESIDENTIAL_PROMULGATION,
];

export const DATA_PROGRESS_LABELS: Record<DataProgress, string> = {
  completed: "完成",
  "in-progress": "審議中",
};
