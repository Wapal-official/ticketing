import axios from "axios";
import { duplicateQueryWithMultipleVariables } from "@/utils/duplicate";
import { GRAPHQL_URL } from "@/utils/global";

export const resolveUri = async (uri, key) => {
  return new Promise((resolve, reject) => {
    try {
      if (uri.slice(0, 7) === "ipfs://") {
        uri = `https://ipfs.wapal.io/ipfs/${uri.slice(7)}`;
      }

      let resp;

      const image = new Image();

      image.src = uri;

      image.onload = () => {
        return resolve(uri);
      };

      image.onerror = async () => {
        resp = await axios.get(uri);
        if (resp && (resp?.data.name || resp.data.image)) {
          try {
            switch (key) {
              case "all":
                let allImageUri = resp.data.image;

                if (allImageUri.slice(0, 7) == "ipfs://") {
                  allImageUri = `https://ipfs.wapal.io/ipfs/${allImageUri.slice(
                    7
                  )}`;
                }

                resp.data.image = allImageUri;

                return resolve(resp.data);

              case "name":
                return resp.data.name;
              case "image":
                let imageUri = resp.data.image;
                if (imageUri.slice(0, 7) == "ipfs://") {
                  imageUri = `https://ipfs.wapal.io/ipfs/${imageUri.slice(7)}`;
                }
                return resolve(imageUri);
              case "attributes":
                return resolve(resp.data.attributes);
              default:
                return resolve(resp.data);
            }
          } catch (error) {
            return resolve("");
          }
        } else {
          return resolve("");
        }
      };
    } catch (error) {
      console.log(error);
      return resolve("");
    }
  });
};

export const getMetadataFromChain = async ({ tokens }) => {
  const responseLength = tokens.length;

  if (responseLength > 0) {
    const queryTemplate = `query--index: current_token_datas_v2(
      where: {collection_id: {_eq: $COLLECTION_ID_--index}, token_data_id: {_eq: $TOKEN_DATA_ID_--index}}
      limit: 1
    ) {
      token_properties
    }`;

    const duplicateQueryVariables = [
      { name: "$COLLECTION_ID_", type: "String" },
      { name: "$TOKEN_DATA_ID_", type: "String" },
    ];

    const duplicatedQuery = duplicateQueryWithMultipleVariables({
      queryTemplate: queryTemplate,
      variables: duplicateQueryVariables,
      length: responseLength,
    });

    const queryVariables = {
      COLLECTION_ID_1: "",
    };

    tokens.forEach((token, index) => {
      queryVariables[`COLLECTION_ID_${index + 1}`] = token.collectionId;
      queryVariables[`TOKEN_DATA_ID_${index + 1}`] = token.tokenDataId;
    });

    const query = {
      operationName: "GetMetadataOfTokens",
      query: `query GetMetadataOfTokens(${duplicatedQuery.variables}) {
              ${duplicatedQuery.query}
      }`,
      variables: queryVariables,
    };

    const metadataRes = await axios.post(GRAPHQL_URL, query);

    const data = metadataRes.data.data;

    const attributesOfTokens = [];

    for (let i = 0; i < responseLength; i++) {
      const token = data[`query${i + 1}`][0];

      if (token && token.token_properties) {
        const attributes = token.token_properties;

        const attributesInArrayFormat = setAttributesInArrayFormat(attributes);

        attributesOfTokens.push(attributesInArrayFormat);
      } else {
        attributesOfTokens.push([]);
      }
    }

    return attributesOfTokens;
  }

  return [];
};

const setAttributesInArrayFormat = (attributes) => {
  const keys = Object.keys(attributes);

  const arrayAttribute = [];

  keys.forEach((key) => {
    const attribute = { trait_type: key, value: attributes[key] };

    arrayAttribute.push(attribute);
  });

  return arrayAttribute;
};
