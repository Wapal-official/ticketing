export interface InitAuctionV1 {
  creatorAddress: string;
  collectionName: string;
  tokenName: string;
  propertyVersion: number;
  startTime: Date;
  minimumBid: number;
  bidIncrement: number;
  auctionEndTime: Date;
  minimumBidTimeBeforeEnd: Date;
  coinType: string;
}

export interface InitAuctionV2 {
  tokenDataId: string;
  startTime: Date;
  minimumBid: number;
  bidIncrement: number;
  auctionEndTime: Date;
  minimumBidTimeBeforeEnd: Date;
  coinType: string;
}

export interface CreateAuction {
  token: AuctionToken;
  startAt: string;
  endAt: string;
  min_bid: number;
  id: string;
  auction_name: string;
  twitter: string;
  instagram: string;
  user_id: string;
  coin_type: string;
}

interface AuctionToken {
  tokenDataId: string;
  tokenStandard: string;
  propertyVersion: number;
  collectionName: string;
  collectionId: string;
  creatorAddress: string;
  meta: AuctionTokenMetadata;
}

interface AuctionTokenMetadata {
  name: string;
  description: string;
  image: string;
  animationUri: string;
}
