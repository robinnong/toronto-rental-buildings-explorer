export const camelCaseToTitleCase = (str: string) => {
  if (!str) return "";
  return str.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
