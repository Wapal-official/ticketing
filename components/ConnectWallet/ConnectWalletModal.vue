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
    <p class="tw-text-base md:tw-text-lg tw-pb-4">Choose a wallet to connect</p>
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-x-4 tw-gap-y-6"
    >
      <h6 class="tw-text-lg tw-text-white">Preferred Wallet</h6>
      <button
        @click="connectWallet(preferredWallet.name)"
        class="tw-w-full tw-rounded tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-pl-20 tw-pr-4 tw-py-4 tw-bg-gray-900"
      >
        <img
          :src="bloctoIcon"
          :alt="preferredWallet.name"
          class="tw-w-12 tw-h-12"
        />
        <span class="tw-text-lg tw-text-wapal-gray">{{
          preferredWallet.name
        }}</span>
      </button>
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-x-4 tw-gap-y-6 tw-py-4"
      v-if="installedWallets.length > 0"
    >
      <h6 class="tw-text-lg tw-text-white">Installed</h6>
      <button
        @click="connectWallet(wallet.name)"
        v-for="wallet in installedWallets"
        class="tw-w-full tw-rounded tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-pl-4 tw-pr-4 tw-py-4 tw-bg-gray-900 md:tw-pl-20"
      >
        <img :src="wallet.icon" :alt="wallet.name" class="tw-w-12 tw-h-12" />
        <span class="tw-text-lg tw-text-wapal-gray">{{ wallet.name }}</span>
      </button>
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-x-4 tw-gap-y-6 tw-py-4"
      v-if="availableWallets.length > 0"
    >
      <h6 class="tw-text-lg tw-text-white">Available</h6>
      <a
        :href="wallet.url"
        target="_blank"
        v-for="wallet in availableWallets"
        class="tw-w-full tw-rounded tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-pl-4 tw-pr-4 tw-py-4 tw-bg-gray-900 md:tw-pl-20"
      >
        <img :src="wallet.icon" :alt="wallet.name" class="tw-w-12 tw-h-12" />
        <span class="tw-text-lg tw-text-wapal-gray">{{ wallet.name }}</span>
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
