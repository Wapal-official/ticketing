import axios from "axios";

import { publicRequest } from "./fetcher";

const filterApprovedCollections = (collections: any[]) => {
  const tempCollections = collections.filter((collection: any) => {
    return collection.isApproved;
  });

  return tempCollections;
};

export const getCollections = async (page: number, limit: number) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/all?page=${page}&limit=${limit}`
  );

  const collections = res.data.data;

  const filteredCollections = filterApprovedCollections(collections);

  return [...filteredCollections];
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

export const searchCollection = async (query: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/search?page=1&limit=100&q=${query}`
  );

  return res;
};

export const setSoldOut = async (collectionId: string) => {
  const res = await axios.patch(
    `${process.env.baseURL}/api/collection/setsoldout`,
    { id: collectionId }
  );

  return res;
};

export const getCollectionByUsername = async (username: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/username/${username}`
  );

  return res;
};

export const getFeaturedCollection = async () => {
  const res = await axios.get(`${process.env.baseURL}/api/collection/featured`);

  return res;
};
