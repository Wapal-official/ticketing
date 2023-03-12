import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

export default ({ store }: { store: any }) => {
  createPersistedState({
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) =>
        Cookies.set(key, value, {
          expires: new Date(new Date().getTime() + 1000 * 3600 * 24),
        }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store);
};
