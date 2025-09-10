import camelCaseToTitleCase from "@/app/lib/camelCaseToTitleCase";

describe("camelCaseToTitleCase", () => {
  it("should return the input string in title case", () => {
    expect(camelCaseToTitleCase("north_york")).toEqual("North York");
    expect(camelCaseToTitleCase("NEW_YORK_CITY")).toEqual("New York City");
    expect(camelCaseToTitleCase("hElLo_WoRlD")).toEqual("Hello World");
  });
});
