export const state = () => {
  return {
    showSetMetadataButton: false,
    folderInfo: null,
    files: [],
  };
};

export const mutations = {
  setShowMetadataButton(state: any, showSetMetadataButton: boolean) {
    state.showSetMetadataButton = showSetMetadataButton;
  },
  setFolderInfo(state: any, folderInfo: any) {
    state.folderInfo = folderInfo;
  },
  setFiles(state: any, files: any) {
    state.files = files;
  },
  pushNewFilesIntoFiles(state: any, files: any) {
    state.files.push(...files);
  },
  addMetadataInFile(
    state: any,
    { fileNumber, attributes }: { fileNumber: number; attributes: any }
  ) {
    state.files[fileNumber].attributes = attributes;
  },
  setFileAsEditable(
    state: any,
    { fileNumber, attributes }: { fileNumber: number; attributes: any }
  ) {
    state.files[fileNumber].edit = true;
    state.files[fileNumber].attributes = attributes;
  },
};

export const actions = {
  makeAttributesOfFileEditable(
    context: any,
    {
      attributes,
      nftIdFrom,
      nftIdTo,
    }: {
      attributes: any;
      nftIdFrom: number;
      nftIdTo: number;
    }
  ) {
    for (let i = Number(nftIdFrom); i <= Number(nftIdTo); i++) {
      context.commit("setFileAsEditable", {
        fileNumber: i,
        attributes: attributes,
      });
    }
  },
};
