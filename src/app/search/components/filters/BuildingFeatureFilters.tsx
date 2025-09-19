"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingFeatureFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";
import { FilterType } from "@/app/types/global";

type Props = {
  selectedFilters: FilterType[];
  setSelectedFilters: Dispatch<SetStateAction<FilterType[]>>;
};

/**
 * Search filter options rendered by <FiltersModal />
 * Provides filters such as "Pets allowed", "Non-smoking building", etc.
 */
export default function BuildingFeatureFilters({
  selectedFilters,
  setSelectedFilters,
}: Props): ReactElement {
  const handleToggle = (key: FilterType) => {
    if (selectedFilters.includes(key)) {
      // Remove the filter
      setSelectedFilters((prev) => prev.filter((item) => item !== key));
    } else {
      // Apply the filter
      setSelectedFilters((prev) => [...prev, key]);
    }
  };

  const checkIsActive = (key: FilterType) => selectedFilters.includes(key);

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
            handleClick={() => handleToggle(key)}
          />
        ))}
      </div>
    </div>
  );
}
