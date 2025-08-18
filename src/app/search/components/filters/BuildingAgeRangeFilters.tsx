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
  currentSelectedFilters: AppliedFilterMap;
  setCurrentSelectedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
};

/**
 * Renders a dual range slider for filtering buildings by age, ranging between a 1900 and the current year.
 */
export default function BuildingAgeRangeFilters({
  currentSelectedFilters,
  setCurrentSelectedFilters,
}: Props): ReactElement {
  const startYear = 1900;
  const currentYear = new Date().getFullYear();

  const [rangeStartValue, setRangeStartValue] = useState<number>(startYear);
  const [rangeEndValue, setRangeEndValue] = useState<number>(currentYear);

  const handleChange = (range: { min: number; max: number }) => {
    if (range.min === startYear && range.max === currentYear) {
      setCurrentSelectedFilters((prev) => {
        const { year_built: removed, ...rest } = prev;
        return rest;
      });
    } else {
      setCurrentSelectedFilters((prev) => ({
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
    if (currentSelectedFilters?.year_built?.length > 0) {
      setRangeStartValue(
        currentSelectedFilters?.year_built?.[0]?.value as number
      );
      setRangeEndValue(
        currentSelectedFilters?.year_built?.[1]?.value as number
      );
    }
  }, []);

  useEffect(() => {
    if (currentSelectedFilters?.year_built?.length === 0) {
      setRangeStartValue(startYear);
      setRangeEndValue(currentYear);
    }
  }, [currentSelectedFilters?.year_built]);

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
    />
  );
}
