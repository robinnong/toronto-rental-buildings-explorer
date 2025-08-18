"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingFeatureFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";
import { AppliedFilterMap } from "@/app/types/global";

type Props = {
  currentSelectedFilters: AppliedFilterMap;
  setCurrentSelectedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
};

/**
 * Search filter options rendered by <FiltersModal />
 * Provides filters such as "Pets allowed", "Non-smoking building", etc.
 */
export default function BuildingFeatureFilters({
  currentSelectedFilters,
  setCurrentSelectedFilters,
}: Props): ReactElement {
  return (
    <div>
      <h4 className="font-bold">Building features</h4>
      <div className="flex flex-wrap gap-1 mt-2">
        {buildingFeatureFilters.map(({ key, label, iconClass }) => (
          <FilterPill
            key={key}
            id={key}
            label={label}
            iconClass={iconClass}
            appliedFiltersMap={currentSelectedFilters}
            setAppliedFiltersMap={setCurrentSelectedFilters}
          />
        ))}
      </div>
    </div>
  );
}
