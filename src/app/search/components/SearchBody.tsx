"use client";

import { FetchDataResponse } from "@/app/types/global";
import { Dispatch, ReactElement, useState } from "react";
import SearchResults from "./results/SearchResultsList";
import MapModal from "./modals/MapModal";
import FiltersModal from "./modals/FiltersModal";

type Props = {
  showFiltersModal: boolean;
  setShowFiltersModal: Dispatch<React.SetStateAction<boolean>>;
};
export default function SearchBody({
  showFiltersModal,
  setShowFiltersModal,
}: Props): ReactElement {
  const [previewedBuildingMap, setPreviewedBuildingMap] =
    useState<FetchDataResponse | null>(null);

  return (
    <main className="w-full h-full grow-1 mx-auto max-w-3xl pt-4 pb-8 px-4">
      <SearchResults setPreviewedBuildingMap={setPreviewedBuildingMap} />

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
    </main>
  );
}
