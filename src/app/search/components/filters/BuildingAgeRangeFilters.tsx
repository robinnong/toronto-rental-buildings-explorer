"use client";

import DualRangeSlider from "@/app/components/utils/DualRangeSlider";
import { YearBuiltFilter } from "@/app/types/global";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Props = {
  appliedYearBuiltFilter: YearBuiltFilter;
  setCurrentSelectedYearBuiltFilter: Dispatch<SetStateAction<YearBuiltFilter>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

/**
 * Renders a dual range slider for filtering buildings by age, ranging between a 1800 and the current year.
 */
export default function BuildingAgeRangeFilters({
  appliedYearBuiltFilter,
  setCurrentSelectedYearBuiltFilter,
  setIsValid,
}: Props): ReactElement {
  const startYear = 1800;
  const currentYear = new Date().getFullYear();

  const [rangeStartValue, setRangeStartValue] = useState<number>(startYear);
  const [rangeEndValue, setRangeEndValue] = useState<number>(currentYear);

  // Initialize range inputs from applied filters
  useEffect(() => {
    setRangeStartValue(appliedYearBuiltFilter?.start || startYear);
    setRangeEndValue(appliedYearBuiltFilter?.end || currentYear);
  }, []);

  // Update the current year built filters when range inputs change
  useEffect(() => {
    if (rangeStartValue === startYear && rangeEndValue === currentYear) {
      setCurrentSelectedYearBuiltFilter({});
    } else {
      setCurrentSelectedYearBuiltFilter({
        start: rangeStartValue !== startYear ? rangeStartValue : undefined,
        end: rangeEndValue !== currentYear ? rangeEndValue : undefined,
      });
    }
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
      setIsValid={setIsValid}
    />
  );
}
