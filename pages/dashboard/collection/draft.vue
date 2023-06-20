<template>
  <div class="tw-w-full">
    <div class="tw-w-full">
      <div
        class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-10 tw-py-4 md:tw-grid-cols-2 1xl:tw-grid-cols-3 1xl:tw-gap-12 3xl:tw-grid-cols-3"
      >
        <nft-card
          v-for="draft in drafts"
          :key="draft._id"
          v-if="drafts[0]._id"
          :collection="draft"
          redirectTo="draft"
        />
      </div>
      <h2
        class="tw-text-wapal-pink tw-text-xl tw-text-center tw-w-full"
        v-if="drafts.length === 0 && !loading"
      >
        No Drafts
      </h2>
    </div>

    <div class="py-16" v-if="loading">
      <reusable-loading />
    </div>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: mapDrafts,
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
import { getDraftsOfUser } from "@/services/CollectionService";

export default {
  data() {
    return {
      drafts: [{ _id: 0 }],
      loading: true,
      end: false,
      page: 0,
    };
  },
  methods: {
    async mapDrafts() {
      this.loading = true;
      this.page++;

      const drafts = await getDraftsOfUser(this.page);

      drafts.map((draft: any) => {
        this.drafts.push({ ...draft.data, _id: draft._id });
      });

      if (drafts.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
  },
  created() {
    this.drafts = [];
  },
};
</script>
