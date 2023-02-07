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
      class="w-full flex flex-col items-start justify-start gap-x-4 gap-y-6 cursor"
    >
      <h6 class="text-lg text-white">Preferred Wallet</h6>
      <button
        @click="connectWallet(preferredWallet.name)"
        class="w-full rounded flex flex-row items-center justify-start gap-4 pl-20 pr-4 py-4 bg-gray-900"
      >
        <img :src="bloctoIcon" :alt="preferredWallet.name" class="w-12 h-12" />
        <span class="text-lg text-wapal-gray">{{ preferredWallet.name }}</span>
      </button>
    </div>
    <div
      class="w-full flex flex-col items-start justify-start gap-x-4 gap-y-6 cursor py-4"
      v-if="installedWallets.length > 0"
    >
      <h6 class="text-lg text-white">Installed</h6>
      <button
        @click="connectWallet(wallet.name)"
        v-for="wallet in installedWallets"
        class="w-full rounded flex flex-row items-center justify-start gap-4 pl-20 pr-4 py-4 bg-gray-900"
      >
        <img :src="wallet.icon" :alt="wallet.name" class="w-12 h-12" />
        <span class="text-lg text-wapal-gray">{{ wallet.name }}</span>
      </button>
    </div>
    <div
      class="w-full flex flex-col items-start justify-start gap-x-4 gap-y-6 cursor py-4"
      v-if="availableWallets.length > 0"
    >
      <h6 class="text-lg text-white">Available</h6>
      <a
        :href="wallet.url"
        target="_blank"
        v-for="wallet in availableWallets"
        class="w-full rounded flex flex-row items-center justify-start gap-4 pl-20 pr-4 py-4 bg-gray-900"
      >
        <img :src="wallet.icon" :alt="wallet.name" class="w-12 h-12" />
        <span class="text-lg text-wapal-gray">{{ wallet.name }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import bloctoIcon from "@/assets/img/blocto-icon-svg.svg";
export default {
  props: { message: { type: String, default: "" } },
  data() {
    return {
      wallets: this.$store.getters["walletStore/getWalletsDetail"],
      installedWallets: [{ name: "", icon: "", url: "" }],
      availableWallets: [{ name: "", icon: "", url: "" }],
      bloctoIcon,
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
    separateWallets() {
      this.installedWallets = this.wallets.filter(
        (wallet: any) => wallet.readyState === "Installed"
      );
      this.availableWallets = this.wallets.filter(
        (wallet: any) => wallet.readyState === "NotDetected"
      );
    },
  },
  computed: {
    preferredWallet() {
      return this.wallets.find((wallet: any) => wallet.name === "Blocto");
    },
  },
  mounted() {
    this.separateWallets();
  },
};
</script>
