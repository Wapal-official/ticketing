<template>
  <div
    class="px-8 pb-8 flex flex-col items-center justify-center h-full w-full text-center text-wapal-gray"
  >
    <h2 class="text-3xl text-wapal-gray py-4 font-semibold">Wapal</h2>
    <p class="text-lg">Sign Up Early to get a chance for free promotion.</p>
  </div>
</template>

<script>
export default {
  middleware: ["signup"],
  data() {
    return {};
  },
  watch: {
    getWallet(wallet) {
      if (!wallet) {
        this.$router.push("/");
      }
    },
  },
  computed: {
    getWallet() {
      const wallet = this.$store.state.walletStore.wallet.wallet;

      return wallet;
    },
  },
};
</script>
