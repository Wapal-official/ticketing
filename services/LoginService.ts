import axios from "axios";

export const login = async (body: any) => {
  const res = axios.post(`${process.env.baseURL}/login`, body);

  console.log(res);
  return res;
};
