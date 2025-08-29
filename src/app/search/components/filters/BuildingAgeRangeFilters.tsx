"use client";

import DualRangeSlider from "@/app/components/utils/DualRangeSlider";
import { defaultMinYear, defaultMaxYear } from "@/app/constants/general";
import { YearBuiltFilter } from "@/app/types/global";
import { Dispatch, ReactElement, SetStateAction } from "react";

type Props = {
  selectedYearBuiltFilter: YearBuiltFilter;
  setSelectedYearBuiltFilter: Dispatch<SetStateAction<YearBuiltFilter>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

/**
 * Renders a dual range slider for filtering buildings by age, ranging between a 1800 and the current year.
 */
export default function BuildingAgeRangeFilters({
  selectedYearBuiltFilter,
  setSelectedYearBuiltFilter,
  setIsValid,
}: Props): ReactElement {
  return (
    <DualRangeSlider
      title="Year built between"
      defaultSliderMin={defaultMinYear}
      defaultSliderMax={defaultMaxYear}
      rangeStartValue={selectedYearBuiltFilter.start}
      setRangeStartValue={(value) =>
        setSelectedYearBuiltFilter((prev) => ({ ...prev, start: value }))
      }
      rangeEndValue={selectedYearBuiltFilter.end}
      setRangeEndValue={(value) =>
        setSelectedYearBuiltFilter((prev) => ({ ...prev, end: value }))
      }
      setIsValid={setIsValid}
    />
  );
}
