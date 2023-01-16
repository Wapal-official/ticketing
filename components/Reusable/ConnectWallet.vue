<template>
  <div class="text-sm">
    <button
      class="gradient-button"
      @click="showConnectWalletDialog = true"
      v-if="!walletStore.wallet"
    >
      Connect Wallet {{ walletStore.wallet }}
    </button>

    <button
      class="gradient-button px-6 py-2 text-xs w-full flex flex-row items-center justify-start gap-2 rounded-md bg-gradient-to-r from-[#000000] via-[#34107B] to-[#1B0051] font-medium relative overflow-hidden"
      @click="showDisconnectWalletDialog = true"
      v-else
    >
      <client-only>
        <v-icon class="!text-wapal-pink">mdi-account</v-icon></client-only
      >
      <span>{{ displayWalletAddress }}</span>
    </button>
    <v-dialog v-model="showConnectWalletDialog" max-width="400px">
      <connect-wallet-modal
        @closeModal="showConnectWalletDialog = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
    <v-dialog v-model="showDisconnectWalletDialog" max-width="400px">
      <disconnect-wallet-modal
        @closeModal="showDisconnectWalletDialog = false"
        @walletDisconnected="displayWalletDisconnectedMessage"
      />
    </v-dialog>
    <v-snackbar
      v-model="walletConnectedSnackbar"
      :timeout="5000"
      top
      centered
      :color="defaultTheme.modalGray"
    >
      <div
        class="w-full h-full flex flex-row items-center justify-center gap-2"
      >
        <v-icon class="!text-green-500">mdi-check-circle</v-icon
        ><span class="capitalize">{{ message }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import ConnectWalletModal from "@/components/ConnectWallet/ConnectWalletModal.vue";
import DisconnectWalletModal from "@/components/ConnectWallet/DisconnectWalletModal.vue";
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  components: { ConnectWalletModal, DisconnectWalletModal },
  data() {
    return {
      showConnectWalletDialog: false,
      showDisconnectWalletDialog: false,
      walletConnectedSnackbar: false,
      defaultTheme,
      walletStore: this.$store.state.walletStore.wallet,
      message: "Wallet Connected Successfully",
    };
  },
  methods: {
    closeNavBar() {
      this.$emit("close");
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletDialog = false;
      this.walletConnectedSnackbar = true;
      this.walletStore = this.$store.state.walletStore.wallet;
      this.message = `${this.walletStore.wallet} Wallet Connected Successfully`;
    },
    displayWalletDisconnectedMessage() {
      this.showDisconnectWalletDialog = false;
      this.walletConnectedSnackbar = true;
      this.message = `${this.walletStore.wallet} Wallet Disconnected Successfully`;
      this.walletStore = this.$store.state.walletStore.wallet;
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
  },
};
</script>
