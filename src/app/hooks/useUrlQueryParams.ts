import { queryKeyToFilter } from "../constants/general";
import {
  AppSearchParams,
  FilterType,
  Sort,
  YearBuiltFilter,
} from "../types/global";
import { SearchContextModel } from "./useSearchContext";

/**
 * Custom hook that translates the url query params from '/search' route to search params for the initial data fetch
 */
export default function useUrlQueryParams(searchContext: SearchContextModel): {
  getSearchParams: (q: AppSearchParams) => void;
} {
  const getSearchParams = async ({
    sort,
    page,
    q,
    year_built_start,
    year_built_end,
    features,
  }: AppSearchParams) => {
    const sortFilter = (sort as Sort) || "ward_number";
    const pageFilter = parseInt(page, 10) - 1 || 0;

    // Parse 'feature' filters as FilterType[]
    const featuresFilters: FilterType[] = [];
    const featureKeys = decodeURIComponent(features)?.split(",") || [];
    featureKeys.forEach((feature) => {
      // Validate the key as a FilterType before adding it to featureFilters
      if (queryKeyToFilter[feature]) {
        featuresFilters.push(queryKeyToFilter[feature] as FilterType);
      }
    });

    // Parse 'year_built_*' filters as YearBuiltFilter
    const yearBuiltFilter = {} as YearBuiltFilter;
    if (year_built_start != null) {
      yearBuiltFilter.start = parseInt(year_built_start, 10);
    }
    if (year_built_end != null) {
      yearBuiltFilter.end = parseInt(year_built_end, 10);
    }

    searchContext.setCurrentSort(sortFilter);
    searchContext.setCurrentSearchString(q || "");
    searchContext.setCurrentBuildingFeatureFilters(featuresFilters);
    searchContext.setCurrentYearBuiltFilter(yearBuiltFilter);
    searchContext.setCurrentPage(pageFilter);

    // Initial data fetch on load
    searchContext.fetchData({
      sort: sortFilter,
      page: pageFilter,
      query: q,
      filters: featuresFilters,
      yearBuiltFilter,
    });
  };

  return { getSearchParams };
}
