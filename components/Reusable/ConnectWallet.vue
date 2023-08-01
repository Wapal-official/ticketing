<template>
  <div>
    <button-primary
      @click="disconnectWallet"
      :title="displayFormattedWalletAddress"
      :bordered="true"
      v-if="walletStore.wallet"
    >
      <template #prepend-icon>
        <i class="bx bxs-user !tw-text-primary-1 tw-text-xl tw-pr-[0.62em]"></i>
      </template>
    </button-primary>
    <button-primary @click="connectWallet" title="Connect Wallet" v-else />
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
      :color="defaultTheme.dark7"
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
        ? this.walletStore.walletAddress.substring(0, 5) +
            "..." +
            this.walletStore.walletAddress.slice(-2)
        : "";
    },
    displayFormattedWalletAddressForMediumScreens() {
      return this.walletStore.walletAddress
        ? this.walletStore.walletAddress.substring(0, 5) +
            "..." +
            this.walletStore.walletAddress.slice(-2)
        : "";
    },
    walletStore() {
      return this.$store.state.walletStore.wallet;
    },
  },
};
</script>
