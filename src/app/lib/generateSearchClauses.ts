import { FilterType } from "../types/global";
import searchQueryBuilder from "./searchQueryBuilder";

// Generates Algolia-compatible search clauses from a list of applied building features filters
// Example output: BARRIER_FREE_ACCESSIBILTY_ENTR:true AND CONFIRMED_STOREYS: 5 TO 14'
const generateSearchClauses = (filters: FilterType[]): string => {
  const clauses = filters.reduce((acc, curr) => {
    acc.push(searchQueryBuilder(curr));
    return acc;
  }, [] as string[]);

  return clauses.join(" AND ");
};

export default generateSearchClauses;
