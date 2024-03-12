export const state = () => {
  return {
    showSetMetadataButton: false,
    assetType: 'image',
  };
};

export const mutations = {
  setShowMetadataButton(state: any, showSetMetadataButton: boolean) {
    state.showSetMetadataButton = showSetMetadataButton;
  },
  setAssetType(state: any, assetType: String) {
    state.assetType = assetType; 
  },
};
export const actions = {
  updateAssetType({ commit }: any, assetType: any) {
    commit('setAssetType', assetType);
  },
};