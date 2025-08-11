"use client";

import { ReactElement, useState } from "react";
import { FetchDataResponse } from "../types/global";
import MapModal from "./MapModal";
import SearchBar from "./SearchBar";
import FiltersModal from "./FiltersModal";
import SearchResultsList from "./SearchResultsList";

export default function Main(): ReactElement {
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
  const [previewedBuildingMap, setPreviewedBuildingMap] =
    useState<FetchDataResponse | null>(null);

  return (
    <div>
      <header className="flex items-center sticky z-10 top-0 flex bg-white border-b border-gray-100 shadow-sm p-3">
        <h1 className="w-1/3 text-lg font-extrabold font-serif text-cyan-800">
          <i className="fa-solid fa-building mr-1" />
          Toronto Rental Building Index
        </h1>
        <div className="w-1/3">
          <SearchBar setShowFiltersModal={setShowFiltersModal} />
        </div>
      </header>

      <main className="flex flex-col w-full h-full mx-auto max-w-3xl">
        <div className="pt-4 pb-8 px-6 w-full h-full">
          <SearchResultsList
            setPreviewedBuildingMap={setPreviewedBuildingMap}
          />
          {/* Modals: */}
          {previewedBuildingMap && (
            <MapModal
              address={previewedBuildingMap.SITE_ADDRESS}
              postalCode={previewedBuildingMap.PCODE}
              onClose={() => setPreviewedBuildingMap(null)}
            />
          )}
          {showFiltersModal && (
            <FiltersModal onClose={() => setShowFiltersModal(false)} />
          )}
        </div>
      </main>

      <footer className="bg-gray-50 p-4 text-center">
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
  );
}
