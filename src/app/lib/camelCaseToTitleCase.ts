const camelCaseToTitleCase = (str: string) => {
  if (!str) return "";
  return str
    .replaceAll("_", " ")
    .toLocaleLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default camelCaseToTitleCase;
