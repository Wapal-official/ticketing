<template>
  <div>
    <section class="flex flex-row items-center justify-center gap-8 py-60">
      <div
        class="text-white px-8 lg:w-[60%] flex flex-col items-center justify-center gap-10 text-center"
      >
        <h1
          class="text-3xl text-wapal-gray flex flex-col items-center justify-center gap-2"
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
    <div class="landing-background">
      <landing-slider />
      <div class="px-4 md:px-16">
        <div class="lg:px-16">
          <landing-image-grid />
        </div>
        <live-section />
        <upcoming-section />
        <fastest-soldout-section />
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import ConnectWalletModal from "@/components/ConnectWallet/ConnectWalletModal.vue";
import SignupModal from "@/components/Signup/SignupModal.vue";
import LandingSlider from "@/components/Landing/LandingSlider.vue";
import LandingImageGrid from "@/components/Landing/LandingImageGrid.vue";
import LiveSection from "@/components/Landing/LiveSection.vue";
import UpcomingSection from "@/components/Landing/UpcomingSection.vue";
import FastestSoldoutSection from "@/components/Landing/FastestSoldoutSection.vue";
export default {
  name: "IndexPage",
  components: {
    PrimaryButton,
    ConnectWalletModal,
    SignupModal,
    LandingSlider,
    LandingImageGrid,
    LiveSection,
    UpcomingSection,
    FastestSoldoutSection,
  },
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
<style scoped>
.landing-background {
  background: linear-gradient(
    180deg,
    #0e0d0d 0%,
    #010a1b 23.47%,
    #11151c 81.73%,
    #0e0d0d 100%
  );
}
</style>
