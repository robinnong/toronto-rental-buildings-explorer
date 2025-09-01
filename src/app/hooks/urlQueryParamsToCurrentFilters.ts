import { queryKeyToFilter } from "../constants/general";
import {
  AppSearchParams,
  FetchAlgoliaDataParams,
  FilterType,
  YearBuiltFilter,
} from "../types/global";

type Props = {
  params: AppSearchParams;
};

/**
 * Translates the url query params from '/search' route to search params for the initial data fetch
 */
const urlQueryParamsToCurrentFilters = ({
  params,
}: Props): FetchAlgoliaDataParams => {
  // Parse 'feature' filters as FilterType[]
  const buildingFeatures: FilterType[] = [];
  const featureKeys = decodeURIComponent(params?.features)?.split(",") || [];
  featureKeys.forEach((feature) => {
    // Validate the key as a FilterType before adding it to buildingFeatures
    if (queryKeyToFilter[feature]) {
      buildingFeatures.push(queryKeyToFilter[feature] as FilterType);
    }
  });

  // Parse 'year_built_*' filters as YearBuiltFilter
  const yearBuilt = {} as YearBuiltFilter;
  if (params?.year_built_start != null) {
    yearBuilt.start = parseInt(params?.year_built_start, 10);
  }
  if (params?.year_built_end != null) {
    yearBuilt.end = parseInt(params?.year_built_end, 10);
  }

  return {
    sort: params?.sort ?? "ward_number",
    page: parseInt(params?.page, 10) - 1 || 0,
    query: params?.q ?? "",
    buildingFeatures,
    yearBuilt,
    ward: parseInt(params?.ward, 10) || 0,
  } as FetchAlgoliaDataParams;
};

export default urlQueryParamsToCurrentFilters;
