import { useMemo } from "react";
import type { GetPaginatedProposalsQuery } from "~/graphql/graphql";
import { transformToCategorizedData, type NodeDatum } from "../helpers";
import CirclePackChart from "../circle-pack-chart";

type DepartmentVisualizationProps = {
  data: GetPaginatedProposalsQuery;
  width?: number;
  onNodeClick: (node: NodeDatum) => void;
};

export const DepartmentVisualization = ({
  data,
  width = 928,
  onNodeClick,
}: DepartmentVisualizationProps) => {
  const categorizedData = useMemo(() => transformToCategorizedData(data), [data]);

  const categories = Object.keys(categorizedData);

  if (categories.length === 0) {
    return (
      <div
        className="flex h-96 items-center justify-center text-gray-500"
        style={{ width }}
      >
        無符合資料
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      {Object.entries(categorizedData).map(([category, chartData]) => (
        <div
          key={category}
          className="flex w-full flex-col items-center justify-center gap-y-5 font-bold"
        >
          <p className="text-xl">{category}</p>
          {chartData.children && chartData.children.length > 0 ? (
            <CirclePackChart
              data={chartData}
              width={width}
              height={width}
              onNodeClick={onNodeClick}
            />
          ) : (
            <div
              className="flex h-48 items-center justify-center text-gray-400"
              style={{ width }}
            >
              此類別無提案金額資料
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
