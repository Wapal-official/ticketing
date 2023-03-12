import axios from "axios";

export const login = async (body: any) => {
  const res = await axios.post(`${process.env.baseURL}/api/auth/login`, body);

  return res;
};
