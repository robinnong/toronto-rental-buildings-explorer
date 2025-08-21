import { QueryFieldFilterConstraint, where } from "firebase/firestore";

const generateIdsSearchClauses = (
  ids: number[]
): QueryFieldFilterConstraint[] => {
  const clause: QueryFieldFilterConstraint[] = [];

  if (ids?.length > 0) {
    clause.push(where("_id", "in", ids));
  }

  return clause;
};

export default generateIdsSearchClauses;
