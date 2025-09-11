"use client";

import { ReactElement, useContext, useEffect, useState } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import Modal from "@/app/components/utils/Modal";
import { FilterType, YearBuiltFilter } from "@/app/types/global";
import BuildingAgeRangeFilters from "../filters/BuildingAgeRangeFilters";
import BuildingFeatureFilters from "../filters/BuildingFeatureFilters";
import BuildingStoreysFilters from "../filters/BuildingStoreysFilters";
import { defaultMaxYear, defaultMinYear } from "@/app/constants/general";
import BuildingWardFilter from "../filters/BuildingWardFilter";

type Props = {
  onClose: () => void;
};

/**
 * Modal component for applying search filters.
 *
 * @param {Function} onClose Callback function to close the modal.
 */
export default function FiltersModal({ onClose }: Props): ReactElement {
  const { currentFilters, setFilter, fetchData } = useContext(SearchContext);
  const { buildingFeatures, ward, yearBuilt } = currentFilters;

  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);
  const [selectedYearBuiltFilter, setSelectedYearBuiltFilter] =
    useState<YearBuiltFilter>({
      start: defaultMinYear,
      end: defaultMaxYear,
    });
  const [selectedWardFilter, setSelectedWardFilter] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);

  // Initialize state - building feature filters
  useEffect(() => {
    setSelectedFilters(buildingFeatures);
  }, [buildingFeatures]);

  // Initialize state - year built range filter
  useEffect(() => {
    if (Object.keys(yearBuilt).length > 0) {
      setSelectedYearBuiltFilter(yearBuilt);
    }
  }, [yearBuilt]);

  // Initialize state - ward filter
  useEffect(() => {
    setSelectedWardFilter(ward);
  }, [ward]);

  const handleSubmit = () => {
    let updatedYearBuiltFilter = {} as YearBuiltFilter;

    if (selectedYearBuiltFilter.start !== defaultMinYear) {
      updatedYearBuiltFilter.start = selectedYearBuiltFilter.start;
    }
    if (selectedYearBuiltFilter.end !== defaultMaxYear) {
      updatedYearBuiltFilter.end = selectedYearBuiltFilter.end;
    }

    setFilter("buildingFeatures", selectedFilters);
    setFilter("yearBuilt", updatedYearBuiltFilter);
    setFilter("ward", selectedWardFilter);

    fetchData({
      buildingFeatures: selectedFilters,
      yearBuilt: updatedYearBuiltFilter,
      ward: selectedWardFilter,
    });

    onClose();
  };

  const handleReset = () => {
    setSelectedFilters([]);
    setSelectedYearBuiltFilter({});
    setSelectedWardFilter(0);
  };

  return (
    <Modal onClose={onClose}>
      {/* Modal header */}
      <form
        className="overflow-hidden flex flex-col"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) {
            handleSubmit();
          }
        }}
      >
        <div className="border-b border-gray-200 p-3 flex justify-between">
          <h4 className="font-semibold">Filter by:</h4>

          <button type="button" onClick={() => onClose()}>
            <span className="sr-only">Close</span>
            <i className="fas fa-xmark fa-xl text-cyan-600" />
          </button>
        </div>

        {/* Modal body - filters */}
        <div className="p-4 flex flex-col gap-6 overflow-y-auto h-full shrink-1 grow-1">
          <BuildingAgeRangeFilters
            setIsValid={setIsValid}
            selectedYearBuiltFilter={selectedYearBuiltFilter}
            setSelectedYearBuiltFilter={setSelectedYearBuiltFilter}
          />
          <BuildingStoreysFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <BuildingWardFilter
            selectedWardFilter={selectedWardFilter}
            setSelectedWardFilter={setSelectedWardFilter}
          />
          <BuildingFeatureFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {/* Modal footer - actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button
            type="button"
            className="text-cyan-700"
            onClick={() => handleReset()}
          >
            Clear all
          </button>
          <button
            type="submit"
            className="bg-cyan-600 text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={!isValid}
          >
            Apply filters
          </button>
        </div>
      </form>
    </Modal>
  );
}
