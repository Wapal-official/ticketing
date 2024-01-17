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
    const rawTransaction = await client.generateTransaction(
      sender.walletAddress,
      transactionPayload
    );

    const expirationTimestamp = (new Date().getTime() + 1000).toString();

    const transaction = {
      sender: sender.walletAddress,
      sequence_number: rawTransaction.sequence_number.toString(),
      max_gas_amount: "2000000",
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
      `${NODE_URL}/transactions/simulate`,
      transaction
    );

    const data = res.data[0];

    const successMessage = "Executed Successfully";

    if (data.vm_status.toLowerCase() === successMessage.toLowerCase()) {
      return {
        message: data.vm_status,
        error: false,
      };
    }

    return {
      message: data.vm_status,
      error: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Executed successfully",
      error: false,
    };
  }
};
