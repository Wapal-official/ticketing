<template>
  <div class="tw-bg-modal-gray tw-px-8 tw-py-4 tw-text-white tw-text-center">
    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
      <button class="tw-text-base" @click="close">
        <v-icon class="!tw-text-black !tw-font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <div
      class="tw-w-full tw-bg-wapal-pink tw-text-white tw-my-2 tw-px-2 tw-py-2 tw-flex tw-text-xs lg:tw-hidden"
    >
      Please use Kiwi Browser for wallet connection if you are using mobile
      devices
    </div>
    <p class="tw-text-base md:tw-text-lg" v-if="message">{{ message }}</p>
    <p class="tw-text-base md:tw-text-lg">Choose a wallet to connect</p>
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4"
    >
      <button @click="connectPetra">
        <img :src="petraLogo" alt="petra" class="tw-w-12 tw-h-12" />
      </button>
      <button @click="connectMartian">
        <img :src="martianLogo" alt="martian" class="tw-w-12 tw-h-12" />
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
