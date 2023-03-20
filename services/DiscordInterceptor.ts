import axios from "axios";

let BASE_URL = "https://discord.com/api/v10/";

export const discordRequest = axios.create({
  baseURL: BASE_URL,
});

discordRequest.interceptors.request.use(function (config) {
  if (process.browser) {
    const TOKEN = window.$nuxt.$store.state.discordStore.token;

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
