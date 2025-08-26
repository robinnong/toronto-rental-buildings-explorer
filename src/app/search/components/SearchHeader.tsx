"use client";

import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";

type Props = {
  setShowFiltersModal: Dispatch<SetStateAction<boolean>>;
};
export default function SearchHeader({
  setShowFiltersModal,
}: Props): ReactElement {
  const {
    isLoading,
    currentAppliedFilters,
    currentSearchString,
    currentSort,
    setCurrentSearchString,
    fetchAlgoliaData,
    fetchFirestoreData,
    fetchTextAndFilterData,
  } = useContext(SearchContext);

  const handleSubmit = () => {
    // Setting query with search string and filters applied
    if (
      currentSearchString?.length > 0 &&
      Object.keys(currentAppliedFilters).length > 0
    ) {
      fetchTextAndFilterData({
        query: currentSearchString,
        filters: currentAppliedFilters,
        sort: currentSort,
      });
    }
    // Setting query  with no search string and no filters applied
    // OR
    // Setting query with search string and no filters applied
    else if (Object.keys(currentAppliedFilters).length === 0) {
      fetchAlgoliaData({ query: currentSearchString, sort: currentSort });
    } else {
      // Setting query with no search string and with filters applied
      fetchFirestoreData({
        filters: currentAppliedFilters,
        sort: currentSort,
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 max-w-lg">
      <form
        className="flex items-center gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (isLoading) return;
          handleSubmit();
        }}
      >
        <div className="relative w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="w-full rounded-full py-2 px-4 border border-solid border-gray-300 focus:border-cyan-700 pr-8"
            type="text"
            id="search"
            placeholder="Search by address or property management name"
            disabled={isLoading}
            value={currentSearchString}
            onChange={(e) => setCurrentSearchString(e.target.value)}
          />
          {currentSearchString?.length > 0 && (
            <button
              className="absolute top-0 right-3 bottom-0"
              type="button"
              onClick={() => setCurrentSearchString("")}
              disabled={isLoading}
            >
              <i className="fas fa-xmark text-gray-500" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-cyan-600 text-white p-2 rounded-full"
          disabled={isLoading}
        >
          <i className="fas fa-magnifying-glass" />
        </button>
      </form>

      <button
        type="button"
        className="text-nowrap border rounded-full border-gray-300 py-2 px-3 hover:bg-sky-50 hover:border-cyan-600 hover:text-cyan-700 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white disabled:cursor-default"
        onClick={() => setShowFiltersModal((prev) => !prev)}
        disabled={isLoading}
      >
        <i className="fas fa-sliders mr-1" />
        Filters
      </button>
    </div>
  );
}
