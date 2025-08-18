"use client";

import { ReactElement, useContext, useState } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { camelCaseToTitleCase } from "@/app/lib/camelCaseToTitleCase";

export default function SearchSortBy(): ReactElement {
  const { sort, setSort } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-2 items-center relative">
      <div>Sort by:</div>
      <button
        type="button"
        className="cursor-pointer border border-gray-300 hover:border-cyan-600 hover:bg-sky-50 hover:text-cyan-700 py-1 rounded-full px-3 w-42"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-1">{camelCaseToTitleCase(sort)}</span>
        {isOpen ? (
          <i className="fas fa-times" />
        ) : (
          <i className="fas fa-chevron-down" />
        )}
      </button>

      {isOpen && (
        <ul className="absolute top-7 right-0 cursor-pointer rounded-md bg-white border border-gray-300 shadow-md hover:border-cyan-600">
          <li
            className="rounded-md hover:bg-sky-50 hover:text-cyan-700 pt-2 p-2"
            onClick={() => setSort("ward_number")}
          >
            Ward number
          </li>
          <li
            className="rounded-md hover:bg-sky-50 hover:text-cyan-700 p-2"
            onClick={() => setSort("year_built_asc")}
          >
            Year built (ascending)
          </li>
          <li
            className="rounded-md hover:bg-sky-50 hover:text-cyan-700 p-2"
            onClick={() => setSort("year_built_desc")}
          >
            Year built (descending)
          </li>
        </ul>
      )}
    </div>
  );
}
