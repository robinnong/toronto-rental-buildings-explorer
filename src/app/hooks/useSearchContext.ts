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
  FetchDataResponse,
  FilterType,
  Sort,
  YearBuiltFilter,
} from "@/app/types/global";
import generateYearBuiltSearchClause from "../lib/generateYearBuiltSearchClause";
import generateSearchClauses from "../lib/generateSearchClauses";
import generateUrlQueryParams from "../lib/generateUrlQueryParams";

type FetchAlgoliaDataParams = {
  query?: string;
  filters?: FilterType[];
  yearBuiltFilter?: YearBuiltFilter;
  page?: number;
  sort?: Sort;
};

export type SearchContextModel = {
  isLoading: boolean;
  searchCount: number;
  searchPagesTotal: number;
  searchResults: FetchDataResponse[];
  currentBuildingFeatureFilters: FilterType[];
  setCurrentBuildingFeatureFilters: Dispatch<SetStateAction<FilterType[]>>;
  currentYearBuiltFilter: YearBuiltFilter;
  setCurrentYearBuiltFilter: Dispatch<SetStateAction<YearBuiltFilter>>;
  currentSearchString: string;
  setCurrentSearchString: Dispatch<SetStateAction<string>>;
  currentPage: number;
  currentSort: Sort;
  setCurrentSort: Dispatch<SetStateAction<Sort>>;
  fetchAlgoliaData: (q: FetchAlgoliaDataParams) => Promise<FetchDataResponse[]>;
};

export const SearchContext = createContext<SearchContextModel>(null);

export default function useSearchContext(): SearchContextModel {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState(false);
  const [currentBuildingFeatureFilters, setCurrentBuildingFeatureFilters] =
    useState<FilterType[]>([]);
  const [currentYearBuiltFilter, setCurrentYearBuiltFilter] =
    useState<YearBuiltFilter>({} as YearBuiltFilter);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSearchString, setCurrentSearchString] = useState("");
  const [currentSort, setCurrentSort] = useState<Sort>("ward_number");
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>(null);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [searchPagesTotal, setSearchPagesTotal] = useState<number>(0);

  const fetchAlgoliaData = useCallback(
    async ({
      query = currentSearchString,
      filters = currentBuildingFeatureFilters,
      yearBuiltFilter = currentYearBuiltFilter,
      page = 0, // Algolia uses 0-based pagination
      sort = currentSort,
    }: FetchAlgoliaDataParams): Promise<FetchDataResponse[]> => {
      const client = algoliasearch(
        process.env.ALGOLIA_APPLICATION_ID,
        process.env.ALGOLIA_API_KEY
      );

      try {
        setIsLoading(true);

        // TODO: Move this to a helper function
        const primaryIdx = process.env.ALGOLIA_INDEX_NAME; // Default index
        let indexName = primaryIdx; // Default index

        if (sort === "ward_number") {
          indexName = `${primaryIdx}_ward_asc`;
        }
        if (sort === "year_built_asc") {
          indexName = `${primaryIdx}_year_built_asc`;
        }
        if (sort === "year_built_desc") {
          indexName = `${primaryIdx}_year_built_dsc`;
        }

        // TODO: Move this to a helper function
        const yearFilter = generateYearBuiltSearchClause(yearBuiltFilter);
        const filterClauses = generateSearchClauses(filters)?.join(" AND ");
        const yearFilterClause = yearFilter
          ? filterClauses
            ? ` AND ${yearFilter}`
            : yearFilter
          : "";
        const compositeFilter = filterClauses
          ? filterClauses + yearFilterClause
          : yearFilterClause;

        const results = await client.searchSingleIndex({
          indexName,
          searchParams: {
            query, // The search service will query the fields 'SITE_ADDRESS' and 'PROP_MANAGEMENT_COMPANY_NAME' based on the user's text input
            filters: compositeFilter,
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
          query,
          filters,
          yearBuiltFilter,
        });
        setIsLoading(false);
      }
    },
    [
      currentSearchString,
      currentBuildingFeatureFilters,
      currentYearBuiltFilter,
      currentSort,
    ]
  );

  return {
    isLoading,
    searchCount,
    searchPagesTotal,
    searchResults,
    currentBuildingFeatureFilters,
    setCurrentBuildingFeatureFilters,
    currentYearBuiltFilter,
    setCurrentYearBuiltFilter,
    currentSearchString,
    setCurrentSearchString,
    currentPage,
    currentSort,
    setCurrentSort,
    fetchAlgoliaData,
  };
}
