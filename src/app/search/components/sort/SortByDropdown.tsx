"use client";

import { ReactElement, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { sortOptions } from "@/app/constants/general";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import { Sort } from "@/app/types/global";

type Props = {
  onClose: () => void;
};

export default function SortByDropdown({ onClose }: Props): ReactElement {
  const { currentSort, setCurrentSort, fetchData } = useContext(SearchContext);
  const ref = useOnClickOutside(onClose);

  // Query with new sort option, reset to first page and close the dropdown after applying a sort
  const onSelect = (key: Sort) => {
    if (key === currentSort) return;

    setCurrentSort(key);
    fetchData({ sort: key });
    onClose();
  };

  return (
    <ul
      ref={ref}
      className="absolute top-7 right-0 cursor-pointer rounded-md bg-white border border-gray-300 shadow-md hover:border-cyan-600 w-50"
    >
      {sortOptions.map(({ key, label }) => (
        <li
          key={key}
          className={`rounded-md hover:bg-sky-50 hover:text-cyan-700 pt-2 p-2 ${
            currentSort === key ? "bg-sky-50 text-cyan-700" : ""
          }`}
          onClick={() => onSelect(key)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
