"use client";

import { ReactElement } from "react";
import { FilterOption, FilterType } from "@/app/types/global";
import FilterPill from "./FilterPill";

type Props = {
  states: FilterOption[];
  checkIsActive: (key: FilterType) => boolean;
  onClick: (key: FilterType) => void;
};

export default function MultiStateToggle({
  states,
  checkIsActive,
  onClick,
}: Props): ReactElement {
  return (
    <div className="flex gap-2 p-1 border border-gray-200 rounded-lg hover:bg-sky-50 hover:border-cyan-600">
      {states.map(({ key, label, iconClass }) => (
        <FilterPill
          key={key}
          label={label}
          iconClass={iconClass}
          isActive={checkIsActive(key)}
          onClick={() => onClick(key)}
        />
      ))}
    </div>
  );
}
