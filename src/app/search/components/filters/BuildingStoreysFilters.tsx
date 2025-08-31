"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingStoreysFilters } from "@/app/constants/general";
import MultiStateToggle from "@/app/components/utils/MultiStateToggle";
import { FilterType } from "@/app/types/global";

type Props = {
  selectedFilters: FilterType[];
  setSelectedFilters: Dispatch<SetStateAction<FilterType[]>>;
};

/**
 * Options to filter buildings by number of storeys, rendered by <FiltersModal />
 * Options: "Low rise", "Mid rise", and "High rise".
 */
export default function BuildingStoreysFilters({
  selectedFilters,
  setSelectedFilters,
}: Props): ReactElement {
  const handleToggle = (key: FilterType) => {
    if (selectedFilters.includes(key)) {
      // Remove the selected building storey filter
      setSelectedFilters((prev) => prev.filter((item) => item !== key));
    } else {
      // First, clear all other applied building storey filters
      if (key === "LOW_RISE") {
        // Remove "MID_RISE" and "HIGH_RISE"
        setSelectedFilters((prev) =>
          prev.filter((item) => item !== "MID_RISE" && item !== "HIGH_RISE")
        );
      }
      if (key === "MID_RISE") {
        // Remove "LOW_RISE" and "HIGH_RISE"
        setSelectedFilters((prev) =>
          prev.filter((item) => item !== "LOW_RISE" && item !== "HIGH_RISE")
        );
      }
      if (key === "HIGH_RISE") {
        // Remove "LOW_RISE" and "MID_RISE"
        setSelectedFilters((prev) =>
          prev.filter((item) => item !== "LOW_RISE" && item !== "MID_RISE")
        );
      }

      // Finally, apply the selected building storey filter
      setSelectedFilters((prev) => [...prev, key]);
    }
  };

  const checkIsActive = (key: FilterType) => selectedFilters.includes(key);

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
