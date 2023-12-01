import { client, wallet, checkNetwork } from "@/store/walletStore";
import Cookies from "js-cookie";
let walletName: any = "";
if (process.client) {
  if (Cookies.get("wallet")) {
    const wallet = JSON.parse(Cookies.get("wallet")!);
    walletName = wallet.wallet;
  }
}

const checkWalletConnected = async () => {
  if (!wallet.isConnected()) {
    await wallet.connect(walletName);
  }
};

export const getCollectionDetails = async ({
  candyMachineId,
  candyObject,
}: {
  candyMachineId: string;
  candyObject: string;
}) => {
  const resources = await client.getAccountResources(candyObject);

  let resource: any = null;
  for (let i = 0; i < resources.length; i++) {
    if (resources[i].type === candyMachineId + "::candymachine::CandyMachine") {
      resource = resources[i].data;
      break;
    }
  }

  return resource;
};

export const updateWhitelistSaleTime = async ({
  candyObject,
  pre_sale_mint_time,
  candy_machine_id,
}: {
  candyObject: string;
  pre_sale_mint_time: string;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();

  checkNetwork();

  const pre_sale_seconds = Math.floor(
    new Date(pre_sale_mint_time).getTime() / 1000
  );

  const update_whitelist_sale_time_script = {
    function: `${candy_machine_id}::candymachine::update_wl_sale_time`,
    type: "entry_function_payload",
    arguments: [candyObject, pre_sale_seconds],
    type_arguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction(
    update_whitelist_sale_time_script
  );

  const result: any = await client.waitForTransactionWithResult(
    transaction.hash
  );

  if (!result.success) {
    throw new Error("Transaction not Successful please try again");
  }

  return result;
};

export const updatePublicSaleTime = async ({
  candyObject,
  public_sale_time,
  candy_machine_id,
}: {
  candyObject: string;
  public_sale_time: string;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const public_sale_seconds = Math.floor(
    new Date(public_sale_time).getTime() / 1000
  );

  const update_public_sale_time_script = {
    function: `${candy_machine_id}::candymachine::update_public_sale_time`,
    type: "entry_function_payload",
    arguments: [candyObject, public_sale_seconds],
    type_arguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction(
    update_public_sale_time_script
  );

  const result: any = await client.waitForTransactionWithResult(
    transaction.hash
  );

  if (!result.success) {
    throw new Error("Transaction not Successful please try again");
  }

  return result;
};

export const updatePublicSalePrice = async ({
  candyObject,
  public_sale_price,
  candy_machine_id,
}: {
  candyObject: string;
  public_sale_price: number;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const public_sale_lamports = (public_sale_price * Math.pow(10, 8)).toFixed(0);

  const update_public_sale_price_script = {
    function: `${candy_machine_id}::candymachine::update_public_sale_price`,
    type: "entry_function_payload",
    arguments: [candyObject, public_sale_lamports],
    type_arguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction(
    update_public_sale_price_script
  );

  const result: any = await client.waitForTransactionWithResult(
    transaction.hash
  );

  if (!result.success) {
    throw new Error("Transaction not Successful please try again");
  }

  return result;
};

export const updateWhitelistSalePrice = async ({
  candyObject,
  pre_sale_price,
  candy_machine_id,
}: {
  candyObject: string;
  pre_sale_price: number;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const whitelist_sale_lamports = (pre_sale_price * Math.pow(10, 8)).toFixed(0);

  const update_pre_sale_price_script = {
    function: `${candy_machine_id}::candymachine::update_wl_sale_price`,
    type: "entry_function_payload",
    arguments: [candyObject, whitelist_sale_lamports],
    type_arguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction(
    update_pre_sale_price_script
  );

  const result: any = await client.waitForTransactionWithResult(
    transaction.hash
  );

  if (!result.success) {
    throw new Error("Transaction not Successful please try again");
  }

  return result;
};

export const updateTotalSupply = async ({
  candyObject,
  total_supply,
  candy_machine_id,
}: {
  candyObject: string;
  total_supply: string;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const update_total_supply_script = {
    function: `${candy_machine_id}::candymachine::update_total_supply`,
    type: "entry_function_payload",
    arguments: [candyObject, total_supply],
    type_arguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction(
    update_total_supply_script
  );

  const result: any = await client.waitForTransactionWithResult(
    transaction.hash
  );

  if (!result.success) {
    throw new Error("Transaction not Successful please try again");
  }

  return result;
};

export const mintMany = async ({
  candy_machine_id,
  candy_object,
  amount,
  publicMint,
  proof,
  mint_limit,
}: {
  candy_machine_id: string;
  candy_object: string;
  amount: number;
  publicMint: boolean;
  proof: string;
  mint_limit: number;
}) => {
  await checkWalletConnected();
  checkNetwork();

  let mint_many_script = {
    type: "entry_function_payload",
    function: `${candy_machine_id}::candymachine::mint_script_many`,
    type_arguments: [],
    arguments: [candy_object, amount],
  };

  if (!publicMint) {
    mint_many_script = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_from_merkle_many`,
      type_arguments: [],
      arguments: [candy_object, proof, mint_limit, amount],
    };
  }

  const transaction = await wallet.signAndSubmitTransaction(mint_many_script);

  const result = await client.waitForTransactionWithResult(transaction.hash);

  return result;
};
