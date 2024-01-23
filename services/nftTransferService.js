import { resolveUri, getCachedUrlOfImage } from "@/services/utilitieService";
import axios from "axios";  
import { duplicateQueryWithMultipleVariables } from "@/utils/duplicate";
import {executeSmartContract} from "@/services/AptosCollectionService"
const RUST_INDEXER_URL = 'https://rust-mainnet.wapal.io/graphql'
let GRAPHQL_URL = 'https://indexer.mainnet.aptoslabs.com/v1/graphql'

export const getTokenDetails = async (tokens) => {
  if (tokens.length === 0) {
    return [];
  }

  const queryTemplate = `query--index: current_token_ownerships_v2(
      limit: 1
      where: {
              current_token_data: {
                collection_id: {_eq: $COLLECTION_ID_--index}, 
                token_data_id: {_eq: $TOKEN_DATA_ID_--index}
              }
            }
    ) {
        property_version_v1
        current_token_data {
          current_collection {
            creator_address
            collection_name
          }
        }
    }`;

  const queryVariables = [
    { name: "$COLLECTION_ID_", type: "String" },
    { name: "$TOKEN_DATA_ID_", type: "String" },
  ];

  const duplicatedQuery = duplicateQueryWithMultipleVariables({
    queryTemplate: queryTemplate,
    variables: queryVariables,
    length: tokens.length,
  });

  const getTokenDetailsOfListedTokenVariables = {
    COLLECTION_ID_1: "",
    TOKEN_DATA_ID_1: "",
  };

  tokens.map((token, index) => {
    getTokenDetailsOfListedTokenVariables[`COLLECTION_ID_${index + 1}`] =
      token.collectionId;

    getTokenDetailsOfListedTokenVariables[`TOKEN_DATA_ID_${index + 1}`] =
      token.tokenDataId;
  });

  const getTokenDetailsOfListedToken = {
    operationName: "GetTokenDetailsOfListedToken",
    query: `query GetTokenDetailsOfListedToken(${duplicatedQuery.variables}){
        ${duplicatedQuery.query}
      }`,
    variables: getTokenDetailsOfListedTokenVariables,
  };

  const res = await axios.post(GRAPHQL_URL, getTokenDetailsOfListedToken);

  const data = res.data.data;

  const tokenDetails = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = data[`query${i + 1}`][0];

    const tokenData = token.current_token_data;

    const propertyVersion = token.property_version_v1;
    const creatorAddress = tokenData.current_collection.creator_address;
    const collectionName = tokenData.current_collection.collection_name;

    tokenDetails.push({
      creatorAddress: creatorAddress,
      propertyVersion: propertyVersion,
      collectionName: collectionName,
    });
  }

  return tokenDetails;
};

export const getFixedPrice = (price) => {
  const fixedPrice = price.toFixed(4);

  return parseFloat(fixedPrice);
};


export const getPortfolioSummaryOfUser = async ({
  collectionId,
  wallet_address,
}) => {
  const res = await axios.get(`https://marketplace-api.wapal.io/user/pnl/${wallet_address}`, {
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
    token.image = token.tokenImageUri;
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

export const getNftTransferCollectionsOfUser = async ({
  walletAddress,
  page,
  limit,
  type,
  searchText,
  signal,
}) => {
  const collectionType = type === "listed" ? type : null;

  const res = await axios.get(`https://marketplace-api.wapal.io/user/collections/${walletAddress}`, {
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

export const nftTransfer = async(tokens, receiverAddresses) => {
  const tokensV1 = [] 
  const tokensV2 = [] 
  tokens.map((token) => {
   if(token.tokenStandard == 'v1') {
     tokensV1.push(token)
   } else {
     tokensV2.push(token)
   }
  });
  
  if(tokensV1.length > 0) {
   if (tokensV1.length == 1) { 
     await nftTransferV1(tokensV1, receiverAddresses)
   } else {
     await nftTransferManyV1(tokensV1, receiverAddresses) 
   } 
  }
 if (tokensV2.length > 0) {
   if (tokensV2.length == 1) { 
     await nftTransferV2(tokensV2, receiverAddresses)
   } else {
     await nftTransferManyV2(tokensV2, receiverAddresses) 
   } 
 }
     
 }
 
 export const nftTransferV1 = async (tokens, receiverAddresses) => {
   const pid = "0x80d0084f99070c5cdb4b01b695f2a8b44017e41abf4a78c2487d3b52b5a4ae37";
   const func = pid + "::transfer::transfer_v1"; 
   console.log('tokens v1:', tokens)
   console.log('receiverAddresses v1:', receiverAddresses) 
   
   let initParams = {
     type: "entry_function_payload",
     type_arguments: [],
     function: func,
     arguments: [
       tokens[0].creatorAddress,
       tokens[0].collectionName,
       tokens[0].tokenName,
       tokens[0].propertyVersion,
       receiverAddresses[0],
     ],
   };
 
   console.log(initParams, 'araams v1')
 
   const response = await executeSmartContract(initParams);
   return response;
 };
 
 export const nftTransferManyV1 = async (tokens, receiverAddresses) => {
   const pid = "0x80d0084f99070c5cdb4b01b695f2a8b44017e41abf4a78c2487d3b52b5a4ae37";
   let func = null; 
   console.log('tokens manyv1:', tokens)
   console.log('receiverAddresses manyv1:', receiverAddresses)
  
     func = pid + "::transfer::transfer_many_v1";
 
     const collectionNames = [];
     const creatorAddresses = [];
     const tokenNames = [];
     const propertyVersions = []; 
   const payloadReceiverAddress = [];
     tokens.map((token) => {
       collectionNames.push(token.collectionName);
       creatorAddresses.push(token.creatorAddress);
       tokenNames.push(token.tokenName);
       propertyVersions.push(token.propertyVersion); 
       payloadReceiverAddress.push(receiverAddresses[0]);
     });
 
   let initParams = {
     type: "entry_function_payload",
     type_arguments: [],
     function: func,
     arguments: [
       creatorAddresses,
       collectionNames,
       tokenNames,
       propertyVersions,
       payloadReceiverAddress,
     ],
   };
 
   console.log('v1many log', initParams)
 
   const response = await executeSmartContract(initParams);
   return response;
 };
 
 
 export const nftTransferV2 = async (tokens, receiverAddresses) => {
   const pid = "0x80d0084f99070c5cdb4b01b695f2a8b44017e41abf4a78c2487d3b52b5a4ae37";
   const func = pid + "::transfer::transfer_v2"; 
   console.log('tokens v2:', tokens)
   console.log('receiverAddresses v2:', receiverAddresses) 
   let initParams = {
     type: "entry_function_payload",
     type_arguments: [],
     function: func,
     arguments: [tokens[0].tokenDataId, receiverAddresses[0]],
   };
   console.log(initParams, 'initt')
   const response = await executeSmartContract(initParams);
   return response;
 };
 
 export const nftTransferManyV2 = async (tokens, receiverAddresses) => {
   const pid = "0x80d0084f99070c5cdb4b01b695f2a8b44017e41abf4a78c2487d3b52b5a4ae37";
   let func = null; 
   console.log('tokens manyv2:', tokens)
   console.log('receiverAddresses manyv2:', receiverAddresses) 
   
     func = pid + "::transfer::transfer_many_v2"; 
 
     const tokenDataIds = []; 
     const payloadReceiverAddress = [];
     tokens.map((token) => {
       tokenDataIds.push(token.tokenDataId); 
       payloadReceiverAddress.push(receiverAddresses[0]);
     });
 
   let initParams = {
     type: "entry_function_payload",
     type_arguments: [],
     function: func,
     arguments: [tokenDataIds, payloadReceiverAddress],
   };
 
   const response = await executeSmartContract(initParams);
   return response;
 };
 