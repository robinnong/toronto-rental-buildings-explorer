import generateCompositeFilter from "@/app/lib/generateCompositeFilter";
import { FilterType } from "@/app/types/global";

describe("generateWardSearchClause", () => {
  it("should return an Algolia-compatible filter searching for apartments that were built on or after 1996, are 5 to 14 storeys tall, have a barrier-free entrance, and are located in Ward 6", () => {
    const input = {
      buildingFeatures: [
        "BARRIER_FREE_ACCESSIBILTY_ENTR",
        "MID_RISE",
      ] as FilterType[],
      yearBuilt: { start: 1996 },
      ward: 6,
    };

    const output =
      "YEAR_BUILT >= 1996 AND WARD = 6 AND BARRIER_FREE_ACCESSIBILTY_ENTR:true AND CONFIRMED_STOREYS: 5 TO 14";

    expect(generateCompositeFilter(input)).toEqual(output);
  });

  it("should return an Algolia-compatible filter searching for apartments that were built between 1950 and 2000 (inclusive), are less than 5 storeys tall, prohibit smoking, allow pets, and are located in Ward 13", () => {
    const input = {
      buildingFeatures: [
        "NON_SMOKING_BUILDING",
        "PETS_ALLOWED",
        "LOW_RISE",
      ] as FilterType[],
      yearBuilt: { start: 1950, end: 2000 },
      ward: 13,
    };

    const output =
      "YEAR_BUILT:1950 TO 2000 AND WARD = 13 AND NON_SMOKING_BUILDING:true AND PETS_ALLOWED:true AND CONFIRMED_STOREYS < 5";

    expect(generateCompositeFilter(input)).toEqual(output);
  });
});
