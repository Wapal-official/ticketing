<template>
  <div class="bg-modal-gray px-8 py-4 text-wapal-gray text-center">
    <div class="w-full flex flex-row items-center justify-end">
      <button class="text-black text-base" @click="close">
        <v-icon class="!text-black !font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <div class="flex flex-row items-center justify-start gap-4">
      <img
        :src="currentWallet.icon"
        :alt="walletStore.wallet"
        class="w-12 h-12"
      />
      <div class="text-sm md:text-lg">Wallet Currently Connected</div>
    </div>
    <primary-button @click.native="disconnectWallet" class="ml-4 mt-2"
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
