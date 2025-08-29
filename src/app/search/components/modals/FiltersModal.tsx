"use client";

import { ReactElement, useContext, useEffect, useState } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import Modal from "@/app/components/utils/Modal";
import { FilterType, YearBuiltFilter } from "@/app/types/global";
import BuildingAgeRangeFilters from "../filters/BuildingAgeRangeFilters";
import BuildingFeatureFilters from "../filters/BuildingFeatureFilters";
import BuildingStoreysFilters from "../filters/BuildingStoreysFilters";
import { defaultMaxYear, defaultMinYear } from "@/app/constants/general";

type Props = {
  onClose: () => void;
};

/**
 * Modal component for applying search filters.
 *
 * @param {Function} onClose Callback function to close the modal.
 */
export default function FiltersModal({ onClose }: Props): ReactElement {
  const {
    currentBuildingFeatureFilters,
    setCurrentBuildingFeatureFilters,
    currentYearBuiltFilter,
    setCurrentYearBuiltFilter,
    fetchData,
  } = useContext(SearchContext);

  const [currentSelectedFilters, setCurrentSelectedFilters] = useState<
    FilterType[]
  >([]);
  const [currentSelectedYearBuiltFilter, setCurrentSelectedYearBuiltFilter] =
    useState<YearBuiltFilter>({
      start: defaultMinYear,
      end: defaultMaxYear,
    });
  const [isValid, setIsValid] = useState<boolean>(true);

  // Initialize state - building feature filters
  useEffect(() => {
    setCurrentSelectedFilters(currentBuildingFeatureFilters);
  }, [currentBuildingFeatureFilters]);

  // Initialize state - year built range filter
  useEffect(() => {
    if (Object.keys(currentYearBuiltFilter).length > 0) {
      setCurrentSelectedYearBuiltFilter(currentYearBuiltFilter);
    }
  }, [currentYearBuiltFilter]);

  const handleSubmit = () => {
    let updatedYearBuiltFilter = {} as YearBuiltFilter;

    if (currentSelectedYearBuiltFilter.start !== defaultMinYear) {
      updatedYearBuiltFilter.start = currentSelectedYearBuiltFilter.start;
    }
    if (currentSelectedYearBuiltFilter.end !== defaultMaxYear) {
      updatedYearBuiltFilter.end = currentSelectedYearBuiltFilter.end;
    }

    setCurrentYearBuiltFilter(updatedYearBuiltFilter);
    setCurrentBuildingFeatureFilters(currentSelectedFilters);

    fetchData({
      filters: currentSelectedFilters,
      yearBuiltFilter: updatedYearBuiltFilter,
    });

    onClose();
  };

  const handleReset = () => {
    setCurrentSelectedFilters([]);
    setCurrentSelectedYearBuiltFilter({});
  };

  return (
    <Modal onClickOutside={onClose}>
      {/* Modal header */}
      <form
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

          <button type="button" onClick={onClose}>
            <span className="sr-only">Close</span>
            <i className="fas fa-xmark fa-xl text-cyan-600" />
          </button>
        </div>

        {/* Modal body - filters */}
        <div className="p-4 flex flex-col gap-6 overflow-y-auto h-full">
          <BuildingAgeRangeFilters
            setIsValid={setIsValid}
            selectedYearBuiltFilter={currentSelectedYearBuiltFilter}
            setSelectedYearBuiltFilter={setCurrentSelectedYearBuiltFilter}
          />
          <BuildingStoreysFilters
            currentSelectedFilters={currentSelectedFilters}
            setCurrentSelectedFilters={setCurrentSelectedFilters}
          />
          <BuildingFeatureFilters
            currentSelectedFilters={currentSelectedFilters}
            setCurrentSelectedFilters={setCurrentSelectedFilters}
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
