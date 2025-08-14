export const camelCaseToTitleCase = (str: string) => {
  if (!str) return "";
  return str.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
