"use client";

import { ReactElement, useState } from "react";
import useSearchContext, { SearchContext } from "../hooks/useSearchContext";
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

        <footer className="text-center bg-gray-100 p-4">
          <p>
            ©2025&nbsp;
            <a
              className="underline font-semibold"
              href="https://github.com/robinnong"
              rel="noopener noreferrer"
              target="_blank"
            >
              Robin Nong
            </a>
            .
          </p>
        </footer>
      </div>
    </SearchContext.Provider>
  );
}
