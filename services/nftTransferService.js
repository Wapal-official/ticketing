import { resolveUri, getCachedUrlOfImage, getFixedPrice } from "@/services/utilitieService";
import axios from "axios";  

const BASE_URL = 'https://marketplace-api.wapal.io'
const RUST_INDEXER_URL = 'https://rust-mainnet.wapal.io/graphql'

export const getTokenOfNftTransfer = async ({
  page,
  limit,
  walletAddress,
  collectionId,
  type,
  signal,
}) => {
  const res = await axios.get(
    `https://marketplace-api.wapal.io/user/tokens/${walletAddress}`,
    {
      params: {
        collectionId: collectionId,
        page: page,
        take: limit,
        type: type,
      },
      signal: signal,
    }
  );

  const data = res.data;

  const tokens = [];

  data.map((token) => {
    token.listedPrice = token.listPrice = formatPrice(token.listedPrice);
    token.date = token.toolTipDate = token.listedDate;
    token.object = token.listingId;
    token.programId = token.listingContractAddress;
    token.name = token.tokenName;
    token.metadataUri = token.tokenUri;
    token.topBidPrice = null;
    token.image = null;
    token.floorPrice = null;
    token.owner = walletAddress;
    tokens.push(token);
  });

  const finalTokens = [];
  const finalTokensRes = await Promise.all(
    tokens.map(async (rawToken, index) => {
      try {
        const metadataRes = await resolveUri(rawToken.metadataUri, "image");

        const image = metadataRes.image ? metadataRes.image : metadataRes;

        const cachedImage = getCachedUrlOfImage(image);

        rawToken.image = cachedImage;

        finalTokens.push(rawToken);
      } catch {}
    })
  );

  return tokens;
};

export const formatPrice = (price) => {
  let formattedPrice = price / Math.pow(10, 8);

  if (formattedPrice - Math.floor(formattedPrice) !== 0) {
    formattedPrice = parseFloat(formattedPrice.toFixed(4));
  }
  return formattedPrice;
};


export const getFloorPrice = async (collectionId) => {
  try {
    if (!collectionId.startsWith("0x")) {
      collectionId = "0x" + collectionId;
    }

    const floorPriceQuery = {
      operationName: "GetFloorPrice",
      query: `
      query GetFloorPrice($COLLECTION_ID:String){
        allCurrentNftMarketplaceListings(
          condition: {isDeleted: false, collectionId:$COLLECTION_ID}
          first: 1
          orderBy: PRICE_ASC
        ) {
          nodes {
            price
          }
        }
      }
      `,
      variables: null,
    };

    floorPriceQuery.variables = {
      COLLECTION_ID: collectionId,
    };

    const res = await axios.post(RUST_INDEXER_URL, floorPriceQuery);

    const floorPrice =
      res.data.data.allCurrentNftMarketplaceListings.nodes[0].price;
    return formatPrice(floorPrice);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getPortfolioSummaryOfUser = async ({
  collectionId,
  wallet_address,
}) => {
  const res = await axios.get(`${BASE_URL}/user/pnl/${wallet_address}`, {
    params: { collectionId: collectionId },
  });

  const data = res.data;

  return {
    costPrice: getFixedPrice(data.costPrice),
    estimatedValue: getFixedPrice(data.estimatedPrice),
    realizedPnl: getFixedPrice(data.realizedPNL),
    unrealizedPnl: getFixedPrice(data.unrealizedPNL),
    totalCount: data.totalCount,
    listedCount: data.listedCount,
  };
};


export const getCollectionsOfUser = async ({
  walletAddress,
  page,
  limit,
  type,
  searchText,
  signal,
}) => {
  const collectionType = type === "listed" ? type : null;

  const res = await axios.get(`${BASE_URL}/user/collections/${walletAddress}`, {
    params: {
      page: page,
      take: limit,
      type: collectionType,
      search: searchText,
    },
    signal: signal,
  });

  const collections = res.data;

  const finalCollections = [];

  collections.forEach((collection) => {
    finalCollections.push({
      collectionId: collection.collectionId,
      name: collection.name,
      image: getCachedUrlOfImage(collection.image),
      floorPrice: formatPrice(collection.floorPrice),
      isVerified: collection.isVerified,
      listed: collection.listingCount,
    });
  });

  return finalCollections;
};