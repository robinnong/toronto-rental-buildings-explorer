import { FieldPath, WhereFilterOp } from "firebase/firestore";

export type FilterType =
  | "aircon" // AIR_CONDITIONING_TYPE
  | "barrier_free_entrance" // BARRIER_FREE_ACCESSIBILTY_ENTR
  | "balconies" // BALCONIES
  | "bike_parking" // BIKE_PARKING
  | "elevator" // NO_OF_ELEVATORS
  | "gym" // DESCRIPTION_OF_INDOOR_EXERCISE_ROOM
  | "high_rise" // CONFIRMED_STOREYS
  | "laundry_room" // LAUNDRY_ROOM
  | "locker_storage" // LOCKER_OR_STORAGE_ROOM
  | "low_rise" // CONFIRMED_STOREYS
  | "mid_rise" // CONFIRMED_STOREYS
  | "no_smoking" // NON_SMOKING_BUILDING
  | "parking" // PARKING_TYPE
  | "pets_allowed" // PETS_ALLOWED
  | "year_built"; // YEAR_BUILT

export type FirestoreWhereClause = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

export type FilterOption = {
  key: FilterType;
  label: string;
  iconClass: string;
};

export type AppliedFilterMap = {
  [key in FilterType]?: FirestoreWhereClause[];
};

export type FetchDataResponse = {
  _id: number;
  AIR_CONDITIONING_TYPE: string; // air-con
  AMENITIES_AVAILABLE: string;
  ANNUAL_FIRE_ALARM_TEST_RECORDS: string;
  ANNUAL_FIRE_PUMP_FLOW_TEST_RECORDS: string;
  APPROVED_FIRE_SAFETY_PLAN: string;
  BALCONIES: string; // balconies
  BARRIER_FREE_ACCESSIBILTY_ENTR: string; // barrier-free-entrance
  BIKE_PARKING: string; // bike-parking
  CONFIRMED_STOREYS: number; // low-rise, mid-rise, high-rise
  CONFIRMED_UNITS: number;
  DATE_OF_LAST_INSPECTION_BY_TSSA: string;
  DESCRIPTION_OF_CHILD_PLAY_AREA: string;
  DESCRIPTION_OF_INDOOR_EXERCISE_ROOM: string; // gym
  DESCRIPTION_OF_OUTDOOR_REC_FACILITIES: string;
  ELEVATOR_PARTS_REPLACED: string;
  ELEVATOR_STATUS: string;
  EMERG_POWER_SUPPLY_TEST_RECORDS: string;
  EXTERIOR_FIRE_ESCAPE: string;
  FACILITIES_AVAILABLE: string;
  FIRE_ALARM: string;
  GARBAGE_CHUTES: string;
  GREEN_BIN_LOCATION: string;
  HEATING_EQUIPMENT_STATUS: string;
  HEATING_EQUIPMENT_YEAR_INSTALLED: string;
  HEATING_TYPE: string;
  INDOOR_GARBAGE_STORAGE_AREA: string;
  INTERCOM: string;
  IS_THERE_A_COOLING_ROOM: string;
  IS_THERE_EMERGENCY_POWER: string;
  LAUNDRY_ROOM: string; // laundry-room
  LAUNDRY_ROOM_HOURS_OF_OPERATION: string;
  LAUNDRY_ROOM_LOCATION: string;
  LOCKER_OR_STORAGE_ROOM: string;
  NO_BARRIER_FREE_ACCESSBLE_UNITS: number;
  NO_OF_ACCESSIBLE_PARKING_SPACES: number;
  NO_OF_ELEVATORS: number; // elevator
  NO_OF_LAUNDRY_ROOM_MACHINES: number;
  NON_SMOKING_BUILDING: string; // no-smoking
  OUTDOOR_GARBAGE_STORAGE_AREA: string;
  PARKING_TYPE: string; // parking
  PCODE: string;
  PET_RESTRICTIONS: string;
  PETS_ALLOWED: string; // pets-allowed
  PROP_MANAGEMENT_COMPANY_NAME: string;
  PROPERTY_TYPE: string;
  RECYCLING_BINS_LOCATION: string;
  RSN: number;
  SEPARATE_GAS_METERS_EACH_UNIT: string;
  SEPARATE_HYDRO_METER_EACH_UNIT: string;
  SEPARATE_WATER_METERS_EA_UNIT: string;
  SITE_ADDRESS: string;
  SPRINKLER_SYSTEM: string;
  SPRINKLER_SYSTEM_TEST_RECORD: string;
  SPRINKLER_SYSTEM_YEAR_INSTALLED: string;
  TSSA_TEST_RECORDS: string;
  VISITOR_PARKING: string;
  WARD: string;
  WINDOW_TYPE: string;
  YEAR_BUILT: number;
  YEAR_OF_REPLACEMENT: number;
  YEAR_REGISTERED: number;
  NO_OF_STOREYS: number;
  NO_OF_UNITS: number;
  NO_BARRIER_FREE_ACCESSIBLE_UNITS: number;
};
