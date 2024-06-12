<template>
  <div class="tw-container tw-mx-auto">
    <landing-section-heading heading="Latest Collection" class="tw-pb-8" />
    <div
      v-if="!loading && collections.length === 0"
      class="tw-w-full tw-text-center tw-text-xl tw-text-primary-1"
    >
      No Collections
    </div>
    <div
      class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-x-6 tw-gap-y-8 md:tw-grid-cols-2 lg:tw-grid-cols-3 1xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
      v-else
    >
      <nft-collection-card
        v-for="(collection, index) in collections"
        :key="index"
        :collection="collection"
      />
    </div>
    <div class="py-16" v-if="loading">
      <reusable-loading />
    </div>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: mapAllCollections,
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
import { getLiveCollections } from "@/services/CollectionService";
export default {
  layout: "all-collection",
  data() {
    return {
      collections: [],
      end: false,
      limit: 4,
      page: 0,
      loading: true,
    };
  },
  async created() {
    this.collections = [];

    const monkeySanctuary = {
      name: "Aptosaaa Monkeys Sanctuary",
      description:
        "Sanctuaries are homes to the fighting Monkeys who stood their ground to protect their lands and fortunes.",
      image:
        "https://aggregator-cache.wapal.io/api/cache?l=https://arweave.net/z92BGaOGx-DYVTP_O8W31rAsu3PUO7uAQjzgXIoB2vc/199.png",
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
      },
      status: {
        sold_out: false,
      },
      username: "monkkesanturies",
      supply: 500,
    };

    this.collections.push(monkeySanctuary);
  },
  methods: {
    async mapAllCollections() {
      this.page++;
      this.loading = true;

      const collections = await getLiveCollections(this.page, 10);

      this.collections.push(...collections);

      if (collections.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
  },
};
</script>
