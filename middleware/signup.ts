export default function ({ app, redirect }: { app: any; redirect: any }) {
  if (!app.$cookies.get("wallet").wallet || !app.$cookies.get("user").token) {
    return redirect("/");
  }
}
