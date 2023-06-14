import axios from "axios";

const envInterceptor = axios.create({
  baseURL: "https://staging.wapal.io",
});

export default envInterceptor;
