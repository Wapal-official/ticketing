import WalletAddress from "@/interfaces/walletAddress";

export const state = () => ({
  wallet: {
    wallet: "",
    walletAddress: "",
    publicKey: "",
  },
});

export const mutations = {
  setWallet(state: any, wallet: WalletAddress) {
    state.wallet = wallet;
  },
};

export const actions = {
  async nuxtServerInit({ commit }: { commit: any }, { req }: { req: any }) {
    if (req.cookies.vuex) {
      const wallet: WalletAddress = JSON.parse(req.cookies.vuex);
      commit("setWallet", wallet);
    } else {
      const wallet: WalletAddress = {
        wallet: "",
        walletAddress: "",
        publicKey: "",
      };
      commit("setWallet", wallet);
    }
  },
};
