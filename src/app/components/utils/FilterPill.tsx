"use client";

import { ReactElement } from "react";

type Props = {
  label: string;
  isActive: boolean;
  iconClass: string;
  handleClick: () => void;
};

/**
 * A reusable pill wrapper for filter options in the FiltersModal component
 *
 * Props for FilterPill
 * @param {string} label - Pill label
 * @param {boolean} isActive - Pill active state
 * @param {string} iconClass - Pill icon
 * @param {function} handleClick - Function to call when pill is clicked
 */
export default function FilterPill({
  label,
  isActive,
  iconClass,
  handleClick,
}: Props): ReactElement {
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
        e.preventDefault();
        handleClick();
      }}
    >
      <i className={`fas ${iconClass} mr-1`} />
      {label}
    </button>
  );
}
