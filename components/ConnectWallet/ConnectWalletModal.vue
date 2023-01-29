<template>
  <div class="bg-modal-gray px-8 py-4 text-white text-center">
    <div class="w-full flex flex-row items-center justify-end">
      <button class="text-base" @click="close">
        <v-icon class="!text-black !font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <div
      class="w-full bg-wapal-pink text-white my-2 px-2 py-2 flex text-xs lg:hidden"
    >
      Please use Kiwi Browser for wallet connection if you are using mobile
      devices
    </div>
    <p class="text-base md:text-lg" v-if="message">{{ message }}</p>
    <p class="text-base md:text-lg pb-4">Choose a wallet to connect</p>
    <div
      class="w-full flex flex-row flex-wrap items-start justify-start gap-x-4 gap-y-6 cursor"
    >
      <button
        @click="connectWallet(wallet.name)"
        v-for="wallet in wallets"
        :class="{ '!cursor-not-allowed': wallet.readyState === 'NotDetected' }"
        :disabled="wallet.readyState === 'NotDetected' ? true : false"
      >
        <img :src="wallet.icon" :alt="wallet.name" class="w-12 h-12" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: { message: { type: String, default: "" } },
  data() {
    return {
      wallets: this.$store.getters["walletStore/getWalletsDetail"],
    };
  },
  methods: {
    async connectWallet(wallet: string) {
      const res = await this.$store.dispatch(
        "walletStore/connectWallet",
        wallet
      );
      if (res) {
        this.$emit("walletConnected");
      }
      this.close();
    },
    close() {
      this.$emit("closeModal");
    },
  },
};
</script>
