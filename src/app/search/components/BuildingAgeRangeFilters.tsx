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

  const { setAppliedYearBuiltFilter } = useContext(SearchContext);

  return (
    <DualRangeSlider
      title="Year built between"
      sliderMin={startYear}
      sliderMax={currentYear}
      setMinValue={(val) =>
        setAppliedYearBuiltFilter((prev) => ({ ...prev, min: val }))
      }
      setMaxValue={(val) =>
        setAppliedYearBuiltFilter((prev) => ({ ...prev, max: val }))
      }
      disabled={disabled}
    />
  );
}
