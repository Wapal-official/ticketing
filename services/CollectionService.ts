import axios from "axios";

import { publicRequest } from "./fetcher";

export const getCollections = async () => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/all?page=1&limit=100`
  );
  return res.data.data;
};

export const getCollection = async (collectionId: string) => {
  const res = await publicRequest.get(`/api/collection/${collectionId}`);
  return res.data;
};

export const createCollection = async (collection: any) => {
  const res = await publicRequest.post(`/api/collection/create/`, collection);
  return res;
};

export const getCollectionsOfUser = async (userId: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/user?page=1&limit=100&user_id=${userId}`
  );

  return res;
};
