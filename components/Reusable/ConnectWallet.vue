<template>
  <div class="tw-text-sm">
    <button
      class="gradient-button"
      @click="connectWallet"
      v-if="!walletStore.wallet"
    >
      Connect Wallet {{ walletStore.wallet }}
    </button>

    <button
      class="gradient-button tw-px-6 tw-py-2 tw-text-xs tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-rounded-md tw-bg-gradient-to-r tw-from-[#000000] tw-via-[#34107B] tw-to-[#1B0051] tw-font-medium tw-relative tw-overflow-hidden"
      @click="disconnectWallet"
      v-else
    >
      <client-only>
        <v-icon class="!tw-text-wapal-pink">mdi-account</v-icon></client-only
      >
      <span>{{ displayWalletAddress }}</span>
    </button>
    <v-dialog
      v-model="showConnectWalletDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-1/4"
    >
      <connect-wallet-modal
        @closeModal="showConnectWalletDialog = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
    <v-dialog
      v-model="showDisconnectWalletDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-1/4"
    >
      <disconnect-wallet-modal
        @closeModal="showDisconnectWalletDialog = false"
        @walletDisconnected="displayWalletDisconnectedMessage"
      />
    </v-dialog>
    <v-dialog
      v-model="showSignupDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[35%]"
    >
      <signup-modal @close="showSignupDialog = false" />
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
import SignupModal from "@/components/Signup/SignupModal.vue";
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  components: { ConnectWalletModal, DisconnectWalletModal, SignupModal },
  data() {
    return {
      showConnectWalletDialog: false,
      showDisconnectWalletDialog: false,
      showSignupDialog: false,
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
      this.walletConnectedSnackbar = true;
      this.message = `${this.walletStore.wallet} Wallet Disconnected Successfully`;
    },
  },
  computed: {
    displayWalletAddress() {
      return this.walletStore.walletAddress
        ? this.walletStore.walletAddress.substring(0, 8) +
            "..." +
            this.walletStore.walletAddress.slice(-3)
        : "";
    },

    walletStore() {
      return this.$store.state.walletStore.wallet;
    },
  },
};
</script>
