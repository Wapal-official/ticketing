<template>
  <section class="tw-w-full tw-bg-dark-8 tw-py-24 tw-px-8 md:tw-px-0">
    <div
      class="tw-container tw-mx-auto tw-px-8 md:tw-w-[90%] lg:tw-w-full 2xl:tw-px-[3.75rem] 3xl:tw-w-[90%]"
    >
      <tab :tabs="tabs" @tabChanged="tabChanged" class="tw-mb-10" />
      <landing-explore-slider
        :collections="collections"
        :type="type"
        v-if="!loading"
      />
      <loading-collections v-else />
    </div>
  </section>
</template>
<script lang="ts">
import {
  getFeaturedCollection,
  getLiveCollections,
} from "@/services/CollectionService";
import { getUpcomingAuctions } from "~/services/AuctionService";
export default {
  data() {
    return {
      tabs: ["Featured", "Drops", "Editions", "Auctions", "Live"],
      tabNumber: 0,
      collections: [],
      loading: true,
      page: 0,
      limit: 8,
      fetchInterval: null,
      end: false,
      type: "collection",
    };
  },
  methods: {
    async tabChanged(tab: number) {
      this.tabNumber = tab;

      this.end = true;
      clearInterval(this.fetchInterval);
      this.fetchInterval = null;

      this.page = 0;
      this.end = false;

      this.loading = true;

      this.type = "collection";

      switch (tab) {
        case 0:
          await this.getFeaturedCollections();
          break;
        case 1:
          await this.getDrops();
          break;
        case 2:
          await this.getEditions();
          break;
        case 3:
          await this.getAuctions();
          break;
        case 4:
          await this.getLiveCollections();
          break;
        default:
          await this.getFeaturedCollections();
          break;
      }

      this.startFetchInterval();

      this.loading = false;
    },
    async getFeaturedCollections(page: number) {
      this.collections = [];

      this.type = "collection";
      const res = await getFeaturedCollection();
      this.collections.push(res.data.collection);

      this.end = true;
    },
    async getAuctions() {
      this.page++;

      if (this.page === 1) {
        this.collections = [];
      }

      this.type = "auction";

      const res = await getUpcomingAuctions({
        perPage: this.limit,
        page: this.page,
      });

      this.collections.push(...res);

      if (res.length === 0) {
        this.end = true;
      }

      this.end = true;
    },
    async getLiveCollections() {
      this.page++;

      if (this.page === 1) {
        this.collections = [];
      }

      this.type = "collection";

      const res = await getLiveCollections(this.page, this.limit);

      if (res.length === 0) {
        this.end = true;
      }

      this.collections.push(...res);
    },
    async getEditions() {
      this.collections = [];

      this.end = true;
    },
    async getDrops() {
      this.collections = [];

      this.end = true;
    },
    async startFetchInterval() {
      this.fetchInterval = setInterval(async () => {
        if (this.end) {
          clearInterval(this.fetchInterval);
          this.fetchInterval = null;
          this.end = true;

          return;
        }

        switch (this.tabNumber) {
          case 0:
            await this.getFeaturedCollections();
            break;
          case 1:
            await this.getDrops();
            break;
          case 2:
            await this.getEditions();
            break;
          case 3:
            await this.getAuctions();
            break;
          case 4:
            await this.getLiveCollections();
            break;
          default:
            await this.getFeaturedCollections();
            break;
        }
      }, 10000);
    },
  },
  async mounted() {},
};
</script>
