import { client, wallet, checkNetwork } from "@/store/walletStore";
import {
  Aptos,
  AptosConfig,
  InputGenerateTransactionPayloadData,
} from "@aptos-labs/ts-sdk";
import { PaymasterSdk } from "@kanalabs/paymaster-sdk";
import { Network } from "aptos";
import { executeSmartContract } from "@/services/AptosCollectionService";
let walletName: any = "";
if (process.client) {
  if (localStorage.getItem("wallet")) {
    const wallet = JSON.parse(localStorage.getItem("wallet")!);
    walletName = wallet.wallet;
  }
}

const PROJECT_KEY = process.env.KANA_LABS_PROJECT_KEY
  ? process.env.KANA_LABS_PROJECT_KEY
  : "";

const sdk = new PaymasterSdk(
  {},
  { projectKey: PROJECT_KEY, network: Network.MAINNET }
);

const checkWalletConnected = async () => {
  if (!wallet.isConnected()) {
    await wallet.connect(walletName);
  }
};

export const sponsorMintTransaction = async () => {
  try {
    const CONTRACT_ADDRESS =
      "0x39673a89d85549ad0d7bef3f53510fe70be2d5abaac0d079330ade5548319b62";
    const collectionConfigAddress =
      "0x21f67c834f778a9ab5180272f2d13b57e40a7fac380bb8deeb310dc94383ce23";
    const referrer = "wapal";

    const config = new AptosConfig({ network: Network.MAINNET });
    const aptosClient = new Aptos(config);
    const senderAccount = wallet.account?.address ? wallet.account.address : "";

    const payload: any = {
      function: `${CONTRACT_ADDRESS}::only_on_aptos::mint`,
      typeArguments: [],
      functionArguments: [collectionConfigAddress, referrer],
    };

    const isUserWhitelisted = await checkIfWalletIsWhitelisted(senderAccount);

    if (!isUserWhitelisted.success) {
      throw new Error("Error in Kanalabs");
    }

    const addUserToWhitelist = await addAddressToWhitelist(senderAccount);

    if (!addUserToWhitelist.success) {
      throw new Error("Error in Kanalabs");
    }

    const transaction: any = await aptosClient.transaction.build.simple({
      sender: senderAccount,
      withFeePayer: true,
      data: {
        function:
          `${CONTRACT_ADDRESS}::only_on_aptos::mint` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [collectionConfigAddress, referrer],
      },
    });

    const senderAuth: any = await wallet.signTransaction(transaction);

    const txn = await sdk.sponsoredTxnWithSenderAuth({
      transaction: transaction,
      senderAuth: senderAuth,
    });

    const txnReceipt = await sdk.aptosClient.waitForTransaction({
      transactionHash: txn.hash,
      options: {
        checkSuccess: true,
      },
    });
  } catch (error: any) {
    console.log(error);

    const CONTRACT_ADDRESS =
      "0x39673a89d85549ad0d7bef3f53510fe70be2d5abaac0d079330ade5548319b62";
    const collectionConfigAddress =
      "0x21f67c834f778a9ab5180272f2d13b57e40a7fac380bb8deeb310dc94383ce23";
    const referrer = "wapal";

    const payload: InputGenerateTransactionPayloadData = {
      function:
        `${CONTRACT_ADDRESS}::only_on_aptos::mint` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [collectionConfigAddress, referrer],
    };

    const res = await executeSmartContract(payload);

    throw new Error(error.message);
  }
};

export const addAddressToWhitelist = async (senderAccount: string) => {
  try {
    const whitelist = await sdk.addToWhitelist({ address: senderAccount });

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
};

const checkIfWalletIsWhitelisted = async (senderAccount: string) => {
  try {
    const isWhitelisted = await sdk.isWhitelisted({ address: senderAccount });

    return { success: true, whitelisted: isWhitelisted.success };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
};
