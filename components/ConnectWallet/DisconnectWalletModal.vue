<template>
  <div
    class="tw-bg-dark-8 tw-px-8 tw-py-4 tw-text-wapal-gray tw-text-center tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6"
  >
    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
      <button class="tw-text-dark-0 tw-text-base" @click="close">
        <i class="bx bx-x tw-text-xl"></i>
      </button>
    </div>
    <div class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4">
      <img
        :src="currentWallet.icon"
        :alt="walletStore.wallet"
        class="tw-w-12 tw-h-12"
      />
      <div class="tw-text-sm tw-text-dark-0 md:tw-text-lg">
        Wallet Currently Connected
      </div>
    </div>
    <button-primary title="Disconnect Wallet" @click="disconnectWallet" />
  </div>
</template>

<script lang="ts">
import bloctoIcon from "@/assets/img/blocto-icon-svg.svg";
export default {
  data() {
    return {
      bloctoIcon,
    };
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    disconnectWallet() {
      this.$store.dispatch("walletStore/disconnectWallet");
      this.$store.dispatch("userStore/disconnectUser");
      this.$emit("walletDisconnected");
    },
  },
  computed: {
    walletStore() {
      return this.$store.state.walletStore.wallet;
    },
    currentWallet() {
      const wallets: any = this.$store.getters["walletStore/getWalletsDetail"];
      const wallet = wallets.find(
        (wallet: any) => wallet.name === this.walletStore.wallet
      );
      if (!wallet) {
        return wallets[0];
      }

      if (wallet.name === "Blocto") {
        wallet.icon = this.bloctoIcon;
      }

      return wallet;
    },
  },
};
</script>
