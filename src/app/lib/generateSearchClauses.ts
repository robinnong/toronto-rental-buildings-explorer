import { FilterType } from "../types/global";
import searchQueryBuilder from "./searchQueryBuilder";

// Generates Algolia-compatible search clauses from a list of applied building features filters
const generateSearchClauses = (
  currentBuildingFeatureFilters: FilterType[]
): string[] =>
  currentBuildingFeatureFilters.reduce((acc, curr) => {
    acc.push(searchQueryBuilder(curr));
    return acc;
  }, [] as string[]);

export default generateSearchClauses;
