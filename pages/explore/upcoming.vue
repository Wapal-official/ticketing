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
import {
  getApprovedDrafts,
  getUpcomingCollections,
} from "@/services/CollectionService";

export default {
  data() {
    return {
      collections: [{ _id: null }],
      loading: true,
      page: 0,
      end: false,
      collectionEnd: true,
    };
  },
  methods: {
    async mapAllCollections() {
      this.page++;
      this.loading = true;

      const collections = await getUpcomingCollections(this.page, 10);

      this.collections.push(...collections);

      if (!this.collectionEnd && collections.length === 0) {
        this.collectionEnd = true;
        this.page = 1;
      }

      if (this.collectionEnd) {
        const draftRes = await getApprovedDrafts(this.page, 10);
        const drafts: any[] = [];

        draftRes.map((draft: any) => {
          drafts.push({
            baseURL: draft.data.baseURL,
            candy_id: draft.data.candy_id,
            description: draft.data.description,
            discord: draft.data.discord,
            image: draft.data.image,
            instagram: draft.data.instagram,
            isApproved: draft.data.isApproved,
            name: draft.data.name,
            phases: draft.data.phases,
            public_sale_price: draft.data.public_sale_price,
            public_sale_time: draft.data.public_sale_time,
            royalty_payee_address: draft.data.royalty_payee_address,
            royalty_percentage: draft.data.royalty_percentage,
            supply: draft.data.supply,
            twitter: draft.data.twitter,
            website: draft.data.website,
            whitelist_price: draft.data.whitelist_price,
            redirectTo: "landingDraft",
            _id: draft._id,
          });
        });

        this.collections.push(...drafts);

        if (drafts.length === 0) {
          this.end = true;
        }
      }

      this.loading = false;
    },
  },
  async mounted() {
    this.collections = [];
  },
};
</script>
