export default function ({ app, redirect }: { app: any; redirect: any }) {
  if (
    !app.$cookies.get("vuex") ||
    !app.$cookies.get("vuex").walletStore.wallet.wallet
  ) {
    return redirect("/");
  }
}
