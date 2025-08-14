import { FilterTypes } from "./../types/global";
import { FirestoreWhereClause } from "../types/global";

/**
 * Builds a Firestore query where clause based on the filter key and a defined condition
 * @param {string} key The filter key
 * @returns {FirestoreWhereClause[]} The Firestore where clause(s)
 */
export default function searchQueryBuilder(
  key: FilterTypes
): FirestoreWhereClause[] {
  switch (key) {
    case "balconies":
      return [
        {
          fieldPath: "BALCONIES",
          opStr: "==",
          value: "YES",
        },
      ];
    case "locker-storage":
      return [
        {
          fieldPath: "LOCKER_OR_STORAGE_ROOM",
          opStr: "==",
          value: "YES",
        },
      ];
    case "no-smoking":
      return [
        {
          fieldPath: "NON_SMOKING_BUILDING",
          opStr: "==",
          value: "YES",
        },
      ];
    case "pets-allowed":
      return [
        {
          fieldPath: "PETS_ALLOWED",
          opStr: "==",
          value: "YES",
        },
      ];
    case "laundry-room":
      return [
        {
          fieldPath: "LAUNDRY_ROOM",
          opStr: "==",
          value: "YES",
        },
      ];
    case "low-rise":
      return [
        {
          fieldPath: "CONFIRMED_STOREYS",
          opStr: "<",
          value: 5,
        },
      ];
    case "mid-rise":
      // Range query requires 2 separate where clauses
      return [
        {
          fieldPath: "CONFIRMED_STOREYS",
          opStr: ">=",
          value: 5,
        },
        {
          fieldPath: "CONFIRMED_STOREYS",
          opStr: "<=",
          value: 14,
        },
      ];
    case "high-rise":
      return [
        {
          fieldPath: "CONFIRMED_STOREYS",
          opStr: ">",
          value: 14,
        },
      ];
    case "aircon":
      return [
        {
          fieldPath: "AIR_CONDITIONING_TYPE",
          opStr: "!=",
          value: "NONE",
        },
      ];
    case "elevator":
      return [
        {
          fieldPath: "NO_OF_ELEVATORS",
          opStr: "!=",
          value: "0",
        },
      ];
    case "gym":
      return [
        {
          fieldPath: "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM",
          opStr: "!=",
          value: null,
        },
      ];
    case "parking":
      return [
        {
          fieldPath: "PARKING_TYPE",
          opStr: "!=",
          value: null,
        },
      ];
    case "bike-parking":
      return [
        {
          fieldPath: "BIKE_PARKING",
          opStr: "!=",
          value: "Not Available",
        },
      ];
    case "barrier-free-entrance":
      return [
        {
          fieldPath: "BARRIER_FREE_ACCESSIBILTY_ENTR",
          opStr: "==",
          value: "YES",
        },
      ];

    default:
      return null;
  }
}
