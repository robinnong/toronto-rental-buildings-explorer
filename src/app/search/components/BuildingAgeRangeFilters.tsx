"use client";

import DualRangeSlider from "@/app/components/utils/DualRangeSlider";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { ReactElement, useContext } from "react";

type Props = {
  disabled: boolean;
};

/**
 * Renders a dual range slider for filtering buildings by age, ranging between a 1900 and the current year.
 *
 * @param {boolean} disabled - Whether the filters are disabled
 */
export default function BuildingAgeRangeFilters({
  disabled,
}: Props): ReactElement {
  const startYear = 1900;
  const currentYear = new Date().getFullYear();

  const { setAppliedFiltersMap } = useContext(SearchContext);

  const handleChange = (range: { min: number; max: number }) => {
    setAppliedFiltersMap((prev) => ({
      ...prev,
      "year-built": [
        { fieldPath: "YEAR_BUILT", opStr: ">=", value: range.min },
        { fieldPath: "YEAR_BUILT", opStr: "<=", value: range.max },
      ],
    }));
  };

  return (
    <DualRangeSlider
      title="Year built between"
      sliderMin={startYear}
      sliderMax={currentYear}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}
