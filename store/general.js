// Vuex store
export const state = () => ({
  selectedItem: [],
  isVideoPlay: false,
  isSoundPlay: false,
});

export const mutations = {
  setSelectedItem(state, payload) {
    state.selectedItem = payload;
  },
  removeSelectedItem(state, payload) {
    state.selectedItem = state.selectedItem.filter(
      (item) => item.wallet_address !== payload.wallet_address
    );
  },
  setVideoPlay(state, payload) {
    state.isVideoPlay = payload;
  },
  setSoundPlay(state, payload) {
    state.isSoundPlay = payload;
  },
};
