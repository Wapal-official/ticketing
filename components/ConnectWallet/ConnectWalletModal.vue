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
    <p class="text-lg">Choose a wallet to connect</p>
    <div class="w-full flex flex-row items-center justify-center gap-4">
      <button @click="connectPetra">
        <img :src="petraLogo" class="w-12 h-12" />
      </button>
      <button @click="connectMartian">
        <img :src="martianLogo" class="w-12 h-12" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import petraLogo from "@/assets/img/connect-wallet/petra-logo.svg";
import martianLogo from "@/assets/img/connect-wallet/martian-logo.svg";

export default {
  data() {
    return {
      petraLogo,
      martianLogo,
      walletStore: null,
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
    async connectPetra() {
      if (this.getPetraWallet()) {
        const wallet = this.getPetraWallet();

        try {
          const response = await wallet.connect();

          this.walletStore = {
            wallet: "petra",
            walletAddress: response.address,
            publicKey: response.publicKey,
          };
          this.$store.commit("walletStore/setWallet", this.walletStore);
          this.$emit("walletConnected");
        } catch (error) {}
      }
    },
    async connectMartian() {
      if (this.getMartianWallet()) {
        const wallet = this.getMartianWallet();
        try {
          const response = await wallet.connect();

          this.walletStore = {
            wallet: "martian",
            walletAddress: response.address,
            publicKey: response.publicKey,
          };
          this.$store.commit("walletStore/setWallet", this.walletStore);

          this.$emit("walletConnected");
        } catch (error) {}
      }
    },
    close() {
      this.$emit("closeModal");
    },
  },
  mounted() {
    this.walletStore = this.$store.state.walletStore.wallet;
  },
};
</script>
