"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingFeatureFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";
import { AppliedFilterMap, FilterType } from "@/app/types/global";
import searchQueryBuilder from "@/app/lib/searchQueryBuilder";

type Props = {
  appliedFilters: AppliedFilterMap;
  setAppliedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
};

/**
 * Search filter options rendered by <FiltersModal />
 * Provides filters such as "Pets allowed", "Non-smoking building", etc.
 */
export default function BuildingFeatureFilters({
  appliedFilters,
  setAppliedFilters,
}: Props): ReactElement {
  const setFilter = (key: FilterType) => {
    if (appliedFilters[key]?.length > 0) {
      // Remove the filter
      setAppliedFilters((prev) => {
        const { [key]: removed, ...rest } = prev;
        return rest;
      });
    } else {
      // Apply the filter
      setAppliedFilters((prev) => ({
        ...prev,
        [key]: searchQueryBuilder(key),
      }));
    }
  };

  const checkIsActive = (key: FilterType) => appliedFilters[key]?.length > 0;

  return (
    <div>
      <h4 className="font-bold">Building features</h4>
      <div className="flex flex-wrap gap-1 mt-2">
        {buildingFeatureFilters.map(({ key, label, iconClass }) => (
          <FilterPill
            key={key}
            label={label}
            iconClass={iconClass}
            isActive={checkIsActive(key)}
            onClick={() => setFilter(key)}
          />
        ))}
      </div>
    </div>
  );
}
