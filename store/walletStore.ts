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
import { AptosClient, HexString, TxnBuilderTypes } from "aptos";

import { getPrice } from "@/services/AssetsService";

let NODE_URL = `https://aptos-${process.env.NETWORK}.nodereal.io/v1/${process.env.APTOS_API_KEY}/v1`;

let network = NetworkName.Testnet;

if (process.env.NETWORK === "testnet") {
  network = NetworkName.Testnet;
} else {
  network = NetworkName.Mainnet;
  NODE_URL = "https://fullnode.mainnet.wapal.io/v1";
}

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
    network: network,
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

  if (wallet.network?.name.toLowerCase() !== network.toLowerCase()) {
    await wallet.disconnect();
    throw new Error(`Please Change your network to ${network}`);
  }
};

export const state = () => ({
  wallet: {
    wallet: "",
    walletAddress: "",
    publicKey: "",
    proof: "",
  },
});

export const mutations = {
  setWallet(state: any, wallet: WalletAddress) {
    state.wallet = wallet;
  },
  setProof(state: any, proof: any) {
    state.proof = proof;
  },
  setMintLimit(state: any, mint_limit: number) {
    state.mint_limit = mint_limit;
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
  async getProof(
    { commit }: { commit: any },
    {
      walletAddress,
      collectionId,
    }: { walletAddress: string; collectionId: string }
  ) {
    const { data } = await this.$axios.get(
      `/api/whitelist/proof?wallet_address=${walletAddress}&collection_id=${collectionId}`
    );

    commit("setProof", data.proofs);
    commit("setMintLimit", data.wallet.mint_limit);
  },
  async createCandyMachine(
    { state, dispatch }: { state: any; dispatch: any },
    candyMachineArguments: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

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

    if (res) {
      const lamports = res[res.length - 1].data.coin.value;

      const balance = lamports / 100000000;
      return balance.toFixed(4);
    } else {
      throw new Error(
        "Something went wrong please reconnect your wallet and try again"
      );
    }
  },
  async mintCollection(
    { state, dispatch }: { state: any; dispatch: any },
    {
      resourceAccount,
      publicMint,
      collectionId,
      candyMachineId,
    }: {
      resourceAccount: string;
      publicMint: boolean;
      collectionId: string;
      candyMachineId: string;
    }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    try {
      var create_mint_script: any;
      if (publicMint) {
        create_mint_script = {
          type: "entry_function_payload",
          function: candyMachineId + "::candymachine::mint_script",
          type_arguments: [],
          arguments: [resourceAccount],
        };
      } else {
        await dispatch("getProof", {
          collectionId: collectionId,
          walletAddress: state.wallet.walletAddress,
        });

        const proofs: any[] = [];
        state.proof.map((proof: any) => {
          proofs.push(proof.data);
        });
        if (state.proof.length > 0) {
          create_mint_script = {
            type: "entry_function_payload",
            function: candyMachineId + "::candymachine::mint_from_merkle",
            type_arguments: [],
            arguments: [resourceAccount, proofs, state.mint_limit],
          };
        } else {
          throw new Error("You are not whitelisted for this collection");
        }
      }

      const transaction = await wallet.signAndSubmitTransaction(
        create_mint_script
      );

      const res = await client.waitForTransactionWithResult(transaction.hash);

      return res;
    } catch (error) {
      throw error;
    }
  },

  async checkBalanceForFolderUpload({ dispatch }: { dispatch: any }) {
    const arweaveRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/ar/usd?amount=1"
    );
    const aptosRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/apt/usd?amount=1"
    );

    const res = await getPrice();

    const price = res.data.price;

    const totalAR = (price / 1000000000000) * arweaveRate.data.USD;

    const uploadMultiplier = 1.091;
    const oracleFee = 1.1;

    const totalAPT =
      (totalAR / aptosRate.data.USD) * uploadMultiplier * oracleFee;

    return {
      requiredBalance: totalAPT.toFixed(6),
    };
  },
  async signTransactionForUploadingFolder(
    { state }: { state: any },
    requiredBalance: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    const transactionAmount = Math.ceil(requiredBalance * 100000000);

    const payload = {
      arguments: [
        "0x59e129c0275f5289f58b85f75090921b50d1745e0ba54197ac0586676b0a64b8",
        transactionAmount,
      ],
      function: "0x1::coin::transfer",
      type: "entry_function_payload",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
    };

    const transaction = await wallet.signAndSubmitTransaction(payload);

    if (!transaction.success) {
      const transactionResult = await client.waitForTransactionWithResult(
        transaction.hash
      );
      return transactionResult;
    }

    return transaction;
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
  async getSupplyAndMintedOfCollection(
    {},
    {
      resourceAccountAddress,
      candyMachineId,
    }: { resourceAccountAddress: string; candyMachineId: string }
  ) {
    const res = await client.getAccountResources(resourceAccountAddress);

    let resource: any = null;
    for (let i = 0; i < res.length; i++) {
      if (res[i].type === candyMachineId + "::candymachine::CandyMachine") {
        resource = res[i].data;
        break;
      }
    }

    return { total_supply: resource.total_supply, minted: resource.minted };
  },
  async setMerkleRoot(
    { state }: { state: any },
    {
      root,
      resourceAccount,
      candyMachineId,
    }: { root: any; resourceAccount: string; candyMachineId: string }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    const set_root_script = {
      function: candyMachineId + "::candymachine::set_root",
      type: "entry_function_payload",
      arguments: [resourceAccount, root],
      type_arguments: [],
    };

    const transaction = await wallet.signAndSubmitTransaction(set_root_script);

    let transactionResult: any = await client.waitForTransactionWithResult(
      transaction.hash
    );

    if (!transactionResult.success) {
      throw new Error("Transaction not Successful please try again");
    }

    return transaction;
  },

  async buyDomainName({ state }: { state: any }, domainName: string) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    const buyDomainScript = {
      function:
        "0x867ed1f6bf916171b1de3ee92849b8978b7d1b9e0a8cc982a3d19d535dfd9c0c::domains::register_domain",
      type_arguments: [],
      arguments: [domainName, 1],
      type: "entry_function_payload",
    };

    const transaction = await wallet.signAndSubmitTransaction(buyDomainScript);

    const res = await client.waitForTransactionWithResult(transaction.hash);

    return res;
  },

  async mintBulk(
    { state, dispatch }: { state: any; dispatch: any },
    {
      resourceAccount,
      publicMint,
      collectionId,
      candyMachineId,
      mintNumber,
    }: {
      resourceAccount: string;
      publicMint: boolean;
      collectionId: string;
      candyMachineId: string;
      mintNumber: number;
    }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    if (state.wallet.wallet !== "Petra" && mintNumber > 1) {
      throw new Error("Please Change Wallet To Petra for Bulk Mint");
    }

    if (!publicMint && mintNumber !== 1) {
      throw new Error("Bulk mint does not current support Whitelist mint");
    }

    try {
      if (mintNumber === 1) {
        const res = await dispatch("mintCollection", {
          resourceAccount,
          publicMint,
          collectionId,
          candyMachineId,
        });

        return res;
      } else {
        const sendToSelfBytecode =
          "a11ceb0b060000000501000203020505070c071319082c200000000103020003060c030501030002060c050c63616e64796d616368696e650b6d696e745f73637269707425d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0000001120600000000000000000c030a030a0123040f05070a000a0211000b03060100000000000000160c0305020b000102";

        function buildSendToSelfScriptPayload() {
          const bytecode = new HexString(sendToSelfBytecode).toUint8Array();

          const args: any = [
            new TxnBuilderTypes.TransactionArgumentU64(BigInt(mintNumber)),
            new TxnBuilderTypes.TransactionArgumentAddress(
              TxnBuilderTypes.AccountAddress.fromHex(resourceAccount)
            ),
          ];
          const script = new TxnBuilderTypes.Script(bytecode, [], args);
          return new TxnBuilderTypes.TransactionPayloadScript(script);
        }

        const payload: any = buildSendToSelfScriptPayload();

        const transaction = await wallet.signAndSubmitTransaction(payload);

        const res = await client.waitForTransactionWithResult(transaction.hash);

        return res;
      }
    } catch (error) {
      throw error;
    }
  },
};
