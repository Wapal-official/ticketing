<template>
  <div class="">
    <section class="tw-py-4 2xl:tw-container tw-mx-auto">
      <banner
        :collectionId="upcomingCollections[0] ? upcomingCollections[0]._id : ''"
      />
    </section>
    <div>
      <landing-slider :collections="sliderCollections" :loading="loading" />
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
        <!-- <fastest-soldout-section
          v-if="collections.length > 0"
          :collections="collections"
          :loading="loading"
        /> -->
        <section class="tw-py-8 tw-container tw-mx-auto">
          <landing-section-heading heading="Whitelist Opportunities" />
          <whitelist-opportunities />
        </section>
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

import { getCollections } from "@/services/CollectionService.ts";

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
      sliderCollections: [],
    };
  },
  methods: {
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

      this.sliderCollections = this.liveCollections;

      this.liveCollections = this.liveCollections.slice(0, 4);

      this.upcomingCollections = this.upcomingCollections.slice(0, 4);
    },
  },
  async created() {
    await this.getCollections();
    this.loading = false;
  },
};
</script>
