import { FilterType, YearBuiltFilter } from "../types/global";
import generateSearchClauses from "./generateSearchClauses";
import generateWardSearchClause from "./generateWardSearchClause";
import generateYearBuiltSearchClause from "./generateYearBuiltSearchClause";

// Combines all filter clauses into a single string for Algolia search filter param
// Example output: 'YEAR_BUILT >= 1996 AND WARD = 6 AND BARRIER_FREE_ACCESSIBILTY_ENTR:true AND CONFIRMED_STOREYS: 5 TO 14'
const generateCompositeFilter = ({
  buildingFeatures,
  yearBuilt,
  ward,
}: {
  buildingFeatures: FilterType[];
  yearBuilt: YearBuiltFilter;
  ward: number;
}): string => {
  const yearFilterClause = generateYearBuiltSearchClause(yearBuilt);
  const wardFilterClause = generateWardSearchClause(ward);
  const featureFilterClauses = generateSearchClauses(buildingFeatures);

  const compositeFilters = [];

  if (yearFilterClause) {
    compositeFilters.push(yearFilterClause);
  }
  if (wardFilterClause) {
    compositeFilters.push(wardFilterClause);
  }
  if (featureFilterClauses) {
    compositeFilters.push(featureFilterClauses);
  }

  return compositeFilters.join(" AND ");
};

export default generateCompositeFilter;
