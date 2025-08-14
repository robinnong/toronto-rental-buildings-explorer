import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  where,
} from "firebase/firestore";
import {
  FetchDataResponse,
  FilterTypes,
  FirestoreWhereClause,
} from "@/app/types/global";
import { db } from "../firebase.config";
import { firestoreDbPaths, firestoreQueryLimit } from "../constants/general";

export type SearchContextModel = {
  appliedFiltersMap: Record<FilterTypes, FirestoreWhereClause[]>;
  setAppliedFiltersMap: Dispatch<
    SetStateAction<Record<FilterTypes, FirestoreWhereClause[]>>
  >;
  searchResults: FetchDataResponse[];
  filteredSearchResults: FetchDataResponse[];
  setFilteredSearchResults: Dispatch<SetStateAction<FetchDataResponse[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  fetchData: () => Promise<void>;
};

export const SearchContext = createContext<SearchContextModel>(null);

export default function useSearchContext(): SearchContextModel {
  const collectionRef = collection(db, ...firestoreDbPaths);

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState<
    FetchDataResponse[]
  >([]);
  const [page, setPage] = useState(1);
  const [appliedFiltersMap, setAppliedFiltersMap] = useState<
    Record<FilterTypes, FirestoreWhereClause[]>
  >({} as Record<FilterTypes, FirestoreWhereClause[]>);

  const generateWhereClauses = useCallback((): QueryFieldFilterConstraint[] => {
    const clauses: QueryFieldFilterConstraint[] = [];

    Object.values(appliedFiltersMap).forEach((q) => {
      clauses.push(...q.map((c) => where(c.fieldPath, c.opStr, c.value)));
    });

    return clauses;
  }, [appliedFiltersMap]);

  // Queries the Firestore database for apartments based on the applied filters
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const whereClauses = generateWhereClauses();

      // TODO: Add pagination and search by offset (see Firestore docs)
      const q = query(
        collectionRef,
        orderBy("_id"),
        limit(firestoreQueryLimit),
        ...whereClauses
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        return doc.data();
      });

      const res = (await Promise.all(data)) as FetchDataResponse[];
      setSearchResults(res);
    } catch (error) {
      // TODO - Display error message to the user
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [appliedFiltersMap]);

  // Initial data fetch on load
  useEffect(() => {
    fetchData();
  }, []);

  // Reset the filtered search results after fetching new data
  useEffect(() => {
    setFilteredSearchResults(searchResults);
  }, [searchResults]);

  return {
    appliedFiltersMap,
    setAppliedFiltersMap,
    searchResults,
    filteredSearchResults,
    setFilteredSearchResults,
    page,
    setPage,
    isLoading,
    fetchData,
  };
}
