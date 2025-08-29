import { queryKeyToFilter } from "../constants/general";
import { AppSearchParams, FilterType, YearBuiltFilter } from "../types/global";
import { SearchContextModel } from "./useSearchContext";

/**
 * Custom hook that translates the url query params from '/search' route to search params for the initial data fetch
 */
export default function useUrlQueryParams(searchContext: SearchContextModel): {
  getSearchParams: (q: AppSearchParams) => void;
} {
  const getSearchParams = async ({
    sort = "ward_number",
    page,
    q,
    year_built_start,
    year_built_end,
    features,
  }: AppSearchParams) => {
    // Parse 'feature' filters as FilterType[]
    const filters: FilterType[] = [];
    const featureKeys = decodeURIComponent(features)?.split(",") || [];
    featureKeys.forEach((feature) => {
      // Validate the key as a FilterType before adding it to featureFilters
      if (queryKeyToFilter[feature]) {
        filters.push(queryKeyToFilter[feature] as FilterType);
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

    const newSearchParams = {
      sort,
      page: parseInt(page, 10) - 1 || 0,
      query: q,
      filters,
      yearBuiltFilter,
    };

    searchContext.setCurrentSort(newSearchParams.sort);
    searchContext.setCurrentSearchString(newSearchParams.query);
    searchContext.setCurrentBuildingFeatureFilters(newSearchParams.filters);
    searchContext.setCurrentYearBuiltFilter(newSearchParams.yearBuiltFilter);
    searchContext.setCurrentPage(newSearchParams.page);

    // Initial data fetch on load
    searchContext.fetchData(newSearchParams);
  };

  return { getSearchParams };
}
