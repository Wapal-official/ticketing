import CreatorDetail from "@/interfaces/creatorDetail";

import axios from "axios";
export default {
  async signup(creatorDetail: CreatorDetail) {
    const res = axios.post(`${process.env.baseURL}/user`, creatorDetail);
    return res;
  },
};
