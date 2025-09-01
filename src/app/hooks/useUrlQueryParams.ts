import { queryKeyToFilter } from "../constants/general";
import {
  AppSearchParams,
  FetchAlgoliaDataParams,
  FilterType,
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
    sort = "ward_number",
    page,
    q,
    year_built_start,
    year_built_end,
    features,
    ward,
  }: AppSearchParams) => {
    // Parse 'feature' filters as FilterType[]
    const buildingFeatureFilters: FilterType[] = [];
    const featureKeys = decodeURIComponent(features)?.split(",") || [];
    featureKeys.forEach((feature) => {
      // Validate the key as a FilterType before adding it to buildingFeatureFilters
      if (queryKeyToFilter[feature]) {
        buildingFeatureFilters.push(queryKeyToFilter[feature] as FilterType);
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

    const newSearchParams: FetchAlgoliaDataParams = {
      sort,
      page: parseInt(page, 10) - 1 || 0,
      query: q ?? "",
      buildingFeatureFilters,
      yearBuiltFilter,
      wardFilter: parseInt(ward, 10) || 0,
    };

    searchContext.setCurrentSort(newSearchParams.sort);
    searchContext.setCurrentSearchString(newSearchParams.query);
    searchContext.setCurrentBuildingFeatureFilters(
      newSearchParams.buildingFeatureFilters
    );
    searchContext.setCurrentYearBuiltFilter(newSearchParams.yearBuiltFilter);
    searchContext.setCurrentWardFilter(newSearchParams.wardFilter);
    searchContext.setCurrentPage(newSearchParams.page);

    // Initial data fetch on load
    searchContext.fetchData(newSearchParams);
  };

  return { getSearchParams };
}
