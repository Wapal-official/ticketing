import Cookies from "js-cookie";
export const state = () => ({
  discord: {
    token: "",
  },
});

export const mutations = {
  setDiscordToken(state: any, token: string) {
    state.discord = token;
  },
};

export const actions = {
  setDiscordToken({ commit }: { commit: any }, token: string) {
    commit("setDiscordToken", { token: token });
    Cookies.set(
      "discord",
      JSON.stringify({
        token: token,
      }),
      {
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7),
      }
    );
  },
};
