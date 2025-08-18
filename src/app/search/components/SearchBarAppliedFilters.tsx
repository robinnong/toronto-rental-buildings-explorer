"use client";

import { ReactElement, ReactNode, useContext, useMemo } from "react";
import { SearchContext } from "@/app/hooks/useSearchContext";
import { FilterType } from "@/app/types/global";
import { camelCaseToTitleCase } from "@/app/lib/camelCaseToTitleCase";
import SearchBarAppliedFilterPill from "./SearchBarAppliedFilterPill";
import { filterIcons, filterLabels } from "@/app/constants/general";

export default function SearchBarAppliedFilters(): ReactElement {
  const { appliedFiltersMap, setAppliedFiltersMap, fetchData } =
    useContext(SearchContext);

  const appliedFiltersList: { k: FilterType; v: ReactNode }[] = useMemo(() => {
    const clauses = Object.keys(appliedFiltersMap) as FilterType[];

    if (clauses.length === 0) return [];

    return clauses.map((key) => ({
      k: key,
      v:
        (
          <>
            <i className={`fas ${filterIcons[key]} mr-1`} />
            {filterLabels[key]}
          </>
        ) || camelCaseToTitleCase(key),
    }));
  }, [appliedFiltersMap]);

  return (
    <div className="flex flex-col gap-1">
      <span>Applied filters:</span>

      <div className="flex flex-wrap gap-1">
        {appliedFiltersList.map(({ k, v }) => (
          <SearchBarAppliedFilterPill
            key={k}
            label={v}
            onClick={async () => {
              // Remove applied filter and re-run the query
              const { [k as FilterType]: removed, ...rest } = appliedFiltersMap;
              const updatedFiltersMap = rest;
              setAppliedFiltersMap(updatedFiltersMap);
              fetchData(updatedFiltersMap);
            }}
          />
        ))}
      </div>
    </div>
  );
}
