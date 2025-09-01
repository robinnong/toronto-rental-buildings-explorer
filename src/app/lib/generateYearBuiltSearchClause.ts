import { YearBuiltFilter } from "../types/global";

// Generates an Algolia-compatible search filter from the applied year built filter
// See: https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/how-to/filter-by-attributes/#filter-by-numeric-value
// Example output: 'YEAR_BUILT >= 1996
const generateYearBuiltSearchClause = ({
  start,
  end,
}: YearBuiltFilter): string => {
  if (start != null && end == null) {
    return `YEAR_BUILT >= ${start}`;
  } else if (start == null && end != null) {
    return `YEAR_BUILT <= ${end}`;
  } else if (start != null && end != null) {
    return `YEAR_BUILT:${start} TO ${end}`;
  }
  return "";
};

export default generateYearBuiltSearchClause;
