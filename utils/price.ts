export const convertPriceToSendInSmartContract = ({
  price,
  isConverted,
  coinType,
}: {
  price: number;
  isConverted: boolean;
  coinType: string;
}) => {
  let convertedPrice = 0;

  switch (coinType.toUpperCase()) {
    case "APT":
      if (isConverted) {
        convertedPrice = price;
      } else {
        convertedPrice = parseFloat((price * Math.pow(10, 8)).toFixed(4));
      }
      break;
    case "SEEDZ":
      if (isConverted) {
        convertedPrice = price;
      } else {
        convertedPrice = parseFloat((price * Math.pow(10, 8)).toFixed(4));
      }
      break;
    case "GUI":
      if (isConverted) {
        convertedPrice = price / Math.pow(10, 8);
        convertedPrice = parseFloat(
          (convertedPrice * Math.pow(10, 6)).toFixed(4)
        );
      } else {
        convertedPrice = parseFloat((price * Math.pow(10, 6)).toFixed(4));
      }
      break;
    case "SHRIMP":
      if (isConverted) {
        convertedPrice = price / Math.pow(10, 8);
        convertedPrice = parseFloat(
          (convertedPrice * Math.pow(10, 2)).toFixed(4)
        );
      } else {
        convertedPrice = parseFloat((price * Math.pow(10, 2)).toFixed(4));
      }
      break;
    default:
      if (isConverted) {
        convertedPrice = price;
      } else {
        convertedPrice = parseFloat((price * Math.pow(10, 8)).toFixed(4));
      }
      break;
  }

  return convertedPrice;
};
