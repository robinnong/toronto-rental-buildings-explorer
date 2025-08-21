import {
  QueryDocumentSnapshot,
  DocumentData,
  QueryStartAtConstraint,
  QueryEndAtConstraint,
  startAt,
  startAfter,
  endBefore,
} from "firebase/firestore";

const generatePageSearchClause = (
  newPage: number,
  currentPage: number,
  firstVisibleDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>,
  lastVisibleDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>
): QueryStartAtConstraint | QueryEndAtConstraint => {
  let clause: QueryStartAtConstraint | QueryEndAtConstraint;

  if (newPage === 1 && !firstVisibleDoc) {
    clause = startAt(null);
  } else if (newPage > currentPage) {
    clause = startAfter(lastVisibleDoc);
  } else if (newPage < currentPage) {
    clause = endBefore(firstVisibleDoc);
  } else if (newPage == currentPage) {
    clause = startAt(firstVisibleDoc);
  }
  return clause;
};

export default generatePageSearchClause;
