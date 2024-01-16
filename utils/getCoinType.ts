import aptDark from "@/assets/img/aptBlack.svg";
import aptWhite from "@/assets/img/apt.svg";
import seedzDark from "@/assets/img/seedz-dark.svg";
import seedzWhite from "@/assets/img/seedz-white.svg";
import guiDark from "@/assets/img/gui-dark.png";
import guiWhite from "@/assets/img/gui-white.png";
import celestialWhite from "@/assets/img/celestial-white.png";

const APT_COIN_OBJECT = "0x1::aptos_coin::AptosCoin";
const GUI_COIN_OBJECT =
  "0xe4ccb6d39136469f376242c31b34d10515c8eaaa38092f804db8e08a8f53c5b2::assets_v1::EchoCoin002";
const SEEDZ_COIN_OBJECT =
  "0x5d410456c28307fd31439c1658b5e6b41f4ba868d63e03598c1ddb4a7b29449::asset::SeedzCoin";
const CELESTIAL_COIN_OBJECT =
  "0xe4ccb6d39136469f376242c31b34d10515c8eaaa38092f804db8e08a8f53c5b2::assets_v1::EchoCoin004";

export const getCoinType = (coinType: string) => {
  const coinTypeObject = {
    coinType: "APT",
    imageDark: aptDark,
    imageWhite: aptWhite,
    candy_id: process.env.CANDY_MACHINE_V2,
    coinObject: APT_COIN_OBJECT,
  };

  switch (coinType.toUpperCase()) {
    case "APT":
      break;
    case "SEEDZ":
      coinTypeObject.coinType = "SEEDZ";
      coinTypeObject.imageDark = seedzDark;
      coinTypeObject.imageWhite = seedzWhite;
      coinTypeObject.candy_id = process.env.SEEDZ_CANDY_MACHINE;
      coinTypeObject.coinObject = SEEDZ_COIN_OBJECT;
      break;
    case "GUI":
      coinTypeObject.coinType = "GUI";
      coinTypeObject.imageDark = guiDark;
      coinTypeObject.imageWhite = guiWhite;
      coinTypeObject.candy_id = process.env.GUI_CANDY_MACHINE;
      coinTypeObject.coinObject = GUI_COIN_OBJECT;
      break;
    case "CLST":
      coinTypeObject.coinType = "CLST";
      coinTypeObject.imageDark = celestialWhite;
      coinTypeObject.imageWhite = celestialWhite;
      coinTypeObject.candy_id = process.env.CELESTIAL_CANDY_MACHINE;
      coinTypeObject.coinObject = CELESTIAL_COIN_OBJECT;
      break;
    default:
      break;
  }

  return coinTypeObject;
};

export const getAvailableCoinTypes = () => {
  return ["APT", "GUI", "SEEDZ", "CLST"];
};

export const getAvailableCoinTypesForAuction = () => {
  return ["APT", "GUI"];
};
