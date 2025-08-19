"use client";

import { ReactElement, ReactNode, useContext, useMemo } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FilterType } from "@/app/types/global";
import camelCaseToTitleCase from "@/app/lib/camelCaseToTitleCase";
import { FilterIcons, FilterLabels } from "@/app/constants/general";
import AppliedFilterPill from "./AppliedFilterPill";

export default function AppliedFilters(): ReactElement {
  const { appliedFiltersMap, setAppliedFiltersMap, fetchData, isLoading } =
    useContext(SearchContext);

  const appliedFiltersList: { k: FilterType; v: ReactNode }[] = useMemo(() => {
    const clauses = Object.keys(appliedFiltersMap) as FilterType[];

    if (clauses.length === 0) return [];

    return clauses.map((key) => ({
      k: key,
      v:
        (
          <>
            <i className={`fas ${FilterIcons[key]} mr-1`} />
            {FilterLabels[key]}
          </>
        ) || camelCaseToTitleCase(key),
    }));
  }, [appliedFiltersMap]);

  return (
    <div className="flex flex-wrap gap-1">
      {appliedFiltersList.map(({ k, v }) => (
        <AppliedFilterPill
          key={k}
          label={v}
          disabled={isLoading}
          onClick={() => {
            // Remove applied filter and re-run the query
            const { [k as FilterType]: removed, ...rest } = appliedFiltersMap;
            const updatedFiltersMap = rest;
            setAppliedFiltersMap(updatedFiltersMap);
            fetchData(updatedFiltersMap);
          }}
        />
      ))}
    </div>
  );
}
