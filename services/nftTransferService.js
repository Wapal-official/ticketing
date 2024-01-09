import axios from "axios"; 

const BASE_URL = 'https://marketplace-api.wapal.io';

export const publicRequest = axios.create({
    baseURL: 'https://marketplace-api.wapal.io',
  });
  
  publicRequest.interceptors.request.use(function (config) {
    if (process.browser) {
      const TOKEN = window.$nuxt.$store.state.userStore.user.token;
  
      if (TOKEN) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: TOKEN,
          },
        };
      }
    }
  
    return config;
  });

  export const getUserCollections = async (walletAddress) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/collections/${walletAddress}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user collections:', error.message);
      throw error; // Rethrow the error for the calling code to handle
    }
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
  
  export const getTokensOfUsersInPortfolio = async ({
    page,
    limit,
    walletAddress,
    collectionId,
    type,
    signal,
  }) => {
    const res = await axios.get(`${BASE_URL}/user/tokens/${walletAddress}`, {
      params: {
        collectionId: collectionId,
        page: page,
        take: limit,
        type: type,
      },
      signal: signal,
    });
  
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
      token.owner = walletAddress;
      tokens.push(token);
    });
  
    return tokens;
  };

  export const getCurrentUserNfts = async (params) => {
    const res = await publicRequest.get(`/collection/myCollections/nfts`, {
      params: {
        walletAddress: params.walletAddress,
        collectionName: params.collectionName,
        page: params.page,
        limit: params.limit,
        nftType: params.nftType ? params.nftType : "ALL",
      },
    });
    return res.data.data;
  };

  export const getCollectionSummary = async (collectionName, walletAddress) => {
    let params = {
      params: { walletAddress: walletAddress },
    };
    if (collectionName) {
      params.params.collectionName = collectionName;
    }
  
    const res = await publicRequest.get(
      `/collection/myCollections/summary`,
      params
    );
    return res.data.data;
  };
  
  