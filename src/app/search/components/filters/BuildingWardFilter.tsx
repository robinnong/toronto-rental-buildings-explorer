"use client";

import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import ward25NamesNumbers from "@/app/constants/ward25NamesNumbers";
import { SearchContext } from "@/app/hooks/useSearchContext";
import Dropdown from "@/app/components/utils/Dropdown";

type Props = {
  selectedWardFilter: number;
  setSelectedWardFilter: Dispatch<SetStateAction<number>>;
};

/**
 * Search filter dropdown rendered by <FiltersModal />
 * Provides a dropdown to filter buildings by ward.
 */
export default function BuildingWardFilter({
  selectedWardFilter,
  setSelectedWardFilter,
}: Props): ReactElement {
  const { isLoading } = useContext(SearchContext);

  const options = Object.entries(ward25NamesNumbers).map(([key, label]) => ({
    key: Number(key),
    label,
  }));

  const onSelect = (key: number) => {
    setSelectedWardFilter(key);
  };

  return (
    <div>
      <h4 className="font-bold mb-2">Filter by ward</h4>

      <Dropdown<number>
        selectedOption={{
          key: selectedWardFilter,
          label: ward25NamesNumbers[selectedWardFilter],
        }}
        options={options}
        disabled={isLoading}
        onSelect={onSelect}
      />
    </div>
  );
}
