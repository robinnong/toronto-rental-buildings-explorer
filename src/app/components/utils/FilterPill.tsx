"use client";

import { Dispatch, ReactElement, SetStateAction, useMemo } from "react";
import { FilterTypes, FirestoreWhereClause } from "@/app/types/global";
import searchQueryBuilder from "@/app/lib/searchQueryBuilder";

type Props = {
  id: FilterTypes;
  label: string;
  iconClass: string;
  disabled: boolean;
  appliedFiltersMap: Record<FilterTypes, FirestoreWhereClause[]>;
  setAppliedFiltersMap: Dispatch<
    SetStateAction<Record<FilterTypes, FirestoreWhereClause[]>>
  >;
};

/**
 * Wrapper for filters in the FiltersModal component
 */
export default function FilterPill({
  id,
  label,
  iconClass,
  disabled,
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
        setAppliedFiltersMap((prev) => ({
          ...prev,
          [id]: searchQueryBuilder(id),
        }));
      }}
      disabled={disabled}
    >
      <i className={`fa-solid ${iconClass} mr-1`} />
      {label}
    </button>
  );
}
