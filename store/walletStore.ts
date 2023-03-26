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
import { AptosClient } from "aptos";

import { getPrice } from "@/services/AssetsService";

const NODE_URL = `https://aptos-${process.env.NETWORK}.nodereal.io/v1/${process.env.APTOS_API_KEY}/v1`;

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
    network: NetworkName.Testnet,
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

const connectWallet = async (walletName: WalletName) => {
  await wallet.connect(walletName);

  if (
    wallet.network?.name.toLowerCase() !== NetworkName.Testnet.toLowerCase()
  ) {
    await wallet.disconnect();
    throw new Error("Please Change your network to Testnet");
  }
};

export const state = () => ({
  wallet: {
    wallet: "",
    walletAddress: "",
    publicKey: "",
    merkle_root: "",
    proof: "",
  },
});

export const mutations = {
  setWallet(state: any, wallet: WalletAddress) {
    state.wallet = wallet;
  },
  setMerkleRoot(state: any, merkle_root: any) {
    state.merkle_root = merkle_root;
  },
  setProof(state: any, proof: any) {
    state.proof = proof;
  },
};

export const getters = {
  getWalletsDetail() {
    return wallets;
  },
};

export const actions = {
  setWallet({ commit }: { commit: any }) {
    commit("setWallet");
  },
  async connectWallet({ commit }: { commit: any }, walletName: WalletName) {
    try {
      await connectWallet(walletName);

      commit("setWallet", {
        wallet: wallet.wallet?.name,
        walletAddress: wallet.account?.address,
        publicKey: Array.isArray(wallet.account?.publicKey)
          ? wallet.account?.publicKey[0]
          : wallet.account?.publicKey,
      });
      Cookies.set(
        "wallet",
        JSON.stringify({
          wallet: wallet.wallet?.name,
          walletAddress: wallet.account?.address,
          publicKey: Array.isArray(wallet.account?.publicKey)
            ? wallet.account?.publicKey[0]
            : wallet.account?.publicKey,
        }),
        {
          expires: new Date(new Date().getTime() + 1000 * 3600 * 24),
        }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  async disconnectWallet({ commit }: { commit: any }) {
    if (wallet.account) {
      await wallet.disconnect();
    }
    commit("setWallet", {
      wallet: "",
      walletAddress: "",
      publicKey: "",
    });
    Cookies.set(
      "wallet",
      JSON.stringify({
        wallet: "",
        walletAddress: "",
        publicKey: "",
      })
    );
  },
  async getMerkleRoot({ commit }: { commit: any }, walletAddress: string) {
    const { data } = await this.$axios.post("/api/whitelist/root", {
      whitelistAddresses: [[walletAddress, 1]],
    });
    commit("setMerkleRoot", data.root.data);
  },
  async getProof({ commit }: { commit: any }) {
    const { proofs } = await this.$axios.post("/api/whitelist/root", {
      address:
        "0x349b294c8261d3255ebfae31e88558a2ce1f79b8c0ecebb7e151a3dc6a6cdafc",
      collection_id: "63ec8ae48f6644c2145c39f6",
    });
    commit("setProof", proofs);
  },
  async createCandyMachine(
    { state, dispatch }: { state: any; dispatch: any },
    candyMachineArguments: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    await dispatch(
      "getMerkleRoot",
      candyMachineArguments.royalty_payee_address
    );

    const create_candy_machine = {
      type: "entry_function_payload",
      function: process.env.CANDY_MACHINE_ID + "::candymachine::init_candy",
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
        0,
        state.merkle_root,
        "" + makeId(5),
      ],
    };

    let transactionRes = await wallet.signAndSubmitTransaction(
      create_candy_machine
    );

    let getResourceAccount: any = await client.waitForTransactionWithResult(
      transactionRes.hash
    );

    if (!getResourceAccount.success) {
      throw new Error("Transaction not Successful please try again");
    }

    return {
      resourceAccount: getResourceAccount["changes"][2]["address"],
      transactionHash: transactionRes.hash,
    };
  },
  async checkBalance({ state }: { state: any }) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    const res: any = await client.getAccountResources(
      state.wallet.walletAddress
    );

    const lamports = res[res.length - 1].data.coin.value;

    const balance = lamports / 100000000;
    return balance.toFixed(4);
  },
  async mintCollection(
    { state }: { state: any },
    resourceAccount: string,
    publicMint: Boolean
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    // await state.
    var create_mint_script;
    if (publicMint) {
      create_mint_script = {
        type: "entry_function_payload",
        function: process.env.CANDY_MACHINE_ID + "::candymachine::mint_script",
        type_arguments: [],
        arguments: [resourceAccount],
      };
    } else {
      create_mint_script = {
        type: "entry_function_payload",
        function:
          process.env.NEW_CANDY_MACHINE_ID + "::candymachine::mint_from_merkle",
        type_arguments: [],
        arguments: [resourceAccount, state.proofs, BigInt(1)],
      };
    }

    const transaction = await wallet.signAndSubmitTransaction(
      create_mint_script
    );

    const res = await client.waitForTransactionWithResult(transaction.hash);

    return res;
  },

  async checkBalanceForFolderUpload({ dispatch }: { dispatch: any }) {
    const arweaveRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/ar/usd?amount=1"
    );
    const aptosRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/apt/usd?amount=1"
    );

    const balance = await dispatch("checkBalance");

    const res = await getPrice();

    const price = res.data.price;

    const totalAR = (price / 1000000000000) * arweaveRate.data.USD;

    const totalAPT = totalAR / aptosRate.data.USD;

    if (balance < totalAPT) {
      return {
        requiredBalance: totalAPT.toFixed(6),
        yourBalance: balance,
        error: true,
      };
    }

    return {
      requiredBalance: totalAPT.toFixed(6),
      yourBalance: balance,
      error: false,
    };
  },
  async signTransactionForUploadingFolder({}, requiredBalance: any) {
    const transactionAmount = Math.ceil(requiredBalance * 100000000);

    const payload = {
      arguments: [
        "0xca717d6cc82ec8f6146423e90b0fb79a753a9d5efb8e2c4f89772c3cd78cf8a0",
        transactionAmount,
      ],
      function: "0x1::coin::transfer",
      type: "entry_function_payload",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
    };

    const transaction = await wallet.signAndSubmitTransaction(payload);

    const res = await client.waitForTransactionWithResult(transaction.hash);

    return res;
  },
  async signLoginMessage({ state }: { state: any }) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    const message = "Login into Wapal";
    const nonce = makeId(16);
    const signMessage = await wallet.signMessage({ message, nonce });

    return signMessage;
  },
  async getSupplyAndMintedOfCollection({}, resourcecAccountAddress: string) {
    const res = await client.getAccountResources(resourcecAccountAddress);

    let resource: any = null;
    for (let i = 0; i < res.length; i++) {
      if (
        res[i].type ===
        process.env.CANDY_MACHINE_ID + "::candymachine::CandyMachine"
      ) {
        resource = res[i].data;
        break;
      }
    }

    return { total_supply: resource.total_supply, minted: resource.minted };
  },
};
