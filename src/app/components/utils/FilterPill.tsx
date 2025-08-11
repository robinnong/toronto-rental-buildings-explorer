"use client";

import { AppliedFilter } from "@/app/types/global";
import { Dispatch, ReactElement, SetStateAction, useMemo } from "react";

type Props = {
  id: string;
  label: string;
  iconClass: string;
  disabled: boolean;
  appliedFilters: AppliedFilter[];
  setAppliedFilters: Dispatch<SetStateAction<AppliedFilter[]>>;
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
  const isActive = useMemo(
    () => appliedFilters?.find(({ key, value }) => key === id && !!value),
    [appliedFilters]
  );

  return (
    <>
      <input
        className="sr-only"
        type="checkbox"
        checked={!!isActive}
        id={id}
        name={id}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`cursor-pointer border rounded-lg p-2 hover:bg-sky-50 hover:border-cyan-600 hover:text-cyan-700 text-nowrap ${
          isActive
            ? "bg-cyan-50 border border-solid border-cyan-200 text-cyan-600"
            : "border-gray-200"
        }`}
        onClick={() => {
          setAppliedFilters((prev) => {
            if (prev == null) {
              return [{ key: id, value: true }];
            } else if (!prev.find((filter) => filter.key === id)) {
              return [...prev, { key: id, value: true }];
            }
            return prev.filter((filter) => filter.key !== id);
          });
        }}
      >
        <i className={`fa-solid ${iconClass} mr-1`} />
        {label}
      </label>
    </>
  );
}
