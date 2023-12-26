<template>
  <div class="tw-container tw-mx-auto">
    <landing-section-heading heading="Soldout Collection" class="tw-pb-8" />
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
  </div>
</template>
<script lang="ts">
import { getCollections } from "@/services/CollectionService";

export default {
  layout: "all-collection",
  data() {
    return {
      collections: [],
      paginatedCollections: [],
      loading: true,
    };
  },
  methods: {
    async fetchCollections() {
      this.loading = true;

      const collections = await getCollections(1, 100);

      collections.map((collection: any) => {
        const whitelistSaleTime = collection.candyMachine.whitelist_sale_time
          ? new Date(collection.candyMachine.whitelist_sale_time).getTime()
          : null;

        const publicSaleTime = new Date(
          collection.candyMachine.public_sale_time
        ).getTime();

        let soldOutIn: any = 0;

        if (collection.status.sold_out) {
          const soldOutTime = new Date(collection.status.time).getTime();

          if (whitelistSaleTime) {
            soldOutIn = Math.floor((soldOutTime - whitelistSaleTime) / 1000);
          } else {
            soldOutIn = Math.floor((soldOutTime - publicSaleTime) / 1000);
          }

          this.collections.push(collection);
        }
      });

      this.paginatedCollections = this.collections;

      this.loading = false;
    },

    sortCollectionBasedOnSoldOutTime() {
      this.collections.sort((a: any, b: any) => a.soldOutIn - b.soldOutIn);
    },
    rankCollectionBasedOnSoldOutTime() {
      let i = 1;

      this.collections.map((collection: any) => {
        collection.rank = i;
        i++;
      });
    },
    redirectToCollection(username: string) {
      if (username) {
        this.$router.push(`/nft/${username}`);
      }
    },
    getFormattedTimeForSoldOutIn(soldOutIn: any) {
      if (soldOutIn > 60 * 60 * 24) {
        soldOutIn = Math.floor(soldOutIn / (60 * 60 * 24)) + " Days";
      } else if (soldOutIn > 60 * 60) {
        soldOutIn = Math.floor(soldOutIn / (60 * 60)) + " Hours";
      } else if (soldOutIn > 60) {
        soldOutIn = (soldOutIn / 60).toFixed(2) + " Minutes";
      } else {
        soldOutIn = soldOutIn + " Seconds";
      }
      return soldOutIn;
    },
  },
  async mounted() {
    await this.fetchCollections();
  },
};
</script>
<style>
.whitelist-data-table {
  min-width: 100% !important;
  max-width: 100% !important;
  overflow-x: auto !important;
  background: transparent !important;
}
</style>
