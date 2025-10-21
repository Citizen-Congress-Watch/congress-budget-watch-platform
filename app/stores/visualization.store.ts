import { create } from "zustand";
import { devtools } from "zustand/middleware";

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

const DEFAULT_STATE: VisualizationState = {
  activeTab: "legislator", // 預設依立委
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
            false,
            "visualization/setActiveTab"
          ),
        setMode: (mode) =>
          set(
            (s) => ({ state: { ...s.state, mode } }),
            false,
            "visualization/setMode"
          ),
        setSelectedYear: (year) =>
          set(
            (s) => ({ state: { ...s.state, selectedYear: year } }),
            false,
            "visualization/setSelectedYear"
          ),
        reset: () =>
          set({ state: DEFAULT_STATE }, false, "visualization/reset"),
      },
    }),
    { name: "visualization-store", enabled: process.env.NODE_ENV === "development" }
  )
);

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
