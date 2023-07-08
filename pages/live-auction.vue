<template>
  <div class="tw-w-full">
    <landing-section-heading heading="Live Auction" class="tw-pb-8" />
    <div
      v-if="!loading && auctions.length === 0"
      class="tw-w-full tw-text-center tw-text-xl tw-text-primary-1"
    >
      No Auction
    </div>
    <div
      class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-x-6 tw-gap-y-8 md:tw-grid-cols-2 lg:tw-grid-cols-3 1xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
      v-else
    >
      <auction-landing-card
        v-for="(auction, index) in auctions"
        :key="index"
        :auction="auction"
      />
    </div>
    <div class="py-16" v-if="loading">
      <reusable-loading />
    </div>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: mapAllAuction,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      class="!tw-shadow-none"
    >
    </v-card>
  </div>
</template>
<script lang="ts">
import { getUpcomingAuctions } from "~/services/AuctionService";

export default {
  layout: "all-auction",
  data() {
    return {
      auctions: [],
      end: false,
      limit: 4,
      page: 0,
      loading: true,
    };
  },
  async created() {
    this.auctions = [];
  },
  methods: {
    async mapAllAuction() {
      this.page++;
      this.loading = true;

      const auctions = await getUpcomingAuctions({
        perPage: 10,
        page: this.page,
      });

      this.auctions.push(...auctions);

      if (auctions.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
  },
};
</script>
