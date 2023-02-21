import axios from "axios";

// export const createFolder = async (formData: FormData) => {
//   const config = {
//     headers: { "content-type": "multipart/form-data" },
//   };

//   console.log(formData);

//   const res = await axios.post(
//     `${process.env.baseURL}/api/folder/create`,
//     formData,
//     config
//   );

//   console.log(res);
//   return res;
// };

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
