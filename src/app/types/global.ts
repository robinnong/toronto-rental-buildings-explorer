import { FieldPath, WhereFilterOp } from "firebase/firestore";

export type FilterType =
  | "AIR_CONDITIONING_TYPE"
  | "BARRIER_FREE_ACCESSIBILTY_ENTR"
  | "BALCONIES"
  | "BIKE_PARKING"
  | "NO_OF_ELEVATORS"
  | "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM"
  | "HIGH_RISE"
  | "LAUNDRY_ROOM"
  | "LOCKER_OR_STORAGE_ROOM"
  | "LOW_RISE"
  | "MID_RISE"
  | "NON_SMOKING_BUILDING"
  | "PARKING_TYPE"
  | "PETS_ALLOWED"
  | "YEAR_BUILT";

export type Sort = "ward_number" | "year_built_asc" | "year_built_desc";

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
  AIR_CONDITIONING_TYPE: string;
  AMENITIES_AVAILABLE: string;
  ANNUAL_FIRE_ALARM_TEST_RECORDS: boolean;
  ANNUAL_FIRE_PUMP_FLOW_TEST_RECORDS: boolean;
  APPROVED_FIRE_SAFETY_PLAN: boolean;
  BALCONIES: boolean;
  BARRIER_FREE_ACCESSIBILTY_ENTR: boolean;
  BIKE_PARKING: boolean;
  CONFIRMED_STOREYS: number;
  CONFIRMED_UNITS: number;
  DATE_OF_LAST_INSPECTION_BY_TSSA: string;
  DESCRIPTION_OF_CHILD_PLAY_AREA: string;
  DESCRIPTION_OF_INDOOR_EXERCISE_ROOM: string;
  DESCRIPTION_OF_OUTDOOR_REC_FACILITIES: string;
  ELEVATOR_PARTS_REPLACED: string;
  ELEVATOR_STATUS: string;
  EMERG_POWER_SUPPLY_TEST_RECORDS: string;
  EXTERIOR_FIRE_ESCAPE: boolean;
  FACILITIES_AVAILABLE: string;
  FIRE_ALARM: boolean;
  GARBAGE_CHUTES: boolean;
  GREEN_BIN_LOCATION: string;
  HEATING_EQUIPMENT_STATUS: string;
  HEATING_EQUIPMENT_YEAR_INSTALLED: string;
  HEATING_TYPE: string;
  INDOOR_GARBAGE_STORAGE_AREA: boolean;
  INTERCOM: boolean;
  IS_THERE_A_COOLING_ROOM: boolean;
  IS_THERE_EMERGENCY_POWER: boolean;
  LAUNDRY_ROOM: boolean;
  LAUNDRY_ROOM_HOURS_OF_OPERATION: string;
  LAUNDRY_ROOM_LOCATION: boolean;
  LOCKER_OR_STORAGE_ROOM: boolean;
  NO_BARRIER_FREE_ACCESSBLE_UNITS: number;
  NO_OF_ACCESSIBLE_PARKING_SPACES: number;
  NO_OF_ELEVATORS: number;
  NO_OF_LAUNDRY_ROOM_MACHINES: number;
  NON_SMOKING_BUILDING: boolean;
  OUTDOOR_GARBAGE_STORAGE_AREA: boolean;
  PARKING_TYPE: string[];
  PCODE: string;
  PET_RESTRICTIONS: string;
  PETS_ALLOWED: boolean;
  PROP_MANAGEMENT_COMPANY_NAME: string;
  PROPERTY_TYPE: string;
  RECYCLING_BINS_LOCATION: string;
  RSN: number;
  SEPARATE_GAS_METERS_EACH_UNIT: boolean;
  SEPARATE_HYDRO_METER_EACH_UNIT: boolean;
  SEPARATE_WATER_METERS_EA_UNIT: boolean;
  SITE_ADDRESS: string;
  SPRINKLER_SYSTEM: boolean;
  SPRINKLER_SYSTEM_TEST_RECORD: string;
  SPRINKLER_SYSTEM_YEAR_INSTALLED: string;
  TSSA_TEST_RECORDS: string;
  VISITOR_PARKING: string;
  WARD: number;
  WINDOW_TYPE: string;
  YEAR_BUILT: number;
  YEAR_OF_REPLACEMENT: number;
  YEAR_REGISTERED: number;
};
