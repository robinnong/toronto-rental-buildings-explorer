"use client";

import { ReactElement } from "react";

type Props = {
  label: string;
  isActive: boolean;
  iconClass: string;
  onClick: () => void;
};

/**
 * Wrapper for filters in the FiltersModal component
 */
export default function FilterPill({
  label,
  isActive,
  iconClass,
  onClick,
}: Props): ReactElement {
  return (
    <button
      type="button"
      className={`border rounded-lg p-2 hover:bg-sky-50 hover:border-cyan-600 hover:text-cyan-700 ${
        isActive
          ? "bg-sky-50 border border-solid border-cyan-600 text-cyan-700"
          : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <i className={`fa-solid ${iconClass} mr-1`} />
      {label}
    </button>
  );
}
