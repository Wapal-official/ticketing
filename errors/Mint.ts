export const handleMintError = ({
  error,
  candyMachine,
}: {
  error: any;
  candyMachine: string;
}) => {
  let errorMessage: string = "Could Not Mint Nft";

  console.log(error);

  switch (error.message) {
    case `Move abort in ${candyMachine}::candymachine: 0x9`:
      errorMessage = "Mint Limit Reached. Please Decrease Number of Nft";
      break;
    case `Move abort in ${candyMachine}::candymachine: 0xa`:
      errorMessage = "Invalid Proof. Please Try Again Later";
      break;
    case "Transaction Executed and Committed with Error EXECUTION_LIMIT_REACHED":
      errorMessage = "Could not mint Nfts. Please Decrease Number of Nfts";
      break;
    case "Move abort in 0x1::coin: EINSUFFICIENT_BALANCE(0x10006): Not enough coins to complete transaction":
      errorMessage = "Insufficient Balance To Mint Nft";
      break;
    case "Transaction Executed and Committed with Error INSUFFICIENT_BALANCE_FOR_TRANSACTION_FEE":
      errorMessage = "Insufficient Gas Fees To Mint Nft";
      break;
    case "Invalid Proof":
      errorMessage = "Invalid Proof";
      break;
    default:
      errorMessage = "Could Not Mint Nft";
      break;
  }

  return new Error(errorMessage);
};
