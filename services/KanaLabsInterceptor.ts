import axios from "axios";
let BASE_URL = "https://paymaster.kanalabs.io";
const PROJECT_KEY = process.env.KANA_LABS_PROJECT_KEY;
export const kanaLabsRequest = axios.create({
  baseURL: BASE_URL,
});

kanaLabsRequest.interceptors.request.use(function (config) {
  if (process.browser) {
    return {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
        "api-key": PROJECT_KEY,
      },
    };
  }

  return config;
});
