"use client";

import { FilterType } from "@/app/types/global";
import { ReactElement, useMemo } from "react";

type Props = {
  id: FilterType;
  label: string;
  selectedFilters: FilterType[];
  iconClass: string;
  handleClick: () => void;
};

/**
 * A reusable pill wrapper for filter options in the FiltersModal component
 *
 * Props for FilterPill
 * @param {string} label - Pill label
 * @param {boolean} selectedFilters - List to reference for the pill active state
 * @param {string} iconClass - Pill icon
 * @param {function} handleClick - Function to call when pill is clicked
 */
export default function FilterPill({
  id,
  label,
  selectedFilters,
  iconClass,
  handleClick,
}: Props): ReactElement {
  const isActive = useMemo(
    () => selectedFilters.includes(id),
    [selectedFilters]
  );

  return (
    <button
      type="button"
      className={`border rounded-lg p-2 hover:bg-sky-50 hover:border-cyan-600 hover:text-cyan-700 ${
        isActive
          ? "bg-sky-50 border border-solid border-cyan-600 text-cyan-700"
          : "border-gray-200"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <i className={`fas ${iconClass} mr-1`} />
      {label}
    </button>
  );
}
