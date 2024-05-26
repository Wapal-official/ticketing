export const state = () => {
  return {
    showSetMetadataButton: false,
    folderInfo: null,
  };
};

export const mutations = {
  setShowMetadataButton(state: any, showSetMetadataButton: boolean) {
    state.showSetMetadataButton = showSetMetadataButton;
  },
  setFolderInfo(state: any, folderInfo: any) {
    state.folderInfo = folderInfo;
  },
};
