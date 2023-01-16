export default function ({ store, redirect }: { store: any; redirect: any }) {
  if (!store.state.walletStore.wallet.wallet) {
    return redirect("/");
  }
}
