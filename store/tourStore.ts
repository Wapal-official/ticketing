export const state = () => ({
    openSidebar: false,
  });
  
  export const mutations = {
    setOpenSidebar(state: any, tab: string) {
      state.openSidebar = tab;
    },
  };
  