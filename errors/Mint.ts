export const handleMintError = ({
  error,
  candyMachine,
}: {
  error: any;
  candyMachine: string;
}) => {
  let errorMessage: string = "Could Not Mint Nft";

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
    default:
      errorMessage = "Could Not Mint Nft";
      break;
  }

  return new Error(errorMessage);
};
