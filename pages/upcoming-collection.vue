<template>
  <div class="tw-container tw-mx-auto">
    <landing-section-heading heading="Upcoming Events" class="tw-pb-8" />
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
  getApprovedDrafts,
  getUpcomingCollections,
} from "@/services/CollectionService";
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

      const collections = await getUpcomingCollections(this.page, 10);

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

      if (this.collectionEnd) {
        const draftRes = await getApprovedDrafts(this.page, 10);
        const drafts: any[] = [];

        draftRes.map((draft: any) => {
          drafts.push({
            baseURL: draft.data.baseURL,
            candy_id: draft.data.candy_id,
            description: draft.data.description,
            discord: draft.data.discord,
            image: getCachedUrlOfImage(draft.data.image),
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

        const cachedDrafts = drafts.map((draft: any) => ({
          ...draft,
          image: getCachedUrlOfImage(draft.image),
        }));

        this.collections.push(...cachedDrafts);

        if (drafts.length === 0) {
          this.end = true;
        }
      }
      this.loading = false;
    },
  },
};
</script>
