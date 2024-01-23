export const duplicateQuery = ({ queryTemplate, variable, length }) => {
  let duplicatedString = ``;

  let queryVariablesString = "";

  for (let i = 1; i <= length; i++) {
    let tempQueryString = `${i !== 1 ? "," : ""}${queryTemplate}`;

    tempQueryString = tempQueryString.replaceAll("--index", i);

    duplicatedString += tempQueryString;

    queryVariablesString += `${i !== 1 ? "," : ""}${variable.name}${i}:${
      variable.type
    }`;
  }

  return {
    query: duplicatedString,
    variables: queryVariablesString,
  };
};

export const duplicateQueryWithMultipleVariables = ({
  queryTemplate,
  variables,
  length,
}) => {
  let duplicatedString = ``;

  let queryVariablesString = "";

  for (let i = 1; i <= length; i++) {
    let tempQueryString = `${i !== 1 ? "," : ""}${queryTemplate}`;

    tempQueryString = tempQueryString.replaceAll("--index", i);

    duplicatedString += tempQueryString;

    for (let j = 0; j < variables.length; j++) {
      queryVariablesString += `${i !== 1 || j !== 0 ? "," : ""}${
        variables[j].name
      }${i}:${variables[j].type}`;
    }
  }

  return {
    query: duplicatedString,
    variables: queryVariablesString,
  };
};
