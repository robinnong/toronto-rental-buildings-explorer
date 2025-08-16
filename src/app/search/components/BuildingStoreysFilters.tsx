"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingStoreysFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";
import { AppliedFilterMap } from "@/app/types/global";

type Props = {
  currentSelectedFilters: AppliedFilterMap;
  setCurrentSelectedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
};

/**
 * Options to filter buildings by number of storeys, rendered by <FiltersModal />
 * Options: "Low rise", "Mid rise", and "High rise".
 */
export default function BuildingStoreysFilters({
  currentSelectedFilters,
  setCurrentSelectedFilters,
}: Props): ReactElement {
  return (
    <div>
      <h4 className="font-bold">Building size</h4>
      <div className="flex gap-1 mt-2 flex-wrap">
        {buildingStoreysFilters.map((filter) => (
          <FilterPill
            key={filter.key}
            id={filter.key}
            label={filter.label}
            iconClass={filter.iconClass}
            appliedFiltersMap={currentSelectedFilters}
            setAppliedFiltersMap={setCurrentSelectedFilters}
          />
        ))}
      </div>
    </div>
  );
}
