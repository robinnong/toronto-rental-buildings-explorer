"use client";

import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FetchDataResponse } from "@/app/types/global";
import SearchResultCard from "./SearchResultCard";
import AppliedFilters from "./AppliedFilters";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import SearchSortBy from "../sort/SearchSortBy";
import NoResults from "./NoResults";

type Props = {
  setPreviewedBuildingMap: Dispatch<SetStateAction<FetchDataResponse>>;
};

export default function SearchResultsList({
  setPreviewedBuildingMap,
}: Props): ReactElement {
  const {
    currentAppliedFilters,
    searchCount,
    searchResults,
    currentSearchString,
    currentSort,
    currentPage,
    isLoading,
    fetchAlgoliaData,
    fetchFirestoreData,
    fetchTextAndFilterData,
  } = useContext(SearchContext);

  const handlePageChange = (key: "prev" | "next") => {
    const newPage = key === "next" ? currentPage + 1 : currentPage - 1;

    if (
      (key === "prev" && currentPage > 1) ||
      (key === "next" && currentPage * 25 < searchCount)
    ) {
      if (
        currentSearchString?.length > 0 &&
        Object.keys(currentAppliedFilters).length > 0
      ) {
        // Changing page with search string and filters applied
        fetchTextAndFilterData({
          query: currentSearchString,
          filters: currentAppliedFilters,
          sort: currentSort,
          page: newPage,
        });
      } else if (Object.keys(currentAppliedFilters).length === 0) {
        // Changing page with no search string and no filters applied
        // OR
        // Changing page with search string and no filters applied
        fetchAlgoliaData({
          query: currentSearchString,
          sort: currentSort,
          page: newPage,
        });
      } else {
        fetchFirestoreData({
          filters: currentAppliedFilters,
          page: newPage,
          sort: currentSort,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 h-full w-full mb-4">
      <div className="flex flex-wrap gap-1 justify-between items-center ">
        <span className="text-nowrap">
          Found <strong>{searchCount}</strong>&nbsp;result
          {searchCount === 1 ? "" : "s"}
        </span>
        <SearchSortBy />
      </div>

      {Object.keys(currentAppliedFilters).length > 0 && <AppliedFilters />}

      {isLoading && <LoadingSkeleton />}
      {searchCount > 0 && !isLoading && (
        <ul className="flex flex-col gap-2 w-full h-full">
          {searchResults.map((building) => (
            <SearchResultCard
              key={building._id}
              building={building}
              onShowMapModal={() => setPreviewedBuildingMap(building)}
            />
          ))}
        </ul>
      )}

      {!isLoading && searchCount === 0 && <NoResults />}

      {searchCount > 0 && (
        <div className="flex gap-4 w-full justify-center mt-2">
          <button
            type="button"
            className="disabled:text-gray-400"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage == 1}
          >
            <i className="fas fa-chevron-left mr-1" />
            Previous
          </button>
          <button
            type="button"
            className="disabled:text-gray-400"
            onClick={() => handlePageChange("next")}
            disabled={currentPage >= Math.round(searchCount / 25)}
          >
            Next
            <i className="fas fa-chevron-right ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
