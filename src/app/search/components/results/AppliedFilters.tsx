"use client";

import { ReactElement, ReactNode, useContext, useMemo } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FilterType, FirestoreWhereClause } from "@/app/types/global";
import { FilterIcons, FilterLabels } from "@/app/constants/general";
import AppliedFilterPill from "./AppliedFilterPill";

export default function AppliedFilters(): ReactElement {
  const {
    currentAppliedFilters,
    setCurrentAppliedFilters,
    fetchTextAndFilterData,
    fetchFirestoreData,
    isLoading,
    currentSort,
    currentSearchString,
  } = useContext(SearchContext);

  const appliedFiltersList: { k: FilterType; v: ReactNode }[] = useMemo(() => {
    const clauses = Object.entries(currentAppliedFilters) as [
      FilterType,
      FirestoreWhereClause[]
    ][];

    if (clauses.length === 0) return [];

    return clauses
      .filter((c) => c[1].length > 0)
      .map((c) => ({
        k: c[0],
        v: (
          <>
            <i className={`fas ${FilterIcons[c[0]]} mr-1`} />
            {FilterLabels[c[0]]}
            {/* Display the range for YEAR_BUILT filter */}
            {c[0] === "YEAR_BUILT" &&
              ` (${c[1].map((clause) => clause.value).join(" to ")})`}
          </>
        ),
      }));
  }, [currentAppliedFilters]);

  const handleClick = (k: FilterType) => {
    // Remove applied filter and re-run the query
    const { [k as FilterType]: removed, ...rest } = currentAppliedFilters;
    const updatedFiltersMap = rest;
    setCurrentAppliedFilters(updatedFiltersMap);

    if (currentSearchString?.length === 0) {
      fetchFirestoreData({
        filters: updatedFiltersMap,
        sort: currentSort, // Keep existing sort
      });
    } else if (currentSearchString?.length > 0) {
      fetchTextAndFilterData({
        query: currentSearchString,
        filters: updatedFiltersMap,
        sort: currentSort,
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {appliedFiltersList.map(({ k, v }) => (
        <AppliedFilterPill
          key={k}
          label={v}
          disabled={isLoading}
          onClick={() => handleClick(k)}
        />
      ))}
    </div>
  );
}
