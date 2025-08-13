"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { FilterTypes } from "@/app/types/global";
import { buildingStoreysFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";

type Props = {
  appliedFilters: FilterTypes[];
  setAppliedFilters: Dispatch<SetStateAction<FilterTypes[]>>;
  disabled: boolean;
};

/**
 * Options to filter buildings by number of storeys, rendered by <FiltersModal />
 * Options: "Low rise", "Mid rise", and "High rise".
 *
 * @param {FilterTypes[]} appliedFilters - The currently applied filters
 * @param {Dispatch<SetStateAction<FilterTypes[]>>} setAppliedFilters - Function to update the applied filters
 * @param {boolean} disabled - Whether the filters are disabled
 */
export default function BuildingStoreysFilters({
  appliedFilters,
  setAppliedFilters,
  disabled,
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
            disabled={disabled}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
          />
        ))}
      </div>
    </div>
  );
}
