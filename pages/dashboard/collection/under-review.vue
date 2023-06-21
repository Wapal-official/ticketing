<template>
  <div class="tw-w-full">
    <div class="tw-w-full">
      <div
        class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-10 tw-py-4 md:tw-grid-cols-2 1xl:tw-grid-cols-3 1xl:tw-gap-12 3xl:tw-grid-cols-3"
      >
        <nft-card
          v-for="collection in collections"
          :key="collection._id"
          v-if="collections[0]._id"
          :collection="collection"
          redirectTo="edit"
        />
      </div>
      <h2
        class="tw-text-wapal-pink tw-text-xl tw-text-center tw-w-full"
        v-if="collections.length === 0 && !loading"
      >
        No Live Collections
      </h2>
    </div>

    <div class="py-16" v-if="loading">
      <reusable-loading />
    </div>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: mapCollections,
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
import { getUnderReviewCollectionsOfUser } from "@/services/CollectionService";

export default {
  data() {
    return {
      collections: [{ _id: 0 }],
      loading: true,
      end: false,
      page: 0,
    };
  },
  methods: {
    async mapCollections() {
      this.loading = true;
      this.page++;

      const collections = await getUnderReviewCollectionsOfUser(
        this.$store.state.userStore.user.user_id,
        this.page
      );

      this.collections.push(...collections);

      if (collections.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
  },
  created() {
    this.collections = [];
  },
};
</script>
