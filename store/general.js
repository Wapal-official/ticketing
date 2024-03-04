// Vuex store
export const state = () => ({
  selectedItem: [],
});

export const mutations = {
  setSelectedItem(state, payload) {
    state.selectedItem = payload;
  },
};
