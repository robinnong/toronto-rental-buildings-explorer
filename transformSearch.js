const data = require("./db-upload/datastore_search_7.json"); // change the path to the file you want to upload

let newRecords = { ...data };

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

newRecords.records.forEach((obj) => {
  for (const key in obj) {
    // Convert BIKE_PARKING to boolean
    if (key === "BIKE_PARKING") {
      if (obj[key] !== false) {
        obj[key] = obj[key] === "Not Available" ? false : true;
      }
    }

    // Transform to integer
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

    if (key === "PARKING_TYPE") {
      obj[key] = [obj[key]];
    }

    // Remove unwanted properties
    if (!propsToKeep.includes(key)) {
      delete obj[key];
    }
  }
});

module.exports = newRecords;
