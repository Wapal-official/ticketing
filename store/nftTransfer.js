import { divideIntoBatches } from "@/utils/batches";
import { getTokenDetails } from "@/services/nftTransferService";

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
    floorPrice: []
  },
});

export const mutations = {
  setFloorPrice(state, payload) {
    state.floorPrices, 
    payload.collectionId,
    payload.floorPrice;
  },
  setNftTransfer(state, paylod) {
    state.allTransferableNfts = paylod;
  }, 
  setCollectionsNftTransfer(state, paylod) {
    state.collectionsNfts = paylod;
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
    state.selectedData.splice(
      state.selectedData.indexOf(paylod),
      1
    );
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
  },

  setNftTransfer(context, payload) {
    context.commit('setNftTransfer', payload);
    context.dispatch('getTokenDetailsOfTokens', payload); 
  },

  setCollectionsNftTransfer(context, payload) {
    context.commit('setCollectionsNftTransfer', payload);
    context.dispatch('getTokenDetailsOfTokens', payload); 
  }
};
