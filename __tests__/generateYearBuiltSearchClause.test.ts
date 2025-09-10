import generateYearBuiltSearchClause from "@/app/lib/generateYearBuiltSearchClause";

describe("generateYearBuiltSearchClause", () => {
  it("should return a search clause for YEAR_BUILT between 2000 and 2005, inclusive", () => {
    expect(generateYearBuiltSearchClause({ start: 2000, end: 2005 })).toEqual(
      "YEAR_BUILT:2000 TO 2005"
    );
  });

  it("should return a search clause where YEAR_BUILT is greater than or equal to 2000", () => {
    expect(generateYearBuiltSearchClause({ start: 2000, end: null })).toEqual(
      "YEAR_BUILT >= 2000"
    );
  });

  it("should return a search clause where YEAR_BUILT is less than or equal to 2005", () => {
    expect(generateYearBuiltSearchClause({ start: null, end: 2005 })).toEqual(
      "YEAR_BUILT <= 2005"
    );
  });
});
