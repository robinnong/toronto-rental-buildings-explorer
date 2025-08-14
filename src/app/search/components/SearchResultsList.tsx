"use client";

import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FetchDataResponse } from "@/app/types/global";
import SearchResultCard from "./SearchResultCard";

type Props = {
  setPreviewedBuildingMap: Dispatch<SetStateAction<FetchDataResponse>>;
};

export default function SearchResultsList({
  setPreviewedBuildingMap,
}: Props): ReactElement {
  const {
    filteredSearchResults,
    page,
    setPage,
    isLoading,
    setAppliedFiltersMap,
    fetchData,
  } = useContext(SearchContext);

  return (
    <div className="flex flex-col gap-2 h-full w-full mb-4">
      {filteredSearchResults?.length > 0 && (
        <div className="flex justify-between">
          <span>
            Found <strong>{filteredSearchResults.length}</strong>&nbsp;result
            {filteredSearchResults?.length === 1 ? "" : "s"}
          </span>

          <div className="flex gap-4">
            {page > 1 && (
              <>
                <button
                  type="button"
                  className="disabled:text-gray-500 hover:text-cyan-700"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="fa-solid fa-chevron-left fa-xs" />
                  Prev
                </button>
                |{" "}
              </>
            )}
            <button
              type="button"
              className="disabled:text-gray-500 hover:text-cyan-700"
              onClick={() => setPage(page + 1)}
            >
              Next
              <i className="fa-solid fa-chevron-right fa-xs" />
            </button>
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-2 w-full h-full">
        {filteredSearchResults.map((building) => (
          <SearchResultCard
            key={building._id}
            building={building}
            onShowMapModal={() => setPreviewedBuildingMap(building)}
          />
        ))}
      </ul>

      {!isLoading && filteredSearchResults?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <i className="fa-solid fa-magnifying-glass fa-2x mb-2 text-gray-400" />
          <h3 className="text-lg font-bold">No results found</h3>
          <p>Sorry, we couldn't find any results matching your search.</p>
          <button
            type="button"
            className="text-cyan-700 mt-2"
            onClick={async () => {
              await setAppliedFiltersMap([]);
              fetchData();
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
