import { client, wallet, checkNetwork } from "@/store/walletStore";

export const getCollectionDetails = async (
  candyMachineId: string,
  candyObject: string
) => {
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

export const updateWhitelistSaleTime = async (
  candyObject: string,
  presale_mint_time: string
) => {
  // if (!wallet.isConnected()) {
  //   await connectWallet(state.wallet.wallet);
  // }

  checkNetwork();

  const presale_seconds = Math.floor(
    new Date(presale_mint_time).getTime() / 1000
  );

  const update_whitelist_sale_time_script = {
    function: `${process.env.CANDY_MACHINE_ID}::candymachine::update_wl_sale_time`,
    type: "entry_function_payload",
    arguments: [candyObject, presale_seconds],
    type_arguments: [],
  };

  console.log(update_whitelist_sale_time_script);

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

export const updatePublicSaleTime = async (
  candyObject: string,
  public_sale_time: string
) => {
  checkNetwork();

  const public_sale_seconds = Math.floor(
    new Date(public_sale_time).getTime() / 1000
  );

  const update_public_sale_time_script = {
    function: `${process.env.CANDY_MACHINE_ID}::candymachine::update_public_sale_time`,
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

export const updatePublicSalePrice = async (
  candyObject: string,
  public_sale_price: number
) => {
  checkNetwork();

  const public_sale_lamports = (public_sale_price * Math.pow(10, 8)).toFixed(0);

  const update_public_sale_price_script = {
    function: `${process.env.CANDY_MACHINE_ID}::candymachine::update_public_sale_price`,
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

export const updateWhitelistSalePrice = async (
  candyObject: string,
  whitelist_sale_price: number
) => {
  checkNetwork();

  const whitelist_sale_lamports = (
    whitelist_sale_price * Math.pow(10, 8)
  ).toFixed(0);

  const update_whitelist_sale_price_script = {
    function: `${process.env.CANDY_MACHINE_ID}::candymachine::update_wl_sale_price`,
    type: "entry_function_payload",
    arguments: [candyObject, whitelist_sale_lamports],
    type_arguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction(
    update_whitelist_sale_price_script
  );

  const result: any = await client.waitForTransactionWithResult(
    transaction.hash
  );

  if (!result.success) {
    throw new Error("Transaction not Successful please try again");
  }

  return result;
};

export const updateTotalSupply = async (
  candyObject: string,
  total_supply: string
) => {
  checkNetwork();

  const update_total_supply_script = {
    function: `${process.env.CANDY_MACHINE_ID}::candymachine::update_total_supply`,
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

export const updateCollection = async (
  candyObject: string,
  collection: any
) => {
  checkNetwork();

  console.log("now", Math.floor(Date.now() / 1000));

  const pre_sale_time = Math.floor(
    new Date(collection.whitelistSaleTime).getTime() / 1000
  );
  const public_sale_time = Math.floor(
    new Date(collection.publicSaleTime).getTime() / 1000
  );

  const presale_price = Math.floor(collection.whitelistPrice * Math.pow(10, 8));
  const public_sale_price = Math.floor(
    collection.publicSalePrice * Math.pow(10, 8)
  );

  const update_total_supply_script = {
    function: `${process.env.CANDY_MACHINE_ID}::candymachine::update_candy`,
    type: "entry_function_payload",
    arguments: [
      candyObject,
      1000,
      collection.royalty * 10,
      pre_sale_time,
      public_sale_price,
      presale_price,
      public_sale_time,
    ],
    type_arguments: [],
  };

  console.log(update_total_supply_script);

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
  console.log(mint_many_script);

  const transaction = await wallet.signAndSubmitTransaction(mint_many_script);

  const result = await client.waitForTransactionWithResult(transaction.hash);

  return result;
};
