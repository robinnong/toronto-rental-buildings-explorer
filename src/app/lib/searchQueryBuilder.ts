import { FilterType } from "./../types/global";
import { FirestoreWhereClause } from "../types/global";

/**
 * Builds a Firestore query where clause based on the filter key and a defined condition
 * See: https://firebase.google.com/docs/firestore/query-data/queries
 *
 * @param {string} key The filter key
 * @returns {FirestoreWhereClause[]} The Firestore where clause(s)
 */
export default function searchQueryBuilder(
  key: FilterType
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
    case "locker_storage":
      return [
        {
          fieldPath: "LOCKER_OR_STORAGE_ROOM",
          opStr: "==",
          value: "YES",
        },
      ];
    case "no_smoking":
      return [
        {
          fieldPath: "NON_SMOKING_BUILDING",
          opStr: "==",
          value: "YES",
        },
      ];
    case "pets_allowed":
      return [
        {
          fieldPath: "PETS_ALLOWED",
          opStr: "==",
          value: "YES",
        },
      ];
    case "laundry_room":
      return [
        {
          fieldPath: "LAUNDRY_ROOM",
          opStr: "==",
          value: "YES",
        },
      ];
    case "low_rise":
      return [
        {
          fieldPath: "CONFIRMED_STOREYS",
          opStr: "<",
          value: 5,
        },
      ];
    case "mid_rise":
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
    case "high_rise":
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
          opStr: "==",
          value: "CENTRAL AIR",
        },
      ];
    case "elevator":
      return [
        {
          fieldPath: "NO_OF_ELEVATORS",
          opStr: ">",
          value: 0,
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
    case "bike_parking":
      return [
        {
          fieldPath: "BIKE_PARKING",
          opStr: "!=",
          value: "Not Available",
        },
      ];
    case "barrier_free_entrance":
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
