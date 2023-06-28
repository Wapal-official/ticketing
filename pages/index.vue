<template>
  <div class="">
    <landing-featured-slider />
    <div>
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
          <landing-section-heading heading="Auctions" />
          <LandingAuctions v-if="!loading" :auctions="auctions" />
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
import WhitelistOpportunities from "@/components/Landing/WhitelistOpportunities.vue";

import {
  getUpcomingAuctions,
  getEndedAuctions,
} from "@/services/AuctionService";

import {
  getApprovedDrafts,
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

      this.liveCollections = await getLiveCollections(1, 3);
      this.upcomingCollections = await getUpcomingCollections(1, 4);

      if (this.upcomingCollections.length < 4) {
        const draftRes = await getApprovedDrafts(
          1,
          4 - this.upcomingCollections.length
        );
        const drafts: any[] = [];

        draftRes.map((draft: any) => {
          drafts.push({
            baseURL: draft.data.baseURL,
            candy_id: draft.data.candy_id,
            description: draft.data.description,
            discord: draft.data.discord,
            image: draft.data.image,
            instagram: draft.data.instagram,
            isApproved: draft.data.isApproved,
            name: draft.data.name,
            phases: draft.data.phases,
            public_sale_price: draft.data.public_sale_price,
            public_sale_time: draft.data.public_sale_time,
            royalty_payee_address: draft.data.royalty_payee_address,
            royalty_percentage: draft.data.royalty_percentage,
            supply: draft.data.supply,
            twitter: draft.data.twitter,
            website: draft.data.website,
            whitelist_price: draft.data.whitelist_price,
            redirectTo: "landingDraft",
            _id: draft._id,
          });
        });

        this.upcomingCollections.push(...drafts);
      }

      const res = await getCollections(1, 100);

      res.map((collection: any) => {
        this.fastestSoldoutCollections.push(collection);
      });

      this.collections = res;
    },
  },
  async created() {
    await this.getCollections();

    this.auctions = await getUpcomingAuctions({ page: 1, perPage: 4 });

    if (this.auctions.length < 4) {
      const endedRes = await getEndedAuctions({
        page: 1,
        perPage: 4 - this.auctions.length,
      });

      this.auctions.push(...endedRes);
    }

    this.loading = false;
  },
};
</script>
