"use client";

import { ReactElement, useContext, useState } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { sortByLabels } from "@/app/constants/general";
import SortByDropdown from "./SortByDropdown";

export default function SearchSortBy(): ReactElement {
  const { sort, isLoading, filteredSearchResults } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-2 items-center relative">
      <div>Sort by:</div>
      <button
        type="button"
        className="flex cursor-pointer border border-gray-300 hover:border-cyan-600 hover:bg-sky-50 hover:text-cyan-700 py-1 rounded-full px-3 w-50 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white disabled:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || filteredSearchResults?.length === 0}
      >
        <span className="mr-1 grow-1">{sortByLabels[sort]}</span>
        {isOpen ? (
          <i className="fas fa-times" />
        ) : (
          <i className="fas fa-chevron-down" />
        )}
      </button>

      {isOpen && <SortByDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
}
