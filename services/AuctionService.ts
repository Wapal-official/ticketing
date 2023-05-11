import { publicRequest } from "./fetcher";

export const getCurrentBid = (auction: any) => {
  let bid = 0;
  if (auction.biddings.length > 0) {
    bid = auction.biddings[0].bid;
  } else {
    bid = auction.min_bid;
  }
  return bid;
};

export const getHms = (seconds: any) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${hours}H ${minutes}M ${remainingSeconds}S`;
};

export const getAuctions = async (params: any) => {
  const auctions = await publicRequest
    .get("/api/auction", {
      params: {
        page: params.page,
        perPage: params.perPage,
      },
    })
    .then((res) => {
      return res.data.auctions;
    });
  return auctions;
};

export const fetchWalletNfts = async (params: any) => {
  let resp = await publicRequest.post(`${process.env.GRAPHQL_URL}`, {
    operationName: "AccountTokensData",
    query:
      `query AccountTokensData {
          current_token_ownerships(
            limit: ` +
      params.limit +
      `
            offset:` +
      params.offset +
      `
            where: {owner_address: {_eq: "` +
      params.walletAddress +
      `"}}
            ) {
              owner_address
              property_version
              amount
            current_token_data {
              name
              metadata_uri
              description
              collection_name
              creator_address
              token_data_id_hash
            }
          }
        }`,
    variables: null,
  });
  return resp.data;
};

export const uploadAndCreateFile = async (file: File, params: any) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("name", params.name);
  formData.append("description", params.description);
  formData.append("attributes", JSON.stringify(params.attributes));

  const upload = await publicRequest.post(
    "/api/uploader/singleupload",
    formData
  );
  return upload.data.metadata;
};

export const getWalletNFT = async (params: any) => {
  let resp = await publicRequest.post(`${process.env.GRAPHQL_URL}`, {
    operationName: "AccountTokensData",
    query:
      `query AccountTokensData {
          current_token_ownerships(
            where: {owner_address: {_eq: "` +
      params.creatorAddress +
      `"}, collection_name: {_eq: "` +
      params.collectionName +
      `"},
        name: {_eq: "` +
      params.tokenName +
      `"}}
            ) {
              owner_address
              property_version
              amount
            current_token_data {
              name
              metadata_uri
              description
              collection_name
              creator_address
              token_data_id_hash
            }
          }
        }`,
    variables: null,
  });
  return resp.data;
};

export const placeBid = async (
  bid: number,
  auction_id: number,
  creation_number: number
) => {
  const res = await publicRequest.post(`/api/auction/bid`, {
    bid: bid,
    auction_id: auction_id,
    creation_number: creation_number,
  });

  return res;
};
