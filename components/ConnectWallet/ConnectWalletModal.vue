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
    <p class="text-base md:text-lg">Choose a wallet to connect</p>
    <div>{{ getWalletDetail }}</div>
    <div
      class="w-full flex flex-row flex-wrap items-center justify-center gap-4"
    >
      <button @click="connectWallet(wallet.name)" v-for="wallet in wallets">
        <div>{{ wallet.name }}</div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import petraLogo from "@/assets/img/connect-wallet/petra-logo.svg";
import martianLogo from "@/assets/img/connect-wallet/martian-logo.svg";

export default {
  props: { message: { type: String, default: "" } },
  data() {
    return {
      petraLogo,
      martianLogo,
      wallets: JSON.parse(this.$store.state.walletStore.wallets),
    };
  },
  methods: {
    getPetraWallet() {
      if ("aptos" in window) {
        return window.aptos;
      } else {
        window.open("https://petra.app/", `_blank`);
      }
    },
    getMartianWallet() {
      if ("martian" in window) {
        return window.martian;
      }
      window.open("https://www.martianwallet.xyz/", "_blank");
    },
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
  computed: {
    getWalletDetail() {
      console.log("first");
      return this.$store.getters.getWalletDetail;
    },
  },
  mounted() {},
};
</script>
