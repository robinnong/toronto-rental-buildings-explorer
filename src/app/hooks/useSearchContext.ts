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
  QueryFieldFilterConstraint,
  where,
} from "firebase/firestore";
import { FetchDataResponse, FilterTypes } from "@/app/types/global";
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
  setAppliedYearBuiltFilter: Dispatch<
    SetStateAction<{ start: number; end: number } | null>
  >;
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
  const [appliedYearBuiltFilter, setAppliedYearBuiltFilter] = useState<{
    start: number;
    end: number;
  } | null>(null);

  const whereClauses: QueryFieldFilterConstraint[] = useMemo(() => {
    const clauses: QueryFieldFilterConstraint[] = [];

    appliedFilters.forEach((filter) => {
      const q = searchQueryBuilder(filter);
      if (q) {
        clauses.push(...q.map((c) => where(c.fieldPath, c.opStr, c.value)));
      }
    });

    if (appliedYearBuiltFilter) {
      const { start, end } = appliedYearBuiltFilter;
      clauses.push(where("YEAR_BUILT", ">=", start));
      clauses.push(where("YEAR_BUILT", "<=", end));
    }

    return clauses;
  }, [appliedFilters, appliedYearBuiltFilter]);

  // Queries the Firestore database for apartments based on the applied filters
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
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
  }, [whereClauses]);

  // Initial data fetch on load
  useEffect(() => {
    fetchData();
  }, []);

  // Reset the filtered search results after fetching new data
  useEffect(() => {
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
    isLoading,
    setAppliedYearBuiltFilter,
    fetchData,
  };
}
