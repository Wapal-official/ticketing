import { InputGenerateTransactionPayloadData } from "@aptos-labs/ts-sdk";
import { client, wallet } from "@/store/walletStore";

export const executeSmartContract = async (
  initParams: InputGenerateTransactionPayloadData
) => {
  const transaction = await wallet.signAndSubmitTransaction({
    data: initParams,
  });

  const result = await client.waitForTransactionWithResult(transaction.hash);

  return result;
};
