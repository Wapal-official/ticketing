import { publicRequest } from "./fetcher";
import axios from "axios";

export const getTotalCollections = async ( ) => {
    const res = await axios.get(
      `${process.env.baseURL}/api/collection/stats`
    );
  
    const collections = res.data.data;
 
    return collections;
  };

  export const getTotalAuctions = async ( ) => {
    const res = await axios.get(
      `${process.env.baseURL}/api/auction/stats`
    );
    const auctions = res.data.data;
 
    return auctions;
  };

  export const getTotalusers = async ( ) => {
    const res = await axios.get(
      `${process.env.baseURL}/api/auth/stats`
    );
    const users = res.data.data;
 
    return users;
  };