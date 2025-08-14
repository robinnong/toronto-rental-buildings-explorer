"use client";

import { ReactElement, useContext } from "react";
import { buildingFeatureFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";
import { SearchContext } from "@/app/hooks/useSearchContext";

type Props = {
  disabled: boolean;
};

/**
 * Search filter options rendered by <FiltersModal />
 * Provides filters such as "Pets allowed", "Non-smoking building", etc.
 *
 * @param {boolean} disabled - Whether the filters are disabled
 */
export default function BuildingFeatureFilters({
  disabled,
}: Props): ReactElement {
  const { appliedFiltersMap, setAppliedFiltersMap } = useContext(SearchContext);

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
            disabled={disabled}
            appliedFiltersMap={appliedFiltersMap}
            setAppliedFiltersMap={setAppliedFiltersMap}
          />
        ))}
      </div>
    </div>
  );
}
