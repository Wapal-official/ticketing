import { divideIntoBatches } from "@/utils/batches";
import {
  addTokenImageToTokens,
  getTokenDetails,
} from "@/services/nftTransferService";
import { resolveUri, getCachedUrlOfImage } from "@/services/utilitieService";

export const state = () => ({
  allTransferableNfts: [],
  selectedCollection: [],
  tabs: 0,
  selectedData: [],
  airdropData: [],
  nftCount: null,
  selectedCheck: [],
  singleCheck: false,
  collectionsNfts: [],
  floorPrices: {
    collectionId: [],
    floorPrice: [],
  },
  userCollection: [],
  allNftsLoaded: false,
});

export const mutations = {
  setCollectionNftCount(state, payload) {
    state.selectedData[0].count = payload;
  },
  setUserCollection(state, payload) {
    state.userCollection = payload;
  },
  setAllLoaded(state, payload) {
    state.allNftsLoaded = payload;
  },
  setFloorPrice(state, payload) {
    state.floorPrices[payload.collectionId] = payload.floorPrice;
  },
  setFloorPriceOfToken(state, payload) {
    payload.token.floorPrice = payload.floorPrice;
  },
  setFloorPriceOfItem(state, payload) {
    payload.item.floorPrice = payload.floorPrice;
  },
  addNftTransfer(state, nfts) {
    state.allTransferableNfts.push(...nfts);
  },
  addCollectionNftTransfer(state, payload) {
    state.collectionsNfts.push(...payload);
  },
  removeNftTransfer(state, nfts) {
    nfts.forEach((nft) => {
      state.allTransferableNfts = state.allTransferableNfts.filter(
        (payloadNft) => {
          return payloadNft.tokenDataId !== nft.tokenDataId;
        }
      );

      state.collectionsNfts = state.collectionsNfts.filter((payloadNft) => {
        return payloadNft.tokenDataId !== nft.tokenDataId;
      });
      if (
        state.selectedData[0] &&
        state.selectedData[0].collectionId == nft.collectionId
      ) {
        state.selectedData[0].count--;
        state.selectedData[0].valuePrice =
          parseFloat(state.selectedData[0].floorPrice) *
          parseFloat(state.selectedData[0].count);
      }
    });
  },
  setNftTransfer(state, paylod) {
    state.allTransferableNfts = paylod;
  },
  setCollectionsNftTransfer(state, paylod) {
    state.collectionsNfts = paylod;
  },
  removeCollectionsNftTransfer(state, paylod) {
    paylod.forEach((paylod) => {
      const index = state.collectionsNfts.indexOf(paylod);
      if (index >= 0) {
        state.collectionsNfts.splice(index, 1);
      }
    });
  },
  setNftTransferTabs(state, paylod) {
    state.tabs = paylod;
  },
  setAirdropData(state, paylod) {
    state.airdropData = paylod;
  },
  pushAirdropData(state, paylod) {
    state.airdropData.push(paylod);
  },
  setSingleCheck(state, payload) {
    state.singleCheck = payload;
  },
  setNftCount(state, payload) {
    state.nftCount = payload;
  },
  selectTransferCollection(state, paylod) {
    state.selectedCollection = paylod;
  },
  pushTransferCollection(state, paylod) {
    state.selectedCollection.push(paylod);
  },
  removeTransferCollection(state, paylod) {
    state.selectedCollection.splice(
      state.selectedCollection.indexOf(paylod),
      1
    );
  },

  selectCollection(state, paylod) {
    state.selectedData = paylod;
  },
  pushSelectedCollection(state, paylod) {
    state.selectedData.push(paylod);
  },
  removeSelectedCollection(state, paylod) {
    state.selectedData.splice(state.selectedData.indexOf(paylod), 1);
  },

  setCheckData(state, payload) {
    state.selectedCheck = payload;
  },
  setTokenDetailsOfTokens(state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
      payload.data[i].creatorAddress = payload.tokenDetails[i].creatorAddress;

      payload.data[i].propertyVersion = payload.tokenDetails[i].propertyVersion;

      payload.data[i].collectionName = payload.tokenDetails[i].collectionName;
    }
  },
  setMetadataOfTokens(state, payload) {
    for (let i = 0; i < payload.metadata.length; i++) {
      const index = payload.metadata[i].index;

      payload.data[index].image = payload.metadata[i].image;
      payload.data[index].attributes = payload.metadata[i].attributes;
    }
    state.collectionsNfts.push();
  },
};
export const actions = {
  async getTokenDetailsOfTokens(context, payload) {
    const tokenBatches = divideIntoBatches({ data: payload, batchLength: 50 });

    for (let i = 0; i < tokenBatches.length; i++) {
      const currentPayload = tokenBatches[i];

      const res = await getTokenDetails(currentPayload);

      context.commit("setTokenDetailsOfTokens", {
        data: currentPayload,
        tokenDetails: res,
      });
    }

    const batchLength = 10;
    const payloadLoop = Math.ceil(payload.length / batchLength);

    for (let i = 0; i < payloadLoop; i++) {
      const firstIndex = i * batchLength;

      const lastIndex = i * batchLength + batchLength;

      const currentPayload = payload.slice(firstIndex, lastIndex);

      const metadata = [];

      const payloadRes = await Promise.all(
        currentPayload.map(async (token, index) => {
          const tokenUri = token.metadataUri;
          if (!token.image) {
            try {
              const metadataRes = await resolveUri(tokenUri, "all");

              const image = metadataRes.image ? metadataRes.image : metadataRes;

              const cachedImage = getCachedUrlOfImage(image);

              metadata.push({
                image: cachedImage,
                attributes: metadataRes.attributes
                  ? metadataRes.attributes
                  : [],
                index: index,
              });

              if (!token.image) {
                await addTokenImageToTokens({
                  tokenUri: tokenUri,
                  imageUri: image,
                });
              }
            } catch (error) {
              metadata.push({
                image: null,
                attributes: [],
                index: index,
              });
            }
          }
        })
      );

      context.commit("setMetadataOfTokens", {
        data: currentPayload,
        metadata: metadata,
      });
    }
  },

  setNftTransfer(context, payload) {
    context.commit("addNftTransfer", payload);
    context.dispatch("getTokenDetailsOfTokens", payload);
  },

  setCollectionsNftTransfer(context, payload) {
    context.commit("addCollectionNftTransfer", payload);
    context.dispatch("getTokenDetailsOfTokens", payload);
  },

  // removeNftAfterSend(contex, payload) {
  //   contex.commit('removeCollectionsNftTransfer', payload)
  //   contex.dispatch('removeNftCollection', payload)
  // }
};
