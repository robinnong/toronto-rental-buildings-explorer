import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  FetchDataResponse,
  FirestoreWhereClause,
  FilterTypes,
} from "@/app/types/global";
import { db } from "../firebase.config";
import { firestoreDbPaths, firestoreQueryLimit } from "../constants/general";
import searchQueryBuilder from "../lib/searchQueryBuilder";

export type SearchContextModel = {
  appliedFilters: FilterTypes[];
  setAppliedFilters: Dispatch<SetStateAction<FilterTypes[]>>;
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
  const [appliedFilters, setAppliedFilters] = useState<FilterTypes[]>([]);

  const whereClauses: FirestoreWhereClause[] = useMemo(() => {
    const clauses: FirestoreWhereClause[] = [];

    appliedFilters.forEach((filter) => {
      const query = searchQueryBuilder(filter);
      if (query) {
        clauses.push(...query);
      }
    });

    return clauses;
  }, [appliedFilters]);

  // Queries the Firestore database for apartments based on the applied filters
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const whereQueries =
        whereClauses.map((clause) =>
          where(clause.fieldPath, clause.opStr, clause.value)
        ) ?? [];

      // TODO: Add pagination and search by offset (see Firestore docs)
      const q = query(
        collectionRef,
        orderBy("_id"),
        limit(firestoreQueryLimit),
        ...whereQueries
      );
      const querySnapshot = await getDocs(q);

      // TODO: Don't clear out - use Redux to store the search results and use CRUD operations to update state
      setSearchResults([]);

      querySnapshot.docs.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        const res = await doc.data();
        setSearchResults((prev) => [...prev, res as FetchDataResponse]);
      });
    } catch (error) {
      // TODO - Display error message to the user
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [whereClauses]);

  // Initial data fetch on load
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(searchResults);
    setFilteredSearchResults(searchResults);
  }, [searchResults]);

  return {
    appliedFilters,
    setAppliedFilters,
    searchResults,
    filteredSearchResults,
    setFilteredSearchResults,
    page,
    setPage,
    fetchData,
    isLoading,
  };
}
