import { publicRequest } from "./fetcher";

export const getCurrentBid = (auction: object) => {
    let bid = 0;
    console.log('auc:',auction)
    if (auction.biddings.length > 0) {
        bid = auction.biddings[0].bid;
    } else {
        bid = auction.min_bid;
    }
    return bid;
};

export const getHms=(seconds:any)=>{
    const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${hours}H ${minutes}M ${remainingSeconds}S`;
}