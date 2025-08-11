"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { SearchContext } from "./hooks/useSearchFilterContext";

type Props = {
  setShowFiltersModal: Dispatch<SetStateAction<boolean>>;
};
export default function SearchBar({
  setShowFiltersModal,
}: Props): ReactElement {
  const { isLoading, filteredSearchResults, setFilteredSearchResults } =
    useContext(SearchContext);

  const [searchString, setSearchString] = useState("");

  const handleSubmit = useCallback(() => {
    if (filteredSearchResults.length > 0) {
      // Filter results by address or property management company name based on the search query
      const res = filteredSearchResults.filter(
        (apt) =>
          apt.SITE_ADDRESS.toLowerCase().includes(searchString.toLowerCase()) ||
          apt.PROP_MANAGEMENT_COMPANY_NAME.toLowerCase().includes(
            searchString.toLowerCase()
          )
      );

      setFilteredSearchResults(res);
    } else {
      setFilteredSearchResults([]);
    }
  }, [filteredSearchResults, searchString]);

  return (
    <div className="flex items-center justify-center gap-4">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            className="w-full rounded-full py-2 px-4 border border-solid border-gray-300 focus:border-cyan-700 pr-10"
            type="text"
            id="search"
            placeholder="Search by address or property management name"
            disabled={isLoading}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          {searchString?.length > 0 && (
            <button
              className="absolute top-0 right-4 bottom-0"
              type="button"
              disabled={isLoading}
              onClick={() => setSearchString("")}
            >
              <i className="fa-solid fa-xmark text-gray-500" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-cyan-600 text-white p-2 rounded-full"
          disabled={isLoading}
        >
          <i className="fa-solid fa-magnifying-glass" />
        </button>
      </form>

      <button
        type="button"
        className="border rounded-full border-gray-300 p-2 hover:bg-sky-50 hover:border-cyan-600 hover:text-cyan-700"
        onClick={() => setShowFiltersModal((prev) => !prev)}
      >
        <i className="fa-solid fa-sliders mr-1" />
        Filters
      </button>
    </div>
  );
}
