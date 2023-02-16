export const state = () => ({
  tab: "All NFT",
});

export const mutations = {
  setExploreTab(state: any, tab: string) {
    state.tab = tab;
  },
};
