<template>
  <div
    class="tw-bg-dark-9 tw-py-4 tw-text-white tw-text-center tw-rounded-lg no-scrollbar"
  >
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-py-4 tw-px-4"
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-text-white"
      >
        <i class="bx bxs-wallet-alt tw-text-xl"></i>
        <h2 class="tw-text-sm tw-uppercase tw-font-semibold tw-leading-[0.1em]">
          Connect Wallet
        </h2>
      </div>
      <button class="tw-text-base" @click="close">
        <i class="bx bx-x tw-text-white !tw-font-semibold tw-text-xl"></i>
      </button>
    </div>
    <div
      class="tw-w-full tw-bg-primary-1 tw-text-white tw-my-2 tw-px-4 tw-py-2 tw-flex tw-text-xs lg:tw-hidden"
    >
      Please use Kiwi Browser for wallet connection if you are using mobile
      devices
    </div>
    <div
      class="tw-bg-dark-8 tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-h-[500px] tw-overflow-auto no-scrollbar"
    >
      <button
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-py-4 tw-px-8 tw-transition-all tw-duration-200 tw-ease-linear tw-relative before:tw-w-full before:tw-h-full before:tw-absolute before:tw-opacity-0 before:tw-left-0 before:tw-bg-white hover:before:tw-opacity-[0.08] disabled:hover:before:tw-opacity-0"
        v-for="wallet in wallets"
        :key="wallet.name"
        @click="connectWallet(wallet.name)"
        :disabled="wallet.readyState === 'NotDetected'"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
        >
          <img
            :src="wallet.icon"
            :alt="wallet.name"
            width="32px"
            height="32px"
          />
          <div
            class="tw-text-xs tw-font-medium"
            :class="{ 'tw-text-white/50': wallet.readyState === 'NotDetected' }"
          >
            {{ wallet.name }}
          </div>
          <div
            class="tw-rounded-full tw-text-xs tw-text-black tw-bg-[#8cd867] tw-px-3 tw-py-1"
            v-if="wallet.preferred"
          >
            Preferred
          </div>
        </div>
        <i
          class="bx bx-right-arrow-alt tw-text-white"
          :class="{ 'tw-text-white/50': wallet.readyState === 'NotDetected' }"
        ></i>
      </button>
    </div>
    <div
      class="tw-border-t tw-border-dark-4 tw-text-xs tw-w-full tw-px-4 tw-pt-2"
    >
      <p class="tw-text-left">
        By connecting your wallet and using Wapal, you agree to our Terms of
        Service and Privacy Policy.
      </p>
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
      try {
        const res = await this.$store.dispatch(
          "walletStore/connectWallet",
          wallet
        );
        if (res) {
          this.$emit("walletConnected");
        }
        this.close();
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    close() {
      this.$emit("closeModal");
    },
    separateWallets() {
      this.wallets.map((wallet: any) => {
        if (wallet.name === "Petra") {
          wallet.preferred = true;
        }
        if (wallet.name === "Blocto") {
          wallet.icon = this.bloctoIcon;
        }
      });
    },
  },
  computed: {
    preferredWallet() {
      return this.wallets.find((wallet: any) => wallet.name === "Petra");
    },
  },
  mounted() {
    this.separateWallets();
  },
};
</script>
