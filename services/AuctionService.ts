import { publicRequest } from "./fetcher";
import { creatorStudioRequest } from "@/services/CreatorStudioInterceptor";
import axios from "axios";
import {
  CreateAuction,
  InitAuctionV1,
  InitAuctionV2,
} from "@/interfaces/auction";
import { checkNetwork, wallet } from "@/store/walletStore";
import { InputGenerateTransactionPayloadData } from "@aptos-labs/ts-sdk";
import { getCoinType } from "@/utils/getCoinType";
import { executeSmartContract } from "@/services/ExecutePayload";
import { convertDateInSeconds } from "@/utils/date";
import { convertPriceToSendInSmartContract } from "@/utils/price";

const GRAPHQL_URL = process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : "";
const FEE_SCHEDULE_ID = process.env.FEE_SCHEDULE_ID;
const AUCTION_PID = process.env.AUCTION_PID;

let walletName: any = "";
if (process.client) {
  if (localStorage.getItem("wallet")) {
    const wallet = JSON.parse(localStorage.getItem("wallet")!);
    walletName = wallet.wallet;
  }
}

const checkWalletConnected = async () => {
  if (!wallet.isConnected()) {
    await wallet.connect(walletName);
  }
};

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

export const getOwnedCollectionsOfUser = async ({
  limit,
  offset,
  walletAddress,
}: any) => {
  let resp = await publicRequest.post(`${process.env.GRAPHQL_URL}`, {
    operationName: "AccountTokensData",
    query: `query AccountTokensData($LIMIT: Int, $OFFSET: Int, $WALLET_ADDRESS: String) {
        current_collection_ownership_v2_view(
            distinct_on: collection_id
            limit: $LIMIT
            offset:$OFFSET
            where: {owner_address: {_eq: $WALLET_ADDRESS}},
            ) {
              collection_id
              collection_name
              collection_uri
              distinct_tokens
              creator_address
              current_collection {
                cdn_asset_uris {
                  cdn_image_uri
                  raw_image_uri
                }
              }
          }
        }`,
    variables: { LIMIT: limit, OFFSET: offset, WALLET_ADDRESS: walletAddress },
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

export const getTokensOfCollection = async ({
  limit,
  offset,
  collectionId,
  walletAddress,
}: {
  limit: number;
  offset: number;
  collectionId: string;
  walletAddress: string;
}) => {
  let resp = await publicRequest.post(`${process.env.GRAPHQL_URL}`, {
    operationName: "GetTokensOfACollection",
    query: `query GetTokensOfACollection($LIMIT: Int, $OFFSET: Int,$COLLECTION_ID: String, $WALLET_ADDRESS: String) {
        current_token_ownerships_v2(
          where: {current_token_data: {collection_id: {_eq: $COLLECTION_ID}}, owner_address: {_eq: $WALLET_ADDRESS}, amount: {_gt: "0"}}
          limit: $LIMIT
          offset: $OFFSET
        ) {
          current_token_data {
            collection_id
            token_name
            token_data_id
            token_standard
            cdn_asset_uris {
              cdn_image_uri
              raw_image_uri
              asset_uri
            }
          }
        }
      }`,
    variables: {
      LIMIT: limit,
      OFFSET: offset,
      COLLECTION_ID: collectionId,
      WALLET_ADDRESS: walletAddress,
    },
  });
  return resp.data;
};

export const getToken = async ({
  collectionId,
  tokenDataId,
}: {
  collectionId: string;
  tokenDataId: string;
}) => {
  const query = {
    operationName: "GetToken",
    query: `query GetToken($COLLECTION_ID:String, $TOKEN_DATA_ID:String) {
      current_token_datas_v2(
        where: {collection_id: {_eq: $COLLECTION_ID}, token_data_id: {_eq: $TOKEN_DATA_ID}}
      ) {
        token_name
        token_data_id
        token_standard
        description
        token_uri
        cdn_asset_uris {
          raw_image_uri
          asset_uri
          cdn_image_uri
          cdn_animation_uri
          raw_animation_uri
        }
        current_collection {
          collection_name
          creator_address
          collection_id
        }
        current_token_ownerships(limit: 1) {
          property_version_v1
        }
      }
    }`,
    variables: {
      COLLECTION_ID: collectionId,
      TOKEN_DATA_ID: tokenDataId,
    },
  };

  const res = await axios.post(`${GRAPHQL_URL}`, query);

  const data = res.data.data;

  const token = data.current_token_datas_v2[0];

  const image = token.cdn_asset_uris.cdn_image_uri
    ? token.cdn_asset_uris.cdn_image_uri
    : token.cdn_asset_uris.raw_image_uri;
  const animationUri = token.cdn_asset_uris.cdn_animation_uri
    ? token.cdn_asset_uris.cdn_animation_uri
    : token.cdn_asset_uris.raw_animation_uri;

  const propertyVersion = token.current_token_ownerships[0].property_version_v1;

  const formattedToken = {
    tokenDataId: token.token_data_id,
    tokenStandard: token.token_standard,
    propertyVersion: propertyVersion,
    collectionName: token.current_collection.collection_name,
    collectionId: token.current_collection.collection_id,
    creatorAddress: token.current_collection.creator_address,
    meta: {
      name: token.token_name,
      description: token.description,
      image: image,
      animationUri: animationUri,
    },
  };

  return formattedToken;
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

export const createAuctionV1InChain = async ({
  creatorAddress,
  collectionName,
  tokenName,
  propertyVersion,
  startTime,
  minimumBid,
  bidIncrement,
  auctionEndTime,
  minimumBidTimeBeforeEnd,
  coinType,
}: InitAuctionV1) => {
  await checkWalletConnected();

  checkNetwork();

  const coinTypeObject = getCoinType(coinType);

  const startTimeInSeconds: number = convertDateInSeconds(startTime);
  const endTimeInSeconds: number = convertDateInSeconds(auctionEndTime);

  const convertedMinimumBid: number = convertPriceToSendInSmartContract({
    price: minimumBid,
    coinType: coinType,
    isConverted: false,
  });

  const createAuctionPayload: InputGenerateTransactionPayloadData = {
    function:
      `${AUCTION_PID}::coin_listing::init_auction_for_tokenv1` as `${string}::${string}::${string}`,
    functionArguments: [
      creatorAddress,
      collectionName,
      tokenName,
      propertyVersion,
      FEE_SCHEDULE_ID,
      startTimeInSeconds,
      convertedMinimumBid,
      bidIncrement,
      endTimeInSeconds,
      endTimeInSeconds,
      null,
    ],
    typeArguments: [coinTypeObject.coinObject],
  };

  const res = await executeSmartContract(createAuctionPayload);

  return res;
};

export const createAuctionV2InChain = async ({
  tokenDataId,
  startTime,
  minimumBid,
  bidIncrement,
  auctionEndTime,
  minimumBidTimeBeforeEnd,
  coinType,
}: InitAuctionV2) => {
  await checkWalletConnected();

  checkNetwork();

  const coinTypeObject = getCoinType(coinType);

  const startTimeInSeconds: number = convertDateInSeconds(startTime);
  const endTimeInSeconds: number = convertDateInSeconds(auctionEndTime);

  const convertedMinimumBid: number = convertPriceToSendInSmartContract({
    price: minimumBid,
    coinType: coinType,
    isConverted: false,
  });

  const createAuctionPayload: InputGenerateTransactionPayloadData = {
    function:
      `${AUCTION_PID}::coin_listing::init_auction` as `${string}::${string}::${string}`,
    functionArguments: [
      tokenDataId,
      FEE_SCHEDULE_ID,
      startTimeInSeconds,
      convertedMinimumBid,
      bidIncrement,
      endTimeInSeconds,
      endTimeInSeconds,
      null,
    ],
    typeArguments: [coinTypeObject.coinObject],
  };

  const res = await executeSmartContract(createAuctionPayload);

  return res;
};

export const saveAuctionInDatabase = async ({
  token,
  startAt,
  endAt,
  min_bid,
  id,
  auction_name,
  twitter,
  instagram,
  user_id,
  coin_type,
}: CreateAuction) => {
  console.log(token);
  const res = await creatorStudioRequest.post("/api/auction", {
    nft: token,
    startAt: startAt,
    endAt: endAt,
    min_bid: min_bid,
    id: id,
    auction_name: auction_name,
    twitter: twitter,
    instagram: instagram,
    user_id: user_id,
    coin_type: coin_type,
  });

  return res;
};
