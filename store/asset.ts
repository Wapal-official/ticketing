export const state = () => {
  return {
    showSetMetadataButton: false,
  };
};

export const mutations = {
  setShowMetadataButton(state: any, showSetMetadataButton: boolean) {
    state.showSetMetadataButton = showSetMetadataButton;
  },
};
