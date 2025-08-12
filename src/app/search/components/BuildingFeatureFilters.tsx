"use client";

import { AppliedFilter } from "@/app/types/global";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingFeatureFilters } from "@/app/constants/general";
import FilterPill from "@/app/components/utils/FilterPill";

type Props = {
  disabled: boolean;
  appliedFilters: AppliedFilter[];
  setAppliedFilters: Dispatch<SetStateAction<AppliedFilter[]>>;
};

/**
 * Search filter options rendered by <FiltersModal />
 * Provides filters such as "Pets allowed", "Non-smoking building", etc.
 *
 * @param {boolean} disabled - Whether the filters are disabled
 * @param {AppliedFilter[]} appliedFilters - The currently applied filters
 * @param {Dispatch<SetStateAction<AppliedFilter[]>>} setAppliedFilters - Function to update the applied filters
 */
export default function BuildingFeatureFilters({
  disabled,
  appliedFilters,
  setAppliedFilters,
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
            disabled={disabled}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
          />
        ))}
      </div>
    </div>
  );
}
