import { algoliasearch } from "algoliasearch";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FetchAlgoliaDataParams,
  FetchDataResponse,
  FilterType,
  Sort,
  YearBuiltFilter,
} from "@/app/types/global";
import generateUrlQueryParams from "../lib/generateUrlQueryParams";
import generateCompositeFilter from "../lib/generateCompositeFilter";

export type SearchContextModel = {
  isLoading: boolean;
  searchCount: number;
  searchPagesTotal: number;
  searchResults: FetchDataResponse[];
  currentBuildingFeatureFilters: FilterType[];
  setCurrentBuildingFeatureFilters: Dispatch<SetStateAction<FilterType[]>>;
  currentYearBuiltFilter: YearBuiltFilter;
  setCurrentYearBuiltFilter: Dispatch<SetStateAction<YearBuiltFilter>>;
  currentWardFilter: number;
  setCurrentWardFilter: Dispatch<SetStateAction<number>>;
  currentSearchString: string;
  setCurrentSearchString: Dispatch<SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentSort: Sort;
  setCurrentSort: Dispatch<SetStateAction<Sort>>;
  fetchData: (q: FetchAlgoliaDataParams) => Promise<FetchDataResponse[]>;
  resetSearch: () => void;
};

export const SearchContext = createContext<SearchContextModel>(null);

export default function useSearchContext(): SearchContextModel {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState(false);
  // Current filter states
  const [currentBuildingFeatureFilters, setCurrentBuildingFeatureFilters] =
    useState<FilterType[]>([]);
  const [currentYearBuiltFilter, setCurrentYearBuiltFilter] =
    useState<YearBuiltFilter>({});
  const [currentWardFilter, setCurrentWardFilter] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSearchString, setCurrentSearchString] = useState("");
  const [currentSort, setCurrentSort] = useState<Sort>("ward_number");
  // Search result states
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>(null);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [searchPagesTotal, setSearchPagesTotal] = useState<number>(0);

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
      query = currentSearchString,
      buildingFeatureFilters = currentBuildingFeatureFilters,
      yearBuiltFilter = currentYearBuiltFilter,
      wardFilter = currentWardFilter,
      page = 0, // Algolia uses 0-based pagination
      sort = currentSort,
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
              buildingFeatureFilters,
              yearBuiltFilter,
              wardFilter,
            }),
            page,
          },
        });

        setSearchPagesTotal(results?.nbPages);
        setSearchCount(results?.nbHits);
        setSearchResults(results?.hits as FetchDataResponse[]);
        setCurrentPage(results.page);

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
          buildingFeatureFilters,
          yearBuiltFilter,
          wardFilter,
        });
        setIsLoading(false);
      }
    },
    [
      currentSearchString,
      currentBuildingFeatureFilters,
      currentYearBuiltFilter,
      currentSort,
      currentWardFilter,
    ]
  );

  const resetSearch = () => {
    const defaultFilters: FetchAlgoliaDataParams = {
      query: "",
      buildingFeatureFilters: [],
      yearBuiltFilter: {},
      wardFilter: 0,
      sort: "ward_number",
      page: 0,
    };

    setCurrentSearchString(defaultFilters.query);
    setCurrentBuildingFeatureFilters(defaultFilters.buildingFeatureFilters);
    setCurrentYearBuiltFilter(defaultFilters.yearBuiltFilter);
    setCurrentWardFilter(defaultFilters.wardFilter);
    setCurrentSort(defaultFilters.sort);
    setCurrentPage(defaultFilters.page);

    fetchData(defaultFilters);
  };

  return {
    isLoading,
    searchCount,
    searchPagesTotal,
    searchResults,
    currentBuildingFeatureFilters,
    setCurrentBuildingFeatureFilters,
    currentYearBuiltFilter,
    setCurrentYearBuiltFilter,
    currentWardFilter,
    setCurrentWardFilter,
    currentSearchString,
    setCurrentSearchString,
    currentPage,
    setCurrentPage,
    currentSort,
    setCurrentSort,
    fetchData,
    resetSearch,
  };
}
