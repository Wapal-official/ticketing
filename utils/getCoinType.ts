import aptDark from "@/assets/img/aptBlack.svg";
import aptWhite from "@/assets/img/apt.svg";
import seedzDark from "@/assets/img/seedz-dark.svg";
import seedzWhite from "@/assets/img/seedz-white.svg";
export const getCoinType = (coinType: string) => {
  const coinTypeObject = {
    coinType: "APT",
    imageDark: aptDark,
    imageWhite: aptWhite,
    candy_id: process.env.CANDY_MACHINE_ID_V1,
  };

  switch (coinType.toUpperCase()) {
    case "APT":
      break;
    case "SEEDZ":
      coinTypeObject.coinType = "SEEDZ";
      coinTypeObject.imageDark = seedzDark;
      coinTypeObject.imageWhite = seedzWhite;
      coinTypeObject.candy_id = process.env.SEEDZ_CANDY_MACHINE;
      break;
    default:
      break;
  }

  return coinTypeObject;
};

export const getAvailableCoinTypes = () => {
  return ["APT", "SEEDZ"];
};
