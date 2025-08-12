"use client";

import { ReactElement, useState } from "react";
import useSearchContext, {
  SearchContext,
} from "../hooks/useSearchFilterContext";
import SearchBar from "./components/SearchBar";
import SearchBody from "./components/SearchBody";

export default function SearchPage(): ReactElement {
  const searchContext = useSearchContext();

  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);

  return (
    <SearchContext.Provider value={searchContext}>
      <div className="min-h-screen flex flex-col">
        <header className="flex items-center sticky z-10 top-0 flex bg-white border-b border-gray-100 shadow-sm p-3 max-lg:justify-between">
          <h1 className="lg:w-1/3 text-md font-extrabold text-cyan-800">
            <a href="/" className="flex items-center gap inline-block">
              <i className="fa-solid fa-building mr-1" />
              <span className="max-sm:hidden">
                Toronto Rental Building Explorer
              </span>
            </a>
          </h1>
          <div className="lg:w-1/3">
            <SearchBar setShowFiltersModal={setShowFiltersModal} />
          </div>
        </header>

        <SearchBody
          showFiltersModal={showFiltersModal}
          setShowFiltersModal={setShowFiltersModal}
        />

        <footer className="bg-cyan-700 text-white h-[48px] flex items-center justify-center">
          <p>
            ©2025&nbsp;
            <a
              className="underline"
              href="https://github.com/robinnong"
              rel="noopener noreferrer"
              target="_blank"
            >
              Robin Nong
            </a>
            . Photo by&nbsp;
            <a
              className="underline"
              href="https://www.pexels.com/photo/high-rise-buildings-under-blue-sky-1868676/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ennvisionn
            </a>
            .
          </p>
        </footer>
      </div>
    </SearchContext.Provider>
  );
}
