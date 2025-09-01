import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FetchAlgoliaDataParams, Sort, YearBuiltFilter } from "../types/global";
import { filterQueryKeys } from "../constants/general";

type GenerateUrlQueryParams = {
  params: URLSearchParams;
  pathname: string;
  replace: (href: string, options?: NavigateOptions) => void;
} & FetchAlgoliaDataParams;

const generateUrlQueryParams = ({
  params,
  pathname,
  replace,
  sort,
  page,
  query,
  filters,
  yearBuiltFilter,
  wardFilter,
}: GenerateUrlQueryParams) => {
  // Example output: 'page=10'
  const setPageParams = (p: number) => {
    if (p == null || p === 0) {
      params.delete("page");
    } else {
      params.set("page", `${p + 1}`);
    }
  };

  // Example output: 'sort=year_built_asc'
  const setSortParams = (s: Sort) => {
    if (s === "ward_number") {
      params.delete("sort");
    } else if (s != null) {
      params.set("sort", `${s}`);
    }
  };

  // Example output: 'q=eglinton'
  const setSearchParams = (query?: string) => {
    if (query == null || query === "") {
      params.delete("q");
    } else {
      params.set("q", `${query}`);
    }
  };

  // Example output: 'year_built_start=1999&year_built_end=2005'
  const setYearBuiltParams = ({ start, end }: YearBuiltFilter) => {
    if (start) {
      params.set("year_built_start", `${start}`);
    } else {
      params.delete("year_built_start");
    }
    if (end) {
      params.set("year_built_end", `${end}`);
    } else {
      params.delete("year_built_end");
    }
  };

  // Example output: 'ward=6'
  const setWardParams = (ward?: number) => {
    if (ward) {
      params.set("ward", `${ward}`);
    } else {
      params.delete("ward");
    }
  };

  // Example output: 'features=barrier_free_entrance%2Cmid_rise'
  const setFilterParams = (filters: string[]) => {
    if (filters.length === 0) {
      // Clear the "features" from query params if there are no filters applied
      params.delete("features");
    }

    const filtersList: string[] = [];

    filters.forEach((key) => {
      if (!!filterQueryKeys[key]) {
        filtersList.push(filterQueryKeys[key]);
      }
    });
    if (filtersList.length > 0) {
      params.set("features", filtersList.join(","));
    }
  };

  setSortParams(sort);
  setPageParams(page);
  setSearchParams(query);
  setFilterParams(filters);
  setYearBuiltParams(yearBuiltFilter);
  setWardParams(wardFilter);

  replace(`${pathname}?${params.toString()}`);
};

export default generateUrlQueryParams;
