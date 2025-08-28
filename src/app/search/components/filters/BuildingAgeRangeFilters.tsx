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

const defaultMin = 1800;
const defaultMax = new Date().getFullYear();

type Props = {
  appliedYearBuiltFilter: YearBuiltFilter;
  setSelectedYearBuiltFilter: Dispatch<SetStateAction<YearBuiltFilter>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

/**
 * Renders a dual range slider for filtering buildings by age, ranging between a 1800 and the current year.
 */
export default function BuildingAgeRangeFilters({
  appliedYearBuiltFilter,
  setSelectedYearBuiltFilter,
  setIsValid,
}: Props): ReactElement {
  const [rangeStartValue, setRangeStartValue] = useState<number>(defaultMin);
  const [rangeEndValue, setRangeEndValue] = useState<number>(defaultMax);

  // Initialize range inputs from applied filters
  useEffect(() => {
    setRangeStartValue(appliedYearBuiltFilter?.start || defaultMin);
    setRangeEndValue(appliedYearBuiltFilter?.end || defaultMax);
  }, []);

  // Update the current year built filters when range inputs change
  useEffect(() => {
    if (rangeStartValue === defaultMin && rangeEndValue === defaultMax) {
      setSelectedYearBuiltFilter({});
    } else {
      setSelectedYearBuiltFilter({
        start: rangeStartValue !== defaultMin ? rangeStartValue : undefined,
        end: rangeEndValue !== defaultMax ? rangeEndValue : undefined,
      });
    }
  }, [rangeStartValue, rangeEndValue]);

  return (
    <DualRangeSlider
      title="Year built between"
      defaultSliderMin={defaultMin}
      defaultSliderMax={defaultMax}
      rangeStartValue={rangeStartValue}
      setRangeStartValue={setRangeStartValue}
      rangeEndValue={rangeEndValue}
      setRangeEndValue={setRangeEndValue}
      setIsValid={setIsValid}
    />
  );
}
