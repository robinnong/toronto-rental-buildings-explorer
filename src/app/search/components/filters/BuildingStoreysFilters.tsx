"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingStoreysFilters } from "@/app/constants/general";
import MultiStateToggle from "@/app/components/utils/MultiStateToggle";
import { FilterType } from "@/app/types/global";

type Props = {
  currentSelectedFilters: FilterType[];
  setCurrentSelectedFilters: Dispatch<SetStateAction<FilterType[]>>;
};

/**
 * Options to filter buildings by number of storeys, rendered by <FiltersModal />
 * Options: "Low rise", "Mid rise", and "High rise".
 */
export default function BuildingStoreysFilters({
  currentSelectedFilters,
  setCurrentSelectedFilters,
}: Props): ReactElement {
  const handleToggle = (key: FilterType) => {
    if (currentSelectedFilters.includes(key)) {
      // Remove the selected building storey filter
      setCurrentSelectedFilters((prev) => prev.filter((item) => item !== key));
    } else {
      // First, clear all other applied building storey filters
      if (key === "LOW_RISE") {
        // Remove "MID_RISE" and "HIGH_RISE"
        setCurrentSelectedFilters((prev) =>
          prev.filter((item) => item !== "MID_RISE" && item !== "HIGH_RISE")
        );
      }
      if (key === "MID_RISE") {
        // Remove "LOW_RISE" and "HIGH_RISE"
        setCurrentSelectedFilters((prev) =>
          prev.filter((item) => item !== "LOW_RISE" && item !== "HIGH_RISE")
        );
      }
      if (key === "HIGH_RISE") {
        // Remove "LOW_RISE" and "MID_RISE"
        setCurrentSelectedFilters((prev) =>
          prev.filter((item) => item !== "LOW_RISE" && item !== "MID_RISE")
        );
      }

      // Finally, apply the selected building storey filter
      setCurrentSelectedFilters((prev) => [...prev, key]);
    }
  };

  const checkIsActive = (key: FilterType) =>
    currentSelectedFilters.includes(key);

  return (
    <div>
      <h4 className="font-bold">Building size</h4>
      <div className="flex gap-1 mt-2 flex-wrap">
        <MultiStateToggle
          states={buildingStoreysFilters}
          checkIsActive={checkIsActive}
          onClick={handleToggle}
        />
      </div>
    </div>
  );
}
