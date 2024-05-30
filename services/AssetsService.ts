import { creatorStudioRequest } from "@/services/CreatorStudioInterceptor";

export const getAllFolder = async (userId: string) => {
  const res = await creatorStudioRequest.get("/api/folder/all", {
    params: {
      user_id: userId,
      limit: "100",
      page: "1",
    },
  });
  return res;
};

export const createFolder = async (folder: any) => {
  const res = await creatorStudioRequest.post(`/api/folder/create`, folder);

  return res;
};

export const updateFolder = async (folder: any) => {
  const res = await creatorStudioRequest.patch(`/api/folder/${folder._id}`, {
    folder_name: folder.folder_name,
  });
  return res;
};

export const deleteFolder = async (folder: any) => {
  const res = await creatorStudioRequest.delete(`/api/folder/${folder._id}`);

  return res;
};

export const getFolderById = async (folderId: string) => {
  const res = await creatorStudioRequest.get(`/api/folder/${folderId}`);

  return res;
};

export const singleFileUpload = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await creatorStudioRequest.post(
    `/api/uploader/singleupload`,
    formData,
    config
  );

  return res;
};

export const folderUpload = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await creatorStudioRequest.post(
    `/api/uploader/folderupload`,
    formData,
    config
  );

  return res;
};

export const getPrice = async () => {
  const res = await creatorStudioRequest.get(`/api/uploader/fund`);

  return res;
};

export const deleteFolderOnServer = async (userId: string) => {
  const res = await creatorStudioRequest.get(`/api/folder/check?id=${userId}`);

  return res;
};

export const uploadMetadataCSV = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await creatorStudioRequest.post(
    `/api/uploader/metadata`,
    formData,
    config
  );

  return res;
};

export const addMetadata = async ({
  folder_id,
  folder_name,
  user_id,
  nftId,
  metadata,
}: {
  folder_id: string;
  folder_name: string;
  user_id: string;
  nftId: number;
  metadata: any;
}) => {
  const res = await creatorStudioRequest.post(`/api/folder/trait`, {
    folder_id,
    folder_name,
    user_id,
    nftId,
    metadata,
  });

  return res;
};

export const editMetadata = async ({
  folder_id,
  folder_name,
  user_id,
  nftId,
  metadata,
}: {
  folder_id: string;
  folder_name: string;
  user_id: string;
  nftId: number;
  metadata: any;
}) => {
  const res = await creatorStudioRequest.patch(`/api/folder/trait/${nftId}`, {
    folder_id,
    folder_name,
    user_id,
    nftId,
    metadata,
  });

  return res;
};

export const addMultipleMetadata = async ({
  folder_name,
  nftIdFrom,
  nftIdTo,
  attributes,
}: {
  folder_name: string;
  nftIdFrom: number;
  nftIdTo: number;
  attributes: any;
}) => {
  const res = await creatorStudioRequest.post(`/api/folder/trait/addMetadata`, {
    folder_name: folder_name,
    nftIdFrom: nftIdFrom,
    nftIdTo: nftIdTo,
    attributes: attributes,
  });

  return res;
};

export const generateMetadataFolderInServer = async ({
  folder_name,
  collectionName,
  description,
}: {
  folder_name: string;
  collectionName: string;
  description: string;
}) => {
  const res = await creatorStudioRequest.post(`/api/folder/trait/genmetadata`, {
    folder_name,
    collectionName: collectionName,
    description: description,
  });

  return res;
};

export const getTraitsOfAsset = async ({ folderId }: { folderId: string }) => {
  const res = await creatorStudioRequest.get(`/api/folder/trait`, {
    params: { folder_id: folderId },
  });

  const data = res.data.data;

  return data;
};
