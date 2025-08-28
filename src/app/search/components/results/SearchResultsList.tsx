"use client";

import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FetchDataResponse } from "@/app/types/global";
import SearchResultCard from "./SearchResultCard";
import AppliedFilters from "./AppliedFilters";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import SearchSortBy from "../sort/SearchSortBy";
import NoResults from "./NoResults";
import ReactPaginate from "react-paginate";

type Props = {
  setShowMapModal: Dispatch<SetStateAction<FetchDataResponse>>;
};

export default function SearchResultsList({
  setShowMapModal,
}: Props): ReactElement {
  const {
    isLoading,
    currentPage,
    searchCount,
    searchPagesTotal,
    searchResults,
    fetchAlgoliaData,
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

      <AppliedFilters />

      {isLoading && <LoadingSkeleton />}
      {searchCount > 0 && !isLoading && (
        <ul className="flex flex-col gap-2 w-full h-full">
          {searchResults.map((building) => (
            <SearchResultCard
              key={building._id}
              building={building}
              onShowMapModal={() => setShowMapModal(building)}
            />
          ))}
        </ul>
      )}

      {!isLoading && searchCount === 0 && <NoResults />}

      <ReactPaginate
        className={`flex justify-center gap-4 mt-4 ${
          searchCount === 0 ? "hidden" : ""
        }`}
        pageCount={searchPagesTotal}
        previousLabel={
          <span>
            <i className="fas fa-chevron-left mr-1" />
            Previous
          </span>
        }
        nextLabel={
          <span>
            Next
            <i className="fas fa-chevron-right ml-1" />
          </span>
        }
        activeLinkClassName="font-bold bg-cyan-600 px-2 py-1 rounded-sm text-white"
        pageClassName="cursor-pointer"
        previousClassName="cursor-pointer"
        nextClassName="cursor-pointer"
        disabledClassName="text-gray-400 cursor-not-allowed"
        onClick={({ isPrevious, isNext }) => {
          if (isPrevious && currentPage > 0) {
            fetchAlgoliaData({ page: currentPage - 1 });
          } else if (isNext && currentPage < searchPagesTotal - 1) {
            fetchAlgoliaData({ page: currentPage + 1 });
          }
        }}
        onPageChange={({ selected }) => {
          if (selected === currentPage) return;
          fetchAlgoliaData({ page: selected });
        }}
      />
    </div>
  );
}
