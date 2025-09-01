"use client";

import { ReactElement, ReactNode, useContext, useMemo } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FilterType } from "@/app/types/global";
import { FilterIcons, FilterLabels } from "@/app/constants/general";
import AppliedFilterPill from "./AppliedFilterPill";
import ward25NamesNumbers from "@/app/constants/ward25NamesNumbers";

export default function AppliedFilters(): ReactElement {
  const { isLoading, currentFilters, setFilter, fetchData } =
    useContext(SearchContext);
  const { buildingFeatures, ward, yearBuilt } = currentFilters;

  const appliedWardFilter: { k: FilterType; v: ReactNode } = useMemo(() => {
    if (!ward) return null;

    return {
      k: "WARD",
      v: (
        <>
          <i className={`fas ${FilterIcons.WARD} mr-1`} />
          {FilterLabels.WARD}&nbsp;
          {`(${ward25NamesNumbers[ward]})`}
        </>
      ),
    };
  }, [ward]);

  const appliedYearBuiltFilter: { k: FilterType; v: ReactNode } =
    useMemo(() => {
      if (!yearBuilt?.end && !yearBuilt?.start) {
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
            {yearBuilt.start != null &&
              yearBuilt.end != null &&
              `(${yearBuilt.start} to ${yearBuilt.end})`}
            {/* Example: Year after (before 2000) */}
            {yearBuilt.start != null &&
              yearBuilt.end == null &&
              `(after ${yearBuilt.start})`}
            {/* Example: Year built (before 2000) */}
            {yearBuilt.start == null &&
              yearBuilt.end != null &&
              `(before ${yearBuilt.end})`}
          </>
        ),
      };
    }, [yearBuilt]);

  const appliedFiltersList: { k: FilterType; v: ReactNode }[] = useMemo(
    () =>
      buildingFeatures.length > 0
        ? buildingFeatures.map((filter) => ({
            k: filter,
            v: (
              <>
                <i className={`fas ${FilterIcons[filter]} mr-1`} />
                {FilterLabels[filter]}
              </>
            ),
          }))
        : [],
    [buildingFeatures]
  );

  const removeFeatureFilter = (k: FilterType) => {
    // Remove applied filter and re-run the query
    const updatedFilters = buildingFeatures.filter((key) => key !== k);
    setFilter("buildingFeatures", updatedFilters);
    fetchData({ buildingFeatures: updatedFilters });
  };

  const removeYearBuiltFilter = () => {
    setFilter("yearBuilt", {});
    fetchData({ yearBuilt: {} });
  };

  const removeWardFilter = () => {
    setFilter("ward", 0);
    fetchData({ ward: 0 });
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
