import { QueryOrderByConstraint, orderBy } from "firebase/firestore";
import { Sort } from "../types/global";

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

export default generateOrderBySearchClauses;
