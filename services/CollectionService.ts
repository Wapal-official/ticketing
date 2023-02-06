import axios from "axios";

export const getCollections = async () => {
  const res = await axios.get(`${process.env.baseURL}/api/collection/all`);
  return res.data.data;
};

export const getCollection = async (collectionId: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/${collectionId}`
  );
  return res.data;
};
