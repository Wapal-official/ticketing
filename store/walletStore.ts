import WalletAddress from "@/interfaces/walletAddress";
import Cookies from "js-cookie";
import {
  WalletCore,
  WalletName,
  NetworkName,
} from "@aptos-labs/wallet-adapter-core";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { SpikaWallet } from "@spika/aptos-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { MSafeWalletAdapter } from "msafe-plugin-wallet-adapter";
import { BloctoWallet } from "@blocto/aptos-wallet-adapter-plugin";
import { AptosClient, AptosAccount, HexString } from "aptos";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);

const wallets = [
  new PetraWallet(),
  new MartianWallet(),
  new FewchaWallet(),
  new PontemWallet(),
  new SpikaWallet(),
  new RiseWallet(),
  new TrustWallet(),
  new MSafeWalletAdapter(),
  new BloctoWallet({
    network: NetworkName.Mainnet,
    bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46",
  }),
];

const wallet = new WalletCore(wallets);
const makeId = (length: number) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const state = () => ({
  wallet: {
    wallet: "",
    walletAddress: "",
  },
});

export const getters = {
  getWalletsDetail() {
    return wallets;
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
  async createCandyMachine(
    { state }: { state: any },
    candyMachineArguments: any
  ) {
    if (!wallet.isConnected()) {
      await wallet.connect(state.wallet.wallet);
    }

    const pid =
      "0xb9c7b4d7da344bbf03a3d4b144c2020dec1049427b96d0411024153485621185";

    const create_candy_machine = {
      type: "entry_function_payload",
      function: pid + "::candymachine::init_candy",
      type_arguments: [],
      arguments: [
        candyMachineArguments.collection_name,
        candyMachineArguments.collection_description,
        candyMachineArguments.baseuri,
        candyMachineArguments.royalty_payee_address,
        candyMachineArguments.royalty_points_denominator,
        candyMachineArguments.royalty_points_numerator,
        candyMachineArguments.presale_mint_time,
        candyMachineArguments.public_sale_mint_time,
        candyMachineArguments.presale_mint_price,
        candyMachineArguments.public_sale_mint_price,
        candyMachineArguments.total_supply,
        [false, false, false],
        [false, false, false, false, false],
        "" + makeId(5),
      ],
    };

    let transactionRes = await wallet.signAndSubmitTransaction(
      create_candy_machine
    );

    let getResourceAccount: any = await client.waitForTransactionWithResult(
      transactionRes.hash
    );

    return getResourceAccount["changes"][2]["address"];
  },
};
