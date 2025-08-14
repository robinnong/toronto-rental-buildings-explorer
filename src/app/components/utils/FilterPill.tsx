"use client";

import { FilterTypes } from "@/app/types/global";
import { Dispatch, ReactElement, SetStateAction, useMemo } from "react";

type Props = {
  id: FilterTypes;
  label: string;
  iconClass: string;
  disabled: boolean;
  appliedFilters: FilterTypes[];
  setAppliedFilters: Dispatch<SetStateAction<FilterTypes[]>>;
};

/**
 * Wrapper for filters in the FiltersModal component
 */
export default function FilterPill({
  id,
  label,
  iconClass,
  disabled,
  appliedFilters,
  setAppliedFilters,
}: Props): ReactElement {
  const isActive: boolean = useMemo(
    () => appliedFilters?.includes(id),
    [appliedFilters]
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
        setAppliedFilters((prev) => {
          if (prev == null) {
            return [id];
          } else if (!prev.find((filter) => filter === id)) {
            return [...prev, id];
          }
          return prev.filter((filter) => filter !== id);
        });
      }}
      disabled={disabled}
    >
      <i className={`fa-solid ${iconClass} mr-1`} />
      {label}
    </button>
  );
}
