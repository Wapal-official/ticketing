<template>
  <default-layout>
    <auction-detail :propAuctionName="featuredAuctionName" v-if="!loading" />
    <loading-collection v-else />
    <div
      class="tw-container tw-mx-auto tw-px-8 tw-pb-24 lg:tw-px-[3.75em]"
      ref="tab"
    >
      <Tab :tab="tab" :tabs="tabs" @tabChanged="tabChanged" class="tw-mb-10" />
      <NuxtChild />
    </div>
  </default-layout>
</template>
<script lang="ts">
import DefaultLayout from "@/layouts/default.vue";
import { getAuctionByName } from "@/services/AuctionService";
export default {
  layout: "default",
  components: { DefaultLayout },
  data() {
    return {
      collection: null,
      loading: true,
      tab: 0,
      tabs: ["Live Auction", "Past Auction"],
      featuredAuctionName: "",
    };
  },
  async mounted() {
    const res = await getAuctionByName("aptosmonkeys-3693");

    this.featuredAuctionName = res.data.auction.auction_name;

    if (this.$route.path === "/live-auction") {
      this.tab = 0;
    } else if (this.$route.path === "/past-auction") {
      this.tab = 1;
    }

    this.loading = false;
  },
  methods: {
    tabChanged(tab: number) {
      this.tab = tab;

      switch (tab) {
        case 0:
          this.$router.push("/live-auction");
          break;
        case 1:
          this.$router.push("/past-auction");
          break;
        default:
          this.$router.push("/live-auction");
          break;
      }
    },
  },
  computed: {
    path() {
      return this.$route.fullPath;
    },
  },
  watch: {
    path() {
      setTimeout(() => {
        this.$refs.tab.scrollIntoView({ behavior: "smooth" });
      }, 50);
    },
  },
};
</script>
