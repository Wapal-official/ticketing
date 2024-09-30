<template>
  <section
    class="tw-w-full tw-bg-dark-8 tw-py-10 tw-px-8 md:tw-px-0"
    id="explore"
  >
    <div class="tw-container tw-mx-auto md:tw-px-8 xl:tw-px-[3.75rem]">
    <div class="tw-block md:tw-flex sm:tw-items-center tw-mb-10">
      <tab
        :tab="tabNumber"
        :tabs="tabs"
        @tabChanged="tabChanged"
        class=""
      />
      <div 
        v-if="tabNumber === 0 || tabNumber === 1" 
        class="tw-ml-2 tw-mt-2">
        <a href="#"
          class="!tw-text-white tw-rounded-sm !tw-h-[40px] !tw-max-h-[40px] tw-py-[0.62em] tw-px-6 !tw-capitalize !tw-text-sm !tw-font-medium tw-transition-all tw-duration-200 tw-ease-linear tw-border-solid tw-border tw-border-dark-4 hover:tw-border-white hover:!tw-bg-white hover:!tw-text-dark-9 hover:!tw-font-semibold"
         @click.prevent="redirectToExplore">
          View all  
        </a>
      </div>
    </div>
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
import { getAllEditions, getUpcomingEditions } from "@/services/EditionService";
export default {
  data() {
    return {
      tabs: ["Live", "Upcoming"],
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
    redirectToExplore() {
    if (this.tabNumber === 0) {
      this.$router.push('/live-editions');
    } else if (this.tabNumber === 1) {
      this.$router.push('/upcoming-editions');
    }
  },
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
        await this.getEditions();  // Now case 0 is "Live"
        break;
      case 1:
        await this.getUpcomingEditions();
        break;
      default:
        await this.getEditions();  // Default is also "Live"
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
        image:
          "https://media.wapal.io/api/cache?l=https://arweave.net/z92BGaOGx-DYVTP_O8W31rAsu3PUO7uAQjzgXIoB2vc/199.png",
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
          sold_out: false,
        },
        username: "monkkesanturies",
        isVerified: true,
      };
      const looniesCollection = {
        name: "Loonies",
        description: "",
        image:
          "https://wflakeutdvphlghtnureiqqdvu6xhasm5nfi3cpqioiltaaqai2q.arweave.net/sVYFEpMdXnWY820iREIDrT1zgkzrSo2J8EOQuYAQAjU",
        // twitter: "https://x.com/theloonies_nft",
        // website: "https://theloonies.xyz/",
        // discord: "https://t.co/jYRAyXBgfj",
        mintDetails: {
          link: " ",
        },
        candyMachine: {
          public_sale_time: "2024-06-13T15:00:00.000Z",
          resource_account:
            "0x39f1338e6b69c3ed2f0caa95876e898dbe4c9b272d721626d577554015d033b8",
          candy_id:
            "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0",
          public_sale_price: "4.2",
        },
        status: {
          sold_out: false,
        },
        username: "loonies",
        isVerified: true,
      };
      const currentTime = new Date().toISOString();
      if (currentTime < looniesCollection.candyMachine.public_sale_time) {
        this.collections.push(looniesCollection);
      }
      const res = await getFeaturedCollection(this.page, this.limit);
      this.collections.push(...res);
      this.end = true;
    },
    async getUpcomingEditions() {
      this.page++;
      if (this.page === 1) {
        this.collections = [];
      }
      this.type = "collection";
      const res = await getUpcomingEditions({
        page: this.page,
        limit: this.limit,
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
            await this.getUpcomingEditions();
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
  //   mounted(){
  //   console.log(this.getUpcomingEditions);
  // }
};
</script>
