// Vuex store
export const state = () => ({
  selectedItem: [],
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
};
