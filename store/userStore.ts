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
  setUser({ commit }: { commit: any }, user: any) {
    commit("setUser", user);
  },
  loginUser({ commit }: { commit: any }, user: any) {
    commit("setUser", {
      user_id: user.user_id,

      token: user.token,
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        user_id: user.user_id,
        token: user.token,
        expiresIn: new Date(new Date().getTime() + 1000 * 3600 * 24),
      })
    );
  },
  disconnectUser({ commit }: { commit: any }) {
    commit("setUser", {
      user_id: "",

      token: "",
    });

    localStorage.removeItem("user");
  },
};
