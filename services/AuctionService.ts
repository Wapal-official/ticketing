import { publicRequest } from "./fetcher";

export const getCurrentBid = (auction: object) => {
    let bid = 0;
    console.log('auc:', auction)
    if (auction.biddings.length > 0) {
        bid = auction.biddings[0].bid;
    } else {
        bid = auction.min_bid;
    }
    return bid;
};

export const getHms = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}H ${minutes}M ${remainingSeconds}S`;
}

export const getAuctions = async (params: any) => {
    const auctions = await publicRequest
        .get("/api/auction", {
            params: {
                page: params.page,
                perPage: params.perPage
            }
        }).then(res => {
            return res.data.auctions
        })
    return auctions
}

export const fetchWalletNfts = async (params: any) => {
    let resp = await publicRequest.post(
        "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql",
        {
            operationName: "AccountTokensData",
            query:
                `query AccountTokensData {
          current_token_ownerships(
            limit: `+ params.limit + `
            offset:` +
                params.offset +
                `
            where: {owner_address: {_eq: "` +
                params.walletAddress +
                `"}}
            ) {
              owner_address
              property_version
              amount
            current_token_data {
              name
              metadata_uri
              description
              collection_name
              creator_address
              token_data_id_hash
            }
          }
        }`,
            variables: null,
        }
    )
    return resp.data
}