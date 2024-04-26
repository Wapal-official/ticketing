import { publicRequest } from "./fetcher";
import { creatorStudioRequest } from "@/services/CreatorStudioInterceptor";
import axios from "axios";

export const getAllWhitelist = async (page: number, limit: number) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/all?limit=${limit}&page=${page}`
  );

  return res;
};

export const getWhitelistOfUser = async (userId: string) => {
  const res = await creatorStudioRequest.get(
    `/api/whitelist/user?limit=20&page=1&user_id=${userId}`
  );

  return res;
};

export const createWhitelist = async (whitelist: any) => {
  const res = await creatorStudioRequest.post(
    "/api/whitelist/create",
    whitelist
  );

  return res;
};

export const getWhitelistById = async (whitelistId: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/${whitelistId}`
  );

  return res;
};

export const getWhitelistByIdInCreatorStudio = async (whitelistId: string) => {
  const res = await creatorStudioRequest.get(`/api/whitelist/${whitelistId}`);

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

  const res = await creatorStudioRequest.post(
    `/api/uploader/csv`,
    formData,
    config
  );

  return res;
};

export const deleteCSVInWhitelistEntry = async (
  collectionId: any,
  walletAddress: any,
  phase: any
) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const res = await creatorStudioRequest.delete(
    `/api/whitelist/entry?collection_id=${collectionId}&wallet_address=${walletAddress}&phase=${phase}`,
    config
  );

  return res;
};

export const searchWhitelistEntry = async (
  page: number,
  limit: number,
  q: string,
  collection_id: string,
  phaseName: string
) => {
  let entryLimit = limit;
  let entryPage = page;
  if (!limit) {
    entryLimit = 100;
  }

  if (!page) {
    entryPage = 1;
  }

  const res = await creatorStudioRequest.get(
    `/api/whitelist/find?page=${entryPage}}&limit=${entryLimit}&q=${q}&collection_id=${collection_id}&phase=${phaseName}`,
    {
      params: { collection_id: collection_id },
    }
  );

  return res;
};

export const getWhitelistEntryById = async (
  collection_id: string,
  limit: number,
  page: number,
  phaseName: string
) => {
  let entryLimit = limit;
  let entryPage = page;
  if (!limit) {
    entryLimit = 100;
  }

  if (!page) {
    entryPage = 1;
  }

  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/entry?phase=${phaseName}&limit=${entryLimit}&page=${entryPage}`,
    {
      params: { collection_id: collection_id },
    }
  );

  return res;
};

export const getWhitelistEntryByIdInCreatorStudio = async (
  collection_id: string,
  limit: number,
  page: number,
  phaseName: string
) => {
  let entryLimit = limit;
  let entryPage = page;
  if (!limit) {
    entryLimit = 100;
  }

  if (!page) {
    entryPage = 1;
  }

  const res = await creatorStudioRequest.get(
    `/api/whitelist/entry?phase=${phaseName}&limit=${entryLimit}&page=${entryPage}`,
    {
      params: { collection_id: collection_id },
    }
  );

  return res;
};

export const setRoot = async (rootData: any) => {
  const res = await creatorStudioRequest.post(`/api/whitelist/root`, rootData);

  return res;
};

export const getWhitelistByUsername = async (username: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/whitelist/${username}`
  );

  return res;
};

export const getWhitelistByUsernameInCreatorStudio = async (
  username: string
) => {
  const res = await creatorStudioRequest.get(`/api/whitelist/${username}`);

  return res;
};

export const getProof = async ({
  walletAddress,
  collectionId,
  phase,
}: {
  walletAddress: string;
  collectionId: string;
  phase: string;
}) => {
  const PROOF_API_URL = process.env.PROOF_API_URL;

  const res = await axios.get(
    `${PROOF_API_URL}/api/whitelist/proof?wallet_address=${walletAddress}&collection_id=${collectionId}&phase=${phase}`
  );

  return res;
};

export const getMintLimit = async ({
  walletAddress,
  collectionId,
  phase,
}: {
  walletAddress: string;
  collectionId: string;
  phase: string;
}) => {
  const res = await publicRequest.get(
    `/api/whitelist/mint_limit?wallet_address=${walletAddress}&collection_id=${collectionId}&phase=${phase}`
  );

  return res;
};
