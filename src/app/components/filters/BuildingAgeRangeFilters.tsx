"use client";

import { ReactElement } from "react";
import DualRangeSlider from "../utils/DualRangeSlider";

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

  return (
    <DualRangeSlider
      title="Year built between"
      sliderMin={startYear}
      sliderMax={currentYear}
      disabled={disabled}
    />
  );
}
