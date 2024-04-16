import axios from "axios";

let CREATOR_STUDIO_API = process.env.CREATOR_STUDIO_API;

export const creatorStudioRequest = axios.create({
  baseURL: CREATOR_STUDIO_API,
});

creatorStudioRequest.interceptors.request.use(function (config) {
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

export { CREATOR_STUDIO_API };
