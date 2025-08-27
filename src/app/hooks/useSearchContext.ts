import { algoliasearch } from "algoliasearch";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  collectionGroup,
  getCountFromServer,
  orderBy,
  getDocs,
  query,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AppliedFilterMap,
  FetchDataResponse,
  FilterType,
  Sort,
} from "@/app/types/global";
import { db } from "../firebase.config";
import {
  booleanFilterQueryKeys,
  fsDbSubCollection,
} from "../constants/general";
import generateOrderBySearchClauses from "../lib/generateOrderBySearchClauses";
import generateWhereSearchClauses from "../lib/generateWhereSearchClauses";
import generateLimitSearchClause from "../lib/generateLimitSearchClause";
import generatePageSearchClause from "../lib/generatePageSearchClause";
import generateIdsSearchClauses from "../lib/generateIdsSearchClauses";

export type SearchContextModel = {
  currentAppliedFilters: AppliedFilterMap;
  setCurrentAppliedFilters: Dispatch<SetStateAction<AppliedFilterMap>>;
  searchCount: number;
  searchResults: FetchDataResponse[];
  currentSearchString: string;
  setCurrentSearchString: Dispatch<SetStateAction<string>>;
  currentPage: number;
  currentSort: Sort;
  setCurrentSort: Dispatch<SetStateAction<Sort>>;
  isLoading: boolean;
  fetchAlgoliaData: (q: {
    query?: string;
    page?: number;
    sort?: Sort;
  }) => Promise<FetchDataResponse[]>;
  fetchFirestoreData: (q: {
    filters?: AppliedFilterMap;
    page?: number;
    sort?: Sort;
    ids?: number[];
  }) => Promise<void>;
  fetchTextAndFilterData: (q: {
    query?: string;
    filters?: AppliedFilterMap;
    page?: number;
    sort?: Sort;
  }) => Promise<void>;
};

export const SearchContext = createContext<SearchContextModel>(null);

export default function useSearchContext(): SearchContextModel {
  const collectionGroupRef = collectionGroup(db, fsDbSubCollection);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState(false);
  const [currentAppliedFilters, setCurrentAppliedFilters] =
    useState<AppliedFilterMap>({} as AppliedFilterMap);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSearchString, setCurrentSearchString] = useState("");
  const [currentSort, setCurrentSort] = useState<Sort>("ward_number");
  const [firstVisibleDoc, setFirstVisibleDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const [lastVisibleDoc, setLastVisibleDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
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

  const setFilterParams = (filters?: AppliedFilterMap) => {
    const appliedFilterKeys = Object.keys(filters);

    params.keys().forEach((key) => {
      // Ignore "sort" and "q"
      if (key === "sort" || key === "q") {
        // Do nothing
      } else if (!appliedFilterKeys.includes(key)) {
        // Clear the filter from query params
        params.delete(key);
      }
    });

    const booleanFiltersList: string[] = [];
    let yearBuiltStart: number;
    let yearBuiltEnd: number;

    appliedFilterKeys.forEach((key) => {
      if (key === "YEAR_BUILT") {
        yearBuiltStart = filters[key][0].value as number;
        yearBuiltEnd = filters[key][1].value as number;
      } else if (!!booleanFilterQueryKeys[key]) {
        booleanFiltersList.push(booleanFilterQueryKeys[key]);
      }
    });

    if (booleanFiltersList.length > 0) {
      params.set("features", booleanFiltersList.join(","));
    }
    if (yearBuiltStart) {
      params.set("year_built_start", `${yearBuiltStart}`);
    }
    if (yearBuiltEnd) {
      params.set("year_built_end", `${yearBuiltEnd}`);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Queries the Firestore database for apartments based on the applied filters
  const fetchFirestoreData = async ({
    filters,
    page = 1, // Reset to first page if none is provided
    sort,
    ids = [],
  }: {
    filters?: AppliedFilterMap;
    page?: number;
    sort?: Sort;
    ids?: number[];
  }) => {
    setIsLoading(true);

    try {
      const whereSearchClauses = generateWhereSearchClauses(filters);
      const idsSearchClauses = generateIdsSearchClauses(ids);
      const orderBySearchClauses = generateOrderBySearchClauses(sort);
      const pageSearchClause = generatePageSearchClause(
        page,
        currentPage,
        firstVisibleDoc,
        lastVisibleDoc
      );
      const limitSearchClause = generateLimitSearchClause(pageSearchClause);

      const searchQ =
        page === 1
          ? query(
              collectionGroupRef,
              ...whereSearchClauses,
              ...idsSearchClauses,
              ...orderBySearchClauses,
              limitSearchClause
            )
          : query(
              collectionGroupRef,
              ...whereSearchClauses,
              ...idsSearchClauses,
              ...orderBySearchClauses,
              pageSearchClause,
              limitSearchClause
            );

      const countQ = query(
        collectionGroupRef,
        ...whereSearchClauses,
        orderBy("_id")
      );

      const getCountQuerySnapshot = await getCountFromServer(countQ);
      const getDocsQuerySnapshot = await getDocs(searchQ);

      const data = getDocsQuerySnapshot.docs.map(async (doc, i) => {
        if (i === 0) {
          setFirstVisibleDoc(doc);
        }
        if (i === getDocsQuerySnapshot.docs.length - 1) {
          setLastVisibleDoc(doc);
        }
        // doc.data() is never undefined for query doc snapshots
        return doc.data();
      });

      const res = (await Promise.all(data)) as FetchDataResponse[];

      setSearchResults(res);
      setSearchCount(getCountQuerySnapshot.data().count);
    } catch (error) {
      // TODO - Display error message to the user
      console.error("Error fetching data:", error);
    } finally {
      setSortParams(sort);
      setFilterParams(filters);
      setCurrentPage(page);
      setIsLoading(false);
    }
  };

  // Firebase does not natively support text search
  // so using a third-party service is required to enable full-text search on fields
  // See: https://firebase.google.com/docs/firestore/solutions/search
  const fetchAlgoliaData = async ({
    query = "",
    page = 1,
    sort = "ward_number",
  }: {
    query?: string;
    page?: number;
    sort?: Sort;
  }): Promise<FetchDataResponse[]> => {
    const client = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_API_KEY
    );

    try {
      setIsLoading(true);

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

      // The backend search service will query the fields 'SITE_ADDRESS' and 'PROP_MANAGEMENT_COMPANY_NAME'
      const results = await client.searchSingleIndex({
        indexName,
        searchParams: {
          query,
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
      setCurrentPage(page);
      setIsLoading(false);
    }
  };

  // Since Algolia only supports text search and Firestore does not,
  // we need to fetch the Algolia data and filtered Firestore data separately
  // when applying both text search and filters at the same time
  const fetchTextAndFilterData = async ({
    query = "",
    filters,
    page = 1,
    sort = "ward_number",
  }: {
    query?: string;
    filters?: AppliedFilterMap;
    page?: number;
    sort?: Sort;
  }) => {
    // First, fetch the Algolia data based on the text search string and the applied sort index
    const textQueryRes = await fetchAlgoliaData({
      query,
      sort,
      page,
    });

    // Then, pass in the IDs of the Algolia search results as a filter to Firestore
    const ids = textQueryRes.map(({ _id }) => _id);

    // Finally fetch and display the Firestore data based on the applied filters
    fetchFirestoreData({
      filters,
      sort,
      ids,
    });
  };

  return {
    currentAppliedFilters,
    setCurrentAppliedFilters,
    searchCount,
    searchResults,
    currentSearchString,
    setCurrentSearchString,
    currentPage,
    currentSort,
    setCurrentSort,
    isLoading,
    fetchAlgoliaData,
    fetchFirestoreData,
    fetchTextAndFilterData,
  };
}
