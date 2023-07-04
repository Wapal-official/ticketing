<template>
  <section class="tw-w-full tw-bg-dark-8 tw-py-24 tw-px-8 md:tw-px-0">
    <div
      class="tw-container tw-mx-auto md:tw-w-[90%] lg:tw-w-[95%] 2xl:tw-w-[90%]"
    >
      <tab :tabs="tabs" @tabChanged="tabChanged" class="tw-mb-10" />
      <landing-explore-slider
        :collections="collections"
        :type="type"
        v-if="!loading"
      />
      <div
        class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
        v-else
      >
        <div
          class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse tw-hidden md:tw-flex md:!tw-w-[312px] md:!tw-h-[312px]"
        ></div>
        <div
          class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse tw-hidden md:tw-flex md:!tw-w-[312px] md:!tw-h-[312px]"
        ></div>
        <div
          class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse tw-hidden lg:tw-flex md:!tw-w-[312px] md:!tw-h-[312px]"
        ></div>
        <div
          class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse tw-hidden xl:tw-flex md:!tw-w-[312px] md:!tw-h-[312px]"
        ></div>
        <div
          class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse tw-hidden 3xl:tw-flex md:!tw-w-[312px] md:!tw-h-[312px]"
        ></div>
      </div>
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
