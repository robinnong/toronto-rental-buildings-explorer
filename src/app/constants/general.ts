import { FilterOption, FilterType, Sort } from "../types/global";

export const EMBEDDED_MAP_URL = "https://www.google.com/maps/embed/v1/place";

export const sortLabels: Record<Sort, string> = {
  ward_number: "Ward number",
  year_built_asc: "Year built (ascending)",
  year_built_desc: "Year built (descending)",
};

export const sortOptions: { key: Sort; label: string }[] = [
  { key: "ward_number", label: sortLabels.ward_number },
  { key: "year_built_asc", label: sortLabels.year_built_asc },
  { key: "year_built_desc", label: sortLabels.year_built_desc },
];

export enum FilterLabels {
  AIR_CONDITIONING_TYPE = "Air conditioning",
  BARRIER_FREE_ACCESSIBILTY_ENTR = "Barrier-free entrance",
  BALCONIES = "Balconies",
  BIKE_PARKING = "Bike parking",
  NO_OF_ELEVATORS = "Elevators",
  DESCRIPTION_OF_INDOOR_EXERCISE_ROOM = "Gym",
  HIGH_RISE = "High rise",
  LAUNDRY_ROOM = "Laundry room",
  LOCKER_OR_STORAGE_ROOM = "Locker/storage room",
  LOW_RISE = "Low rise",
  MID_RISE = "Mid rise",
  NON_SMOKING_BUILDING = "Non-smoking building",
  PARKING_TYPE = "Parking",
  PETS_ALLOWED = "Pets allowed",
  YEAR_BUILT = "Year built",
}

export enum FilterIcons {
  AIR_CONDITIONING_TYPE = "fa-snowflake",
  BARRIER_FREE_ACCESSIBILTY_ENTR = "fa-wheelchair",
  BALCONIES = "fa-door-open",
  BIKE_PARKING = "fa-bicycle",
  NO_OF_ELEVATORS = "fa-elevator",
  DESCRIPTION_OF_INDOOR_EXERCISE_ROOM = "fa-dumbbell",
  HIGH_RISE = "fa-cubes-stacked",
  LAUNDRY_ROOM = "fa-tshirt",
  LOCKER_OR_STORAGE_ROOM = "fa-key",
  LOW_RISE = "fa-cube",
  MID_RISE = "fa-cubes",
  NON_SMOKING_BUILDING = "fa-ban-smoking",
  PARKING_TYPE = "fa-car",
  PETS_ALLOWED = "fa-paw",
  YEAR_BUILT = "fa-hammer",
}

export const filterQueryKeys: Record<string, string> = {
  AIR_CONDITIONING_TYPE: "air_conditioning",
  BARRIER_FREE_ACCESSIBILTY_ENTR: "barrier_free_entrance",
  BALCONIES: "balconies",
  BIKE_PARKING: "bike_parking",
  NO_OF_ELEVATORS: "elevators",
  DESCRIPTION_OF_INDOOR_EXERCISE_ROOM: "gym",
  HIGH_RISE: "high_rise",
  LAUNDRY_ROOM: "laundry_room",
  LOCKER_OR_STORAGE_ROOM: "locker_or_storage_room",
  LOW_RISE: "low_rise",
  MID_RISE: "mid_rise",
  NON_SMOKING_BUILDING: "non_smoking_building",
  PARKING_TYPE: "parking",
  PETS_ALLOWED: "pets_allowed",
};

export const queryKeyToFilter: Record<string, string> = {
  air_conditioning: "AIR_CONDITIONING_TYPE",
  barrier_free_entrance: "BARRIER_FREE_ACCESSIBILTY_ENTR",
  balconies: "BALCONIES",
  bike_parking: "BIKE_PARKING",
  elevators: "NO_OF_ELEVATORS",
  gym: "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM",
  high_rise: "HIGH_RISE",
  laundry_room: "LAUNDRY_ROOM",
  locker_or_storage_room: "LOCKER_OR_STORAGE_ROOM",
  low_rise: "LOW_RISE",
  mid_rise: "MID_RISE",
  non_smoking_building: "NON_SMOKING_BUILDING",
  parking: "PARKING_TYPE",
  pets_allowed: "PETS_ALLOWED",
};

const filterKeys: FilterType[] = [
  "AIR_CONDITIONING_TYPE",
  "BARRIER_FREE_ACCESSIBILTY_ENTR",
  "BALCONIES",
  "BIKE_PARKING",
  "NO_OF_ELEVATORS",
  "DESCRIPTION_OF_INDOOR_EXERCISE_ROOM",
  "LAUNDRY_ROOM",
  "LOCKER_OR_STORAGE_ROOM",
  "NON_SMOKING_BUILDING",
  "PARKING_TYPE",
  "PETS_ALLOWED",
];

export const buildingFeatureFilters: FilterOption[] = filterKeys.map((key) => ({
  key,
  label: FilterLabels[key],
  iconClass: FilterIcons[key],
}));

export const buildingStoreysFilters: FilterOption[] = [
  {
    key: "LOW_RISE",
    label: `${FilterLabels.LOW_RISE} (<5 storeys)`,
    iconClass: FilterIcons.LOW_RISE,
  },
  {
    key: "MID_RISE",
    label: `${FilterLabels.MID_RISE} (5 ~ 14 storeys)`,
    iconClass: FilterIcons.MID_RISE,
  },
  {
    key: "HIGH_RISE",
    label: `${FilterLabels.HIGH_RISE} (>14 storeys)`,
    iconClass: FilterIcons.HIGH_RISE,
  },
];
