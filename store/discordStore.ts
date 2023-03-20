export const state = () => {
  return {
    token: "",
  };
};

export const mutations = {
  setDiscordToken(state: any, token: string) {
    state.token = token;
  },
};

export const actions = {
  setDiscordToken({ commit }: { commit: any }, token: string) {
    commit("setDiscordToken", token);
  },
};
