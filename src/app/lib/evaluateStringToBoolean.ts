export const evaluateStringToBoolean = (value: string): boolean => {
  if (
    value == null ||
    value === "" ||
    value === "0" ||
    value.toLowerCase() === "no" ||
    value.toLowerCase() === "none" ||
    value.toLowerCase() === "not available" ||
    value.toLowerCase() === "unavailable"
  ) {
    return false;
  }
  return true;
};
