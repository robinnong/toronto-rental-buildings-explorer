import { FilterType } from "./../types/global";

/**
 * Builds an Algolia-compatible query for the 'filter' parameter
 * See: https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/
 *
 * @param {string} key The filter key
 * @returns {string} The Algolia filter clause
 */
function searchQueryBuilder(key: FilterType): string {
  switch (key) {
    case "LOW_RISE":
      return "CONFIRMED_STOREYS < 5";
    case "MID_RISE":
      return "CONFIRMED_STOREYS: 5 TO 14";
    case "HIGH_RISE":
      return "CONFIRMED_STOREYS > 14";
    case "BALCONIES":
      return "BALCONIES:true";
    case "LOCKER_OR_STORAGE_ROOM":
      return "LOCKER_OR_STORAGE_ROOM:true";
    case "NON_SMOKING_BUILDING":
      return "NON_SMOKING_BUILDING:true";
    case "PETS_ALLOWED":
      return "PETS_ALLOWED:true";
    case "LAUNDRY_ROOM":
      return "LAUNDRY_ROOM:true";
    case "AIR_CONDITIONING_TYPE":
      return `NOT AIR_CONDITIONING_TYPE:"NONE"`;
    case "NO_OF_ELEVATORS":
      return "NO_OF_ELEVATORS > 0";
    case "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM":
      return "NOT DESCRIPTION_OF_INDOOR_EXERCISE_ROOM:null";
    case "PARKING_TYPE":
      return "NOT PARKING_TYPE:null";
    case "BIKE_PARKING":
      return "BIKE_PARKING:true";
    case "BARRIER_FREE_ACCESSIBILTY_ENTR":
      return "BARRIER_FREE_ACCESSIBILTY_ENTR:true";
    default:
      return null;
  }
}

export default searchQueryBuilder;
