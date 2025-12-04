import type { RefCallback } from "react";
import type {
  SelectOption,
  VisualizationMode,
  VisualizationTab,
} from "~/types/visualization";
import type { SummaryPanelSummary } from "../components/SummaryPanel";
import type { CirclePackPadding } from "../circle-pack-chart";
import type { GetVisualizationProposalsQuery } from "~/graphql/graphql";
import type { NodeDatum, VisualizationGroupedData } from "../helpers";

export type VisualizationViewProps = {
  activeTab: VisualizationTab;
  onTabChange: (tab: VisualizationTab) => void;
  yearOptions: SelectOption[];
  selectedYear: SelectOption;
  onYearChange: (option: SelectOption) => void;
  mode: VisualizationMode;
  onModeChange: (mode: VisualizationMode) => void;
  isShowingAll: boolean;
  onToggleShowAll: () => void;
  legislatorOptions: SelectOption[];
  selectedLegislatorOption: SelectOption | null;
  onLegislatorChange: (option: SelectOption | null) => void;
  departmentOptions: SelectOption[];
  selectedDepartmentOption: SelectOption | null;
  onDepartmentChange: (option: SelectOption | null) => void;
  isDesktop: boolean;
  isLoading: boolean;
  chartContainerRef: RefCallback<HTMLDivElement>;
  chartWidth: number;
  chartHeight: number;
  visualizationData: GetVisualizationProposalsQuery;
  legislatorVisualizationData: VisualizationGroupedData | null;
  legislatorSummary: SummaryPanelSummary;
  departmentSummary: SummaryPanelSummary;
  legislatorPadding?: CirclePackPadding;
  selectedDepartmentCategorizedData: Record<string, NodeDatum> | null;
  selectedDepartmentTitle?: string | null;
  showSelectedDepartmentChart: boolean;
  onNodeClick: (node: NodeDatum) => void;
};
