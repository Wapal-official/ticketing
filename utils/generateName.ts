const generateName = (name: string): string => {
  let parsedName: string = name
    .trim()
    .replace(/[^a-zA-Z0-9_ ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replaceAll(" ", "-")
    .toLowerCase();

  return parsedName;
};

export default generateName;
