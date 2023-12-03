import { client, wallet, checkNetwork } from "@/store/walletStore";
import Cookies from "js-cookie";
import MintCollectionInterface from "@/interfaces/MintCollection";
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

export const mintCollection = async ({
  candy_machine_id,
  candy_object,
  amount,
  publicMint,
  proof,
  mint_limit,
}: MintCollectionInterface) => {
  await checkWalletConnected();
  checkNetwork();

  if (publicMint) {
    if (amount === 1) {
      const res = await mintSingleNft({
        candy_machine_id,
        candy_object,
      });

      return res;
    } else {
      const res = await mintManyNft({ candy_machine_id, candy_object, amount });
      return res;
    }
  } else {
    if (amount === 1) {
      const res = await merkleMintSingleNft({
        candy_machine_id,
        candy_object,
        proof,
        mint_limit,
      });

      return res;
    } else {
      const res = await merkleMintManyNft({
        candy_machine_id,
        candy_object,
        proof,
        mint_limit,
        amount,
      });
    }
  }
};

export const mintSingleNft = async ({
  candy_machine_id,
  candy_object,
}: MintCollectionInterface) => {
  try {
    const mint_script = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_script`,
      type_arguments: [],
      arguments: [candy_object],
    };

    const res = await executeTransactionAndGiveResult(mint_script);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};

export const mintManyNft = async ({
  candy_machine_id,
  candy_object,
  amount,
}: MintCollectionInterface) => {
  try {
    const mint_script_many = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_script_many`,
      type_arguments: [],
      arguments: [candy_object, amount],
    };

    const res = await executeTransactionAndGiveResult(mint_script_many);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};

export const merkleMintSingleNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
}: MintCollectionInterface) => {
  try {
    const merkle_mint_script = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_script_merkle`,
      type_arguments: [],
      arguments: [candy_object, proof, mint_limit],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};

export const merkleMintManyNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
  amount,
}: MintCollectionInterface) => {
  try {
    const merkle_mint_script_many = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_from_merkle_many`,
      type_arguments: [],
      arguments: [candy_object, proof, mint_limit, amount],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script_many);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};

export const executeTransactionAndGiveResult = async (payload: any) => {
  const transaction = await wallet.signAndSubmitTransaction(payload);

  const result = await client.waitForTransactionWithResult(transaction.hash);

  return result;
};
