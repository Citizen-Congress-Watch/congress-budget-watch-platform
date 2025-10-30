import Select, { type SingleValue } from "react-select";
import { useMemo } from "react";
import { DropdownIndicator } from "~/components/budgets-selector";
import { sortOptions } from "~/constants/options";
import { BRAND_PRIMARY } from "~/constants/colors";

type SortToolbarProps = {
  selectedValue: string;
  onChange: (value: string) => void;
};

const SortToolbar: React.FC<SortToolbarProps> = ({
  selectedValue,
  onChange,
}) => {
  const currentLabel = useMemo(
    () =>
      sortOptions.find((o) => o.value === selectedValue)?.label ??
      sortOptions[0].label,
    [selectedValue]
  );

  type SortOptionType = {
    value: string;
    label: string;
  };

  return (
    <div className="flex items-center justify-end pt-3">
      <span className="text-md">排序按照</span>
      <Select
        inputId="budget-sort-select"
        classNamePrefix="budget-sort"
        options={sortOptions.map((o) => ({ value: o.value, label: o.label }))}
        value={{ value: selectedValue, label: currentLabel }}
        onChange={(opt) => {
          const singleValue = opt as SingleValue<SortOptionType>;
          onChange(singleValue?.value ?? sortOptions[0].value);
        }}
        components={{ DropdownIndicator }}
        aria-label="選擇排序方式"
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent",
            fontWeight: "bold",
          }),
          indicatorSeparator: () => ({ display: "none" }),
          singleValue: (base) => ({
            ...base,
            color: BRAND_PRIMARY,
          }),
          option: (base, state) => ({
            ...base,
            color: state.isSelected ? BRAND_PRIMARY : base.color,
          }),
        }}
      />
    </div>
  );
};

export default SortToolbar;
