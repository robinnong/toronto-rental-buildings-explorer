import {
  QueryStartAtConstraint,
  QueryEndAtConstraint,
  limitToLast,
  limit,
} from "firebase/firestore";
import { firestoreQueryLimit } from "../constants/general";

const generateLimitSearchClause = (
  pageSearchClause: QueryStartAtConstraint | QueryEndAtConstraint
) => {
  if (pageSearchClause.type === "endBefore") {
    return limitToLast(firestoreQueryLimit);
  }
  return limit(firestoreQueryLimit);
};

export default generateLimitSearchClause;
