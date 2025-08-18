import {
  createContext,
  Dispatch,
  SetStateAction,
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
  or,
  and,
  QueryCompositeFilterConstraint,
} from "firebase/firestore";
import { AppliedFilterMap, FetchDataResponse, Sort } from "@/app/types/global";
import { db } from "../firebase.config";
import { firestoreDbPaths, firestoreQueryLimit } from "../constants/general";

export type SearchContextModel = {
  appliedFiltersMap: AppliedFilterMap;
  setAppliedFiltersMap: Dispatch<SetStateAction<AppliedFilterMap>>;
  searchResults: FetchDataResponse[];
  filteredSearchResults: FetchDataResponse[];
  setFilteredSearchResults: Dispatch<SetStateAction<FetchDataResponse[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
  fetchData: (filters: AppliedFilterMap) => Promise<void>;
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
  const [sort, setSort] = useState<Sort>("ward_number");
  const [appliedFiltersMap, setAppliedFiltersMap] = useState<AppliedFilterMap>(
    {} as AppliedFilterMap
  );

  // Generates Firestore search WHERE clauses from the applied filters map
  const generateWhereSearchClauses = (
    appliedFiltersMap: AppliedFilterMap
  ): QueryFieldFilterConstraint[] => {
    const clauses: QueryFieldFilterConstraint[] = [];

    Object.entries(appliedFiltersMap).forEach(([k, v]) => {
      if (k !== "low_rise" && k !== "mid_rise" && k !== "high_rise") {
        clauses.push(...v.map((c) => where(c.fieldPath, c.opStr, c.value)));
      }
    });

    return clauses;
  };

  // Generates Firestore search WHERE clauses to be wrapped in or() from the applied filters map
  const generateOrSearchClauses = (
    appliedFiltersMap: AppliedFilterMap
  ): QueryFieldFilterConstraint[] => {
    const clauses: QueryFieldFilterConstraint[] = [];

    Object.entries(appliedFiltersMap).forEach(([k, v]) => {
      if (k === "low_rise" || k === "mid_rise" || k === "high_rise") {
        clauses.push(...v.map((c) => where(c.fieldPath, c.opStr, c.value)));
      }
    });

    return clauses;
  };

  // Queries the Firestore database for apartments based on the applied filters
  const fetchData = async (filters: AppliedFilterMap) => {
    setIsLoading(true);

    try {
      const whereSearchClauses = generateWhereSearchClauses(filters);
      const orSearchClauses = generateOrSearchClauses(filters);

      const generateQueryCompositeFilterConstraints =
        (): QueryCompositeFilterConstraint => {
          return orSearchClauses?.length > 0 && whereSearchClauses?.length > 0
            ? and(...whereSearchClauses, or(...orSearchClauses))
            : or(...orSearchClauses);
        };

      let q;

      if (orSearchClauses?.length > 0) {
        q = query(
          collectionRef,
          generateQueryCompositeFilterConstraints(),
          orderBy("_id"),
          limit(firestoreQueryLimit)
        );
      } else {
        q = query(
          collectionRef,
          ...whereSearchClauses,
          orderBy("_id"),
          limit(firestoreQueryLimit)
        );
      }

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        return doc.data();
      });
      const res = (await Promise.all(data)) as FetchDataResponse[];

      // Reset to first page
      setPage(1);
      setSearchResults(res);
    } catch (error) {
      // TODO - Display error message to the user
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch on load
  useEffect(() => {
    fetchData({});
  }, []);

  useEffect(() => {
    setFilteredSearchResults(searchResults);
  }, [searchResults]);

  useEffect(() => {
    if (sort === "ward_number") {
      setFilteredSearchResults((prev) =>
        [...prev].sort((a, b) => a.WARD - b.WARD)
      );
    } else if (sort === "year_built_asc") {
      setFilteredSearchResults((prev) =>
        [...prev].sort((a, b) => a.YEAR_BUILT - b.YEAR_BUILT)
      );
    } else if (sort === "year_built_desc") {
      setFilteredSearchResults((prev) =>
        [...prev].sort((a, b) => b.YEAR_BUILT - a.YEAR_BUILT)
      );
    }
    setPage(1);
  }, [searchResults, sort]);

  return {
    appliedFiltersMap,
    setAppliedFiltersMap,
    searchResults,
    filteredSearchResults,
    setFilteredSearchResults,
    page,
    setPage,
    sort,
    setSort,
    isLoading,
    fetchData,
  };
}
