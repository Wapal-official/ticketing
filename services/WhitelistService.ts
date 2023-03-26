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

export const getWhitelistById = async (whitelistId: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/${whitelistId}`
  );

  return res;
};

export const createWhitelistEntry = async (whitelistDetails: any) => {
  const res = await axios.post(
    `${process.env.baseURL}/api/whitelist/entry`,
    whitelistDetails
  );

  return res;
};

export const uploadCSVInWhitelistEntry = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await axios.post(
    `${process.env.baseURL}/api/uploader/csv`,
    formData,
    config
  );

  return res;
};

export const getWhitelistEntryById = async (whitelist_id: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/entry?page=1&limit=500`,
    {
      params: { whitelist_id: whitelist_id },
    }
  );

  return res;
};

export const setRoot = async (rootData: any) => {
  const res = await axios.post(
    `${process.env.baseURL}/api/whitelist/root`,
    rootData
  );

  return res;
};
