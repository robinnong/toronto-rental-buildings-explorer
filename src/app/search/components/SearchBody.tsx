"use client";

import { ReactElement, useState } from "react";
import { AppSearchParams, FetchDataResponse } from "@/app/types/global";
import SearchResults from "./results/SearchResultsList";
import MapModal from "./modals/MapModal";
import FiltersModal from "./modals/FiltersModal";
import SearchHeader from "./SearchHeader";
import useSearchContext, { SearchContext } from "@/app/hooks/useSearchContext";

type Props = {
  searchParams: Promise<AppSearchParams>;
};

export default function SearchBody({ searchParams }: Props): ReactElement {
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
  const [showMapModal, setShowMapModal] = useState<FetchDataResponse>(null);

  const searchContext = useSearchContext({ initialSearchParams: searchParams });

  return (
    <SearchContext.Provider value={searchContext}>
      <header className="flex items-center sticky z-10 top-0 flex bg-white border-b border-gray-100 shadow-sm p-3 max-lg:justify-between">
        <h1 className="lg:w-1/3 text-md font-extrabold text-cyan-800">
          <a href="/" className="flex items-center gap inline-block">
            <i className="fas fa-building mr-1" />
            <span className="max-sm:hidden">
              Toronto Rental Building Explorer
            </span>
          </a>
        </h1>
        <div className="lg:w-1/3">
          <SearchHeader setShowFiltersModal={setShowFiltersModal} />
        </div>
      </header>

      <main className="w-full h-full grow-1 mx-auto max-w-3xl pt-4 pb-8 px-4">
        <SearchResults setShowMapModal={setShowMapModal} />

        {/* Modals: */}
        {showMapModal && (
          <MapModal
            address={showMapModal.SITE_ADDRESS}
            postalCode={showMapModal.PCODE}
            onClose={() => setShowMapModal(null)}
          />
        )}
        {showFiltersModal && (
          <FiltersModal onClose={() => setShowFiltersModal(false)} />
        )}
      </main>
    </SearchContext.Provider>
  );
}
