<template>
  <div>
    <section
      class="tw-flex tw-flex-row tw-gap-8 tw-h-screen tw-relative tw-items-center tw-justify-center md:tw-h-[70vh] lg:tw-h-[100vh] lg:tw-items-center lg:tw-justify-start"
    >
      <div class="tw-absolute tw-top-0 tw-bottom-0 tw-z-10 tw-w-full tw-h-full">
        <img
          :src="banner"
          alt="banner"
          class="tw-w-full tw-h-full tw-object-fill tw-hidden lg:tw-flex"
        />
      </div>
      <div
        class="tw-text-white tw-px-8 lg:tw-w-[60%] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-10 tw-text-center tw-z-20"
      >
        <h1
          class="tw-text-3xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
        >
          No Code NFT Creator Studio on Aptos
        </h1>
        <primary-button @click.native="checkWalletStatus"
          >Launch</primary-button
        >
      </div>
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
    </section>
    <div class="landing-background">
      <landing-slider />
      <div class="tw-px-4 md:tw-px-16">
        <section class="tw-pt-8 tw-pb-4 tw-container tw-mx-auto">
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
import LiveSection from "@/components/Landing/LiveSection.vue";
import UpcomingSection from "@/components/Landing/UpcomingSection.vue";
import FastestSoldoutSection from "@/components/Landing/FastestSoldoutSection.vue";
import LandingSectionHeading from "@/components/Landing/LandingSectionHeading.vue";
import Loading from "@/components/Reusable/Loading.vue";

import { getCollections } from "@/services/CollectionService.ts";

import banner from "@/assets/img/banner.png";

export default {
  name: "IndexPage",
  components: {
    PrimaryButton,
    ConnectWalletModal,
    SignupModal,
    LandingSlider,
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
      banner,
    };
  },
  methods: {
    checkWalletStatus() {
      if (this.getWalletStatus) {
        this.$router.push("/dashboard");
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
        const whitelistSaleDate = new Date(
          collection.candyMachine_id.whitelist_sale_time
        );
        const publicSaleDate = new Date(
          collection.candyMachine_id.public_sale_time
        );

        const now = new Date();

        if (now > whitelistSaleDate || now > publicSaleDate) {
          return collection;
        }
      });

      this.upcomingCollections = this.collections.filter((collection) => {
        const whitelistSaleDate = new Date(
          collection.candyMachine_id.whitelist_sale_time
        );
        const publicSaleDate = new Date(
          collection.candyMachine_id.public_sale_time
        );
        const now = new Date();

        if (whitelistSaleDate > now && publicSaleDate > now) {
          return collection;
        }
      });

      this.liveCollections = this.liveCollections.slice(0, 4);

      this.upcomingCollections = this.upcomingCollections.slice(0, 4);
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
