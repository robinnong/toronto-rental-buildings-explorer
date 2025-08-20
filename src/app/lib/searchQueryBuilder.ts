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
    case "BALCONIES":
      return [
        {
          fieldPath: "BALCONIES",
          opStr: "==",
          value: true,
        },
      ];
    case "LOCKER_OR_STORAGE_ROOM":
      return [
        {
          fieldPath: "LOCKER_OR_STORAGE_ROOM",
          opStr: "==",
          value: true,
        },
      ];
    case "NON_SMOKING_BUILDING":
      return [
        {
          fieldPath: "NON_SMOKING_BUILDING",
          opStr: "==",
          value: true,
        },
      ];
    case "PETS_ALLOWED":
      return [
        {
          fieldPath: "PETS_ALLOWED",
          opStr: "==",
          value: true,
        },
      ];
    case "LAUNDRY_ROOM":
      return [
        {
          fieldPath: "LAUNDRY_ROOM",
          opStr: "==",
          value: true,
        },
      ];
    case "LOW_RISE":
      return [
        {
          fieldPath: "CONFIRMED_STOREYS",
          opStr: "<",
          value: 5,
        },
      ];
    case "MID_RISE":
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
    case "HIGH_RISE":
      return [
        {
          fieldPath: "CONFIRMED_STOREYS",
          opStr: ">",
          value: 14,
        },
      ];
    case "AIR_CONDITIONING_TYPE":
      return [
        {
          fieldPath: "AIR_CONDITIONING_TYPE",
          opStr: "in",
          value: ["CENTRAL AIR", "INDIVIDUAL UNITS"],
        },
      ];
    case "NO_OF_ELEVATORS":
      return [
        {
          fieldPath: "NO_OF_ELEVATORS",
          opStr: ">",
          value: 0,
        },
      ];
    case "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM":
      return [
        {
          fieldPath: "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM",
          opStr: "!=",
          value: null,
        },
      ];
    case "PARKING_TYPE":
      return [
        {
          fieldPath: "PARKING_TYPE",
          opStr: "array-contains-any",
          value: [
            "Ground Level Garage",
            "Underground Garage",
            "Carport",
            "Garage accessible thru building",
            "Surface Parking",
            "Parking Deck",
          ],
        },
      ];
    case "BIKE_PARKING":
      return [
        {
          fieldPath: "BIKE_PARKING",
          opStr: "==",
          value: true,
        },
      ];
    case "BARRIER_FREE_ACCESSIBILTY_ENTR":
      return [
        {
          fieldPath: "BARRIER_FREE_ACCESSIBILTY_ENTR",
          opStr: "==",
          value: true,
        },
      ];

    default:
      return null;
  }
}
