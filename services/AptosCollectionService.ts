import { client, wallet, checkNetwork } from "@/store/walletStore";
import Cookies from "js-cookie";
import MintCollectionInterface from "@/interfaces/MintCollection";
import { getCoinType } from "@/utils/getCoinType";
import { convertPriceToSendInSmartContract } from "@/utils/price";
import { simulateTransaction } from "@/utils/simulateTransaction";
import { HexString, TypeTagParser } from "aptos";
import { handleMintError } from "~/errors/Mint";
import { InputGenerateTransactionData } from "@aptos-labs/wallet-adapter-core";
import {
  InputGenerateTransactionPayloadData,
  parseTypeTag,
} from "@aptos-labs/ts-sdk";

let walletName: any = "";
if (process.client) {
  if (localStorage.getItem("wallet")) {
    const wallet = JSON.parse(localStorage.getItem("wallet")!);
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

  const update_whitelist_sale_time_script: InputGenerateTransactionPayloadData =
    {
      function:
        `${candy_machine_id}::candymachine::update_wl_sale_time` as `${string}::${string}::${string}`,
      functionArguments: [candy_object, pre_sale_seconds],
      typeArguments: [],
    };

  const transaction = await wallet.signAndSubmitTransaction({
    data: update_whitelist_sale_time_script,
  });

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

  const update_public_sale_time_script: InputGenerateTransactionPayloadData = {
    function:
      `${candy_machine_id}::candymachine::update_public_sale_time` as `${string}::${string}::${string}`,
    functionArguments: [candy_object, public_sale_seconds],
    typeArguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction({
    data: update_public_sale_time_script,
  });

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
  coinType,
}: {
  candy_object: string;
  public_sale_price: number;
  candy_machine_id: string;
  coinType: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const converted_public_sale_price = convertPriceToSendInSmartContract({
    price: public_sale_price,
    isConverted: false,
    coinType: coinType,
  });

  const update_public_sale_price_script: InputGenerateTransactionPayloadData = {
    function:
      `${candy_machine_id}::candymachine::update_public_sale_price` as `${string}::${string}::${string}`,
    functionArguments: [candy_object, converted_public_sale_price],
    typeArguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction({
    data: update_public_sale_price_script,
  });

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
  coinType,
}: {
  candy_object: string;
  pre_sale_price: number;
  candy_machine_id: string;
  coinType: string;
}) => {
  await checkWalletConnected();
  checkNetwork();

  const converted_whitelist_sale_price = convertPriceToSendInSmartContract({
    price: pre_sale_price,
    isConverted: false,
    coinType: coinType,
  });

  const update_pre_sale_price_script: InputGenerateTransactionPayloadData = {
    function:
      `${candy_machine_id}::candymachine::update_wl_sale_price` as `${string}::${string}::${string}`,
    functionArguments: [candy_object, converted_whitelist_sale_price],
    typeArguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction({
    data: update_pre_sale_price_script,
  });

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

  const update_total_supply_script: InputGenerateTransactionPayloadData = {
    function:
      `${candy_machine_id}::candymachine::update_total_supply` as `${string}::${string}::${string}`,
    functionArguments: [candy_object, total_supply],
    typeArguments: [],
  };

  const transaction = await wallet.signAndSubmitTransaction({
    data: update_total_supply_script,
  });

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
  sender,
}: MintCollectionInterface) => {
  await checkWalletConnected();
  checkNetwork();

  if (publicMint) {
    if (amount == 1) {
      const res = await mintSingleNft({
        candy_machine_id,
        candy_object,
        sender,
      });

      return res;
    } else {
      const res = await mintManyNft({
        candy_machine_id,
        candy_object,
        amount,
        sender,
      });
      return res;
    }
  } else {
    if (amount == 1) {
      const res = await merkleMintSingleNft({
        candy_machine_id,
        candy_object,
        proof,
        mint_limit,
        sender,
      });

      return res;
    } else {
      const res = await merkleMintManyNft({
        candy_machine_id,
        candy_object,
        proof,
        mint_limit,
        amount,
        sender,
      });

      return res;
    }
  }
};

export const mintSingleNft = async ({
  candy_machine_id,
  candy_object,
  sender,
}: MintCollectionInterface) => {
  try {
    const mint_script: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_script` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [candy_object],
    };

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: mint_script,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const res = await executeTransactionAndGiveResult(mint_script);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};

export const mintManyNft = async ({
  candy_machine_id,
  candy_object,
  amount,
  sender,
}: MintCollectionInterface) => {
  try {
    const mint_script_many: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_script_many` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [candy_object, amount?.toString()],
    };

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: mint_script_many,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const res = await executeTransactionAndGiveResult(mint_script_many);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};

export const merkleMintSingleNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
  sender,
}: MintCollectionInterface) => {
  try {
    const proofsAsHex = proof?.map((tempProof) => {
      // Convert proof into Buffer
      const proofBuffer = Buffer.from(tempProof);

      //Convert proof from buffer to hex
      const proofAsHex = HexString.fromBuffer(proofBuffer);

      return proofAsHex.hex();
    });

    const simulateMintLimit = mint_limit?.toString();

    const merkle_mint_simulate_script = {
      type: "entry_function_payload",
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle` as `${string}::${string}::${string}`,
      type_arguments: [],
      arguments: [candy_object, proofsAsHex, simulateMintLimit],
    };

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: merkle_mint_simulate_script,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const merkle_mint_script: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [candy_object, proof, mint_limit],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};

export const merkleMintManyNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
  amount,
  sender,
}: MintCollectionInterface) => {
  try {
    const proofsAsHex = proof?.map((tempProof) => {
      // Convert proof into Buffer
      const proofBuffer = Buffer.from(tempProof);

      //Convert proof from buffer to hex
      const proofAsHex = HexString.fromBuffer(proofBuffer);

      return proofAsHex.hex();
    });

    const simulateMintLimit = mint_limit?.toString();
    const simulateAmount = amount?.toString();

    const merkle_mint_many_simulate_script = {
      type: "entry_function_payload",
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle_many` as `${string}::${string}::${string}`,
      type_arguments: [],
      arguments: [candy_object, proofsAsHex, simulateMintLimit, simulateAmount],
    };

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: merkle_mint_many_simulate_script,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const merkle_mint_script_many: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle_many` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [candy_object, proof, mint_limit, amount],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script_many);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};

export const executeTransactionAndGiveResult = async (
  payload: InputGenerateTransactionPayloadData
) => {
  const transaction = await wallet.signAndSubmitTransaction({ data: payload });

  const result = await client.waitForTransactionWithResult(transaction.hash);

  return result;
};

export const executeSmartContract = async (
  initParams: InputGenerateTransactionPayloadData
) => {
  const transaction = await wallet.signAndSubmitTransaction({
    data: initParams,
  });

  const result = await client.waitForTransactionWithResult(transaction.hash);

  return result;
};

export const createCollectionV2 = async (candyMachineArguments: any) => {
  checkWalletConnected();

  checkNetwork();

  const coinTypeObject = getCoinType(candyMachineArguments.coinType);

  let programId = coinTypeObject.candy_id;

  if (candyMachineArguments.isRandom) {
    programId = coinTypeObject.candy_id;
  } else {
    programId = process.env.NON_RANDOM_CANDY_MACHINE;
  }

  const isOpenEdition = candyMachineArguments.is_open_edition
    ? candyMachineArguments.is_open_edition
    : false;

  const pre_sale_price = convertPriceToSendInSmartContract({
    price: candyMachineArguments.presale_mint_price,
    isConverted: true,
    coinType: candyMachineArguments.coinType,
  });

  const public_sale_price = convertPriceToSendInSmartContract({
    price: candyMachineArguments.public_sale_mint_price,
    isConverted: true,
    coinType: candyMachineArguments.coinType,
  });

  const create_candy_machine: InputGenerateTransactionPayloadData = {
    function:
      `${programId}::candymachine::init_candy` as `${string}::${string}::${string}`,
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
      pre_sale_price,
      public_sale_price,
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

  const pause_resume_script: InputGenerateTransactionPayloadData = {
    function:
      `${candy_machine_id}::candymachine::pause_resume_mint` as `${string}::${string}::${string}`,
    functionArguments: [candy_object],
    typeArguments: [],
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
  sender,
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
        sender,
      });

      return res;
    } else {
      const res = await anotherCoinMintManyNft({
        candy_machine_id,
        candy_object,
        amount,
        coinObject,
        sender,
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
        sender,
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
        sender,
      });

      return res;
    }
  }
};

export const anotherCoinMintSingleNft = async ({
  candy_machine_id,
  candy_object,
  coinObject,
  sender,
}: MintCollectionInterface) => {
  try {
    const coinType = parseTypeTag(coinObject ? coinObject : "");
    const mint_script: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_script` as `${string}::${string}::${string}`,
      typeArguments: [coinType],
      functionArguments: [candy_object],
    };

    if (
      candy_machine_id ===
      "0xc777f5f82a2773d6e6f9c2e91306fc9c099a57747f64d86c59cf0acab706fd44"
    ) {
      mint_script.typeArguments = [];
    }

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: mint_script,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const res = await executeTransactionAndGiveResult(mint_script);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};

export const anotherCoinMintManyNft = async ({
  candy_machine_id,
  candy_object,
  amount,
  coinObject,
  sender,
}: MintCollectionInterface) => {
  try {
    const coinType = parseTypeTag(coinObject ? coinObject : "");

    const mint_script_many: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_script_many` as `${string}::${string}::${string}`,
      typeArguments: [coinType],
      functionArguments: [candy_object, amount?.toString()],
    };

    if (
      candy_machine_id ===
      "0xc777f5f82a2773d6e6f9c2e91306fc9c099a57747f64d86c59cf0acab706fd44"
    ) {
      mint_script_many.typeArguments = [];
    }

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: mint_script_many,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const res = await executeTransactionAndGiveResult(mint_script_many);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};

export const anotherCoinMerkleMintSingleNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
  coinObject,
  sender,
}: MintCollectionInterface) => {
  try {
    const proofsAsHex = proof?.map((tempProof) => {
      // Convert proof into Buffer
      const proofBuffer = Buffer.from(tempProof);

      //Convert proof from buffer to hex
      const proofAsHex = HexString.fromBuffer(proofBuffer);

      return proofAsHex.hex();
    });

    const simulateMintLimit = mint_limit?.toString();

    const coinType = parseTypeTag(coinObject ? coinObject : "");

    const merkle_mint_simulate_script: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle_many` as `${string}::${string}::${string}`,
      typeArguments: [coinType],
      functionArguments: [candy_object, proofsAsHex, simulateMintLimit],
    };

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: merkle_mint_simulate_script,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const merkle_mint_script: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle` as `${string}::${string}::${string}`,
      typeArguments: [coinType],
      functionArguments: [candy_object, proof, mint_limit],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};

export const anotherCoinMerkleMintManyNft = async ({
  candy_machine_id,
  candy_object,
  proof,
  mint_limit,
  amount,
  coinObject,
  sender,
}: MintCollectionInterface) => {
  try {
    const proofsAsHex = proof?.map((tempProof) => {
      // Convert proof into Buffer
      const proofBuffer = Buffer.from(tempProof);

      //Convert proof from buffer to hex
      const proofAsHex = HexString.fromBuffer(proofBuffer);

      return proofAsHex.hex();
    });

    const simulateMintLimit = mint_limit?.toString();
    const simulateAmount = amount?.toString();

    const merkle_mint_many_simulate_script = {
      type: "entry_function_payload",
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle_many` as `${string}::${string}::${string}`,
      type_arguments: [],
      arguments: [candy_object, proofsAsHex, simulateMintLimit, simulateAmount],
    };

    const simulateRes = await simulateTransaction({
      sender: sender,
      transactionPayload: merkle_mint_many_simulate_script,
    });

    if (simulateRes.error) {
      throw new Error(simulateRes.message);
    }

    const coinType = parseTypeTag(coinObject ? coinObject : "");

    const merkle_mint_script_many: InputGenerateTransactionPayloadData = {
      function:
        `${candy_machine_id}::candymachine::mint_from_merkle_many` as `${string}::${string}::${string}`,
      typeArguments: [coinType],
      functionArguments: [candy_object, proof, mint_limit, amount],
    };

    const res = await executeTransactionAndGiveResult(merkle_mint_script_many);

    return res;
  } catch (error) {
    throw handleMintError({ error: error, candyMachine: candy_machine_id });
  }
};
