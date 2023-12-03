import { publicRequest } from "./fetcher";

export const getAllFolder = async (userId: string) => {
  const res = await publicRequest.get("/api/folder/all", {
    params: {
      user_id: userId,
      limit: "100",
      page: "1",
    },
  });
  return res;
};

export const createFolder = async (folder: any) => {
  const res = await publicRequest.post(`/api/folder/create`, folder);

  return res;
};

export const updateFolder = async (folder: any) => {
  const res = await publicRequest.patch(`/api/folder/${folder._id}`, {
    folder_name: folder.folder_name,
  });
  return res;
};

export const deleteFolder = async (folder: any) => {
  const res = await publicRequest.delete(`/api/folder/${folder._id}`);

  return res;
};

export const getFolderById = async (folderId: string) => {
  const res = await publicRequest.get(`/api/folder/${folderId}`);

  return res;
};

export const singleFileUpload = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await publicRequest.post(
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

  const res = await publicRequest.post(
    `/api/uploader/folderupload`,
    formData,
    config
  );

  return res;
};

export const getPrice = async () => {
  const res = await publicRequest.get(`/api/uploader/fund`);

  return res;
};

export const deleteFolderOnServer = async (userId: string) => {
  const res = await publicRequest.get(`/api/folder/check?id=${userId}`);

  return res;
};

export const uploadMetadataCSV = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await publicRequest.post(
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
  const res = await publicRequest.post(`/api/folder/trait`, {
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
  const res = await publicRequest.patch(`/api/folder/trait/${nftId}`, {
    folder_id,
    folder_name,
    user_id,
    nftId,
    metadata,
  });

  return res;
};

export const generateMetadataFolderInServer = async ({
  folder_name,
}: {
  folder_name: string;
}) => {
  const res = await publicRequest.post(`/api/folder/trait/genmetadata`, {
    folder_name,
  });

  return res;
};
