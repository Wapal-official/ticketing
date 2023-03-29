<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-text-base tw-gap-4 lg:tw-flex-row lg:!tw-justify-end lg:tw-items-center lg:tw-gap-8"
  >
    <div class="tw-flex tw-w-full lg:tw-hidden">
      <v-list-group
        :ripple="false"
        id="explore-list-group"
        v-model="showExploreMenu"
        active-class="!tw-text-wapal-pink "
        class="!tw-text-white tw-w-full"
      >
        <template
          v-slot:activator
          class="focus:before:!tw-opacity-0"
          @click="showExploreMenu = !showExploreMenu"
        >
          <span class="tw-w-full"> Explore</span>
        </template>
        <explore-list-item name="All NFT" @close="close" />
        <explore-list-item name="Live" @close="close" />
        <explore-list-item name="Upcoming" :last="true" @close="close" />
      </v-list-group>
    </div>
    <connect-wallet @close="close" class="tw-mt-8 lg:tw-mt-0" />
    <button
      class="tw-rounded tw-bg-[#FF36AB] tw-text-white tw-px-8 tw-py-2"
      @click="checkWalletStatus"
    >
      Launch
    </button>
    <v-dialog
      v-model="showConnectWalletModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <connect-wallet-modal
        message="Please Connect your wallet to Launch"
        @closeModal="showConnectWalletModal = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
    <v-dialog
      v-model="showSignupDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[35%]"
    >
      <signup-modal
        @close="showSignupDialog = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import MenuItem from "@/components/Landing/Navbar/MenuItem.vue";
import ConnectWallet from "@/components/Reusable/ConnectWallet.vue";
import ExploreListItem from "@/components/Landing/Navbar/ExploreListItem.vue";
import ConnectWalletModal from "@/components/ConnectWallet/ConnectWalletModal.vue";
import SignupModal from "@/components/Signup/SignupModal.vue";
export default {
  components: {
    MenuItem,
    ConnectWallet,
    ExploreListItem,
    ConnectWalletModal,
    SignupModal,
  },
  data() {
    return {
      showExploreMenu: false,
      showConnectWalletModal: false,
      showSignupDialog: false,
    };
  },
  methods: {
    close() {
      this.showExploreMenu = false;
      this.$emit("close");
    },
    checkWalletStatus() {
      if (this.getWalletStatus && this.getUserStatus) {
        this.$emit("close");
        this.$router.push("/dashboard/assets");
      } else if (!this.getWalletStatus) {
        this.showConnectWalletModal = true;
      } else {
        this.showSignupDialog = true;
      }
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet} Wallet Connected Successfully`,
      });

      this.showSignupDialog = true;
    },
  },
  computed: {
    getWalletStatus() {
      if (this.$store.state.walletStore.wallet.wallet) {
        return true;
      }
      return false;
    },
    getUserStatus() {
      if (this.$store.state.userStore.user.token) {
        return true;
      }
      return false;
    },
  },
};
</script>
