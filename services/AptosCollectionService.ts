import { client, wallet, checkNetwork } from "@/store/walletStore";
import Cookies from "js-cookie";
import MintCollectionInterface from "@/interfaces/MintCollection";
import { getCoinType } from "@/utils/getCoinType";
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
  candy_object,
}: {
  candyMachineId: string;
  candy_object: string;
}) => {
  const resources = await client.getAccountResources(candy_object);

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
  candy_object,
  pre_sale_mint_time,
  candy_machine_id,
}: {
  candy_object: string;
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
    arguments: [candy_object, pre_sale_seconds],
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
  candy_object,
  public_sale_time,
  candy_machine_id,
}: {
  candy_object: string;
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
    arguments: [candy_object, public_sale_seconds],
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
  candy_object,
  public_sale_price,
  candy_machine_id,
}: {
  candy_object: string;
  public_sale_price: number;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const public_sale_lamports = (public_sale_price * Math.pow(10, 8)).toFixed(0);

  const update_public_sale_price_script = {
    function: `${candy_machine_id}::candymachine::update_public_sale_price`,
    type: "entry_function_payload",
    arguments: [candy_object, public_sale_lamports],
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
  candy_object,
  pre_sale_price,
  candy_machine_id,
}: {
  candy_object: string;
  pre_sale_price: number;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const whitelist_sale_lamports = (pre_sale_price * Math.pow(10, 8)).toFixed(0);

  const update_pre_sale_price_script = {
    function: `${candy_machine_id}::candymachine::update_wl_sale_price`,
    type: "entry_function_payload",
    arguments: [candy_object, whitelist_sale_lamports],
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
  candy_object,
  total_supply,
  candy_machine_id,
}: {
  candy_object: string;
  total_supply: string;
  candy_machine_id: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const update_total_supply_script = {
    function: `${candy_machine_id}::candymachine::update_total_supply`,
    type: "entry_function_payload",
    arguments: [candy_object, total_supply],
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
    if (amount == 1) {
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
    if (amount == 1) {
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

      return res;
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
      function: `${candy_machine_id}::candymachine::mint_from_merkle`,
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

export const createCollectionV2 = async (candyMachineArguments: any) => {
  checkWalletConnected();

  checkNetwork();

  const coinTypeObject = getCoinType(candyMachineArguments.coinType);

  let programId = coinTypeObject.candy_id;

  const isOpenEdition = candyMachineArguments.is_open_edition
    ? candyMachineArguments.is_open_edition
    : false;

  const create_candy_machine = {
    type: "entry_function_payload",
    function: programId + "::candymachine::init_candy",
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
      candyMachineArguments.public_mint_limit,
      false,
      "" + makeId(5),
      isOpenEdition,
    ],
  };

  let transactionRes: any = await executeTransactionAndGiveResult(
    create_candy_machine
  );

  if (!transactionRes.success) {
    throw new Error("Transaction not Successful please try again");
  }

  let resourceAccount = null;

  transactionRes.changes.some((change: any) => {
    if (
      change.type === "write_resource" &&
      change.data &&
      change.data.type === `${programId}::candymachine::CandyMachine`
    ) {
      resourceAccount = change.address;
    }

    return (
      change.data &&
      change.data.type === `${programId}::candymachine::CandyMachine`
    );
  });

  return {
    resourceAccount: resourceAccount,
    transactionHash: transactionRes.hash,
  };
};

const makeId = (length: number) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const pauseOrResumeMinting = async ({
  candy_object,
  candy_machine_id,
}: MintCollectionInterface) => {
  checkWalletConnected();

  checkNetwork();

  const pause_resume_script = {
    type: "entry_function_payload",
    function: `${candy_machine_id}::candymachine::pause_resume_mint`,
    arguments: [candy_object],
    type_arguments: [],
  };

  const res = executeTransactionAndGiveResult(pause_resume_script);

  return res;
};

export const anotherCoinMintCollection = async ({
  candy_machine_id,
  candy_object,
  amount,
  publicMint,
  proof,
  mint_limit,
  coinType,
}: MintCollectionInterface) => {
  await checkWalletConnected();
  checkNetwork();

  const coinTypeObject = getCoinType(coinType || "");

  const coinObject = coinTypeObject.coinObject;

  if (publicMint) {
    if (amount == 1) {
      const res = await anotherCoinMintSingleNft({
        candy_machine_id,
        candy_object,
        coinObject,
      });

      return res;
    } else {
      const res = await anotherCoinMintManyNft({
        candy_machine_id,
        candy_object,
        amount,
        coinObject,
      });
      return res;
    }
  } else {
    if (amount == 1) {
      const res = await anotherCoinMerkleMintSingleNft({
        candy_machine_id,
        candy_object,
        proof,
        mint_limit,
        coinObject,
      });

      return res;
    } else {
      const res = await anotherCoinMerkleMintManyNft({
        candy_machine_id,
        candy_object,
        proof,
        mint_limit,
        amount,
        coinObject,
      });

      return res;
    }
  }
};

export const anotherCoinMintSingleNft = async ({
  candy_machine_id,
  candy_object,
  coinObject,
}: MintCollectionInterface) => {
  try {
    const mint_script = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_script`,
      type_arguments: [coinObject],
      arguments: [candy_object],
    };

    const res = await executeTransactionAndGiveResult(mint_script);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};

export const anotherCoinMintManyNft = async ({
  candy_machine_id,
  candy_object,
  amount,
  coinObject,
}: MintCollectionInterface) => {
  try {
    const mint_script_many = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_script_many`,
      type_arguments: [coinObject],
      arguments: [candy_object, amount],
    };

    const res = await executeTransactionAndGiveResult(mint_script_many);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};

export const anotherCoinMerkleMintSingleNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
  coinObject,
}: MintCollectionInterface) => {
  try {
    const merkle_mint_script = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_from_merkle`,
      type_arguments: [coinObject],
      arguments: [candy_object, proof, mint_limit],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};

export const anotherCoinMerkleMintManyNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
  amount,
  coinObject,
}: MintCollectionInterface) => {
  try {
    const merkle_mint_script_many = {
      type: "entry_function_payload",
      function: `${candy_machine_id}::candymachine::mint_from_merkle_many`,
      type_arguments: [coinObject],
      arguments: [candy_object, proof, mint_limit, amount],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script_many);

    return res;
  } catch (error) {
    throw new Error("Could not Mint Nft");
  }
};
