"use client";

import { ReactElement, useContext } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { sortLabels, sortOptions } from "@/app/constants/general";
import Dropdown from "@/app/components/utils/Dropdown";
import { Sort } from "@/app/types/global";

export default function SearchSortBy(): ReactElement {
  const { isLoading, searchCount, currentFilters, setFilter, fetchData } =
    useContext(SearchContext);
  const { sort } = currentFilters;

  // Query with new sort option, reset to first page and close the dropdown after applying a sort
  const onSelect = (key: Sort) => {
    if (key === sort) return;

    setFilter("sort", key);
    fetchData({ sort: key });
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-nowrap">Sort by:</span>

      <Dropdown<Sort>
        selectedOption={{
          key: sort,
          label: sortLabels[sort],
        }}
        disabled={isLoading || searchCount === 0}
        options={sortOptions}
        onSelect={onSelect}
      />
    </div>
  );
}
