<template>
  <div class="tw-w-full tw-container tw-mx-auto tw-px-4">
    <h1 class="tw-text-xl tw-font-semibold tw-py-4">Auctions</h1>
    <div
      class="tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-3 2xl:tw-grid-cols-4"
      v-if="auctions.length > 0"
    >
      <AuctionCard v-for="(item, i) in auctions" :key="i" :auction="item" />
    </div>
    <p v-else class="tw-py-4 tw-text-lg">No nfts in auction</p>
    <ReusableLoading v-if="!end" />
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: fetchAuctions,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
    >
    </v-card>
  </div>
</template>
<script>
import { getAuctions } from "@/services/AuctionService";
export default {
  data() {
    return {
      end: false,
      auctions: [],
      page: 0,
      perPage: 20,
    };
  },
  computed: {
    getHeight() {
      if (process.client) {
        return window.innerHeight;
      }
    },
  },
  created() {
    this.fetchAuctions();
  },
  methods: {
    async fetchAuctions() {
      this.page++;
      let resp = await getAuctions({
        page: this.page,
        perPage: this.perPage,
      });
      if (resp.length == 0) {
        this.end = true;
      } else {
        this.auctions.push(...resp);
      }
    },
  },
};
</script>
