<template>
  <div class="landing-background">
    <section class="tw-py-4">
      <banner
        :collectionId="upcomingCollections[0] ? upcomingCollections[0]._id : ''"
      />
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
    <div>
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
import Banner from "@/components/Landing/Banner.vue";

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
    Banner,
  },
  data() {
    return {
      showConnectWalletModal: false,
      message: "",
      showSignupDialog: "",
      collections: [],
      liveCollections: [],
      upcomingCollections: [{ _id: "" }],
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
      this.collections = [];
      this.upcomingCollections = [];
      this.liveCollections = [];

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
