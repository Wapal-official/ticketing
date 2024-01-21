<template>
  <section
    class="tw-w-full tw-bg-dark-8 tw-py-10 tw-px-8 md:tw-px-0"
    id="explore"
  >
    <div class="tw-container tw-mx-auto md:tw-px-8 xl:tw-px-[3.75rem]">
      <tab
        :tab="tabNumber"
        :tabs="tabs"
        @tabChanged="tabChanged"
        class="tw-mb-10"
      />
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
import { getUpcomingAuctions } from "@/services/AuctionService";

import sanctuary from "@/assets/img/199.png";
import { getAllEditions } from "@/services/EditionService";
export default {
  data() {
    return {
      tabs: ["Featured", "Editions", "Auctions"],
      tabNumber: 0,
      collections: [],
      loading: true,
      page: 0,
      limit: 8,
      fetchInterval: null,
      end: false,
      type: "collection",
      sanctuary,
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
          await this.getEditions();
          break;
        case 2:
          await this.getAuctions();
          break;
        default:
          await this.getFeaturedCollections();
          break;
      }

      this.startFetchInterval();

      this.loading = false;
    },
    async getFeaturedCollections() {
      this.collections = [];

      this.type = "collection";

      const monkeysCollection = {
        name: "Aptos Monkeys Sanctuary",
        description:
          "Sanctuaries are homes to the fighting Monkeys who stood their ground to protect their lands and fortunes.",
        image: sanctuary,
        twitter: "https://twitter.com/AptosMonkeys",
        website: "https://www.aptosmonkeys.club/",
        discord: "https://discord.com/invite/sFfe75BHQ3",
        mintDetails: {
          link: "https://monkeys.wapal.io",
        },
        candyMachine: {
          public_sale_time: "2023-10-31T06:23:35.216Z",
          resource_account:
            "0x39f1338e6b69c3ed2f0caa95876e898dbe4c9b272d721626d577554015d033b8",
          candy_id:
            "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0",
          public_sale_price: 0,
        },
        status: {
          sold_out: true,
        },
        username: "monkkesanturies",
        isVerified: true,
      };

      this.collections.push(monkeysCollection);

      const res = await getFeaturedCollection();
      this.collections.push(...res);

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
      this.page++;

      if (this.page === 1) {
        this.collections = [];
      }

      const res = await getAllEditions({ page: this.page, limit: this.limit });

      this.collections.push(...res);

      if (res.length === 0) {
        this.end = true;
      }
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
            await this.getEditions();
            break;
          case 2:
            await this.getAuctions();
            break;
          default:
            await this.getFeaturedCollections();
            break;
        }
      }, 6000);
    },
  },
  async mounted() {
    this.tabChanged(0);
  },
};
</script>
