<template>
  <div class="tw-container tw-mx-auto">
    <landing-section-heading heading="Auctions" class="tw-pb-8" />
    <div
      class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-x-6 tw-gap-y-8 md:tw-grid-cols-2 lg:tw-grid-cols-3 1xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
      v-if="auctions.length > 0"
    >
      <auction-landing-card
        v-for="(auction, index) in auctions"
        :key="index"
        :auction="auction"
      />
    </div>
    <div class="py-16" v-if="!allEnd">
      <reusable-loading />
    </div>

    <div
      v-if="allEnd && auctions.length === 0"
      class="tw-w-full tw-text-center tw-text-xl tw-text-primary-1"
    >
      No Auction
    </div>
    <v-card
      color="transparent"
      v-if="!allEnd"
      v-intersect="{
        handler: fetchAuctions,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      class="!tw-shadow-none"
    >
    </v-card>
  </div>
</template>
<script>
import {
  getUpcomingAuctions,
  getEndedAuctions,
} from "@/services/AuctionService";
export default {
  layout: "all-collection",
  data() {
    return {
      allEnd: false,
      auctions: [],
      page: 0,
      perPage: 20,
      loading: true,
      liveEnd: false,
    };
  },
  computed: {
    getHeight() {
      if (process.client) {
        return window.innerHeight;
      }
    },
  },
  async created() {
    this.loading = true;
    await this.fetchAuctions();
  },
  methods: {
    async fetchAuctions() {
      this.page++;
      if (!this.liveEnd) {
        let resp = await getUpcomingAuctions({
          page: this.page,
          perPage: this.perPage,
        });
        if (resp.length == 0) {
          this.liveEnd = true;
          this.page = 0;

          this.fetchAuctions();
        } else {
          this.auctions.push(...resp);
        }
      } else {
        let resp = await getEndedAuctions({
          page: this.page,
          perPage: this.perPage,
        });
        if (resp.length == 0) {
          this.allEnd = true;
        } else {
          this.auctions.push(...resp);
        }
      }
    },
  },
};
</script>
