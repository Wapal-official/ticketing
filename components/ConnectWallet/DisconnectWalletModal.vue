<template>
  <div class="bg-modal-gray px-8 py-4 text-wapal-gray text-center">
    <div class="w-full flex flex-row items-center justify-end">
      <button class="text-black text-base" @click="close">
        <v-icon class="!text-black !font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <div class="flex flex-row items-center justify-start gap-4">
      <img
        :src="walletStore.wallet === 'petra' ? petraLogo : martianLogo"
        :alt="walletStore.wallet"
        class="w-12 h-12"
      />
      <p class="text-sm md:text-lg">Wallet Currently Connected</p>
    </div>
    <primary-button @click.native="disconnectWallet" class="ml-4 mt-2"
      >Disconnect Wallet
    </primary-button>
  </div>
</template>

<script lang="ts">
import petraLogo from "@/assets/img/connect-wallet/petra-logo.svg";
import martianLogo from "@/assets/img/connect-wallet/martian-logo.svg";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import WalletAddress from "@/interfaces/walletAddress";

export default {
  components: { PrimaryButton },
  data() {
    return {
      petraLogo,
      martianLogo,
    };
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    disconnectWallet() {
      const wallet: WalletAddress = {
        wallet: "",
        walletAddress: "",
        publicKey: "",
      };
      this.$store.commit("walletStore/setWallet", wallet);
      this.$emit("walletDisconnected");
    },
  },
  computed: {
    walletStore() {
      return this.$store.state.walletStore.wallet;
    },
  },
};
</script>
