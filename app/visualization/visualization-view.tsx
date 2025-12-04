import Select, { type SingleValue } from "react-select";
import BudgetTypeLegend from "~/components/budget-type-legend";
import BudgetDetailSkeleton from "~/components/skeleton/budget-detail-skeleton";
import { BUDGET_TYPE_LEGEND_ITEMS } from "~/constants/legends";
import type { SelectOption } from "~/types/visualization";
import SummaryPanel from "./components/SummaryPanel";
import { DesktopControls, MobileControls } from "./controls";
import { DepartmentVisualization } from "./department";
import type { VisualizationViewProps } from "./types";

const VisualizationView = ({
  activeTab,
  onTabChange,
  yearOptions,
  selectedYear,
  onYearChange,
  mode,
  onModeChange,
  isShowingAll,
  onToggleShowAll,
  legislatorOptions,
  selectedLegislatorOption,
  onLegislatorChange,
  departmentOptions,
  selectedDepartmentOption,
  onDepartmentChange,
  isDesktop,
  isLoading,
  chartContainerRef,
  chartWidth,
  chartHeight,
  visualizationData,
  legislatorVisualizationData,
  legislatorSummary,
  departmentSummary,
  legislatorPadding,
  selectedDepartmentCategorizedData,
  selectedDepartmentTitle,
  showSelectedDepartmentChart,
  onNodeClick,
}: VisualizationViewProps) => {
  return (
    <div>
      <div className="flex flex-col gap-y-3 p-4">
        <DesktopControls
          activeTab={activeTab}
          onTabChange={onTabChange}
          yearOptions={yearOptions}
          selectedYear={selectedYear}
          onYearChange={onYearChange}
        />
        <MobileControls
          activeTab={activeTab}
          onTabChange={onTabChange}
          yearOptions={yearOptions}
          selectedYear={selectedYear}
          onYearChange={onYearChange}
          isShowingAll={isShowingAll}
          onToggleShowAll={onToggleShowAll}
          legislatorOptions={legislatorOptions}
          selectedLegislator={selectedLegislatorOption}
          onLegislatorChange={onLegislatorChange}
          departmentOptions={departmentOptions}
          selectedDepartment={selectedDepartmentOption}
          onDepartmentChange={onDepartmentChange}
        />

        <div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-x-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="viz-mode"
                value="amount"
                checked={mode === "amount"}
                onChange={() => onModeChange("amount")}
                className="accent-brand-primary h-4 w-4"
              />
              <span>依金額（刪減/凍結）</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="viz-mode"
                value="count"
                checked={mode === "count"}
                onChange={() => onModeChange("count")}
                className="accent-brand-primary h-4 w-4"
              />
              <span>依數量（凍結案/刪減案/建議案）</span>
            </label>
          </div>
        </div>

        <SummaryPanel
          summary={
            activeTab === "legislator" ? legislatorSummary : departmentSummary
          }
        />

        {isDesktop && activeTab === "department" && (
          <div className="mt-4 flex w-full justify-center">
            {departmentOptions.length > 0 ? (
              <Select
                className="w-full md:max-w-xl"
                value={selectedDepartmentOption}
                options={departmentOptions}
                onChange={(option) => {
                  const singleValue = option as SingleValue<SelectOption>;
                  onDepartmentChange(singleValue ?? null);
                }}
                placeholder="選擇部會"
                isSearchable
                aria-label="選擇部會"
                inputId="visualization-department-desktop"
              />
            ) : (
              <p className="text-center text-sm text-gray-500">
                目前沒有部會資料
              </p>
            )}
          </div>
        )}

        <BudgetTypeLegend items={BUDGET_TYPE_LEGEND_ITEMS} />

        {isLoading && <BudgetDetailSkeleton isDesktop={isDesktop} />}

        <div ref={chartContainerRef} className="chart-container">
          {activeTab === "legislator" && legislatorVisualizationData && (
            <DepartmentVisualization
              data={visualizationData}
              transformedData={legislatorVisualizationData}
              padding={legislatorPadding}
              onNodeClick={onNodeClick}
              width={chartWidth}
              height={chartHeight}
              mode={mode}
            />
          )}
          {activeTab === "department" && (
            <div className="w-full">
              <div className="aspect-video md:aspect-video lg:aspect-video">
                <DepartmentVisualization
                  data={visualizationData}
                  onNodeClick={onNodeClick}
                  width={chartWidth}
                  height={chartHeight}
                  mode={mode}
                  selectedDepartmentCategorizedData={
                    selectedDepartmentCategorizedData
                  }
                  selectedDepartmentTitle={selectedDepartmentTitle ?? null}
                  showSelectedDepartmentChart={showSelectedDepartmentChart}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualizationView;
