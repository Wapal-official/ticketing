import axios from "axios";
import { duplicateQuery } from "@/utils/duplicate";

const GRAPHQL_URL = process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : "";

export const getMintedTokenDataIdsFromTransaction = (transaction: any) => {
  const events = transaction.events;
  const mintEvent = events.filter(
    (event: any) => event.type === "0x4::collection::Mint"
  );

  const tokenDataIds: string[] = mintEvent.map(
    (event: any) => event.data.token
  );

  return tokenDataIds;
};

export const getTokenDetailsFromTokenDataIds = async ({
  tokenDataIds,
}: {
  tokenDataIds: string[];
}) => {
  if (tokenDataIds.length === 0) {
    return [];
  }

  const responseLength: number = tokenDataIds.length;
  const queryVariable = { name: "$TOKEN_DATA_ID_", type: "String" };

  const queryTemplate: string = `query--index: current_token_datas_v2(where: {token_data_id: {_eq: $TOKEN_DATA_ID_--index}}) {
    cdn_asset_uris {
      cdn_image_uri
      raw_image_uri
    }
    token_name
    token_uri
    description
  }`;

  const queryVariables: any = {
    TOKEN_DATA_ID_1: "",
  };

  tokenDataIds.forEach((tokenDataId, index) => {
    let paddedTokenDataId = tokenDataId;
    if (tokenDataId.length < 66) {
      const unPaddedTokenDataId = tokenDataId.slice(2, tokenDataId.length);

      paddedTokenDataId = "0x" + unPaddedTokenDataId.padStart(64, "0");
    }
    queryVariables[`TOKEN_DATA_ID_${index + 1}`] = paddedTokenDataId;
  });

  const duplicatedQuery = duplicateQuery({
    queryTemplate: queryTemplate,
    variable: queryVariable,
    length: responseLength,
  });

  const query = {
    query: `query GetTokenDetailOfTokens(${duplicatedQuery.variables}){
        ${duplicatedQuery.query}
    }`,
    operationName: "GetTokenDetailOfTokens",
    variables: queryVariables,
  };

  const res = await axios.post(GRAPHQL_URL, query);

  const data = res.data.data;

  const finalTokens = [];

  for (let i = 0; i < responseLength; i++) {
    const tokenData = data[`query${i + 1}`];

    const token = tokenData[0];

    if (token) {
      if (token.cdn_asset_uris) {
        if (token.cdn_asset_uris.cdn_image_uri) {
          token.image = token.cdn_asset_uris.cdn_image_uri;
        } else {
          token.image = token.cdn_asset_uris.raw_image_uri;
        }
      } else {
        const metadataRes = await axios.get(token.token_uri);

        const metadata = metadataRes.data;

        token.image = metadata.image;
      }

      token.name = token.token_name;
      token.tokenDataId = tokenDataIds[i];

      finalTokens.push(token);
    }
  }
  return finalTokens;
};
