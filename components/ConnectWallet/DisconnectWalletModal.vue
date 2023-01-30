<template>
  <div
    class="tw-bg-modal-gray tw-px-8 tw-py-4 tw-text-wapal-gray tw-text-center"
  >
    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
      <button class="tw-text-black tw-text-base" @click="close">
        <v-icon class="!tw-text-black !tw-font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <div class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4">
      <img
        :src="currentWallet.icon"
        :alt="walletStore.wallet"
        class="tw-w-12 tw-h-12"
      />
      <p class="tw-text-sm md:tw-text-lg">Wallet Currently Connected</p>
    </div>
    <primary-button @click.native="disconnectWallet" class="tw-ml-4 tw-mt-2"
      >Disconnect Wallet
    </primary-button>
  </div>
</template>

<script lang="ts">
import PrimaryButton from "@/components/Button/PrimaryButton.vue";

export default {
  components: { PrimaryButton },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    disconnectWallet() {
      this.$store.dispatch("walletStore/disconnectWallet");
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

      return wallet;
    },
  },
};
</script>
