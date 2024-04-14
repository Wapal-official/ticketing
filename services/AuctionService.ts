import { publicRequest } from "./fetcher";
import { creatorStudioRequest } from "@/services/CreatorStudioInterceptor";
import axios from "axios";

const GRAPHQL_URL = process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : "";

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
        limit: params.perPage,
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

  const upload = await creatorStudioRequest.post(
    "/api/uploader/singleupload",
    formData
  );
  return upload.data.metadata;
};

export const uploadAndCreateVideoFile = async (file: File, thumbnail: File, params: any) => {
  const formData = new FormData();
  formData.append("image", thumbnail);
  formData.append("video", file);
  formData.append("name", params.name);
  formData.append("description", params.description);
  formData.append("attributes", JSON.stringify(params.attributes));

  const upload = await publicRequest.post(
    "/api/uploader/videoedition",
    formData
  );
  console.log("upload", upload)
  
  if (upload.data ) {
    return upload.data.data;
  } else {
    throw new Error("Metadata not found in the upload response");
  }
};

export const getWalletNFT = async (params: any) => {
  let resp = await creatorStudioRequest.post(`${process.env.GRAPHQL_URL}`, {
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
      `"},
        current_token_data:{metadata_uri:{_eq:"${params.metadata_uri}"}}
      }
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
  wallet_address: string,
  bid: number,
  auction_id: number,
  creation_number: number
) => {
  const res = await publicRequest.post(`/api/auction/bid`, {
    wallet_address: wallet_address,
    bid: bid,
    auction_id: auction_id,
    creation_number: creation_number,
  });

  return res;
};

export const getAuctionByName = async (name: string) => {
  const res = await publicRequest.get(`/api/auction/${name}`);

  return res;
};

export const getUpcomingAuctions = async ({
  perPage,
  page,
}: {
  perPage: number;
  page: number;
}) => {
  const res = await publicRequest.get(
    `/api/auction/upcoming?limit=${perPage}&page=${page}`
  );

  return res.data.auctions;
};

export const getDomainNameFromWalletAddress = async (walletAddress: any) => {
  const res = await publicRequest.get(
    `https://www.aptosnames.com/api/mainnet/v1/primary-name/${walletAddress}`
  );

  return res.data;
};

export const getEndedAuctions = async ({
  perPage,
  page,
}: {
  perPage: number;
  page: number;
}) => {
  const res = await publicRequest.get(
    `/api/auction/ended?limit=${perPage}&page=${page}`
  );

  return res.data.auctions;
};

export const getOwnedCollectionsOfUser = async (params: any) => {
  let resp = await publicRequest.post(`${process.env.GRAPHQL_URL}`, {
    operationName: "AccountTokensData",
    query:
      `query AccountTokensData {
          current_token_ownerships(
            distinct_on: collection_name
            limit: ` +
      params.limit +
      `
            offset:` +
      params.offset +
      `
            where: {owner_address: {_eq: "` +
      params.walletAddress +
      `"},
        amount:{_gt:0}}
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

export const getNumberOfTokensInOwnedCollectionOfUser = async (
  collection_name: string,
  wallet_address: string
) => {
  const res = await publicRequest.post(`${process.env.GRAPHQL_URL}`, {
    operationName: "NumberOfTokensInOwnedCollectionOfUser",
    query: `
    query NumberOfTokensInOwnedCollectionOfUser{
      current_token_ownerships_aggregate(
        where: {
          collection_name: {_eq: "${collection_name}"}, 
          owner_address: {_eq: "${wallet_address}"},
          amount:{_gt:0}}
      ) {
        aggregate {
          count
        }
        nodes {
          collection_name
        }
      }
    }
    `,
  });

  return res.data;
};

export const getTokensOfCollection = async (params: any) => {
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
      `"},
      collection_name: {_eq: "` +
      params.collectionName +
      `"},
      amount:{_gt:0}
    }
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

export const setCompleteAuction = async (auctionId: string) => {
  const res = await creatorStudioRequest.patch(`/api/auction/${auctionId}`);

  return res.data;
};

export const getFeaturedAuctions = async () => {
  const res = await publicRequest.get(`/api/auction/featured?page=1&limit=5`);

  return res.data.auctions;
};

export const getOwnerAndRoyaltyOfTokenInAuction = async ({
  creatorAddress,
  tokenDataId,
}: {
  creatorAddress: string;
  tokenDataId: string;
}) => {
  const getOwnerAndRoyaltyOfTokenQuery = {
    operationName: "GetOwnerAndRoyaltyOfToken",
    query: `
    query GetOwnerAndRoyaltyOfToken($CREATOR_ADDRESS:String, $TOKEN_DATA_ID:String) {
      current_token_datas(
        where: {creator_address: {_eq: $CREATOR_ADDRESS}}
        limit: 1
      ) {
        royalty_points_denominator
        royalty_points_numerator
      }
      current_token_ownerships_v2(
        where: {amount:{_gt: 0 }, current_token_data: {current_collection: {creator_address: {_eq: $CREATOR_ADDRESS}}, token_data_id:{_eq: $TOKEN_DATA_ID}}}
      ) {
        owner_address
      }
    }
    `,
    variables: {
      CREATOR_ADDRESS: creatorAddress,
      TOKEN_DATA_ID: "0x" + tokenDataId,
    },
  };
  const res = await axios.post(GRAPHQL_URL, getOwnerAndRoyaltyOfTokenQuery);

  const data = res.data.data;
  let owner = null;

  if (data.current_token_ownerships_v2[0]) {
    owner = data.current_token_ownerships_v2[0].owner_address;
  }

  const royalty = data.current_token_datas[0];

  let royaltyPercentage = 0;

  if (royalty.royalty_points_numerator !== 0) {
    royaltyPercentage =
      (royalty.royalty_points_numerator * 100) /
      royalty.royalty_points_denominator;
  }

  return { owner: owner, royalty: royaltyPercentage };
};

export const getApprovedAuctionsOfUser = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await creatorStudioRequest.get("/api/auction/user", {
    params: {
      page: page,
      perPage: limit,
    },
  });

  return res.data.auctions;
};

export const getUnderReviewAuctionsOfUser = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await creatorStudioRequest.get("/api/auction/unapproved", {
    params: {
      page: page,
      limit: limit,
    },
  });

  return res.data.auctions;
};
