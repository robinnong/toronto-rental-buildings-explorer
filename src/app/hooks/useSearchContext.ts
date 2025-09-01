import { algoliasearch } from "algoliasearch";
import { createContext, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AppSearchParams,
  FetchAlgoliaDataParams,
  FetchDataResponse,
  Sort,
} from "@/app/types/global";
import generateUrlQueryParams from "../lib/generateUrlQueryParams";
import generateCompositeFilter from "../lib/generateCompositeFilter";
import urlQueryParamsToCurrentFilters from "./urlQueryParamsToCurrentFilters";

export type SearchContextModel = {
  isLoading: boolean;
  searchCount: number;
  searchPagesTotal: number;
  searchResults: FetchDataResponse[];
  currentFilters: FetchAlgoliaDataParams;
  setFilter: <T>(fieldName: keyof FetchAlgoliaDataParams, value: T) => void;
  fetchData: (q: FetchAlgoliaDataParams) => Promise<FetchDataResponse[]>;
  resetSearch: () => void;
};

export const SearchContext = createContext<SearchContextModel>(null);

export default function useSearchContext({
  initialSearchParams,
}: {
  initialSearchParams: Promise<AppSearchParams>;
}): SearchContextModel {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const defaultFilters: FetchAlgoliaDataParams = {
    query: "",
    buildingFeatures: [],
    yearBuilt: {},
    ward: 0,
    sort: "ward_number",
    page: 0,
  };

  const [isLoading, setIsLoading] = useState(false);
  // Current filter states
  const [currentFilters, setCurrentFilters] =
    useState<FetchAlgoliaDataParams>(defaultFilters);
  // Search result states
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>(null);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [searchPagesTotal, setSearchPagesTotal] = useState<number>(0);

  // Sets a value in currentFilters, a map of all applied search filters to be passed into fetchData()
  function setFilter<T>(
    fieldName: keyof FetchAlgoliaDataParams,
    value: T
  ): void {
    setCurrentFilters((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  // Determine which configured Algolia index to search based on the current sort option
  const generateIndexName = (sort: Sort) => {
    const primaryIdx = process.env.ALGOLIA_INDEX_NAME; // Default index
    let idxName = primaryIdx;

    if (sort === "ward_number") {
      idxName = `${primaryIdx}_ward_asc`;
    }
    if (sort === "year_built_asc") {
      idxName = `${primaryIdx}_year_built_asc`;
    }
    if (sort === "year_built_desc") {
      idxName = `${primaryIdx}_year_built_dsc`;
    }

    return idxName;
  };

  const fetchData = useCallback(
    async ({
      query = currentFilters.query,
      buildingFeatures = currentFilters.buildingFeatures,
      yearBuilt = currentFilters.yearBuilt,
      ward = currentFilters.ward,
      page = 0, // Algolia uses 0-based pagination
      sort = currentFilters.sort,
    }: FetchAlgoliaDataParams): Promise<FetchDataResponse[]> => {
      const client = algoliasearch(
        process.env.ALGOLIA_APPLICATION_ID,
        process.env.ALGOLIA_API_KEY
      );

      try {
        setIsLoading(true);

        // The search service will query the fields 'SITE_ADDRESS' and 'PROP_MANAGEMENT_COMPANY_NAME'
        // based on the user's text input
        const results = await client.searchSingleIndex({
          indexName: generateIndexName(sort),
          searchParams: {
            query,
            filters: generateCompositeFilter({
              buildingFeatures,
              yearBuilt,
              ward,
            }),
            page,
          },
        });

        setSearchPagesTotal(results?.nbPages);
        setSearchCount(results?.nbHits);
        setSearchResults(results?.hits as FetchDataResponse[]);
        setFilter("page", results.page);

        return results?.hits as FetchDataResponse[];
      } catch (error) {
        // TODO: Display error to the user
        console.error("Error searching:", error);
      } finally {
        generateUrlQueryParams({
          params,
          pathname,
          replace,
          sort,
          page,
          query,
          buildingFeatures,
          yearBuilt,
          ward,
        });
        setIsLoading(false);
      }
    },
    [currentFilters]
  );

  const resetSearch = () => {
    setCurrentFilters(defaultFilters);
    fetchData(defaultFilters);
  };

  const initSearch = useCallback(async () => {
    const params = await initialSearchParams;
    const newSearchParams = urlQueryParamsToCurrentFilters({
      params,
    });

    setCurrentFilters(newSearchParams);
    fetchData(newSearchParams); // Initial data fetch on load
  }, []);

  // Initial data fetching on search page load
  useEffect(() => {
    initSearch();
  }, []);

  return {
    isLoading,
    searchCount,
    searchPagesTotal,
    searchResults,
    currentFilters,
    setFilter,
    fetchData,
    resetSearch,
  };
}
