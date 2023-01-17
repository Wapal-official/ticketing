import WalletAddress from "@/interfaces/walletAddress";
import Cookies from "js-cookie";

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
  setWallet({ commit }: { commit: any }) {
    commit("setWallet");
    Cookies.set("vuex", JSON.stringify(state), {
      expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30),
    });
  },
};
