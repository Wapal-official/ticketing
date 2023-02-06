<template>
  <div>
    <section
      class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-8 tw-py-60"
    >
      <div
        class="tw-text-white tw-px-8 lg:tw-w-[60%] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-10 tw-text-center"
      >
        <h1
          class="tw-text-3xl tw-text-wapal-gray tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
        >
          No Code NFT Creator Studio on Aptos
        </h1>
        <primary-button @click.native="checkWalletStatus"
          >Sign Up Early</primary-button
        >
      </div>
      <v-dialog
        v-model="showConnectWalletModal"
        content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
      >
        <connect-wallet-modal
          message="Please Connect your wallet to Sign Up"
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
    </section>
    <div class="landing-background">
      <landing-slider />
      <div class="tw-px-4 md:tw-px-16">
        <div class="lg:tw-px-16">
          <landing-image-grid />
        </div>

        <section class="tw-py-8 tw-container tw-mx-auto">
          <landing-section-heading heading="Live" class="tw-px-4" />
          <live-section v-if="!loading" :collections="liveCollections" />
          <loading v-else />
        </section>
        <section class="tw-py-8 tw-container tw-mx-auto">
          <landing-section-heading heading="Upcoming" class="tw-px-4" />
          <upcoming-section
            v-if="!loading"
            :collections="upcomingCollections"
          />
          <loading v-else />
        </section>
        <!-- <fastest-soldout-section
          v-if="collections.length > 0"
          :collections="collections"
          :loading="loading"
        /> -->
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
import LandingSectionHeading from "@/components/Landing/LandingSectionHeading.vue";
import Loading from "@/components/Reusable/Loading.vue";

import { getCollections } from "@/services/CollectionService.ts";

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
    LandingSectionHeading,
    Loading,
  },
  data() {
    return {
      showConnectWalletModal: false,
      message: "",
      showSignupDialog: "",
      collections: [],
      liveCollections: [],
      upcomingCollections: [],
      loading: true,
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
    async getCollections() {
      const res = await getCollections();
      this.collections = res;
      this.liveCollections = this.collections.filter((collection) => {
        const whitelistSaleDate = new Date(collection.whitelist_sale_time);
        const publicSaleDate = new Date(collection.public_sale_date);

        const now = new Date();

        if (now > whitelistSaleDate || now > publicSaleDate) {
          return collection;
        }
      });

      this.upcomingCollections = this.collections.filter((collection) => {
        const whitelistSaleDate = new Date(collection.whitelist_sale_time);
        const publicSaleDate = new Date(collection.public_sale_time);
        const now = new Date();

        if (whitelistSaleDate > now && publicSaleDate > now) {
          return collection;
        }
      });
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
  async created() {
    await this.getCollections();
    this.loading = false;
  },
};
</script>
