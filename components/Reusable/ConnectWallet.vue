<template>
  <div class="tw-text-sm">
    <gradient-border-button
      @click.native="connectWallet"
      v-if="!walletStore.wallet"
    >
      Connect Wallet
    </gradient-border-button>

    <gradient-border-button @click.native="disconnectWallet" v-else
      ><div
        class="tw-text-xs tw-w-full tw-flex tw-flex-row tw-justify-center tw-gap-2 tw-rounded-md tw-font-medium tw-relative tw-overflow-hidden md:tw-items-start lg:tw-items-center"
      >
        <client-only>
          <v-icon class="!tw-text-wapal-pink">mdi-account</v-icon></client-only
        >
        <span class="tw-text-lg lg:tw-text-sm md:tw-hidden lg:tw-flex">{{
          displayFormattedWalletAddress
        }}</span>
        <span class="tw-text-lg tw-hidden md:tw-flex lg:tw-hidden">{{
          displayFormattedWalletAddressForMediumScreens
        }}</span>
      </div>
    </gradient-border-button>
    <v-dialog
      v-model="showConnectWalletDialog"
      content-class="!tw-w-full md:!tw-w-1/2 xl:!tw-w-1/3"
    >
      <connect-wallet-modal
        @closeModal="showConnectWalletDialog = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
    <v-dialog
      v-model="showDisconnectWalletDialog"
      content-class="!tw-w-full md:!tw-w-1/2 xl:!tw-w-1/3"
    >
      <disconnect-wallet-modal
        @closeModal="showDisconnectWalletDialog = false"
        @walletDisconnected="displayWalletDisconnectedMessage"
      />
    </v-dialog>
    <v-snackbar
      v-model="walletConnectedSnackbar"
      :timeout="3000"
      top
      centered
      :color="defaultTheme.modalGray"
    >
      <div
        class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2"
      >
        <v-icon class="!tw-text-green-500">mdi-check-circle</v-icon
        ><span class="tw-capitalize">{{ message }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import ConnectWalletModal from "@/components/ConnectWallet/ConnectWalletModal.vue";
import DisconnectWalletModal from "@/components/ConnectWallet/DisconnectWalletModal.vue";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  components: {
    ConnectWalletModal,
    DisconnectWalletModal,
    GradientBorderButton,
  },
  data() {
    return {
      showConnectWalletDialog: false,
      showDisconnectWalletDialog: false,
      walletConnectedSnackbar: false,
      defaultTheme,
      message: "Wallet Connected Successfully",
    };
  },
  methods: {
    closeNavBar() {
      this.$emit("close");
    },
    connectWallet() {
      this.showConnectWalletDialog = true;
      this.closeNavBar();
    },
    disconnectWallet() {
      this.showDisconnectWalletDialog = true;
      this.closeNavBar();
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletDialog = false;
      this.walletConnectedSnackbar = true;
      this.message = `${this.walletStore.wallet} Wallet Connected Successfully`;
      this.showSignupDialog = true;
    },
    displayWalletDisconnectedMessage() {
      this.showDisconnectWalletDialog = false;
      this.$toast.showMessage({
        message: `${this.walletStore.wallet} Wallet Disconnected Successfully`,
      });
    },
  },
  computed: {
    displayFormattedWalletAddress() {
      return this.walletStore.walletAddress
        ? this.walletStore.walletAddress.substring(0, 8) +
            "..." +
            this.walletStore.walletAddress.slice(-3)
        : "";
    },
    displayFormattedWalletAddressForMediumScreens() {
      return this.walletStore.walletAddress
        ? this.walletStore.walletAddress.substring(0, 15) +
            "..." +
            this.walletStore.walletAddress.slice(-10)
        : "";
    },
    walletStore() {
      return this.$store.state.walletStore.wallet;
    },
  },
};
</script>
