import axios from "axios";

export const getAllFolder = async () => {
  const res = await axios.get("https://staging-api.wapal.io/api/folder/all", {
    params: {
      user_id: "63a2c4031fd037c1629eb63d",
      limit: "100",
      page: "1",
    },
  });
  return res;
};

export const createFolder = async (folder: any) => {
  const res = await axios.post(
    `${process.env.baseURL}/api/folder/create`,
    folder
  );

  return res;
};

export const updateFolder = async (folder: any) => {
  const res = await axios.patch(
    `${process.env.baseURL}/api/folder/${folder._id}`,
    { id: folder._id, folder_name: folder.folder_name }
  );

  return res;
};

export const deleteFolder = async (folder: any) => {
  const res = await axios.delete(
    `${process.env.baseURL}/api/folder/${folder._id}`
  );

  return res;
};

export const getFolderById = async (folderId: string) => {
  const res = await axios.get(`${process.env.baseURL}/api/folder/${folderId}`);

  return res;
};

export const singleFileUpload = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await axios.post(
    `${process.env.baseURL}/api/bundlr/singleupload`,
    formData,
    config
  );

  return res;
};

export const folderUpload = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const res = await axios.post(
    `${process.env.baseURL}/api/bundlr/folderupload`,
    formData,
    config
  );

  return res;
};

export const getPrice = async () => {
  const res = await axios.get(`${process.env.baseURL}/api/bundlr/fund`);

  return res;
};
