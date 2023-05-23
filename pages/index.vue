<template>
  <div class="">
    <section class="tw-py-4 2xl:tw-container tw-mx-auto">
      <auction-featured />
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

        <!-- <section
          class="tw-py-8 tw-container tw-mx-auto"
          v-if="fastestSoldoutCollections.length >= 10"
        >
          <landing-section-heading heading="Fastest Soldout" />
          <fastest-soldout-section
            v-if="!loading"
            :collections="fastestSoldoutCollections"
          />
          <loading v-else />
        </section> -->
        <section class="tw-py-8 tw-container tw-mx-auto">
          <landing-section-heading heading="Auctions" />
          <LandingAuctions v-if="!loading" :auctions="auctions" />
          <loading v-else />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import LandingSlider from "@/components/Landing/LandingSlider.vue";
import LiveSection from "@/components/Landing/LiveSection.vue";
import UpcomingSection from "@/components/Landing/UpcomingSection.vue";
import FastestSoldoutSection from "@/components/Landing/FastestSoldoutSection.vue";
import LandingSectionHeading from "@/components/Landing/LandingSectionHeading.vue";
import Loading from "@/components/Reusable/Loading.vue";
import Banner from "@/components/Landing/Banner.vue";
import WhitelistOpportunities from "@/components/Landing/WhitelistOpportunities.vue";
import { getAuctions } from "@/services/AuctionService";
import {
  getCollections,
  getLiveCollections,
  getUpcomingCollections,
} from "@/services/CollectionService";

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
      auctions: [],
    };
  },
  methods: {
    async getCollections() {
      this.collections = [];
      this.upcomingCollections = [];
      this.liveCollections = [];

      const liveCollectionsRes = await getLiveCollections(1, 3);
      const upcomingCollectionsRes = await getUpcomingCollections(1, 4);

      this.liveCollections = liveCollectionsRes.data.data;

      this.upcomingCollections = upcomingCollectionsRes.data.data;

      const res = await getCollections(1, 100);

      res.map((collection: any) => {
        this.fastestSoldoutCollections.push(collection);
      });

      this.collections = res;
    },
  },
  async created() {
    await this.getCollections();
    this.auctions = await getAuctions({ page: 1, perPage: 4 }).then((res) => {
      return res;
    });
    this.loading = false;
  },
};
</script>
