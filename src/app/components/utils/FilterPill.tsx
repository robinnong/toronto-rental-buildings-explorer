"use client";

import { Dispatch, ReactElement, SetStateAction, useMemo } from "react";
import { AppliedFilterMap, FilterType } from "@/app/types/global";
import searchQueryBuilder from "@/app/lib/searchQueryBuilder";

type Props = {
  id: FilterType;
  label: string;
  iconClass: string;
  appliedFiltersMap: AppliedFilterMap;
  setAppliedFiltersMap: Dispatch<SetStateAction<AppliedFilterMap>>;
};

/**
 * Wrapper for filters in the FiltersModal component
 */
export default function FilterPill({
  id,
  label,
  iconClass,
  appliedFiltersMap,
  setAppliedFiltersMap,
}: Props): ReactElement {
  const isActive: boolean = useMemo(
    () => appliedFiltersMap?.[id]?.length > 0,
    [appliedFiltersMap]
  );

  return (
    <button
      type="button"
      className={`border rounded-lg p-2 hover:bg-sky-50 hover:border-cyan-600 hover:text-cyan-700 text-nowrap ${
        isActive
          ? "bg-sky-50 border border-solid border-cyan-600 text-cyan-700"
          : "border-gray-200"
      }`}
      onClick={() => {
        if (appliedFiltersMap[id]?.length > 0) {
          // Remove the filter
          setAppliedFiltersMap((prev) => {
            const { [id]: removed, ...rest } = prev;
            return rest;
          });
        } else {
          // Apply the filter
          setAppliedFiltersMap((prev) => ({
            ...prev,
            [id]: searchQueryBuilder(id),
          }));
        }
      }}
    >
      <i className={`fa-solid ${iconClass} mr-1`} />
      {label}
    </button>
  );
}
