"use client";

import { ReactElement, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";

export default function SearchNoResults(): ReactElement {
  const { fetchData } = useContext(SearchContext);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 rounded-sm border border-solid border-gray-200 py-10 px-4 h-full">
      <i className="fa-solid fa-magnifying-glass fa-2x mb-2 text-gray-400" />
      <h3 className="text-lg font-bold">No results found</h3>
      <p>Sorry, we couldn't find any results matching your search.</p>
      <button
        type="button"
        className="text-cyan-700 mt-2"
        onClick={() => fetchData({})}
      >
        Clear filters
      </button>
    </div>
  );
}
