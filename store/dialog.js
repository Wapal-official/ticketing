export const state = () => ({
    isNftTransferDialog: false,
    isWhatsNew: false,
    selectedData: [],
    selectedCheck: [],
    selectedCollection: {},
    selectAll: false,
    singleCheck: false,
    selectedCollection: {
      name: null,
    },
})

export const mutations = {
    setNftTransferDialog(state, payload) {
        state.isNftTransferDialog = payload;
      },
      setWhatsNew(state, payload) {
        state.isWhatsNew = payload;
      },
      setSelection(state, payload) {
        state.selectAll = payload;
      },
      setSelectedData(state, payload) {
        state.selectedData = [];
        state.selectedData = payload;
      },
      setSelectedCheck(state, payload) {
        state.selectedCheck = payload;
      },
      setSingleCheck(state, payload) {
        state.singleCheck = payload;
      },
      selectCollection(state, payload) {
        state.selectedCollection = payload;
      },
}