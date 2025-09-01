// Generates an Algolia-compatible numerical search filter from the ward filter
// See: https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/how-to/filter-by-attributes/#filter-by-numeric-value
// Example output: WARD = 6
const generateWardSearchClause = (ward: number): string => {
  if (ward) {
    return `WARD = ${ward}`;
  } else {
    return "";
  }
};

export default generateWardSearchClause;
