const generateName = (name: string): string => {
  let parsedName: string = name.trim().replaceAll(" ", "-");

  parsedName = parsedName.replaceAll("#", "");

  parsedName = parsedName.replaceAll("\\", "-");

  parsedName = parsedName.replaceAll("/", "-");

  return parsedName;
};

export default generateName;
