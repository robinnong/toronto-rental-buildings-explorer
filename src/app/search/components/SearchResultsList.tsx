"use client";

import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import ReactPaginate from "react-paginate";
import { SearchContext } from "@/app/hooks/useSearchFilterContext";
import { FetchDataResponse } from "@/app/types/global";
import SearchResultCard from "./SearchResultCard";

type Props = {
  setPreviewedBuildingMap: Dispatch<SetStateAction<FetchDataResponse>>;
};

export default function SearchResultsList({
  setPreviewedBuildingMap,
}: Props): ReactElement {
  const { filteredSearchResults, page, setPage, isLoading } =
    useContext(SearchContext);

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {filteredSearchResults?.length > 0 && (
        <div className="flex justify-between">
          <span>
            Found <strong>{filteredSearchResults.length}</strong> building
            result
            {filteredSearchResults?.length === 1 ? "" : "s"}
          </span>

          <div className="flex gap-4">
            <button
              type="button"
              className="disabled:text-gray-500 hover:text-cyan-700"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <i className="fa-solid fa-chevron-left fa-xs" />
              Prev
            </button>
            |
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
        <div className="text-center py-4">
          <p>No results found</p>
        </div>
      )}

      {filteredSearchResults?.length > 0 && (
        <ReactPaginate
          className="flex justify-center gap-2 mt-4"
          pageCount={1}
          onPageChange={() => {
            // TODO
          }}
          pageRangeDisplayed={5}
        />
      )}
    </div>
  );
}
