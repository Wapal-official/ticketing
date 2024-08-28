<template>
  <div class="tw-container tw-mx-auto">
    <!-- <landing-section-heading heading="Upcoming Events" class="tw-pb-8" /> -->
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
import {
  getUpcomingEditions,
} from "@/services/EditionService";
import { getCachedUrlOfImage } from "@/utils/imageCache";
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
  },
  methods: {
    async mapAllCollections() {
      this.page++;
      this.loading = true;

      const collections = await getUpcomingEditions({page:this.page,limit:this.limit});

      const cachedCollections = collections.map((collection: any) => ({
        ...collection,
        image: getCachedUrlOfImage(collection.image),
      }));

      this.collections.push(...cachedCollections);

      if (
        !this.collectionEnd &&
        (collections.length === 0 || collections.length <= 5)
      ) {
        this.collectionEnd = true;
        this.page = 1;
      }
      this.loading = false;
    },
  },
};
</script>
