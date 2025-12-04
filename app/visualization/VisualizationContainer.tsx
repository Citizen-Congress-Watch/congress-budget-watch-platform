import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import VisualizationSkeleton from "~/components/skeleton/visualization-skeleton";
import {
  BUDGET_BY_LEGISLATOR_URL,
  BUDGET_BY_DEPARTMENT_URL,
} from "~/config/budget-endpoints";
import useChartDimensions from "~/hooks/useChartDimensions";
import { budgetByDepartmentSchema } from "~/types/budget-by-department.schema";
import { budgetByLegislatorSchema } from "~/types/budget-by-legislator.schema";
import type { CirclePackPadding } from "./circle-pack-types";
import type { SummaryPanelSummary } from "./components/SummaryPanel";
import { formatAmountWithUnit, type NodeDatum } from "./helpers";
import { useVisualizationState } from "./use-visualization-state";
import type { VisualizationViewProps } from "./types";

const VisualizationContainer = ({
  children,
}: {
  children: (props: VisualizationViewProps) => React.ReactNode;
}) => {
  const {
    ref: chartContainerRef,
    width: chartWidth,
    height: chartHeight,
  } = useChartDimensions();
  const navigate = useNavigate();

  const {
    activeTab,
    handleTabChange,
    mode,
    setMode,
    selectedYear,
    handleYearChange,
    yearOptions,
    legislatorOptions,
    selectedLegislatorOption,
    handleLegislatorChange,
    departmentOptions,
    selectedDepartmentOption,
    handleDepartmentChange,
    handleToggleShowAll,
    isShowingAll,
    isDesktop,
    isLoading,
    isError,
    visualizationData,
    legislatorVisualizationData,
    selectedDepartmentCategorizedData,
  } = useVisualizationState();

  const legislatorBudgetQueryKey = [
    "budget",
    "legislators",
    selectedLegislatorOption?.value ?? "all",
  ];
  const fetchLegislatorBudget = async () => {
    const response = await fetch(BUDGET_BY_LEGISLATOR_URL);
    if (!response.ok) {
      throw new Error("無法載入立委預算資料");
    }
    return budgetByLegislatorSchema.parse(await response.json());
  };

  const fetchDepartmentBudget = async () => {
    const response = await fetch(BUDGET_BY_DEPARTMENT_URL);
    if (!response.ok) {
      throw new Error("無法載入部會預算資料");
    }
    return budgetByDepartmentSchema.parse(await response.json());
  };
  const { data: legislatorBudgetSummaryData } = useQuery({
    queryKey: legislatorBudgetQueryKey,
    queryFn: fetchLegislatorBudget,
    enabled: activeTab === "legislator",
  });
  const departmentBudgetQueryKey = ["budget", "departments"];
  const { data: departmentBudgetSummaryData } = useQuery({
    queryKey: departmentBudgetQueryKey,
    queryFn: fetchDepartmentBudget,
    enabled: activeTab === "department",
  });
  const legislatorSummary = useMemo<SummaryPanelSummary>(() => {
    const overall = legislatorBudgetSummaryData?.[0]?.overall;
    const reductionAmount = overall?.reductionAmount ?? 0;
    const freezeAmount = overall?.freezeAmount ?? 0;
    return {
      formattedReductionAmount: formatAmountWithUnit(reductionAmount),
      formattedFreezeAmount: formatAmountWithUnit(freezeAmount),
      reductionCount: overall?.reductionCount ?? 0,
      freezeCount: overall?.freezeCount ?? 0,
      mainResolutionCount: overall?.otherCount ?? 0,
    };
  }, [legislatorBudgetSummaryData]);

  const departmentSummary = useMemo<SummaryPanelSummary>(() => {
    const overall = departmentBudgetSummaryData?.[0]?.overall;
    const reductionAmount = overall?.reductionAmount ?? 0;
    const freezeAmount = overall?.freezeAmount ?? 0;
    return {
      formattedReductionAmount: formatAmountWithUnit(reductionAmount),
      formattedFreezeAmount: formatAmountWithUnit(freezeAmount),
      reductionCount: overall?.reductionCount ?? 0,
      freezeCount: overall?.freezeCount ?? 0,
      mainResolutionCount: overall?.otherCount ?? 0,
    };
  }, [departmentBudgetSummaryData]);

  const legislatorPadding = useMemo<CirclePackPadding | undefined>(() => {
    if (mode !== "amount") return undefined;
    return (node) => {
      if (!node.children?.length) {
        return 10;
      }
      if (node.depth === 0) {
        return 20;
      }
      if (node.depth === 1) {
        return 36;
      }
      return 18;
    };
  }, [mode]);

  const handleNodeClick = useCallback(
    (node: NodeDatum) => {
      if (node.proposalId) {
        navigate(`/budget/${node.proposalId}`);
        return true;
      }
      if (node.proposerId && !node.children?.length) {
        navigate(`/visualization/legislator/${node.proposerId}`);
        return true;
      }
      return false;
    },
    [navigate]
  );

  if (isLoading) {
    return <VisualizationSkeleton isDesktop={isDesktop} />;
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-600">資料載入失敗，請稍後再試。</p>
      </div>
    );
  }

  if (!visualizationData) {
    return null;
  }

  if (!React.isValidElement<VisualizationViewProps>(children)) {
    return null;
  }
  return children({
    activeTab: activeTab,
    onTabChange: handleTabChange,
    yearOptions: yearOptions,
    selectedYear: selectedYear,
    onYearChange: handleYearChange,
    mode: mode,
    onModeChange: setMode,
    isShowingAll: isShowingAll,
    onToggleShowAll: handleToggleShowAll,
    legislatorOptions: legislatorOptions,
    selectedLegislatorOption: selectedLegislatorOption,
    onLegislatorChange: handleLegislatorChange,
    departmentOptions: departmentOptions,
    selectedDepartmentOption: selectedDepartmentOption,
    onDepartmentChange: handleDepartmentChange,
    isDesktop: isDesktop,
    isLoading: isLoading,
    chartContainerRef: chartContainerRef,
    chartWidth: chartWidth,
    chartHeight: chartHeight,
    visualizationData: visualizationData,
    legislatorVisualizationData: legislatorVisualizationData,
    legislatorSummary: legislatorSummary,
    departmentSummary: departmentSummary,
    legislatorPadding: legislatorPadding,
    selectedDepartmentCategorizedData: selectedDepartmentCategorizedData,
    selectedDepartmentTitle: selectedDepartmentOption?.label ?? null,
    showSelectedDepartmentChart: Boolean(selectedDepartmentCategorizedData),
    onNodeClick: handleNodeClick,
  });
};

export default VisualizationContainer;
