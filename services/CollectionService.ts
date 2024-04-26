import axios from "axios";

import { publicRequest } from "@/services/fetcher";
import { creatorStudioRequest } from "@/services/CreatorStudioInterceptor";
import { getCachedUrlOfImage } from "@/utils/imageCache";

const filterApprovedCollections = (collections: any[]) => {
  const tempCollections = collections.filter((collection: any) => {
    return collection.isApproved;
  });

  return tempCollections;
};

export const getCollections = async (page: number, limit: number) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/approved?page=${page}&limit=${limit}`
  );

  const collections = res.data.data;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const getCollection = async (collectionId: string) => {
  const res = await publicRequest.get(`/api/collection/${collectionId}`);

  const collection = res.data.collection[0];

  collection.image = getCachedUrlOfImage(collection.image);

  return collection;
};

export const getCollectionInCreatorStudio = async (collectionId: string) => {
  const res = await creatorStudioRequest.get(`/api/collection/${collectionId}`);

  const collection = res.data.collection[0];

  collection.image = getCachedUrlOfImage(collection.image);

  return collection;
};

export const createCollection = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await creatorStudioRequest.post(
    `/api/collection/create/`,
    formData,
    config
  );

  return res;
};

export const getCollectionsOfUser = async (userId: string) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/user?page=1&limit=20&user_id=${userId}`
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

  const collection = res.data.collection[0];

  collection.image = getCachedUrlOfImage(collection.image);

  return collection;
};

export const getCollectionByUsernameInCreatorStudio = async (
  username: string
) => {
  const res = await creatorStudioRequest.get(
    `/api/collection/username/${username}`
  );

  const collection = res.data.collection[0];

  collection.image = getCachedUrlOfImage(collection.image);

  return collection;
};

export const getFeaturedCollection = async () => {
  const res = await axios.get(`${process.env.baseURL}/api/collection/featured`);

  const collections = res.data.collection;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const getLiveCollections = async (page: number, limit: number) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/live?page=${page}&limit=${limit}`
  );

  const collections = res.data.data;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const getUpcomingCollections = async (page: number, limit: number) => {
  const res = await axios.get(
    `${process.env.baseURL}/api/collection/upcoming?page=${page}&limit=${limit}`
  );

  const collections = res.data.data;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const createDraft = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await creatorStudioRequest.post(`/api/draft/`, formData, config);

  return res;
};

export const getDraftById = async (draftId: any) => {
  const res = await publicRequest.get(`/api/draft/${draftId}`);

  return res;
};

export const getApprovedCollectionsOfUser = async (
  userId: string,
  page: number
) => {
  const res = await creatorStudioRequest.get(
    `/api/collection/approved?user_id=${userId}&limit=10&page=${page}`
  );

  const collections = res.data.data;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const getUnderReviewCollectionsOfUser = async (
  userId: string,
  page: number
) => {
  const res = await creatorStudioRequest.get(
    `/api/collection/under-review?user_id=${userId}&limit=10&page=${page}`
  );

  const collections = res.data.data;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const getDraftsOfUser = async (page: number) => {
  const res = await creatorStudioRequest.get(
    `/api/draft?limit=10&page=${page}`
  );

  const collections = res.data.data;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const getOwnedCollectionOfUser = async (
  owner_address: string,
  collection_name: string
) => {
  const res = await axios.post(`${process.env.GRAPHQL_URL}`, {
    operationName: "SingleCollectionOfUser",
    query: `
    query SingleCollectionOfUser {
      current_collection_ownership_v2_view(
        distinct_on: collection_id
        limit: 1
        where: {owner_address: {_eq: "${owner_address}"}, collection_name: {_eq: "${collection_name}"}}
      ) {
        distinct_tokens
      }
    }
    `,
  });

  const data = res.data.data.current_collection_ownership_v2_view;

  if (data[0]) {
    return data[0].distinct_tokens;
  }

  return 0;
};

export const sortPhases = (phases: any[]) => {
  const sortedPhases = phases.sort((firstPhase: any, secondPhase: any): any => {
    return (
      new Date(firstPhase.mint_time).getTime() -
      new Date(secondPhase.mint_time).getTime()
    );
  });

  return sortedPhases;
};

export const getApprovedDrafts = async (page: number, limit: number) => {
  const res = await publicRequest.get(
    `/api/draft/approved?limit=${limit}&page=${page}`
  );

  const collections = res.data.data;

  collections.map((collection: any) => {
    collection.image = getCachedUrlOfImage(collection.image);
  });

  return collections;
};

export const editDraft = async (draftId: string, data: any) => {
  const res = await publicRequest.patch(`/api/draft/${draftId}`, {
    data: data,
  });

  return res;
};

export const editImage = async (draftId: string, data: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await publicRequest.patch(
    `/api/draft/image/${draftId}`,
    data,
    config
  );

  return res;
};

export const updateCollection = async (collectionId: string, data: any) => {
  const now = new Date().toISOString();
  const res = await creatorStudioRequest.patch(
    `/api/collection/${collectionId}`,
    { ...data, updated_at: now }
  );

  return res;
};

export const getMetadataFromTokenURI = async (URI: string) => {
  try {
    const res = await axios.get(URI);

    return res.data;
  } catch (error) {
    return null;
  }
};
