"use client";

import { ReactElement, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";

export default function NoResults(): ReactElement {
  const {
    setCurrentSearchString,
    setCurrentBuildingFeatureFilters,
    setCurrentYearBuiltFilter,
    setCurrentSort,
    setCurrentPage,
    fetchData,
  } = useContext(SearchContext);

  // Clear all sort and search fields
  const clearSearch = () => {
    setCurrentSearchString("");
    setCurrentBuildingFeatureFilters([]);
    setCurrentYearBuiltFilter({});
    setCurrentSort("ward_number");
    setCurrentPage(0);
    fetchData({
      query: "",
      filters: [],
      yearBuiltFilter: {},
      sort: "ward_number",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 rounded-sm border border-solid border-gray-200 py-10 px-4 h-full">
      <i className="fas fa-magnifying-glass fa-2x mb-2 text-gray-400" />
      <h3 className="text-lg font-bold">No results found</h3>
      <p>Sorry, we couldn't find any results matching your search.</p>
      <button
        type="button"
        className="text-cyan-700 mt-2"
        onClick={() => clearSearch()}
      >
        Clear filters
      </button>
    </div>
  );
}
