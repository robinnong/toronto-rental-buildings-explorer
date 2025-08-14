"use client";

import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import { FilterTypes } from "@/app/types/global";
import { buildingStoreysFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";
import { SearchContext } from "@/app/hooks/useSearchContext";

type Props = {
  disabled: boolean;
};

/**
 * Options to filter buildings by number of storeys, rendered by <FiltersModal />
 * Options: "Low rise", "Mid rise", and "High rise".
 *
 * @param {boolean} disabled - Whether the filters are disabled
 */
export default function BuildingStoreysFilters({
  disabled,
}: Props): ReactElement {
  const { appliedFilters, setAppliedFilters } = useContext(SearchContext);

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
