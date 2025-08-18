"use client";

import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import Modal from "@/app/components/utils/Modal";
import { AppliedFilterMap } from "@/app/types/global";
import BuildingAgeRangeFilters from "../filters/BuildingAgeRangeFilters";
import BuildingFeatureFilters from "../filters/BuildingFeatureFilters";
import BuildingStoreysFilters from "../filters/BuildingStoreysFilters";

type Props = {
  onClose: () => void;
};

/**
 * Modal component for applying search filters.
 *
 * @param {Function} onClose Callback function to close the modal.
 */
export default function FiltersModal({ onClose }: Props): ReactElement {
  const { isLoading, appliedFiltersMap, setAppliedFiltersMap, fetchData } =
    useContext(SearchContext);

  const [currentSelectedFilters, setCurrentSelectedFilters] =
    useState<AppliedFilterMap>({} as AppliedFilterMap);

  useEffect(() => {
    setCurrentSelectedFilters(appliedFiltersMap);
  }, [appliedFiltersMap]);

  const handleSubmit = useCallback(() => {
    setAppliedFiltersMap(currentSelectedFilters);
    fetchData(currentSelectedFilters);
    onClose();
  }, [currentSelectedFilters]);

  return (
    <Modal onClickOutside={onClose}>
      {/* Modal header */}
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="border-b border-gray-200 p-3 flex justify-between">
          <h4 className="font-semibold">Filter by:</h4>

          <button type="button" onClick={onClose}>
            <span className="sr-only">Close</span>
            <i className="fa-solid fa-xmark fa-xl text-cyan-600" />
          </button>
        </div>

        {/* Modal body - filters */}
        <div className="p-4 flex flex-col gap-6 overflow-y-auto h-full">
          <BuildingAgeRangeFilters
            currentSelectedFilters={currentSelectedFilters}
            setCurrentSelectedFilters={setCurrentSelectedFilters}
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
            disabled={isLoading}
            onClick={() => setCurrentSelectedFilters({} as AppliedFilterMap)}
          >
            Clear all
          </button>
          <button
            type="submit"
            className="bg-cyan-600 text-white py-2 px-4 rounded"
            disabled={isLoading}
          >
            Apply filters
          </button>
        </div>
      </form>
    </Modal>
  );
}
