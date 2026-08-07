type ProposalBudgetAmountSource = {
  cost?: number | null;
  budget?: {
    budgetAmount?: number | null;
  } | null;
};

export function getProposalBudgetAmount(
  proposal: ProposalBudgetAmountSource
): number | null {
  if (proposal.budget) {
    return proposal.budget.budgetAmount ?? null;
  }

  return proposal.cost ?? null;
}
