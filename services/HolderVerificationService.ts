import axios from "axios";
import { checkNetwork, makeId, wallet } from "@/store/walletStore";

const GRAPHQL_URL: string = process.env.GRAPHQL_URL
  ? process.env.GRAPHQL_URL
  : "";

const DISCORD_BOT_URL: string = process.env.DISCORD_BOT_URL
  ? process.env.DISCORD_BOT_URL
  : "";

let walletName: any = "";
if (process.client) {
  if (localStorage.getItem("wallet")) {
    const wallet = JSON.parse(localStorage.getItem("wallet")!);
    walletName = wallet.wallet;
  }
}

const checkWalletConnected = async () => {
  if (!wallet.isConnected()) {
    await wallet.connect(walletName);
  }
};

export const getHeldLooniesOfUser = async ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  try {
    const query = {
      operationName: "GetHeldLooniesOfUser",
      query: `query GetHeldLooniesOfUser($WALLET_ADDRESS:String) {
                    current_token_ownerships_v2_aggregate(
                    where: {amount: {_gt: "0"}, owner_address: {_eq: $WALLET_ADDRESS}, current_token_data: {collection_id: {_eq: "0xa2485c3b392d211770ed161e73a1097d21016c7dd41f53592434380b2aa14cba"}}}
                    ) {
                        aggregate {
                                count
                        }
                    }
                }`,
      variables: {
        WALLET_ADDRESS: walletAddress,
      },
    };

    const res = await axios.post(GRAPHQL_URL, query);

    const data = res.data.data;

    const heldTokens =
      data.current_token_ownerships_v2_aggregate.aggregate.count;

    return heldTokens;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const assignRole = async ({
  id,
  role_id,
}: {
  id: string;
  role_id: string;
}) => {
  const res = await axios.post(`${DISCORD_BOT_URL}/assign-role`, {
    id: id,
    role_id: role_id,
  });

  return res;
};

export const signVerificationMessage = async () => {
  await checkWalletConnected();

  checkNetwork();

  const message = "Loonies Holder Verification";
  const nonce = makeId(16);
  const signMessage = await wallet.signMessage({ message, nonce });

  return signMessage;
};
