"use client";

import DualRangeSlider from "@/app/components/utils/DualRangeSlider";
import { AppliedFilterMap } from "@/app/types/global";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Props = {
  appliedFilters: AppliedFilterMap;
  setCurrentSelectedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

/**
 * Renders a dual range slider for filtering buildings by age, ranging between a 1800 and the current year.
 */
export default function BuildingAgeRangeFilters({
  appliedFilters,
  setCurrentSelectedFilters,
  setIsValid,
}: Props): ReactElement {
  const startYear = 1800;
  const currentYear = new Date().getFullYear();

  const [rangeStartValue, setRangeStartValue] = useState<number>(startYear);
  const [rangeEndValue, setRangeEndValue] = useState<number>(currentYear);

  const handleChange = (range: { min: number; max: number }) => {
    if (range.min === startYear && range.max === currentYear) {
      setCurrentSelectedFilters((prev) => {
        const { YEAR_BUILT: removed, ...rest } = prev;
        return rest;
      });
    } else {
      setCurrentSelectedFilters((prev) => ({
        ...prev,
        YEAR_BUILT:
          range.min !== startYear || range.max !== currentYear
            ? [
                { fieldPath: "YEAR_BUILT", opStr: ">=", value: range.min },
                { fieldPath: "YEAR_BUILT", opStr: "<=", value: range.max },
              ]
            : [],
      }));
    }
  };

  useEffect(() => {
    // Initialize range inputs from applied filters
    if (appliedFilters?.YEAR_BUILT?.length > 0) {
      setRangeStartValue(appliedFilters?.YEAR_BUILT?.[0]?.value as number);
      setRangeEndValue(appliedFilters?.YEAR_BUILT?.[1]?.value as number);
    } else {
      setRangeStartValue(startYear);
      setRangeEndValue(currentYear);
    }
  }, [appliedFilters?.YEAR_BUILT]);

  useEffect(
    () => handleChange({ min: rangeStartValue, max: rangeEndValue }),
    [rangeStartValue, rangeEndValue]
  );

  return (
    <DualRangeSlider
      title="Year built between"
      defaultSliderMin={startYear}
      defaultSliderMax={currentYear}
      rangeStartValue={rangeStartValue}
      setRangeStartValue={setRangeStartValue}
      rangeEndValue={rangeEndValue}
      setRangeEndValue={setRangeEndValue}
      setIsValid={setIsValid}
    />
  );
}
