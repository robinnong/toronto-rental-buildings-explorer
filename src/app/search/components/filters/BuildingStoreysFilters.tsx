"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import { buildingStoreysFilters } from "@/app/constants/general";
import MultiStateToggle from "@/app/components/utils/MultiStateToggle";
import { AppliedFilterMap } from "@/app/types/global";

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
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
      </div>
    </div>
  );
}
