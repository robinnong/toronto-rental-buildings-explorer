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
  query,
  where,
  FieldPath,
  WhereFilterOp,
} from "firebase/firestore";
import { evaluateStringToBoolean } from "@/app/lib/evaluateStringToBoolean";
import { FetchDataResponse, AppliedFilter } from "@/app/types/global";
import { db } from "../../firebase.config";

export type SearchContextModel = {
  appliedFilters: AppliedFilter[];
  setAppliedFilters: Dispatch<SetStateAction<AppliedFilter[]>>;
  filteredSearchResults: FetchDataResponse[];
  setFilteredSearchResults: Dispatch<SetStateAction<FetchDataResponse[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  isInitialized: boolean;
  fetchData: () => Promise<void>;
};

export const SearchContext = createContext<SearchContextModel>(null);

// TODO: Comment here
export default function useSearchContext(): SearchContextModel {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filteredSearchResults, setFilteredSearchResults] = useState<
    FetchDataResponse[]
  >([]);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
  const [whereClauses, setWhereClauses] = useState<
    {
      fieldPath: string | FieldPath;
      opStr: WhereFilterOp;
      value: unknown;
    }[]
  >([]);
  const [page, setPage] = useState(1);

  const collectionRef = collection(
    db,
    "toronto-apartment-building-registration", // TODO: make this a const
    "datastore_search_0", // TODO: make this a const
    "records" // TODO: make this a const
  );

  // TODO: Comment here
  useEffect(() => {
    if (appliedFilters.find(({ key }) => key === "balconies")) {
      setWhereClauses((prev) => [
        ...prev,
        {
          fieldPath: "BALCONIES",
          opStr: "==",
          value: "YES",
        },
      ]);
    }
    if (appliedFilters.find(({ key }) => key === "locker-storage")) {
      setWhereClauses((prev) => [
        ...prev,
        {
          fieldPath: "LOCKER_OR_STORAGE_ROOM",
          opStr: "==",
          value: "YES",
        },
      ]);
    }
    if (appliedFilters.find(({ key }) => key === "no-smoking")) {
      setWhereClauses((prev) => [
        ...prev,
        {
          fieldPath: "NON_SMOKING_BUILDING",
          opStr: "==",
          value: "YES",
        },
      ]);
    }
    if (appliedFilters.find(({ key }) => key === "pets-allowed")) {
      setWhereClauses((prev) => [
        ...prev,
        {
          fieldPath: "PETS_ALLOWED",
          opStr: "==",
          value: "YES",
        },
      ]);
    }
    if (appliedFilters.find(({ key }) => key === "shared-laundry")) {
      setWhereClauses((prev) => [
        ...prev,
        {
          fieldPath: "LAUNDRY_ROOM",
          opStr: "==",
          value: "YES",
        },
      ]);
    }
  }, [appliedFilters]);

  // TODO: Comment here
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const whereQueries = whereClauses.map((clause) =>
        where(clause.fieldPath, clause.opStr, clause.value)
      );

      // TODO: Add pagination and search by offset (see Firestore docs)
      const q =
        whereClauses?.length > 0
          ? query(collectionRef, limit(25), ...whereQueries)
          : query(collectionRef, limit(25)); // TODO: Fix this
      const querySnapshot = await getDocs(q);

      const results: FetchDataResponse[] = [];

      querySnapshot.docs.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        const res = await doc.data();

        if (validateAptByFEFilter(res as FetchDataResponse)) {
          results.push(res as FetchDataResponse);
        }
      });

      setWhereClauses([]); // Clear
      setFilteredSearchResults(results);
    } catch (error) {
      // TODO - Display error message to the user
      console.error("Error fetching data:", error);
    } finally {
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, [whereClauses]);

  // TODO: Comment here
  const validateAptByFEFilter = useCallback(
    (apt: FetchDataResponse) => {
      if (appliedFilters?.length === 0) {
        return true;
      }
      if (
        evaluateStringToBoolean(apt.AIR_CONDITIONING_TYPE) &&
        appliedFilters.find(({ key }) => key === "aircon")
      ) {
        return true;
      }
      if (
        evaluateStringToBoolean(apt.NO_OF_ELEVATORS) &&
        appliedFilters.find(({ key }) => key === "elevator")
      ) {
        return true;
      }
      if (
        evaluateStringToBoolean(apt.DESCRIPTION_OF_INDOOR_EXERCISE_ROOM) &&
        appliedFilters.find(({ key }) => key === "gym")
      ) {
        return true;
      }
      if (
        evaluateStringToBoolean(apt.PARKING_TYPE) &&
        appliedFilters.find(({ key }) => key === "parking")
      ) {
        return true;
      }
      if (
        evaluateStringToBoolean(apt.BIKE_PARKING) &&
        appliedFilters.find(({ key }) => key === "bike-parking")
      ) {
        return true;
      }
      if (
        apt.CONFIRMED_STOREYS < 5 &&
        appliedFilters.find(({ key }) => key === "low-rise")
      ) {
        return true;
      }
      if (
        apt.CONFIRMED_STOREYS >= 5 &&
        apt.CONFIRMED_STOREYS <= 14 &&
        appliedFilters.find(({ key }) => key === "mid-rise")
      ) {
        return true;
      }
      if (
        apt.CONFIRMED_STOREYS > 14 &&
        appliedFilters.find(({ key }) => key === "high-rise")
      ) {
        return true;
      }
      return false;
    },
    [appliedFilters]
  );

  return {
    appliedFilters,
    setAppliedFilters,
    filteredSearchResults,
    setFilteredSearchResults,
    page,
    setPage,
    fetchData,
    isInitialized,
    isLoading,
  };
}
