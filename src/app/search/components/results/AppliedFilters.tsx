"use client";

import { ReactElement, ReactNode, useContext, useMemo } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FilterType } from "@/app/types/global";
import { FilterIcons, FilterLabels } from "@/app/constants/general";
import AppliedFilterPill from "./AppliedFilterPill";

export default function AppliedFilters(): ReactElement {
  const {
    isLoading,
    currentBuildingFeatureFilters,
    setCurrentBuildingFeatureFilters,
    currentYearBuiltFilter,
    setCurrentYearBuiltFilter,
    fetchAlgoliaData,
  } = useContext(SearchContext);

  const appliedYearBuiltFilter: { k: FilterType; v: ReactNode } =
    useMemo(() => {
      if (!currentYearBuiltFilter?.end && !currentYearBuiltFilter?.start) {
        return null;
      }

      return {
        k: "YEAR_BUILT",
        v: (
          <>
            <i className={`fas ${FilterIcons.YEAR_BUILT} mr-1`} />
            {FilterLabels.YEAR_BUILT}&nbsp;
            {/* Display the range for YEAR_BUILT filter */}
            {/* Example: Year after (1900 to 2018) */}
            {currentYearBuiltFilter.start != null &&
              currentYearBuiltFilter.end != null &&
              `(${currentYearBuiltFilter.start} to ${currentYearBuiltFilter.end})`}
            {/* Example: Year after (before 2000) */}
            {currentYearBuiltFilter.start != null &&
              currentYearBuiltFilter.end == null &&
              `(after ${currentYearBuiltFilter.start})`}
            {/* Example: Year built (before 2000) */}
            {currentYearBuiltFilter.start == null &&
              currentYearBuiltFilter.end != null &&
              `(before ${currentYearBuiltFilter.end})`}
          </>
        ),
      };
    }, [currentYearBuiltFilter]);

  const appliedFiltersList: { k: FilterType; v: ReactNode }[] = useMemo(
    () =>
      currentBuildingFeatureFilters.length > 0
        ? currentBuildingFeatureFilters.map((filter) => ({
            k: filter,
            v: (
              <>
                <i className={`fas ${FilterIcons[filter]} mr-1`} />
                {FilterLabels[filter]}
              </>
            ),
          }))
        : [],
    [currentBuildingFeatureFilters]
  );

  const removeFeatureFilter = (k: FilterType) => {
    // Remove applied filter and re-run the query
    const updatedFilters = currentBuildingFeatureFilters.filter(
      (key) => key !== k
    );
    setCurrentBuildingFeatureFilters(updatedFilters);
    fetchAlgoliaData({ filters: updatedFilters });
  };

  const removeYearBuiltFilter = () => {
    setCurrentYearBuiltFilter({});
    fetchAlgoliaData({ yearBuiltFilter: {} });
  };

  return (
    <div className="flex flex-wrap gap-1">
      {appliedFiltersList.map(({ k, v }) => (
        <AppliedFilterPill
          key={k}
          label={v}
          disabled={isLoading}
          onClick={() => removeFeatureFilter(k)}
        />
      ))}
      {appliedYearBuiltFilter && (
        <AppliedFilterPill
          key={appliedYearBuiltFilter.k}
          label={appliedYearBuiltFilter.v}
          disabled={isLoading}
          onClick={() => removeYearBuiltFilter()}
        />
      )}
    </div>
  );
}
