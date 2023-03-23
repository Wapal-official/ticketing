import axios from "axios";

export const submitVerificationCode = async (body: any) => {
  const res = await axios.post(`${process.env.baseURL}/api/token/verify`, body);

  return res;
};

export const requestVerification = async (verificationDetails: any) => {
  const res = await axios.post(
    `${process.env.baseURL}/api/verification/create`,
    verificationDetails
  );

  return res;
};
