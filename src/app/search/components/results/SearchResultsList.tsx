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
    appliedFiltersMap,
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

  return (
    <div className="flex flex-col gap-1 h-full w-full mb-4">
      <div className="flex flex-wrap gap-1 justify-between items-center ">
        <span className="text-nowrap">
          Found <strong>{searchCount}</strong>&nbsp;result
          {searchCount === 1 ? "" : "s"}
        </span>
        <SearchSortBy />
      </div>

      {Object.keys(appliedFiltersMap).length > 0 && <AppliedFilters />}

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
            onClick={() => {
              if (currentPage > 1) {
                // Changing page with search string and filters applied
                if (
                  currentSearchString?.length > 0 &&
                  Object.keys(appliedFiltersMap).length > 0
                ) {
                  fetchTextAndFilterData({
                    filters: appliedFiltersMap,
                    sort: currentSort,
                    page: currentPage - 1,
                  });
                }
                // Changing page with no search string and no filters applied
                // OR
                // Changing page with search string and no filters applied
                else if (Object.keys(appliedFiltersMap).length === 0) {
                  fetchAlgoliaData({
                    query: currentSearchString,
                    sort: currentSort,
                    page: currentPage - 1,
                  });
                } else {
                  fetchFirestoreData({
                    filters: appliedFiltersMap,
                    page: currentPage - 1,
                    sort: currentSort,
                  });
                }
              }
            }}
            disabled={currentPage == 1}
          >
            <i className="fas fa-chevron-left mr-1" />
            Previous
          </button>
          <button
            type="button"
            className="disabled:text-gray-400"
            onClick={() => {
              if (currentPage * 25 < searchCount) {
                // Changing page with search string and filters applied
                if (
                  currentSearchString?.length > 0 &&
                  Object.keys(appliedFiltersMap).length > 0
                ) {
                  fetchTextAndFilterData({
                    filters: appliedFiltersMap,
                    sort: currentSort,
                    page: currentPage + 1,
                  });
                }
                // Changing page with no search string and no filters applied
                // OR
                // Changing page with search string and no filters applied
                else if (Object.keys(appliedFiltersMap).length === 0) {
                  fetchAlgoliaData({
                    query: currentSearchString,
                    sort: currentSort,
                    page: currentPage + 1,
                  });
                } else {
                  fetchFirestoreData({
                    filters: appliedFiltersMap,
                    page: currentPage + 1,
                    sort: currentSort,
                  });
                }
              }
            }}
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
