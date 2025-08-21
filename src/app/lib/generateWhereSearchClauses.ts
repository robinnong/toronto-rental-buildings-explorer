import { QueryFieldFilterConstraint, where } from "firebase/firestore";
import { AppliedFilterMap } from "../types/global";

// Generates Firestore search WHERE clauses from the applied filters map
const generateWhereSearchClauses = (
  currentAppliedFilters: AppliedFilterMap
): QueryFieldFilterConstraint[] =>
  currentAppliedFilters
    ? Object.values(currentAppliedFilters).reduce((acc, curr) => {
        acc.push(...curr.map((c) => where(c.fieldPath, c.opStr, c.value)));
        return acc;
      }, [] as QueryFieldFilterConstraint[])
    : [];

export default generateWhereSearchClauses;
