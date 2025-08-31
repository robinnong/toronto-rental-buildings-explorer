"use client";

import { ReactElement, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { sortLabels, sortOptions } from "@/app/constants/general";
import Dropdown from "@/app/components/utils/Dropdown";
import { Sort } from "@/app/types/global";

export default function SearchSortBy(): ReactElement {
  const { currentSort, isLoading, searchCount, setCurrentSort, fetchData } =
    useContext(SearchContext);

  // Query with new sort option, reset to first page and close the dropdown after applying a sort
  const onSelect = (key: Sort) => {
    if (key === currentSort) return;

    setCurrentSort(key);
    fetchData({ sort: key });
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-nowrap">Sort by:</span>

      <Dropdown<Sort>
        selectedOption={{ key: currentSort, label: sortLabels[currentSort] }}
        disabled={isLoading || searchCount === 0}
        options={sortOptions}
        onSelect={onSelect}
      />
    </div>
  );
}
