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
    localStorage.setItem(
      "discord",
      JSON.stringify({
        token: token,
        expiresIn: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7),
      })
    );
  },
};
