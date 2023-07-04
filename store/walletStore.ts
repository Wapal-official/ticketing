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

let network = NetworkName.Testnet;

if (process.env.NETWORK === "testnet") {
  network = NetworkName.Testnet;
} else {
  network = NetworkName.Mainnet;
}

export const client = new AptosClient(process.env.NODE_URL || "");

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

export const wallet = new WalletCore(wallets);

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
};

export const checkNetwork = () => {
  if (wallet.network?.name.toLowerCase() !== network.toLowerCase()) {
    throw new Error(`Please Change your network to ${network}`);
  }
};

export const state = () => ({
  wallet: {
    wallet: "",
    walletAddress: "",
    publicKey: "",
    proof: "",
    initializedAccountChange: false,
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
  setInitializeAccountChange(state: any, accountChange: boolean) {
    state.wallet.initializedAccountChange = accountChange;
  },
};

export const getters = {
  getWalletsDetail() {
    return wallets;
  },
};

export const actions = {
  async initializeWallet({
    state,
    dispatch,
    commit,
  }: {
    state: any;
    dispatch: any;
    commit: any;
  }) {
    if (!wallet.isConnected() && state.wallet.wallet) {
      dispatch("connectWallet", state.wallet.wallet);
    }

    if (!state.wallet.initializedAccountChange && wallet.isConnected()) {
      try {
        await wallet.onNetworkChange();
        await wallet.onAccountChange();
        commit("setInitializeAccountChange", true);
      } catch (error) {
        commit("setInitializeAccountChange", false);
      }

      wallet.addListener("networkChange", async () => {
        await wallet.disconnect();
      });

      wallet.addListener("accountChange", async (newAccount) => {
        await dispatch("connectWallet", state.wallet.wallet);

        dispatch("userStore/disconnectUser", null, { root: true });
      });
    }
  },
  setWallet({ commit }: { commit: any }) {
    commit("setWallet");
  },
  async connectWallet(
    { state, commit, dispatch }: { state: any; commit: any; dispatch: any },
    walletName: WalletName
  ) {
    try {
      await connectWallet(walletName);

      if (!state.wallet.initializedAccountChange) {
        await dispatch("initializeWallet");
      }

      commit("setWallet", {
        wallet: wallet.wallet?.name,
        walletAddress: wallet.account?.address,
        publicKey: Array.isArray(wallet.account?.publicKey)
          ? wallet.account?.publicKey[0]
          : wallet.account?.publicKey,
        initializedAccountChange: true,
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
  async disconnectWallet({ commit, state }: { commit: any; state: any }) {
    if (wallet.account) {
      await wallet.disconnect();
    }
    commit("setWallet", {
      wallet: "",
      walletAddress: "",
      publicKey: "",
      initializedAccountChange: state.wallet.initializedAccountChange
        ? state.wallet.initializedAccountChange
        : false,
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
    { state }: { state: any },
    candyMachineArguments: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    checkNetwork();

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
  async createCandyMachineV2(
    { state }: { state: any },
    candyMachineArguments: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    checkNetwork();

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
        false,
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

    let resourceAccount = null;
    getResourceAccount.changes.some((change: any) => {
      if (
        change.type === "write_resource" &&
        change.data.type ===
          `${process.env.CANDY_MACHINE_ID}::candymachine::CandyMachine`
      ) {
        resourceAccount = change.address;
      }

      return (
        change.data.type ===
        `${process.env.CANDY_MACHINE_ID}::candymachine::CandyMachine`
      );
    });

    return {
      resourceAccount: resourceAccount,
      transactionHash: transactionRes.hash,
    };
  },
  async checkBalance({ state }: { state: any }) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();
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
    { state }: { state: any },
    {
      resourceAccount,
      publicMint,
      candyMachineId,
      proof,
      mintLimit,
    }: {
      resourceAccount: string;
      publicMint: boolean;
      candyMachineId: string;
      proof: any[];
      mintLimit: number;
    }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

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
        if (proof.length > 0) {
          create_mint_script = {
            type: "entry_function_payload",
            function: candyMachineId + "::candymachine::mint_from_merkle",
            type_arguments: [],
            arguments: [resourceAccount, proof, mintLimit],
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

  async checkBalanceForFolderUpload() {
    const arweaveRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/ar/usd?amount=1"
    );
    const aptosRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/apt/usd?amount=1"
    );

    const res = await getPrice();

    const price = res.data.price;

    const totalAR = (price / Math.pow(10, 12)) * arweaveRate.data.USD;

    const uploadMultiplier = 1.091;
    const oracleFee = 1.1;

    const totalAPT =
      (totalAR / aptosRate.data.USD) * uploadMultiplier * oracleFee;

    return {
      requiredBalance: totalAPT.toFixed(8),
    };
  },
  async signTransactionForUploadingFolder(
    { state }: { state: any },
    requiredBalance: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    checkNetwork();

    const transactionAmount = (requiredBalance * Math.pow(10, 8)).toFixed(0);

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
  async signLoginMessage({ state, dispatch }: { state: any; dispatch: any }) {
    if (!wallet.isConnected()) {
      dispatch("connectWallet", state.wallet.wallet);
    }

    checkNetwork();

    const message = "Login into Wapal";
    const nonce = makeId(16);
    const signMessage = await wallet.signMessage({ message, nonce });

    return signMessage;
  },
  async getSupplyAndMintedOfCollection(
    { state }: { state: any },
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

    const v2 = res.some((data: any) => {
      return data.type === "0x1::object::ObjectCore";
    });

    return {
      total_supply: resource.total_supply,
      minted: resource.minted,
      v2: v2,
    };
  },
  async setMerkleRoot(
    { state }: { state: any },
    {
      root,
      resourceAccount,
      candyMachineId,
    }: { root: any; resourceAccount: string; candyMachineId: string }
  ) {
    await connectWallet(state.wallet.wallet);

    checkNetwork();

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
  async createAuction(
    { rootState, state }: { rootState: any; state: any },
    detail: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(rootState.walletStore.wallet.wallet);
    }
    checkNetwork();

    let start = new Date(detail.start_date);
    let startSec = Math.floor(start.getTime() / 1000);
    let end = new Date(detail.end_date);
    let endSec = Math.floor(end.getTime() / 1000);
    let min_bid = detail.min_bid * 100000000;
    let nft = rootState.auction.selectedNft;

    const create_auction = {
      type: "entry_function_payload",
      function: process.env.PID + "::auction::create_auction",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [
        nft.nft.current_token_data.creator_address,
        nft.nft.current_token_data.collection_name,
        nft.nft.current_token_data.name,
        nft.nft.property_version,
        nft.nft.amount,
        min_bid, //price
        startSec, //start sec
        endSec, //end
        endSec + 3600 * 24 * 30, //withdraw
      ],
    };

    let transactionRes = await wallet.signAndSubmitTransaction(create_auction);

    let getResource: any = await client.waitForTransactionWithResult(
      transactionRes.hash
    );

    if (getResource.success) {
      for (var x = 0; x < getResource.changes.length; x++) {
        if (
          getResource.changes[x].data.type ==
          process.env.PID + "::auction::Auctions<0x1::aptos_coin::AptosCoin>"
        ) {
          return getResource.changes[x].data.data;
        }
      }
    } else {
      throw new Error("Transaction Failed Please Try Again");
    }
  },
  async placeBid(
    { rootState, state }: { rootState: any; state: any },
    auction: any
  ) {
    try {
      if (!wallet.isConnected()) {
        await connectWallet(rootState.walletStore.wallet.wallet);
      }
      checkNetwork();

      let withdraw = new Date(auction.detail.endAt);
      let withdrawSec = Math.floor(withdraw.getTime() / 1000);

      const place_bid = {
        type: "entry_function_payload",
        function: process.env.PID + "::auction::bid",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: [
          auction.detail.nft.nft.current_token_data.creator_address,
          auction.detail.nft.nft.current_token_data.collection_name,
          auction.detail.nft.nft.current_token_data.name,
          auction.detail.nft.nft.property_version,
          auction.detail.nft.nft.amount,
          (auction.offer_price * Math.pow(10, 8)).toFixed(0),
          auction.detail.id,
          withdrawSec,
        ],
      };
      let transactionRes = await wallet.signAndSubmitTransaction(place_bid);

      let getResource = await client.waitForTransactionWithResult(
        transactionRes.hash
      );
      return getResource;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async increaseAuctionBid(
    { state }: { state: any },
    { price, auction_id }: { price: number; auction_id: number }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

    const increase_bid = {
      type: "entry_function_payload",
      function: process.env.PID + "::auction::increase_bid",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [(price * Math.pow(10, 8)).toFixed(0), auction_id],
    };

    const res = await wallet.signAndSubmitTransaction(increase_bid);

    const txhRes = await client.getTransactionByHash(res.hash);

    return txhRes;
  },
  async withdrawBid(
    { state }: { state: any },
    {
      lister_address,
      creation_number,
    }: { lister_address: String; creation_number: Number }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

    const withdraw_coin_from_bid = {
      type: "entry_function_payload",
      function: process.env.PID + "::auction::withdraw_coin_from_bid",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [lister_address, creation_number],
    };

    const res = await wallet.signAndSubmitTransaction(withdraw_coin_from_bid);

    const txhRes = await client.getTransactionByHash(res.hash);

    return txhRes;
  },
  async completeAuction(
    { state }: { state: any },
    { auction_id }: { auction_id: Number }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

    const complete_auction = {
      type: "entry_function_payload",
      function: process.env.PID + "::auction::complete_auction",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [auction_id],
    };

    const res = await wallet.signAndSubmitTransaction(complete_auction);

    const txhRes = await client.getTransactionByHash(res.hash);

    return txhRes;
  },
  async buyDomainName({ state }: { state: any }, domainName: string) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

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
      candyMachineId,
      mintNumber,
      proof,
      mintLimit,
    }: {
      resourceAccount: string;
      publicMint: boolean;
      candyMachineId: string;
      mintNumber: number;
      proof: any[];
      mintLimit: number;
    }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

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
          candyMachineId,
          proof,
          mintLimit,
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
  async getAptForFileUpload() {
    const arweaveRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/ar/usd?amount=1"
    );
    const aptosRate = await this.$axios.get(
      "https://api.coinconvert.net/convert/apt/usd?amount=1"
    );

    // const res = await getPrice();

    const price = 0.005 * Math.pow(10, 12);

    const totalAR = (price / Math.pow(10, 12)) * arweaveRate.data.USD;

    const uploadMultiplier = 1.091;
    const oracleFee = 1.1;

    const totalAPT =
      (totalAR / aptosRate.data.USD) * uploadMultiplier * oracleFee;

    return {
      requiredBalance: totalAPT.toFixed(8),
    };
  },
  async signTransactionForFileUpload(
    { state }: { state: any },
    requiredBalance: any
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    checkNetwork();

    const transactionAmount = (requiredBalance * Math.pow(10, 8)).toFixed(0);

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
};
