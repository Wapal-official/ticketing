import axios from "axios";

export const aptToUsd = async () => {
  try {
    const usd = await axios.get(
      `${process.env.MARKETPLACE_API_URL}/utility/stats`
    );
    const value = usd.data.value.toFixed(2);

    console.log(value);

    return value;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export const arToUsd = async () => {
  try {
    const res = await axios.get(
      `https://api.diadata.org/v1/assetQuotation/Arweave/0x0000000000000000000000000000000000000000`
    );

    const value = res.data.Price.toFixed(2);
    return value;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
