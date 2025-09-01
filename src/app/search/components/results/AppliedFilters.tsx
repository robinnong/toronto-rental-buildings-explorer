"use client";

import { ReactElement, ReactNode, useContext, useMemo } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FilterType } from "@/app/types/global";
import { FilterIcons, FilterLabels } from "@/app/constants/general";
import AppliedFilterPill from "./AppliedFilterPill";
import ward25NamesNumbers from "@/app/constants/ward25NamesNumbers";

export default function AppliedFilters(): ReactElement {
  const {
    isLoading,
    currentBuildingFeatureFilters,
    setCurrentBuildingFeatureFilters,
    currentYearBuiltFilter,
    setCurrentYearBuiltFilter,
    currentWardFilter,
    setCurrentWardFilter,
    fetchData,
  } = useContext(SearchContext);

  const appliedWardFilter: { k: FilterType; v: ReactNode } = useMemo(() => {
    if (!currentWardFilter) return null;

    return {
      k: "WARD",
      v: (
        <>
          <i className={`fas ${FilterIcons.WARD} mr-1`} />
          {FilterLabels.WARD}&nbsp;
          {`(${ward25NamesNumbers[currentWardFilter]})`}
        </>
      ),
    };
  }, [currentWardFilter]);

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
    fetchData({ buildingFeatureFilters: updatedFilters });
  };

  const removeYearBuiltFilter = () => {
    setCurrentYearBuiltFilter({});
    fetchData({ yearBuiltFilter: {} });
  };

  const removeWardFilter = () => {
    setCurrentWardFilter(0);
    fetchData({ wardFilter: 0 });
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
      {appliedWardFilter && (
        <AppliedFilterPill
          key={appliedWardFilter.k}
          label={appliedWardFilter.v}
          disabled={isLoading}
          onClick={() => removeWardFilter()}
        />
      )}
    </div>
  );
}
