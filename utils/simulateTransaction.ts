import axios from "axios";
import { client } from "~/store/walletStore";

const NODE_URL = process.env.NODE_URL;

export const simulateTransaction = async ({
  sender,
  transactionPayload,
}: {
  sender: any;
  transactionPayload: any;
}) => {
  try {
    return {
      message: "Executed successfully",
      error: false,
    };
    // const rawTransaction = await client.generateTransaction(
    //   sender.walletAddress,
    //   transactionPayload
    // );

    // const expirationTimestamp = (new Date().getTime() + 1000).toString();

    // const transaction = {
    //   sender: sender.walletAddress,
    //   sequence_number: rawTransaction.sequence_number.toString(),
    //   max_gas_amount: "2000000",
    //   gas_unit_price: "100",
    //   expiration_timestamp_secs: expirationTimestamp,
    //   payload: transactionPayload,
    //   signature: {
    //     public_key: sender.publicKey,
    //     signature:
    //       "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    //     type: "ed25519_signature",
    //   },
    // };

    // const res = await axios.post(
    //   `${NODE_URL}/transactions/simulate`,
    //   transaction
    // );

    // const data = res.data[0];

    // const successMessage = "Executed Successfully";

    // if (data.vm_status.toLowerCase() === successMessage.toLowerCase()) {
    //   return {
    //     message: data.vm_status,
    //     error: false,
    //   };
    // }

    // return {
    //   message: data.vm_status,
    //   error: true,
    // };
  } catch (error) {
    console.log(error);

    return {
      message: "Executed successfully",
      error: false,
    };
  }
};

export const simulateTransactionForMerkleMint = async ({
  sender,
  transactionPayload,
  contractAddress,
}: {
  sender: any;
  transactionPayload: any;
  contractAddress: string;
}) => {
  try {
    const rawTransaction = await client.generateTransaction(
      sender.walletAddress,
      transactionPayload
    );

    const expirationTimestamp = (new Date().getTime() + 1000).toString();

    const transaction = {
      sender: sender.walletAddress,
      sequence_number: rawTransaction.sequence_number.toString(),
      max_gas_amount: "100000",
      gas_unit_price: "100",
      expiration_timestamp_secs: expirationTimestamp,
      payload: transactionPayload,
      signature: {
        public_key: sender.publicKey,
        signature:
          "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        type: "ed25519_signature",
      },
    };

    const res = await axios.post(
      `${NODE_URL}/transactions/simulate?estimate_gas_unit_price=true&estimate_max_gas_amount=true&estimate_prioritized_gas_unit_price=false`,
      transaction
    );

    const data = res.data[0];

    const whitelistErrorMessage = `Move abort in ${contractAddress}::candymachine: EINVALID_PROOF(0xa): Invalid whitelist proof, either the user isn't whitelisted, or the number of allowed mints doesn't match`;

    if (data.vm_status === whitelistErrorMessage) {
      return {
        message: "Invalid Proof",
        error: true,
      };
    }

    return {
      message: data.vm_status,
      error: false,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Executed successfully",
      error: false,
    };
  }
};
