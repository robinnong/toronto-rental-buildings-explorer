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
import { filterQueryKeys } from "../constants/general";
import generateYearBuiltSearchClause from "../lib/generateYearBuiltSearchClause";
import generateSearchClauses from "../lib/generateSearchClauses";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSearchString, setCurrentSearchString] = useState("");
  const [currentSort, setCurrentSort] = useState<Sort>("ward_number");
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>(null);
  const [searchCount, setSearchCount] = useState<number>(0);

  const setSortParams = (s: Sort) => {
    if (s === "ward_number") {
      params.delete("sort");
    } else if (s != null) {
      params.set("sort", `${s}`);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const setSearchParams = (query?: string) => {
    if (query == null || query === "") {
      params.delete("q");
    } else {
      params.set("q", `${query}`);
    }

    replace(`${pathname}?${params.toString()}`);
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
    replace(`${pathname}?${params.toString()}`);
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
    replace(`${pathname}?${params.toString()}`);
  };

  const fetchAlgoliaData = useCallback(
    async ({
      query = currentSearchString,
      filters = currentBuildingFeatureFilters,
      yearBuiltFilter = currentYearBuiltFilter,
      page = 1,
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
            page: page - 1, // Algolia uses 0-based pagination
          },
        });

        setSearchCount(results?.nbHits);
        setSearchResults(results?.hits as FetchDataResponse[]);

        return results?.hits as FetchDataResponse[];
      } catch (error) {
        // TODO: Display error to the user
        console.error("Error searching:", error);
      } finally {
        setSortParams(sort);
        setSearchParams(query);
        setFilterParams(filters);
        setYearBuiltParams(yearBuiltFilter);
        setCurrentPage(page);
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
