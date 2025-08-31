import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Sort, YearBuiltFilter } from "../types/global";
import { filterQueryKeys } from "../constants/general";

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
}: {
  params: URLSearchParams;
  pathname: string;
  replace: (href: string, options?: NavigateOptions) => void;
  sort: Sort;
  page?: number;
  query?: string;
  filters: string[];
  yearBuiltFilter: YearBuiltFilter;
  wardFilter: number;
}) => {
  const setPageParams = (p: number) => {
    if (p == null || p === 0) {
      params.delete("page");
    } else {
      params.set("page", `${p + 1}`);
    }
  };

  const setSortParams = (s: Sort) => {
    if (s === "ward_number") {
      params.delete("sort");
    } else if (s != null) {
      params.set("sort", `${s}`);
    }
  };

  const setSearchParams = (query?: string) => {
    if (query == null || query === "") {
      params.delete("q");
    } else {
      params.set("q", `${query}`);
    }
  };

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

  const setWardParams = (ward?: number) => {
    if (ward) {
      params.set("ward", `${ward}`);
    } else {
      params.delete("ward");
    }
  };

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
