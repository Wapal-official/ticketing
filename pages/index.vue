<template>
  <div class="">
    <section class="tw-py-4 2xl:tw-container tw-mx-auto">
      <banner />
    </section>
    <div>
      <landing-slider :collections="collections" :loading="loading" />
      <div class="tw-px-4 md:tw-px-16">
        <section class="tw-pt-8 tw-pb-4 tw-container tw-mx-auto">
          <landing-section-heading heading="Live" />
          <live-section v-if="!loading" :collections="liveCollections" />
          <loading v-else />
        </section>
        <section class="tw-py-8 tw-container tw-mx-auto">
          <landing-section-heading heading="Upcoming" />
          <upcoming-section
            v-if="!loading"
            :collections="upcomingCollections"
          />
          <loading v-else />
        </section>
        <section class="tw-py-8 tw-container tw-mx-auto">
          <landing-section-heading heading="Whitelist Opportunities" />
          <whitelist-opportunities />
        </section>

        <!-- <section class="tw-py-8 tw-container tw-mx-auto">
          <landing-section-heading heading="Fastest Soldout" />
          <fastest-soldout-section
            v-if="!loading"
            :collections="fastestSoldoutCollections"
          />
          <loading v-else />
        </section> -->
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import LandingSlider from "@/components/Landing/LandingSlider.vue";
import LiveSection from "@/components/Landing/LiveSection.vue";
import UpcomingSection from "@/components/Landing/UpcomingSection.vue";
import FastestSoldoutSection from "@/components/Landing/FastestSoldoutSection.vue";
import LandingSectionHeading from "@/components/Landing/LandingSectionHeading.vue";
import Loading from "@/components/Reusable/Loading.vue";
import Banner from "@/components/Landing/Banner.vue";
import WhitelistOpportunities from "@/components/Landing/WhitelistOpportunities.vue";

import { getCollections } from "@/services/CollectionService";

export default {
  name: "IndexPage",
  components: {
    PrimaryButton,
    LandingSlider,
    LiveSection,
    UpcomingSection,
    FastestSoldoutSection,
    LandingSectionHeading,
    Loading,
    Banner,
    WhitelistOpportunities,
  },
  data() {
    return {
      showConnectWalletModal: false,
      message: "",
      collections: [],
      liveCollections: [],
      upcomingCollections: [{ _id: "" }],
      loading: true,
      fastestSoldoutCollections: [],
    };
  },
  methods: {
    async getCollections() {
      this.collections = [];
      this.upcomingCollections = [];
      this.liveCollections = [];

      const res = await getCollections(1, 100);

      this.collections = res;

      this.liveCollections = this.collections.filter((collection) => {
        const whitelistSaleDate = collection.candyMachine.whitelist_sale_time
          ? new Date(collection.candyMachine.whitelist_sale_time)
          : null;

        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        );

        const now = new Date();

        if (collection.status.sold_out) {
          return;
        }

        if (!whitelistSaleDate) {
          if (now > publicSaleDate) {
            return collection;
          }
        } else {
          if (now > whitelistSaleDate || now > publicSaleDate) {
            return collection;
          }
        }
      });

      this.upcomingCollections = this.collections.filter((collection) => {
        const whitelistSaleDate = collection.candyMachine.whitelist_sale_time
          ? new Date(collection.candyMachine.whitelist_sale_time)
          : null;
        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        );
        const now = new Date();

        if (!whitelistSaleDate) {
          if (publicSaleDate > now) {
            return collection;
          }
        } else {
          if (whitelistSaleDate > now && publicSaleDate > now) {
            return collection;
          }
        }
      });

      this.liveCollections = this.liveCollections.slice(0, 4);

      this.upcomingCollections = this.upcomingCollections.slice(0, 4);

      this.fastestSoldoutCollections = [...this.collections];
    },
  },
  async created() {
    await this.getCollections();
    this.loading = false;
  },
};
</script>
