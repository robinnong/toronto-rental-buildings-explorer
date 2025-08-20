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
  filteredSearchResults: FetchDataResponse[];
  setFilteredSearchResults: Dispatch<SetStateAction<FetchDataResponse[]>>;
  currentPage: number;
  currentSort: Sort;
  setCurrentSort: Dispatch<SetStateAction<Sort>>;
  setSortParams: (sort: Sort) => void;
  isLoading: boolean;
  fetchData: (q: {
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSort, setCurrentSort] = useState<Sort>("ward_number");
  const [firstVisibleDoc, setFirstVisibleDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const [lastVisibleDoc, setLastVisibleDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>(null);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [filteredSearchResults, setFilteredSearchResults] = useState<
    FetchDataResponse[]
  >([]);
  const [appliedFiltersMap, setAppliedFiltersMap] = useState<AppliedFilterMap>(
    {} as AppliedFilterMap
  );

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

  // Queries the Firestore database for apartments based on the applied filters
  const fetchData = async (q: {
    filters?: AppliedFilterMap;
    page?: number;
    sort?: Sort;
  }) => {
    setIsLoading(true);

    try {
      const whereSearchClauses = generateWhereSearchClauses(q.filters);
      const orderBySearchClauses = generateOrderBySearchClauses(q.sort);
      const pageSearchClause = generatePageSearchClause(q.page ?? 1);
      const limitSearchClause = generateLimitSearchClause(pageSearchClause);

      const searchQ = query(
        collectionGroupRef,
        ...whereSearchClauses,
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
      setSearchCount(getCountQuerySnapshot.data().count);
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
    } catch (error) {
      // TODO - Display error message to the user
      console.error("Error fetching data:", error);
    } finally {
      setCurrentPage(q.page ?? 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchResults == null) return;

    setFilteredSearchResults(searchResults);
  }, [searchResults]);

  const setSortParams = (s: Sort) => {
    if (s === "ward_number") {
      params.delete("sort");
    } else {
      params.set("sort", `${s}`);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Initial data fetch on load
  useEffect(() => {
    fetchData({});
  }, []);

  return {
    appliedFiltersMap,
    setAppliedFiltersMap,
    searchCount,
    searchResults,
    filteredSearchResults,
    setFilteredSearchResults,
    currentPage,
    currentSort,
    setCurrentSort,
    setSortParams,
    isLoading,
    fetchData,
  };
}
