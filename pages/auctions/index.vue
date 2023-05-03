<template>
  <div class="tw-w-full tw-h-full">
    <v-container fluid>
      <v-row justify="center">
        <h1>Auctions</h1>
      </v-row>
      <v-row v-if="auctions.length > 0">
        <v-col v-for="(item, i) in auctions" :key="i" cols="12" lg="3" md="6">
          <AuctionCard :auction="item" />
        </v-col>
      </v-row>
      <v-row no-gutters v-else justify="center">
        <p v-if="end" style="margin: 20px 0px">No nfts</p>
        <ReusableLoading v-else />
      </v-row>
    </v-container>
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
