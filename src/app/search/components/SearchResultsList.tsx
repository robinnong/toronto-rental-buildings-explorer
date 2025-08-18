"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FetchDataResponse, Sort } from "@/app/types/global";
import SearchResultCard from "./SearchResultCard";
import SearchBarAppliedFilters from "./SearchBarAppliedFilters";
import ReactPaginate from "react-paginate";
import { camelCaseToTitleCase } from "@/app/lib/camelCaseToTitleCase";

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
    sort,
    setSort,
    isLoading,
    fetchData,
  } = useContext(SearchContext);

  const pageResults: FetchDataResponse[] = useMemo(() => {
    const res = [...filteredSearchResults];

    return res.splice((page - 1) * 25, 25);
  }, [page, filteredSearchResults]);

  return (
    <div className="flex flex-col gap-2 h-full w-full mb-4">
      {Object.keys(appliedFiltersMap).length > 0 && (
        <div className="flex flex-col gap-1">
          <span>Applied filters:</span>
          <SearchBarAppliedFilters />
        </div>
      )}

      {filteredSearchResults?.length > 0 && (
        <div className="flex justify-between items-end">
          <span>
            Found <strong>{filteredSearchResults.length}</strong>&nbsp;result
            {filteredSearchResults?.length === 1 ? "" : "s"}
          </span>
          <div className="flex gap-2 items-center relative">
            <div>Sort by:</div>
            <div className="cursor-pointer font-bold border border-gray-300 hover:border-cyan-600 hover:bg-sky-50 hover:text-cyan-700 py-1 rounded-full px-3">
              {camelCaseToTitleCase(sort)}
            </div>
            <ul className="absolute top-7 cursor-pointer rounded-md bg-white right-0 border border-gray-300">
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
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-2 w-full h-full">
        {pageResults.map((building) => (
          <SearchResultCard
            key={building._id}
            building={building}
            onShowMapModal={() => setPreviewedBuildingMap(building)}
          />
        ))}
      </ul>

      <ReactPaginate
        className="flex justify-center gap-4 mt-4"
        activeLinkClassName="font-bold bg-cyan-600 px-2 py-1 rounded-sm text-white"
        pageClassName="cursor-pointer"
        disabledClassName="text-gray-400 cursor-not-allowed"
        pageCount={Math.round(filteredSearchResults?.length / 25)}
        onClick={(data) => {
          if (data.isPrevious && page > 1) {
            setPage(page - 1);
          } else if (data.isNext && page * 25 < filteredSearchResults.length) {
            setPage(page + 1);
          }
        }}
        onPageChange={(p) => {
          setPage(p.selected + 1);
        }}
      />

      {!isLoading && filteredSearchResults?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-2">
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
      )}
    </div>
  );
}
