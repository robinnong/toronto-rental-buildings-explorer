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

    const keyValuePairs: { k: FilterType; v: ReactNode }[] = [];

    clauses.forEach((key) => {
      if (key === "mid_rise") {
        keyValuePairs.push({ k: key, v: "Mid rise" });
      } else if (key === "year_built") {
        keyValuePairs.push({ k: key, v: "Year built" });
      } else {
        keyValuePairs.push({
          k: key,
          v:
            (
              <>
                <i className={`fas ${filterIcons[key]} mr-1`} />
                {filterLabels[key]}
              </>
            ) || camelCaseToTitleCase(key),
        });
      }
    });

    return keyValuePairs;
  }, [appliedFiltersMap]);

  return (
    <div className="flex flex-wrap gap-1">
      {appliedFiltersList.map(({ k, v }) => (
        <SearchBarAppliedFilterPill
          key={k}
          label={v}
          onClick={async () => {
            // Remove applied filter and re-run the query
            await setAppliedFiltersMap((prev) => {
              const { [k as FilterType]: removed, ...rest } = prev;
              return rest;
            });
            fetchData(appliedFiltersMap);
          }}
        />
      ))}
    </div>
  );
}
