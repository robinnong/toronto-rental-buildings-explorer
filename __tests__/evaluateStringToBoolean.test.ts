import evaluateStringToBoolean from "@/app/lib/evaluateStringToBoolean";

describe("evaluateStringToBoolean", () => {
  it("should return null, empty string, stringified zero, and strings classified as falsey as false", () => {
    expect(evaluateStringToBoolean(null)).toEqual(false);
    expect(evaluateStringToBoolean("")).toEqual(false);
    expect(evaluateStringToBoolean("NO")).toEqual(false);
    expect(evaluateStringToBoolean("NONE")).toEqual(false);
    expect(evaluateStringToBoolean("NOT AVAILABLE")).toEqual(false);
    expect(evaluateStringToBoolean("UNAVAILABLE")).toEqual(false);
    expect(evaluateStringToBoolean("0")).toEqual(false);
  });

  it("should return any stringified non-zero number and strings not classified falsey as true", () => {
    expect(evaluateStringToBoolean("1")).toEqual(true);
    expect(evaluateStringToBoolean("YES")).toEqual(true);
    expect(evaluateStringToBoolean("AVAILABLE")).toEqual(true);
  });
});
