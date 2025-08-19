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
  QueryOrderByConstraint,
} from "firebase/firestore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  setPageParams: (page: number) => void;
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
  setSortParams: (sort: Sort) => void;
  isLoading: boolean;
  fetchData: (filters: AppliedFilterMap) => Promise<void>;
};

export const SearchContext = createContext<SearchContextModel>(null);

export default function useSearchContext(): SearchContextModel {
  const collectionRef = collection(db, ...firestoreDbPaths);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<Sort>("ward_number");
  const [searchResults, setSearchResults] = useState<FetchDataResponse[]>(null);
  const [filteredSearchResults, setFilteredSearchResults] = useState<
    FetchDataResponse[]
  >([]);
  const [appliedFiltersMap, setAppliedFiltersMap] = useState<AppliedFilterMap>(
    {} as AppliedFilterMap
  );

  // Generates Firestore search WHERE clauses from the applied filters map
  const generateWhereSearchClauses = (
    appliedFiltersMap: AppliedFilterMap
  ): QueryFieldFilterConstraint[] => {
    const clauses: QueryFieldFilterConstraint[] = [];

    Object.entries(appliedFiltersMap).forEach(([k, v]) => {
      if (k !== "LOW_RISE" && k !== "MID_RISE" && k !== "HIGH_RISE") {
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
      if (k === "LOW_RISE" || k === "MID_RISE" || k === "HIGH_RISE") {
        clauses.push(...v.map((c) => where(c.fieldPath, c.opStr, c.value)));
      }
    });

    return clauses;
  };

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

  // Queries the Firestore database for apartments based on the applied filters
  const fetchData = async (
    filters: AppliedFilterMap,
    sort: Sort = "ward_number"
  ) => {
    setIsLoading(true);

    try {
      const whereSearchClauses = generateWhereSearchClauses(filters);
      const orSearchClauses = generateOrSearchClauses(filters);
      const orderBySearchClauses = generateOrderBySearchClauses(sort);

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
          ...orderBySearchClauses,
          limit(firestoreQueryLimit)
        );
      } else {
        q = query(
          collectionRef,
          ...whereSearchClauses,
          ...orderBySearchClauses,
          limit(firestoreQueryLimit)
        );
      }

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

  const setPageParams = (p: number) => {
    params.set("page", `${p}`);
    replace(`${pathname}?${params.toString()}`);
  };

  // Initial data fetch on load
  useEffect(() => {
    fetchData({});
  }, []);

  return {
    appliedFiltersMap,
    setAppliedFiltersMap,
    searchResults,
    filteredSearchResults,
    setFilteredSearchResults,
    page,
    setPage,
    setPageParams,
    sort,
    setSort,
    setSortParams,
    isLoading,
    fetchData,
  };
}
