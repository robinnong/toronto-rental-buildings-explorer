"use client";

import { Dispatch, ReactElement, SetStateAction, useCallback } from "react";
import { AppliedFilterMap, FilterOption, FilterType } from "@/app/types/global";
import searchQueryBuilder from "@/app/lib/searchQueryBuilder";

type Props = {
  states: FilterOption[];
  appliedFilters: AppliedFilterMap;
  setAppliedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
};

export default function MultiStateToggle({
  states,
  appliedFilters,
  setAppliedFilters,
}: Props): ReactElement {
  const isActive = (key: FilterType) =>
    useCallback(
      (): boolean => appliedFilters?.[key]?.length > 0,
      [appliedFilters]
    );

  return (
    <div className="flex gap-2 p-1 border border-gray-200 rounded-lg hover:bg-sky-50 hover:border-cyan-600">
      {states.map(({ key, label, iconClass }) => (
        <button
          key={key}
          type="button"
          className={`rounded-lg p-2 hover:bg-sky-100  hover:text-cyan-700 ${
            isActive(key) ? "bg-sky-50 text-cyan-700" : ""
          }`}
          onClick={() => {
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
          }}
        >
          <i className={`fa-solid ${iconClass} mr-1`} />
          {label}
        </button>
      ))}
    </div>
  );
}
