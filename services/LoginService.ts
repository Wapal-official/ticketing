import axios from "axios";

export const login = async (body: any) => {
  const res = await axios.post(
    `${process.env.CREATOR_STUDIO_API}/api/auth/login`,
    body
  );

  return res;
};

export const register = async (walletAddress: string) => {
  const res = await axios.post(`${process.env.baseURL}/api/auth/register`, {
    wallet_address: walletAddress,
  });

  return res;
};
