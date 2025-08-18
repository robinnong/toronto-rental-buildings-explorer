import { FilterOption, FilterType, SortByType } from "../types/global";

export const EMBEDDED_MAP_URL = "https://www.google.com/maps/embed/v1/place";

// Firestore Database paths
const fsDbCollection = "toronto-apartment-building-registration";
const fsDbDoc = "datastore_search_0";
const fsDbSubCollection = "records";

export const firestoreDbPaths: [string, ...string[]] = [
  fsDbCollection,
  fsDbDoc,
  fsDbSubCollection,
];
export const firestoreQueryLimit = 100;

export const torontoPostalCodesByKey: Record<string, string[]> = {
  scarborough: [
    "M1B",
    "M1C",
    "M1E",
    "M1G",
    "M1H",
    "M1J",
    "M1K",
    "M1L",
    "M1M",
    "M1N",
    "M1P",
    "M1R",
    "M1S",
    "M1T",
    "M1V",
    "M1W",
    "M1X",
  ],
  east_york: ["M4B", "M4C", "M4E", "M4G", "M4H", "M4J", "M4K"],
  north_york: [
    "M2H",
    "M2J",
    "M2K",
    "M2L",
    "M2M",
    "M2N",
    "M2P",
    "M2R",
    "M3A",
    "M3B",
    "M3C",
    "M3H",
    "M3J",
    "M3K",
    "M3L",
    "M3M",
    "M3N",
    "M4A",
    "M4L",
    "M4M",
    "M4N",
    "M4P",
    "M4R",
    "M4S",
    "M4T",
    "M4V",
    "M4W",
    "M4X",
    "M4Y",
  ],
  etobicoke: [
    "M8V",
    "M8W",
    "M8X",
    "M8Y",
    "M8Z",
    "M9A",
    "M9B",
    "M9C",
    "M9L",
    "M9M",
    "M9N",
    "M9P",
    "M9R",
    "M9V",
    "M9W",
  ],
  toronto: [
    "M5A",
    "M5B",
    "M5C",
    "M5E",
    "M5G",
    "M5H",
    "M5J",
    "M5K",
    "M5L",
    "M5M",
    "M5N",
    "M5P",
    "M5R",
    "M5S",
    "M5T",
    "M5V",
    "M5W",
    "M5X",
    "M6A",
    "M6B",
    "M6C",
    "M6E",
    "M6G",
    "M6H",
    "M6J",
    "M6K",
    "M6L",
    "M6M",
    "M6N",
    "M6P",
    "M6R",
    "M6S",
    "M7A",
  ],
};

export const sortByLabels: Record<SortByType, string> = {
  ward_number: "Ward number",
  year_built_asc: "Year built (ascending)",
  year_built_desc: "Year built (descending)",
};

export const sortByOptions: { key: SortByType; label: string }[] = [
  { key: "ward_number", label: sortByLabels.ward_number },
  { key: "year_built_asc", label: sortByLabels.year_built_asc },
  { key: "year_built_desc", label: sortByLabels.year_built_desc },
];

export const filterLabels: Record<FilterType, string> = {
  aircon: "Air conditioning",
  barrier_free_entrance: "Barrier-free entrance",
  balconies: "Balconies",
  bike_parking: "Bike parking",
  elevator: "Elevator",
  gym: "Gym",
  high_rise: "High rise",
  laundry_room: "Laundry room",
  locker_storage: "Locker/storage room",
  low_rise: "Low rise",
  mid_rise: "Mid rise",
  no_smoking: "Non-smoking building",
  parking: "Parking",
  pets_allowed: "Pets allowed",
  year_built: "Year built",
};

export const filterIcons: Record<FilterType, string> = {
  aircon: "fa-snowflake",
  barrier_free_entrance: "fa-wheelchair",
  balconies: "fa-door-open",
  bike_parking: "fa-bicycle",
  elevator: "fa-elevator",
  gym: "fa-dumbbell",
  high_rise: "fa-cubes-stacked",
  laundry_room: "fa-tshirt",
  locker_storage: "fa-key",
  low_rise: "fa-cube",
  mid_rise: "fa-cubes",
  no_smoking: "fa-ban-smoking",
  parking: "fa-car",
  pets_allowed: "fa-paw",
  year_built: "fa-hammer",
};

export const buildingStoreysFilters: FilterOption[] = [
  {
    key: "low_rise",
    label: `${filterLabels.low_rise} (<5 storeys)`,
    iconClass: filterIcons.low_rise,
  },
  {
    key: "mid_rise",
    label: `${filterLabels.mid_rise} (5 ~ 14 storeys)`,
    iconClass: filterIcons.mid_rise,
  },
  {
    key: "high_rise",
    label: `${filterLabels.high_rise} (>14 storeys)`,
    iconClass: filterIcons.high_rise,
  },
];

export const buildingFeatureFilters: FilterOption[] = [
  { key: "aircon", label: filterLabels.aircon, iconClass: filterIcons.aircon },
  {
    key: "no_smoking",
    label: filterLabels.no_smoking,
    iconClass: filterIcons.no_smoking,
  },
  {
    key: "elevator",
    label: filterLabels.elevator,
    iconClass: filterIcons.elevator,
  },
  {
    key: "pets_allowed",
    label: filterLabels.pets_allowed,
    iconClass: filterIcons.pets_allowed,
  },
  {
    key: "balconies",
    label: filterLabels.balconies,
    iconClass: filterIcons.balconies,
  },
  { key: "gym", label: filterLabels.gym, iconClass: filterIcons.gym },
  {
    key: "locker_storage",
    label: filterLabels.locker_storage,
    iconClass: filterIcons.locker_storage,
  },
  {
    key: "parking",
    label: filterLabels.parking,
    iconClass: filterIcons.parking,
  },
  {
    key: "laundry_room",
    label: filterLabels.laundry_room,
    iconClass: filterIcons.laundry_room,
  },
  {
    key: "bike_parking",
    label: filterLabels.bike_parking,
    iconClass: filterIcons.bike_parking,
  },
  {
    key: "barrier_free_entrance",
    label: filterLabels.barrier_free_entrance,
    iconClass: filterIcons.barrier_free_entrance,
  },
];
