export default ({ app, store }: { app: any; store: any }, inject: any) => {
  inject("toast", {
    showMessage({ message = "", error = false }) {
      store.commit("toast/showToast", { message, error });
    },
  });
};
