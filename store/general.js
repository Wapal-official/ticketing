// Vuex store
export const state = () => ({
  selectedItem: [],
});

export const mutations = {
  setSelectedItem(state, payload) {
    state.selectedItem = payload;
    console.log("Selected item updated in store:", state.selectedItem);
  },
  removeSelectedItem(state, payload) {
    state.selectedItem = state.selectedItem.filter(
      (item) => item.walletAddress !== payload.walletAddress
    );
  },
};
