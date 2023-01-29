import WalletAddress from "@/interfaces/walletAddress";
import Cookies from "js-cookie";
import { WalletCore, WalletName } from "@aptos-labs/wallet-adapter-core";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";

const wallets = [new PetraWallet(), new MartianWallet()];
const wallet = new WalletCore(wallets);

export const state = () => ({
  wallet: {
    wallet: "",
    walletAddress: "",
  },
  wallets: JSON.stringify(wallets),
});

export const getters = {
  getWalletDetail(state: any) {
    return JSON.parse(state.walletDetail);
  },
};

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
  async connectWallet({ commit }: { commit: any }, walletName: WalletName) {
    try {
      await wallet.connect(walletName);

      commit("setWallet", {
        wallet: wallet.wallet?.name,
        walletAddress: wallet.account?.address,
      });
      return true;
    } catch {
      return false;
    }
  },
  async disconnectWallet({ commit }: { commit: any }) {
    if (wallet.account) {
      await wallet.disconnect();
    }
    commit("setWallet", {
      wallet: "",
      walletAddress: "",
    });
  },
};
