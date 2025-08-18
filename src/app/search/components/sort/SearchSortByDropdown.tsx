"use client";

import { ReactElement, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { sortByOptions } from "@/app/constants/general";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import { on } from "events";

type Props = {
  onClose: () => void;
};

export default function SearchSortByDropdown({ onClose }: Props): ReactElement {
  const { sort, setSort, setPage } = useContext(SearchContext);
  const ref = useOnClickOutside(onClose);

  return (
    <ul
      ref={ref}
      className="absolute top-7 right-0 cursor-pointer rounded-md bg-white border border-gray-300 shadow-md hover:border-cyan-600 w-50"
    >
      {sortByOptions.map(({ key, label }) => (
        <li
          key={key}
          className={`rounded-md hover:bg-sky-50 hover:text-cyan-700 pt-2 p-2 ${
            sort === key ? "bg-sky-50 text-cyan-700" : ""
          }`}
          onClick={() => {
            // Reset to first page after applying a sort and close the dropdown
            setSort(key);
            setPage(1);
            onClose();
          }}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
