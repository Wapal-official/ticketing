// import WalletAddress from "@/interfaces/walletAddress";
// export const actions = {
//   async nuxtServerInit({ commit }: { commit: any }, { req }: { req: any }) {
//     console.log(req);
//   },
// };

const parseCookies = (str: string) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc: any, v: any) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export const actions = {
  nuxtServerInit({ commit }: { commit: any }, { req }: { req: any }) {
    const cookieHeader = req.headers.cookie;

    const cookies = parseCookies(cookieHeader);

    const wallet = JSON.parse(cookies.wallet || "false");

    const user = JSON.parse(cookies.user || "false");

    commit("walletStore/setWallet", wallet ? wallet : {});
    commit("userStore/setUser", user ? user : {});
  },
};
