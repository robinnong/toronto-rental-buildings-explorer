const data = require("./db-upload/datastore_search_11.json"); // change the path to the file you want to upload

let newRecords = [...data];

const propsToKeep = [
  "_id",
  "AIR_CONDITIONING_TYPE",
  "BALCONIES",
  "BARRIER_FREE_ACCESSIBILTY_ENTR",
  "BIKE_PARKING",
  "CONFIRMED_STOREYS",
  "CONFIRMED_UNITS",
  "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM",
  "DESCRIPTION_OF_OUTDOOR_REC_FACILITIES",
  "FACILITIES_AVAILABLE",
  "FIRE_ALARM",
  "HEATING_TYPE",
  "LAUNDRY_ROOM",
  "LOCKER_OR_STORAGE_ROOM",
  "NO_BARRIER_FREE_ACCESSBLE_UNITS",
  "NO_OF_ACCESSIBLE_PARKING_SPACES",
  "NO_OF_ELEVATORS",
  "NO_OF_LAUNDRY_ROOM_MACHINES",
  "NON_SMOKING_BUILDING",
  "PARKING_TYPE",
  "PCODE",
  "PET_RESTRICTIONS",
  "PETS_ALLOWED",
  "PROP_MANAGEMENT_COMPANY_NAME",
  "PROPERTY_TYPE",
  "SEPARATE_GAS_METERS_EACH_UNIT",
  "SEPARATE_HYDRO_METER_EACH_UNIT",
  "SEPARATE_WATER_METERS_EA_UNIT",
  "SITE_ADDRESS",
  "VISITOR_PARKING",
  "WARD",
  "YEAR_BUILT",
];

newRecords.forEach((obj) => {
  for (const key in obj) {
    // Remove unwanted properties
    if (!propsToKeep.includes(key)) {
      delete obj[key];
    }

    // Convert BIKE_PARKING to boolean
    if (key === "BIKE_PARKING") {
      if (obj[key] !== false) {
        obj[key] = obj[key] === "Not Available" ? false : true;
      }
    }

    // Conver PARKING_TYPE to array of strings
    if (key === "PARKING_TYPE") {
      if (obj[key] != null) {
        obj[key] = [obj[key]];
      }
    }

    // Transform these fields to integer
    if (
      key === "NO_BARRIER_FREE_ACCESSBLE_UNITS" ||
      key === "NO_OF_ACCESSIBLE_PARKING_SPACES" ||
      key === "NO_OF_ELEVATORS" ||
      key === "NO_OF_LAUNDRY_ROOM_MACHINES" ||
      key === "YEAR_BUILT" ||
      key === "WARD"
    ) {
      obj[key] = parseInt(obj[key], 10);
    }

    // Convert any remaining fields with "NO" or "YES" to boolean
    if (obj[key] === "NO") {
      obj[key] = false;
    } else if (obj[key] === "YES") {
      obj[key] = true;
    }
  }
});

module.exports = newRecords;
