import Cookies from "js-cookie";

export const state = () => ({
  user: {
    user_id: "",
    token: "",
  },
});

export const mutations = {
  setUser(state: any, user: any) {
    state.user = user;
  },
};

export const actions = {
  setUser({ commit }: { commit: any }) {
    commit("setUser");
  },
  loginUser({ commit }: { commit: any }, user: any) {
    commit("setUser", {
      user_id: user.user_id,

      token: user.token,
    });

    Cookies.set(
      "user",
      JSON.stringify({
        user_id: user.user_id,

        token: user.token,
      }),
      {
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24),
      }
    );
  },
  disconnectUser({ commit }: { commit: any }, user: any) {
    commit("setUser", {
      user_id: "",

      token: "",
    });

    Cookies.set(
      "user",
      JSON.stringify({
        user_id: "",
        token: "",
      })
    );
  },
};
