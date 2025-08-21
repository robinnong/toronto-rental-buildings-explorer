import { algoliasearch } from "algoliasearch";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  collectionGroup,
  getCountFromServer,
  limit,
  orderBy,
  getDocs,
  query,
  QueryFieldFilterConstraint,
  where,
  startAfter,
  startAt,
  endBefore,
  limitToLast,
  QueryOrderByConstraint,
  DocumentData,
  QueryDocumentSnapshot,
  QueryEndAtConstraint,
  QueryStartAtConstraint,
} from "firebase/firestore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppliedFilterMap, FetchDataResponse, Sort } from "@/app/types/global";
import { db } from "../firebase.config";
import { firestoreQueryLimit, fsDbSubCollection } from "../constants/general";

export type SearchContextModel = {
  appliedFiltersMap: AppliedFilterMap;
  setAppliedFiltersMap: Dispatch<SetStateAction<AppliedFilterMap>>;
  searchCount: number;
  searchResults: FetchDataResponse[];
  currentSearchString: string;
  setCurrentSearchString: Dispatch<SetStateAction<string>>;
  currentPage: number;
  currentSort: Sort;
  setCurrentSort: Dispatch<SetStateAction<Sort>>;
  isLoading: boolean;
  searchByText: () => Promise<void>;
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
  const [currentSearchString, setCurrentSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSort, setCurrentSort] = useState<Sort>("ward_number");
  const [firstVisibleDoc, setFirstVisibleDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const [lastVisibleDoc, setLastVisibleDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>(null);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [appliedFiltersMap, setAppliedFiltersMap] = useState<AppliedFilterMap>(
    {} as AppliedFilterMap
  );

  const setSortParams = (s: Sort) => {
    if (s === "ward_number") {
      params.delete("sort");
    } else if (s != null) {
      params.set("sort", `${s}`);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Generates Firestore search WHERE clauses from the applied filters map
  const generateWhereSearchClauses = (
    appliedFiltersMap: AppliedFilterMap
  ): QueryFieldFilterConstraint[] =>
    appliedFiltersMap
      ? Object.values(appliedFiltersMap).reduce((acc, curr) => {
          acc.push(...curr.map((c) => where(c.fieldPath, c.opStr, c.value)));
          return acc;
        }, [] as QueryFieldFilterConstraint[])
      : [];

  const generateOrderBySearchClauses = (s: Sort) => {
    let clause: QueryOrderByConstraint;

    switch (s) {
      case "ward_number":
        clause = orderBy("WARD");
        break;
      case "year_built_asc":
        clause = orderBy("YEAR_BUILT", "asc");
        break;
      case "year_built_desc":
        clause = orderBy("YEAR_BUILT", "desc");
        break;
      default:
        clause = orderBy("WARD");
        break;
    }

    return [clause, orderBy("_id")];
  };

  const generatePageSearchClause = (
    p: number
  ): QueryStartAtConstraint | QueryEndAtConstraint => {
    let clause: QueryStartAtConstraint | QueryEndAtConstraint;

    if (p === 1 && !firstVisibleDoc) {
      clause = startAt(null);
    } else if (p > currentPage) {
      clause = startAfter(lastVisibleDoc);
    } else if (p < currentPage) {
      clause = endBefore(firstVisibleDoc);
    } else if (p == currentPage) {
      clause = startAt(firstVisibleDoc);
    }
    return clause;
  };

  const generateLimitSearchClause = (
    pageSearchClause: QueryStartAtConstraint | QueryEndAtConstraint
  ) => {
    if (pageSearchClause.type === "endBefore") {
      return limitToLast(firestoreQueryLimit);
    }
    return limit(firestoreQueryLimit);
  };

  const generateIdsSearchClauses = (
    ids: number[]
  ): QueryFieldFilterConstraint[] => {
    const clause: QueryFieldFilterConstraint[] = [];

    if (ids?.length > 0) {
      clause.push(where("_id", "in", ids));
    }

    return clause;
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
      const pageSearchClause = generatePageSearchClause(page);
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
      setSortParams(sort);
    } catch (error) {
      // TODO - Display error message to the user
      console.error("Error fetching data:", error);
    } finally {
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

      const primaryIndex = process.env.ALGOLIA_INDEX_NAME; // Default index
      let indexName = primaryIndex; // Default index

      if (sort === "ward_number") {
        indexName = `${primaryIndex}_ward_asc`;
      }
      if (sort === "year_built_asc") {
        indexName = `${primaryIndex}_year_built_asc`;
      }
      if (sort === "year_built_desc") {
        indexName = `${primaryIndex}_year_built_dsc`;
      }

      // The backend search service will query the fields 'SITE_ADDRESS' and 'PROP_MANAGEMENT_COMPANY_NAME'
      const results = await client.searchSingleIndex({
        indexName,
        searchParams: query
          ? {
              query,
              page: page - 1, // Algolia uses 0-based pagination
            }
          : { page: page - 1 },
      });

      setSearchCount(results?.nbHits);
      setSearchResults(results?.hits as FetchDataResponse[]);
      setCurrentPage(page);

      return results?.hits as FetchDataResponse[];
    } catch (error) {
      // TODO: Display error to the user
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Since Algolia only supports text search and Firestore does not,
  // we need to fetch the Algolia data and filtered Firestore data separately
  // when applying both text search and filters at the same time
  const fetchTextAndFilterData = useCallback(
    async ({
      filters,
      page = 1,
      sort = "ward_number",
    }: {
      filters?: AppliedFilterMap;
      page?: number;
      sort?: Sort;
    }) => {
      // First, fetch the Algolia data based on the text search string and the applied sort index
      const textQueryRes = await fetchAlgoliaData({
        query: currentSearchString,
        sort,
        page,
      });

      // Then, pass in the IDs of the Algolia search results as a filter to Firestore
      const recordIds = textQueryRes.map((r) => r._id);
      // Finally fetch and display the Firestore data based on the applied filters
      fetchFirestoreData({
        filters,
        sort,
        ids: recordIds,
      });
    },
    [currentSearchString]
  );

  const searchByText = useCallback(async () => {
    if (currentSearchString.length > 0) {
      fetchAlgoliaData({ query: currentSearchString, sort: currentSort });
    } else {
      fetchAlgoliaData({ sort: currentSort });
    }
  }, [currentSearchString, currentSort]);

  // Initial data fetch on load
  useEffect(() => {
    fetchAlgoliaData({});
  }, []);

  return {
    appliedFiltersMap,
    setAppliedFiltersMap,
    searchCount,
    searchResults,
    currentSearchString,
    setCurrentSearchString,
    currentPage,
    currentSort,
    setCurrentSort,
    isLoading,
    searchByText,
    fetchAlgoliaData,
    fetchFirestoreData,
    fetchTextAndFilterData,
  };
}
