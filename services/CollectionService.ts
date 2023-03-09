import axios from "axios";

import { publicRequest } from "./fetcher";

export const getCollections = async () => {
  const res = await axios.get(`${process.env.baseURL}/api/collection/all`);
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
