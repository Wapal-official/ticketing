<template>
  <div class="tw-container tw-mx-auto">
    <landing-section-heading heading="Ended Events" class="tw-pb-8" />
    <div
      v-if="!loading && collections.length === 0"
      class="tw-w-full tw-text-center tw-text-xl tw-text-primary-1"
    >
      No Editions
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
import { getAllEditions } from "@/services/EditionService";

export default {
  layout: "all-edition",
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
  },
  methods: {
    async mapAllCollections() {
      this.page++;
      this.loading = true;

      const collections = await getAllEditions({ page: this.page, limit: 10 });

      const pausedRes = await Promise.all(
        collections.map(async (collection: any) => {
          const res = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfCollection",
            {
              resourceAccountAddress: collection.candyMachine.resource_account,
              candyMachineId: collection.candyMachine.candy_id,
            }
          );

          collection.paused = res.paused;
        })
      );

      const pausedEditions = collections.filter(
        (collection: any) => collection.paused
      );

      this.collections.push(...pausedEditions);

      if (collections.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
  },
};
</script>
