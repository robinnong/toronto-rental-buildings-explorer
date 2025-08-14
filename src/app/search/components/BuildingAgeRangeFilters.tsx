"use client";

import DualRangeSlider from "@/app/components/utils/DualRangeSlider";
import { SearchContext } from "@/app/hooks/useSearchContext";
import {
  ReactElement,
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
    setAppliedFiltersMap((prev) => ({
      ...prev,
      "year-built":
        range.min !== startYear || range.max !== currentYear
          ? [
              { fieldPath: "YEAR_BUILT", opStr: ">=", value: range.min },
              { fieldPath: "YEAR_BUILT", opStr: "<=", value: range.max },
            ]
          : [],
    }));
  };

  useEffect(() => {
    if (appliedFiltersMap?.["year-built"].length === 0) {
      setRangeStartValue(startYear);
      setRangeEndValue(currentYear);
    } else if (appliedFiltersMap?.["year-built"]?.length > 0) {
      setRangeStartValue(
        appliedFiltersMap?.["year-built"]?.[0]?.value as number
      );
      setRangeEndValue(appliedFiltersMap?.["year-built"]?.[1]?.value as number);
    }
  }, [appliedFiltersMap?.["year-built"]]);

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
