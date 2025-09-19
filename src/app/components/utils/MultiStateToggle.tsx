"use client";

import { ReactElement } from "react";
import { FilterOption, FilterType } from "@/app/types/global";
import FilterPill from "./FilterPill";

type Props = {
  states: FilterOption[];
  selectedFilters: FilterType[];
  handleToggle: (key: FilterType) => void;
};

/**
 * A reusable multi-state toggle component.
 * Only one state can be active at a time.
 *
 * Props for MultiStateToggle
 * @param states {FilterOption[]} - List of possible toggle states.
 * @param selectedFilters {FilterType[]} - List of currently selected filters.
 * @param handleToggle {(key: FilterType) => void} - Function to call when a state is clicked.
 */
export default function MultiStateToggle({
  states,
  selectedFilters,
  handleToggle,
}: Props): ReactElement {
  return (
    <div className="flex gap-2 p-1 border border-gray-200 rounded-lg hover:bg-sky-50 hover:border-cyan-600">
      {states.map(({ key, label, iconClass }) => (
        <FilterPill
          key={key}
          id={key}
          label={label}
          iconClass={iconClass}
          selectedFilters={selectedFilters}
          handleClick={() => handleToggle(key)}
        />
      ))}
    </div>
  );
}
