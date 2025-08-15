"use client";

import DualRangeSlider from "@/app/components/utils/DualRangeSlider";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { ReactElement, useContext, useEffect, useState } from "react";

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

  const [rangeStartValue, setRangeStartValue] = useState<number>(startYear);
  const [rangeEndValue, setRangeEndValue] = useState<number>(currentYear);

  const { appliedFiltersMap, setAppliedFiltersMap } = useContext(SearchContext);

  const handleChange = (range: { min: number; max: number }) => {
    if (range.min === startYear && range.max === currentYear) {
      setAppliedFiltersMap((prev) => {
        const { year_built: removed, ...rest } = prev;
        return rest;
      });
    } else {
      setAppliedFiltersMap((prev) => ({
        ...prev,
        year_built:
          range.min !== startYear || range.max !== currentYear
            ? [
                { fieldPath: "YEAR_BUILT", opStr: ">=", value: range.min },
                { fieldPath: "YEAR_BUILT", opStr: "<=", value: range.max },
              ]
            : [],
      }));
    }
  };

  // Initialize range inputs
  useEffect(() => {
    if (appliedFiltersMap?.year_built?.length > 0) {
      setRangeStartValue(appliedFiltersMap?.year_built?.[0]?.value as number);
      setRangeEndValue(appliedFiltersMap?.year_built?.[1]?.value as number);
    }
  }, []);

  useEffect(() => {
    if (appliedFiltersMap?.year_built?.length === 0) {
      setRangeStartValue(startYear);
      setRangeEndValue(currentYear);
    }
  }, [appliedFiltersMap?.year_built]);

  useEffect(() => {
    handleChange({ min: rangeStartValue, max: rangeEndValue });
  }, [rangeStartValue, rangeEndValue]);

  return (
    <DualRangeSlider
      title="Year built between"
      defaultSliderMin={startYear}
      defaultSliderMax={currentYear}
      rangeStartValue={rangeStartValue}
      setRangeStartValue={setRangeStartValue}
      rangeEndValue={rangeEndValue}
      setRangeEndValue={setRangeEndValue}
      disabled={disabled}
    />
  );
}
