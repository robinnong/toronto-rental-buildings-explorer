"use client";

import { ReactElement, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchFilterContext";
import Modal from "@/app/components/utils/Modal";
import BuildingAgeRangeFilters from "./BuildingAgeRangeFilters";
import BuildingFeatureFilters from "./BuildingFeatureFilters";
import BuildingStoreysFilters from "./BuildingStoreysFilters";

type Props = {
  onClose: () => void;
};

/**
 * Modal component for applying search filters.
 *
 * @param {Function} onClose Callback function to close the modal.
 */
export default function FiltersModal({ onClose }: Props): ReactElement {
  const { isLoading, appliedFilters, setAppliedFilters, fetchData } =
    useContext(SearchContext);

  const handleSubmit = () => {
    fetchData();
    onClose();
  };

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
          <BuildingAgeRangeFilters disabled={isLoading} />
          <BuildingStoreysFilters
            disabled={isLoading}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
          />
          <BuildingFeatureFilters
            disabled={isLoading}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
          />
        </div>

        {/* Modal footer - actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button
            type="button"
            className="text-cyan-700"
            onClick={() => setAppliedFilters([])}
          >
            Clear all
          </button>
          <button
            type="submit"
            className="bg-cyan-600 text-white py-2 px-4 rounded"
          >
            Apply filters
          </button>
        </div>
      </form>
    </Modal>
  );
}
