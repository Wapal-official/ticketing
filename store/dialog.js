export const state = () => ({
  isNftTransferDialog: false,
  isWhatsNew: false,
});

export const mutations = {
  setNftTransferDialog(state, payload) {
    state.isNftTransferDialog = payload;
  },
  setWhatsNew(state, payload) {
    state.isWhatsNew = payload;
  },
};
