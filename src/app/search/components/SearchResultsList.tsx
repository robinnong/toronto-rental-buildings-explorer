"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FetchDataResponse } from "@/app/types/global";
import SearchResultCard from "./SearchResultCard";
import SearchBarAppliedFilters from "./SearchBarAppliedFilters";
import ReactPaginate from "react-paginate";
import SearchSortBy from "./SearchSortBy";
import SearchNoResults from "./SearchNoResults";
import LoadingSkeleton from "./LoadingSkeleton";

type Props = {
  setPreviewedBuildingMap: Dispatch<SetStateAction<FetchDataResponse>>;
};

export default function SearchResultsList({
  setPreviewedBuildingMap,
}: Props): ReactElement {
  const {
    appliedFiltersMap,
    filteredSearchResults,
    page,
    setPage,
    setPageParams,
    isLoading,
  } = useContext(SearchContext);

  const pageResults: FetchDataResponse[] = useMemo(() => {
    const res = [...filteredSearchResults];

    return res.splice((page - 1) * 25, 25);
  }, [page, filteredSearchResults]);

  return (
    <div className="flex flex-col gap-2 h-full w-full mb-4">
      {filteredSearchResults?.length > 0 && (
        <div className="flex justify-between items-end">
          <span>
            Found <strong>{filteredSearchResults.length}</strong>&nbsp;result
            {filteredSearchResults?.length === 1 ? "" : "s"}
          </span>
          <SearchSortBy />
        </div>
      )}

      {Object.keys(appliedFiltersMap).length > 0 && <SearchBarAppliedFilters />}

      {isLoading && <LoadingSkeleton />}
      {!isLoading && (
        <ul className="flex flex-col gap-2 w-full h-full">
          {pageResults.map((building) => (
            <SearchResultCard
              key={building._id}
              building={building}
              onShowMapModal={() => setPreviewedBuildingMap(building)}
            />
          ))}
        </ul>
      )}

      <ReactPaginate
        className="flex justify-center gap-4 mt-4"
        activeLinkClassName="font-bold bg-cyan-600 px-2 py-1 rounded-sm text-white"
        pageClassName="cursor-pointer"
        disabledClassName="text-gray-400 cursor-not-allowed"
        forcePage={page - 1}
        pageCount={Math.round(filteredSearchResults?.length / 25)}
        onClick={({ isPrevious, isNext }) => {
          if (isPrevious && page > 1) {
            setPage(page - 1);
            setPageParams(page - 1);
          } else if (isNext && page * 25 < filteredSearchResults.length) {
            setPage(page + 1);
            setPageParams(page + 1);
          }
        }}
        onPageChange={({ selected }) => {
          setPage(selected + 1);
          setPageParams(selected + 1);
        }}
      />

      {!isLoading && filteredSearchResults?.length === 0 && <SearchNoResults />}
    </div>
  );
}
