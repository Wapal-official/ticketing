import { publicRequest } from "./fetcher";
import axios from "axios";

export const getAllWhitelist = async () => {
  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/all?limit=100&page=1`
  );

  return res;
};

export const getWhitelistOfUser = async (userId: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/user?limit=100&page=1&user_id=${userId}`
  );

  return res;
};

export const createWhitelist = async (whitelist: any) => {
  const res = await publicRequest.post("/api/whitelist/create", whitelist);

  return res;
};
