import axios from "axios";

let BASE_URL = process.env.CREATOR_STUDIO_API;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

publicRequest.interceptors.request.use(function (config) {
  if (process.browser) {
    const TOKEN = window.$nuxt.$store.state.userStore.user.token;

    if (TOKEN) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: TOKEN,
        },
      };
    }
  }

  return config;
});

export { BASE_URL };
