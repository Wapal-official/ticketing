<template>
  <div>
    <section class="flex flex-row items-center justify-center gap-8 py-60">
      <div
        class="text-white px-8 lg:w-[60%] flex flex-col items-center justify-center gap-10 text-center"
      >
        <h1
          class="text-3xl font-semibold text-wapal-gray flex flex-col items-center justify-center gap-2"
        >
          Zero Code, Zero Fee NFT Creator Studio on Aptos
        </h1>
        <primary-button @click.native="checkWalletStatus"
          >Sign Up Early</primary-button
        >
      </div>
      <v-dialog
        v-model="showConnectWalletModal"
        content-class="!w-full md:!w-1/2 lg:!w-[30%]"
      >
        <connect-wallet-modal
          message="Please Connect your wallet to Sign Up"
          @closeModal="showConnectWalletModal = false"
          @walletConnected="displayWalletConnectedMessage"
        />
      </v-dialog>
      <v-dialog
        v-model="showSignupDialog"
        content-class="!w-full md:!w-1/2 lg:!w-[35%]"
      >
        <signup-modal
          @close="showSignupDialog = false"
          @walletConnected="displayWalletConnectedMessage"
        />
      </v-dialog>
    </section>
    <landing-slider />
  </div>
</template>

<script>
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import ConnectWalletModal from "@/components/ConnectWallet/ConnectWalletModal.vue";
import SignupModal from "@/components/Signup/SignupModal.vue";
import LandingSlider from "~/components/Landing/LandingSlider.vue";
export default {
  name: "IndexPage",
  components: { PrimaryButton, ConnectWalletModal, SignupModal, LandingSlider },
  data() {
    return {
      showConnectWalletModal: false,
      message: "",
      showSignupDialog: "",
    };
  },
  methods: {
    checkWalletStatus() {
      if (this.getWalletStatus) {
        this.$router.push("/signup");
      } else {
        this.showConnectWalletModal = true;
      }
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;
      this.walletConnectedSnackbar = true;
      this.message = `${this.$store.state.walletStore.wallet} Wallet Connected Successfully`;
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
  },
};
</script>
