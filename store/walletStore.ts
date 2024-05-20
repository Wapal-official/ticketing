import {
  WalletCore,
  WalletName,
  NetworkName,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-core";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { SpikaWallet } from "@spika/aptos-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { MSafeWalletAdapter } from "@msafe/aptos-wallet-adapter";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import { AptosClient, HexString, TxnBuilderTypes } from "aptos";
import axios from "axios";

import { getPrice } from "@/services/AssetsService";
import { aptToUsd, arToUsd } from "@/services/UtilityService";
import { getCoinType } from "@/utils/getCoinType";
import { convertPriceToSendInSmartContract } from "~/utils/price";
import { register } from "@/services/LoginService";
import { InputGenerateTransactionPayloadData } from "@aptos-labs/ts-sdk";

const GRAPHQL_URL = process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : "";

let network = NetworkName.Testnet;

if (process.env.NETWORK === "testnet") {
  network = NetworkName.Testnet;
} else {
  network = NetworkName.Mainnet;
}

export const client = new AptosClient(process.env.NODE_URL || "");

const wallets = [
  new PetraWallet(),
  new OKXWallet(),
  new RiseWallet(),
  new PontemWallet(),
  new MartianWallet(),
  new FewchaWallet(),
  new SpikaWallet(),
  new TrustWallet(),
  new MSafeWalletAdapter(),
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
  setWallet(state: any, wallet: any) {
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
    rootState,
  }: {
    state: any;
    dispatch: any;
    commit: any;
    rootState: any;
  }) {
    const walletInState = JSON.parse(
      localStorage.getItem("wallet") ?? JSON.stringify({ wallet: "" })
    );

    const userInStorage = JSON.parse(
      localStorage.getItem("user") ?? JSON.stringify({ user_id: "" })
    );

    const userInState = rootState.userStore.user;

    if (!userInState.user_id && userInStorage.user_id) {
      dispatch("userStore/setUser", userInStorage, { root: true });
    }

    const now = new Date().getTime();
    const tokenExpiryDate = new Date(userInStorage.expiresIn).getTime();

    if (now > tokenExpiryDate) {
      dispatch("userStore/disconnectUser", null, { root: true });
    }

    commit("setWallet", walletInState);

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

      wallet.addListener("accountChange", async (newAccount: any) => {
        commit("setWallet", {
          wallet: state.wallet.wallet,
          walletAddress: newAccount?.address,
          publicKey: Array.isArray(newAccount.publicKey)
            ? newAccount?.publicKey[0]
            : newAccount?.publicKey,
          initializedAccountChange: true,
        });

        localStorage.setItem(
          "wallet",
          JSON.stringify({
            wallet: state.wallet.wallet,
            walletAddress: newAccount?.address,
            publicKey: Array.isArray(newAccount.publicKey)
              ? newAccount?.publicKey[0]
              : newAccount?.publicKey,
          })
        );

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

      localStorage.setItem(
        "wallet",
        JSON.stringify({
          wallet: wallet.wallet?.name,
          walletAddress: wallet.account?.address,
          publicKey: Array.isArray(wallet.account?.publicKey)
            ? wallet.account?.publicKey[0]
            : wallet.account?.publicKey,
        })
      );

      const res = await register(state.wallet.walletAddress);

      return true;
    } catch (error) {
      throw error;
    }
  },
  async disconnectWallet({ commit, state }: { commit: any; state: any }) {
    try {
      await wallet.disconnect();
    } catch {}

    commit("setWallet", {
      wallet: "",
      walletAddress: "",
      publicKey: "",
      initializedAccountChange: state.wallet.initializedAccountChange
        ? state.wallet.initializedAccountChange
        : false,
    });

    localStorage.removeItem("wallet");
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

    const create_candy_machine: InputGenerateTransactionPayloadData = {
      function:
        `${process.env.CANDY_MACHINE_V1}::candymachine::init_candy` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [
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
        candyMachineArguments.public_mint_limit,
        "" + makeId(5),
      ],
    };

    let transactionRes = await wallet.signAndSubmitTransaction({
      data: create_candy_machine,
    });

    let getResourceAccount: any = await client.waitForTransactionWithResult(
      transactionRes.hash
    );

    if (!getResourceAccount.success && !getResourceAccount.hash) {
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

    const create_candy_machine: InputGenerateTransactionPayloadData = {
      function:
        `${process.env.CANDY_MACHINE_V2}::candymachine::init_candy` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [
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
        candyMachineArguments.public_mint_limit,
        false,
        "" + makeId(5),
        false,
      ],
    };

    let transactionRes = await wallet.signAndSubmitTransaction({
      data: create_candy_machine,
    });

    let getResourceAccount: any = await client.waitForTransactionWithResult(
      transactionRes.hash
    );

    if (!getResourceAccount.success && !getResourceAccount.hash) {
      throw new Error("Transaction not Successful please try again");
    }

    let resourceAccount = null;

    getResourceAccount.changes.some((change: any) => {
      if (
        change.type === "write_resource" &&
        change.data &&
        change.data.type === `0x1::object::ObjectCore`
      ) {
        resourceAccount = change.address;
      }

      return change.data && change.data.type === `0x1::object::ObjectCore`;
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
      var create_mint_script: InputGenerateTransactionPayloadData;
      if (publicMint) {
        create_mint_script = {
          function:
            `${candyMachineId}::candymachine::mint_script` as `${string}::${string}::${string}`,
          typeArguments: [],
          functionArguments: [resourceAccount],
        };
      } else {
        if (proof.length > 0) {
          create_mint_script = {
            function:
              `${candyMachineId}::candymachine::mint_from_merkle` as `${string}::${string}::${string}`,
            typeArguments: [],
            functionArguments: [resourceAccount, proof, mintLimit],
          };
        } else {
          throw new Error("You are not whitelisted for this collection");
        }
      }

      const transaction = await wallet.signAndSubmitTransaction({
        data: create_mint_script,
      });

      const res = await client.waitForTransactionWithResult(transaction.hash);

      return res;
    } catch (error) {
      throw error;
    }
  },

  async checkBalanceForFolderUpload() {
    const arweaveRate = await arToUsd();
    const aptosRate = await aptToUsd();

    const res = await getPrice();

    const price = res.data.price;

    const totalAR = (price / Math.pow(10, 12)) * arweaveRate;

    const uploadMultiplier = 1.091;
    const oracleFee = 1.1;

    const totalAPT = (totalAR / aptosRate) * uploadMultiplier * oracleFee;

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

    const payload: InputGenerateTransactionPayloadData = {
      functionArguments: [
        "0x59e129c0275f5289f58b85f75090921b50d1745e0ba54197ac0586676b0a64b8",
        transactionAmount,
      ],
      function: "0x1::coin::transfer" as `${string}::${string}::${string}`,
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
    };

    const transaction = await wallet.signAndSubmitTransaction({
      data: payload,
    });

    if (!transaction.hash) {
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
      paused: resource.paused,
      v2: v2,
    };
  },
  async getSupplyAndMintedOfExternalCollection(
    {},
    { collectionId }: { collectionId: string }
  ) {
    const query = {
      query: `query GetMintedAndTotalSupplyOfCollection($COLLECTION_ID: String){
        current_collections_v2(
          where: {collection_id: {_eq: $COLLECTION_ID}}
        ) {
          max_supply
          total_minted_v2
        }
      }`,
      variables: {
        COLLECTION_ID: collectionId,
      },
    };

    const res = await axios.post(GRAPHQL_URL, query);

    if (res.data.data.current_collections_v2[0]) {
      const data = res.data.data.current_collections_v2[0];
      return {
        total_supply: data.max_supply,
        minted: data.total_minted_v2,
        v2: true,
      };
    } else {
      return { total_supply: 0, minted: 0, v2: false };
    }
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

    checkNetwork();

    const set_root_script: InputGenerateTransactionPayloadData = {
      function:
        `${candyMachineId}::candymachine::set_root` as `${string}::${string}::${string}`,
      functionArguments: [resourceAccount, root],
      typeArguments: [],
    };

    const transaction = await wallet.signAndSubmitTransaction({
      data: set_root_script,
    });

    let transactionResult: any = await client.waitForTransactionWithResult(
      transaction.hash
    );

    if (!transactionResult.success && !transactionResult.hash) {
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
    let nft = rootState.auction.selectedNft;

    const coinType = getCoinType(detail.coinType);

    let min_bid = convertPriceToSendInSmartContract({
      price: detail.min_bid,
      isConverted: false,
      coinType: detail.coinType,
    });

    const create_auction: InputGenerateTransactionPayloadData = {
      function:
        `${process.env.PID}::auction::create_auction` as `${string}::${string}::${string}`,
      typeArguments: [coinType.coinObject],
      functionArguments: [
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

    let transactionRes = await wallet.signAndSubmitTransaction({
      data: create_auction,
    });

    let getResource: any = await client.waitForTransactionWithResult(
      transactionRes.hash
    );

    if (getResource.success && getResource.hash) {
      for (var x = 0; x < getResource.changes.length; x++) {
        if (
          getResource.changes[x].data &&
          getResource.changes[x].data.type ==
            process.env.PID + `::auction::Auctions<${coinType.coinObject}>`
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

      const offer_price = convertPriceToSendInSmartContract({
        price: auction.offer_price,
        isConverted: false,
        coinType: auction.coinType,
      });

      const coinType = getCoinType(auction.coinType);

      const place_bid: InputGenerateTransactionPayloadData = {
        function:
          `${process.env.PID}::auction::bid` as `${string}::${string}::${string}`,
        typeArguments: [coinType.coinObject],
        functionArguments: [
          auction.detail.nft.nft.current_token_data.creator_address,
          auction.detail.nft.nft.current_token_data.collection_name,
          auction.detail.nft.nft.current_token_data.name,
          auction.detail.nft.nft.property_version,
          auction.detail.nft.nft.amount,
          offer_price,
          auction.detail.id,
          withdrawSec,
        ],
      };
      let transactionRes = await wallet.signAndSubmitTransaction({
        data: place_bid,
      });

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
    {
      price,
      auction_id,
      coinType,
    }: { price: number; auction_id: number; coinType: string }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

    const offer_price = convertPriceToSendInSmartContract({
      price: price,
      isConverted: false,
      coinType: coinType,
    });

    const coinTypeObject = getCoinType(coinType);

    const increase_bid: InputGenerateTransactionPayloadData = {
      function:
        `${process.env.PID}::auction::increase_bid` as `${string}::${string}::${string}`,
      typeArguments: [coinTypeObject.coinObject],
      functionArguments: [offer_price, auction_id],
    };

    const res = await wallet.signAndSubmitTransaction({ data: increase_bid });

    const txhRes = await client.waitForTransactionWithResult(res.hash);

    return txhRes;
  },
  async withdrawBid(
    { state }: { state: any },
    {
      lister_address,
      creation_number,
      coinType,
    }: { lister_address: string; creation_number: number; coinType: string }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

    const coinTypeObject = getCoinType(coinType);

    const withdraw_coin_from_bid: InputGenerateTransactionPayloadData = {
      function:
        `${process.env.PID}::auction::withdraw_coin_from_bid` as `${string}::${string}::${string}`,
      typeArguments: [coinTypeObject.coinObject],
      functionArguments: [lister_address, creation_number],
    };

    const res = await wallet.signAndSubmitTransaction({
      data: withdraw_coin_from_bid,
    });

    const txhRes = await client.getTransactionByHash(res.hash);

    return txhRes;
  },
  async completeAuction(
    { state }: { state: any },
    { auction_id, coinType }: { auction_id: number; coinType: string }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

    const coinTypeObject = getCoinType(coinType);

    const complete_auction: InputGenerateTransactionPayloadData = {
      function:
        `${process.env.PID}::auction::complete_auction` as `${string}::${string}::${string}`,
      typeArguments: [coinTypeObject.coinObject],
      functionArguments: [auction_id],
    };

    const res = await wallet.signAndSubmitTransaction({
      data: complete_auction,
    });

    const txhRes = await client.getTransactionByHash(res.hash);

    return txhRes;
  },
  async buyDomainName({ state }: { state: any }, domainName: string) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }
    checkNetwork();

    const buyDomainScript: InputGenerateTransactionPayloadData = {
      function:
        "0x867ed1f6bf916171b1de3ee92849b8978b7d1b9e0a8cc982a3d19d535dfd9c0c::router::register_domain" as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [domainName, 31536000, null, null],
    };

    const transaction = await wallet.signAndSubmitTransaction({
      data: buyDomainScript,
    });

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
      throw new Error(
        "Whitelist Mint does not support Bulk Minting. Please Mint one at a time"
      );
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

        const transaction = await wallet.signAndSubmitTransaction({
          data: payload,
        });

        const res = await client.waitForTransactionWithResult(transaction.hash);

        return res;
      }
    } catch (error) {
      throw error;
    }
  },
  async getAptForFileUpload() {
    const arweaveRate = await arToUsd();
    const aptosRate = await aptToUsd();

    // const res = await getPrice();

    const price = 0.005 * Math.pow(10, 12);

    const totalAR = (price / Math.pow(10, 12)) * arweaveRate;

    const uploadMultiplier = 1.091;
    const oracleFee = 1.1;
    const arkbFees = 1.1;
    const bundlrFees = 1.3;

    const totalAPT =
      (totalAR / aptosRate) *
      uploadMultiplier *
      oracleFee *
      (arkbFees + bundlrFees);

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

    const payload: InputGenerateTransactionPayloadData = {
      functionArguments: [
        "0x59e129c0275f5289f58b85f75090921b50d1745e0ba54197ac0586676b0a64b8",
        transactionAmount,
      ],
      function: "0x1::coin::transfer" as `${string}::${string}::${string}`,
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
    };

    const transaction = await wallet.signAndSubmitTransaction({
      data: payload,
    });

    if (!transaction.hash) {
      const transactionResult = await client.waitForTransactionWithResult(
        transaction.hash
      );
      return transactionResult;
    }

    return transaction;
  },
  async externalMint(
    { state }: { state: any },
    {
      mintFunction,
      moduleName,
      programId,
    }: {
      mintFunction: string;
      moduleName: string;
      programId: string;
    }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    checkNetwork();

    const payload: InputGenerateTransactionPayloadData = {
      function:
        `${programId}::${moduleName}::${mintFunction}` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [],
    };

    const transaction = await wallet.signAndSubmitTransaction({
      data: payload,
    });

    const res = await client.waitForTransactionWithResult(transaction.hash);

    return res;
  },
  async bulkExternalMint(
    { state }: { state: any },
    {
      mintFunction,
      moduleName,
      programId,
      numberOfNfts,
    }: {
      mintFunction: string;
      moduleName: string;
      programId: string;
      numberOfNfts: number;
    }
  ) {
    if (!wallet.isConnected()) {
      await connectWallet(state.wallet.wallet);
    }

    checkNetwork();

    const payload: InputGenerateTransactionPayloadData = {
      function:
        `${programId}::${moduleName}::${mintFunction}` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [numberOfNfts],
    };

    const transaction = await wallet.signAndSubmitTransaction({
      data: payload,
    });

    const res = await client.waitForTransactionWithResult(transaction.hash);

    return res;
  },
  async checkIfWalletAddressIsWhitelisted(
    context: any,
    {
      walletAddress,
      programId,
      moduleName,
      viewFunction,
    }: {
      programId: string;
      walletAddress: string;
      moduleName: string;
      viewFunction: string;
    }
  ) {
    try {
      const NODE_URL = process.env.NODE_URL ? process.env.NODE_URL : "";

      const res = await axios.post(`${NODE_URL}/view`, {
        arguments: [walletAddress],
        function: `${programId}::${moduleName}::${viewFunction}`,
        type_arguments: [],
      });

      return res.data;
    } catch (error) {
      throw new Error("Error getting whitelist proof");
    }
  },
};
