import generateWardSearchClause from "@/app/lib/generateWardSearchClause";

describe("generateWardSearchClause", () => {
  it("should return a search clause to filter for records where WARD is 13", () => {
    expect(generateWardSearchClause(13)).toEqual("WARD = 13");
  });

  it("should return an empty string if no ward is provided", () => {
    expect(generateWardSearchClause(null)).toEqual("");
  });

  it("should return an empty string if the ward is 0", () => {
    expect(generateWardSearchClause(0)).toEqual("");
  });
});
