<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <div
      class="tw-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <div class="collection1">
        <NuxtLink to="/dashboard/create-collection"
          ><gradient-border-button
            >Create New Collection</gradient-border-button
          >
        </NuxtLink>
      </div>
    </div>
    <div class="tw-w-full tw-py-2">
      <v-tabs
        active-class="!tw-text-wapal-pink"
        class="!tw-bg-transparent"
        id="explore-tab"
        v-model="launchpadTab"
        @change="tabChanged(launchpadTab)"
      >
        <v-tab
          :ripple="false"
          class="!tw-capitalize !tw-text-white"
          v-for="tab in launchpadTabs"
          :key="tab.id"
          >{{ tab.title }}</v-tab
        >
      </v-tabs>
    </div>
    <v-tabs-items
      v-model="launchpadTab"
      id="explore-tab-items"
      class="tw-py-8 tw-w-full"
      v-if="!loading"
      @change="tabChanged(launchpadTab)"
    >
      <v-tab-item>
        <div
          class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-10 tw-py-4 md:tw-grid-cols-2 1xl:tw-grid-cols-3 1xl:tw-gap-12 3xl:tw-grid-cols-3"
        >
          <nft-card
            v-for="collection in liveCollections"
            :key="collection._id"
            v-if="liveCollections[0]._id"
            :collection="collection"
          />
        </div>
        <h2
          class="tw-text-wapal-pink tw-text-xl tw-text-center tw-w-full"
          v-if="liveCollections.length === 0"
        >
          No Live Collections
        </h2>
      </v-tab-item>
      <v-tab-item>
        <div
          class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-10 tw-py-4 md:tw-grid-cols-2 1xl:tw-grid-cols-3 1xl:tw-gap-12 3xl:tw-grid-cols-3"
        >
          <nft-card
            v-for="collection in underReviewCollections"
            :key="collection._id"
            v-if="underReviewCollections[0]._id"
            :collection="collection"
          />
        </div>

        <h2
          class="tw-text-wapal-pink tw-text-xl tw-text-center tw-w-full"
          v-if="underReviewCollections.length === 0"
        >
          No Under Review Collections
        </h2>
      </v-tab-item>
      <v-tab-item>
        <div
          class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-10 tw-py-4 md:tw-grid-cols-2 1xl:tw-grid-cols-3 1xl:tw-gap-12 3xl:tw-grid-cols-3"
        >
          <nft-card
            v-for="collection in drafts"
            :key="collection._id"
            v-if="drafts[0]._id"
            :collection="collection"
            redirectTo="draft"
          />
        </div>
        <h2
          class="tw-text-wapal-pink tw-text-xl tw-text-center tw-w-full"
          v-if="drafts.length === 0"
        >
          No Drafts
        </h2>
      </v-tab-item>
    </v-tabs-items>
    <div
      class="tw-py-16 tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
      v-else
    >
      <loading />
    </div>
  </div>
</template>

<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Loading from "@/components/Reusable/Loading.vue";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import {
  getApprovedCollectionsOfUser,
  getUnderReviewCollectionsOfUser,
  getDraftsOfUser,
} from "@/services/CollectionService";
export default {
  layout: "dashboard",
  components: { NftCard, Loading, GradientBorderButton },
  data() {
    return {
      liveCollections: [{ _id: "" }],
      underReviewCollections: [{ _id: "" }],
      drafts: [{ _id: "" }],
      loading: true,

      launchpadTabs: [
        { id: 0, title: "Live" },
        { id: 1, title: "Under Review" },
        { id: 2, title: "Draft" },
      ],
      launchpadTab: null,
    };
  },
  methods: {
    async tabChanged(tab: any) {
      this.liveCollections = [];
      this.underReviewCollections = [];
      this.drafts = [];

      if (tab === 0) {
        await this.mapLiveCollections(1);
      } else if (tab === 1) {
        await this.mapUnderReviewCollections(1);
      } else if (tab === 2) {
        await this.mapDrafts(1);
      }
    },
    async mapLiveCollections(page: number) {
      this.loading = true;

      const res = await getApprovedCollectionsOfUser(
        this.$store.state.userStore.user.user_id,
        page
      );

      this.liveCollections.push(...res.data.data);

      this.loading = false;
    },
    async mapUnderReviewCollections(page: number) {
      this.loading = true;
      const res = await getUnderReviewCollectionsOfUser(
        this.$store.state.userStore.user.user_id,
        page
      );

      this.underReviewCollections.push(...res.data.data);
      this.loading = false;
    },
    async mapDrafts(page: number) {
      this.loading = true;
      const res = await getDraftsOfUser(page);

      res.data.data.map((draft: any) => {
        this.drafts.push({ ...draft.data, _id: draft._id });
      });

      this.loading = false;
    },
  },
};
</script>
<style scoped>
.v-window {
  overflow: visible !important;
}
</style>
