<template>
  <div class="">
    <landing-featured-slider @looniesMinted="showLooniesTweet = true" />
    <landing-explore-section />
    <landing-all-collection-section />
    <landing-all-edition-section />
    <landing-auction-section />
    <landing-whitelist-opportunities />
    <loonies-congratulations-popup
      v-if="showLooniesTweet"
      @closeCongratulationsPopup="showLooniesTweet = false"
    />
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
  getUpcomingEditions,
} from "@/services/EditionService";

import {
  getApprovedDrafts,
  getCollections,
  getLiveCollections,
  getUpcomingCollections,
} from "@/services/CollectionService";
import { getCachedUrlOfImage } from "@/utils/imageCache";
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
      showLooniesTweet: false,
    };
  },
  methods: {
    async getCollections() {
      this.collections = [];
      this.upcomingCollections = [];
      this.liveCollections = [];
      this.fastestSoldoutCollections = [];

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
            image: getCachedUrlOfImage(draft.data.image),
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

      this.collections = res.map((collection: any) => ({
        ...collection,
        image: getCachedUrlOfImage(collection.image),
      }));
    },
  },
  async created() {
    const page = 1
    const limit = 4 
    const edition = await getUpcomingEditions({page, limit});
    console.log(edition,"upcoming data"); 
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
