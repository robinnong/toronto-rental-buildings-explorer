"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";

type Props = {
  setShowFiltersModal: Dispatch<SetStateAction<boolean>>;
};
export default function SearchHeader({
  setShowFiltersModal,
}: Props): ReactElement {
  const { isLoading, searchResults, setFilteredSearchResults } =
    useContext(SearchContext);

  const [searchString, setSearchString] = useState("");

  const handleSubmit = useCallback(() => {
    if (searchString.length > 0) {
      // Filter results by address or property management name based on the search query
      const res = searchResults?.filter(
        (apt) =>
          apt.SITE_ADDRESS?.toLowerCase().includes(
            searchString.toLowerCase()
          ) ||
          apt.PROP_MANAGEMENT_COMPANY_NAME?.toLowerCase().includes(
            searchString.toLowerCase()
          )
      );

      setFilteredSearchResults(res);
    } else {
      setFilteredSearchResults(searchResults);
    }
  }, [searchResults, searchString]);

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
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            className="w-full rounded-full py-2 px-4 border border-solid border-gray-300 focus:border-cyan-700 pr-8"
            type="text"
            id="search"
            placeholder="Search by address or property management name"
            disabled={isLoading}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          {searchString?.length > 0 && (
            <button
              className="absolute top-0 right-3 bottom-0"
              type="button"
              onClick={() => setSearchString("")}
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
