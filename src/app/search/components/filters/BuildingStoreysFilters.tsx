"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingStoreysFilters } from "@/app/constants/general";
import MultiStateToggle from "@/app/components/utils/MultiStateToggle";
import { AppliedFilterMap } from "@/app/types/global";
import searchQueryBuilder from "@/app/lib/searchQueryBuilder";

type Props = {
  appliedFilters: AppliedFilterMap;
  setAppliedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
};

/**
 * Options to filter buildings by number of storeys, rendered by <FiltersModal />
 * Options: "Low rise", "Mid rise", and "High rise".
 */
export default function BuildingStoreysFilters({
  appliedFilters,
  setAppliedFilters,
}: Props): ReactElement {
  return (
    <div>
      <h4 className="font-bold">Building size</h4>
      <div className="flex gap-1 mt-2 flex-wrap">
        <MultiStateToggle
          states={buildingStoreysFilters}
          checkIsActive={(key) => appliedFilters[key]?.length > 0}
          onClick={(key) => {
            if (appliedFilters[key]?.length > 0) {
              // Remove the filter
              setAppliedFilters((prev) => {
                const { [key]: removed, ...rest } = prev;
                return rest;
              });
            } else {
              // Apply the filter as the active state and clear the rest
              const updatedFilters = {
                LOW_RISE: key === "LOW_RISE" ? searchQueryBuilder(key) : null,
                MID_RISE: key === "MID_RISE" ? searchQueryBuilder(key) : null,
                HIGH_RISE: key === "HIGH_RISE" ? searchQueryBuilder(key) : null,
              };
              setAppliedFilters((prev) => ({
                ...prev,
                ...updatedFilters,
              }));
            }
          }}
        />
      </div>
    </div>
  );
}
