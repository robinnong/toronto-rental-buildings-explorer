import { FilterOption } from "../types/global";

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
export const firestoreQueryLimit = 25;

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

export const buildingStoreysFilters: FilterOption[] = [
  {
    key: "low-rise",
    label: "Low rise (<5 storeys)",
    iconClass: "fa-cube",
  },

  {
    key: "mid-rise",
    label: "Mid rise (5 ~ 14 storeys)",
    iconClass: "fa-cubes",
  },
  {
    key: "high-rise",
    label: "High rise (>14 storeys)",
    iconClass: "fa-cubes-stacked",
  },
];

export const buildingFeatureFilters: FilterOption[] = [
  { key: "aircon", label: "Air conditioning", iconClass: "fa-snowflake" },
  {
    key: "no-smoking",
    label: "Non-smoking building",
    iconClass: "fa-ban-smoking",
  },
  { key: "elevator", label: "Elevator", iconClass: "fa-elevator" },
  { key: "pets-allowed", label: "Pets allowed", iconClass: "fa-paw" },
  { key: "balconies", label: "Balconies", iconClass: "fa-door-open" },
  { key: "gym", label: "Gym", iconClass: "fa-dumbbell" },
  {
    key: "locker-storage",
    label: "Locker/storage room",
    iconClass: "fa-key",
  },
  {
    key: "parking",
    label: "Parking",
    iconClass: "fa-car",
  },
  {
    key: "laundry-room",
    label: "Laundry room",
    iconClass: "fa-tshirt",
  },
  { key: "bike-parking", label: "Bike parking", iconClass: "fa-bicycle" },
  {
    key: "barrier-free-entrance",
    label: "Barrier-free entrance",
    iconClass: "fa-wheelchair",
  },
];
