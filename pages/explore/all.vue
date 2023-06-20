<template>
  <div class="tw-container tw-mx-auto">
    <div
      class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 md:tw-grid-rows-2 lg:tw-grid-cols-3 lg:grid-rows-1 1xl:tw-grid-cols-4 lg:tw-grid-rows-1 lg:tw-gap-12"
    >
      <nft-card
        v-for="collection in collections"
        :key="collection._id"
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
import { getCollections } from "@/services/CollectionService";

export default {
  data() {
    return {
      collections: [{ _id: null }],
      loading: true,
      page: 0,
      end: false,
    };
  },
  methods: {
    async mapAllCollections() {
      this.page++;
      this.loading = true;

      const collections = await getCollections(this.page, 10);

      this.collections.push(...collections);

      if (collections.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
  },
  async mounted() {
    this.collections = [];
  },
};
</script>
