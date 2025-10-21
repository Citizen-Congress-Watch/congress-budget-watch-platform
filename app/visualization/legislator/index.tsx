import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { sumBy, filter } from "lodash";
import SessionChart from "./session-chart";
import BudgetTypeLegend from "~/components/budget-type-legend";
import { BUDGET_TYPE_LEGEND_ITEMS } from "~/constants/legends";
import {
  GET_PAGINATED_PROPOSALS_QUERY,
  proposalQueryKeys,
} from "~/queries/proposal.queries";
import { execute } from "~/graphql/execute";
import { OrderDirection, type ProposalWhereInput } from "~/graphql/graphql";
import { transformToGroupedSessionData } from "../helpers";

const VisualizationLegislator = () => {
  const [selectedType, setSelectedType] = useState<
    "proposal" | "proposal-cosign"
  >("proposal");
  const [mode, setMode] = useState<"amount" | "count">("amount");

  const proposerId = "665"; // This can be dynamic
  const year = 2025; // This can be dynamic

  const whereFilter = useMemo((): ProposalWhereInput => {
    return {
      AND: [
        {
          proposers: {
            every: {
              id: {
                equals: proposerId,
              },
            },
          },
        }
      ],
    };
  }, [proposerId, year]);

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

  // 轉換資料供 SessionChart 使用
  const sessionData = useMemo(() => {
    if (!proposalsData) return [];
    console.log("proposalsData", proposalsData);
    return transformToGroupedSessionData(proposalsData, mode);
  }, [proposalsData, mode]);
  console.log("sessionData", sessionData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const proposals = proposalsData?.proposals || [];
  const totalReductionAmount = sumBy(proposals, (p) => p.reductionAmount || 0);
  const totalFreezeAmount = sumBy(proposals, (p) => p.freezeAmount || 0);
  const reductionProposalsCount = filter(
    proposals,
    (p) => p.reductionAmount
  ).length;
  const freezeProposalsCount = filter(proposals, (p) => p.freezeAmount).length;
  const mainResolutionCount = filter(
    proposals,
    (p) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      p.proposalTypes?.includes("other" as any)
  ).length;

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-3 md:mx-auto md:max-w-[800px]">
        <Link to="/visualization">{"<"} 回到視覺化主頁</Link>
        <div className="mt-4 flex flex-col items-center justify-center gap-y-2">
          <p>徐巧芯</p>
          <p>中國國民黨</p>
          <p>第OO-OO屆立法委員</p>
        </div>
        {/* buttons for selected type */}
        <div className="mt-6 flex items-center gap-x-4">
          <button
            className={`rounded border-2 border-black px-2.5 ${
              selectedType === "proposal" ? "bg-[#3E51FF] text-white" : ""
            }`}
            onClick={() => setSelectedType("proposal")}
          >
            提案
          </button>
          <button
            className={`rounded border-2 border-black px-2.5 ${
              selectedType === "proposal-cosign"
                ? "bg-[#3E51FF] text-white"
                : ""
            }`}
            onClick={() => setSelectedType("proposal-cosign")}
          >
            提案＋連署
          </button>
        </div>
        {/* radio buttons for sort by */}
        <div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="viz-mode"
                value="amount"
                checked={mode === "amount"}
                onChange={() => setMode("amount")}
                className="h-4 w-4 accent-[#3E51FF]"
              />
              <span>依金額（刪減/凍結）</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="viz-mode"
                value="count"
                checked={mode === "count"}
                onChange={() => setMode("count")}
                className="h-4 w-4 accent-[#3E51FF]"
              />
              <span>依數量（凍結案/刪減案/建議案）</span>
            </label>
          </div>
        </div>
        {/* statistics */}
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border-2 p-2.5">
          <p>
            總共刪減{" "}
            <span className="text-[#E9808E]">
              {totalReductionAmount.toLocaleString()}
            </span>
            元（
            <span className="text-[#E9808E]">{reductionProposalsCount}</span>
            個提案）
          </p>
          <p>
            凍結{" "}
            <span className="text-[#E9808E]">
              {totalFreezeAmount.toLocaleString()}
            </span>
            元（
            <span className="text-[#E9808E]">{freezeProposalsCount}</span>
            個提案）
          </p>
          <p>
            主決議提案數：{" "}
            <span className="text-[#E9808E]">{mainResolutionCount}</span>個
          </p>
        </div>
        <div className="mt-6">
          <BudgetTypeLegend items={BUDGET_TYPE_LEGEND_ITEMS} />
        </div>
        {/* session chart */}
        <SessionChart data={sessionData}/>
      </div>
    </div>
  );
};

export default VisualizationLegislator;
