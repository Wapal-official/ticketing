<template>
  <div class="tw-pb-8 tw-w-full tw-min-h-screen tw-px-8">
    <div class="tw-container tw-mx-auto">
      <v-tabs
        active-class="!tw-text-wapal-pink"
        class="!tw-bg-transparent"
        id="explore-tab"
        v-model="exploreTab"
        @change="tabChanged(exploreTab)"
      >
        <v-tab
          :ripple="false"
          class="!tw-capitalize !tw-text-white"
          v-for="tab in exploreTabs"
          :key="tab.id"
          >{{ tab.title }}</v-tab
        >
      </v-tabs>
    </div>
    <v-tabs-items
      v-model="exploreTab"
      id="explore-tab-items"
      class="tw-py-8"
      v-if="!loading"
      @change="tabChanged(exploreTab)"
    >
      <v-tab-item class="tw-container tw-mx-auto">
        <div
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 md:tw-grid-rows-2 lg:tw-grid-cols-3 lg:grid-rows-1 1xl:tw-grid-cols-4 lg:tw-grid-rows-1 lg:tw-gap-12"
        >
          <nft-card
            v-for="collection in collections"
            :key="collection._id"
            :collection="collection"
          />
        </div>
      </v-tab-item>
      <v-tab-item class="tw-container tw-mx-auto">
        <div
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 md:tw-grid-rows-2 lg:tw-grid-cols-3 lg:grid-rows-1 1xl:tw-grid-cols-4 lg:tw-grid-rows-1 lg:tw-gap-12"
        >
          <nft-card
            v-for="collection in liveCollections"
            :key="collection._id"
            :collection="collection"
          />
        </div>
      </v-tab-item>
      <v-tab-item class="tw-container tw-mx-auto">
        <div
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 md:tw-grid-rows-2 lg:tw-grid-cols-3 lg:grid-rows-1 1xl:tw-grid-cols-4 lg:tw-grid-rows-1 lg:tw-gap-12"
        >
          <nft-card
            v-for="collection in upcomingCollections"
            :key="collection._id"
            :collection="collection"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
    <div class="py-16" v-else>
      <loading />
    </div>
  </div>
</template>
<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Loading from "@/components/Reusable/Loading.vue";
import {
  getCollections,
  getLiveCollections,
  getUpcomingCollections,
} from "@/services/CollectionService";
export default {
  components: { NftCard, Loading },
  data() {
    return {
      exploreTab: null,
      exploreTabs: [
        { id: 0, title: "All NFT" },
        { id: 1, title: "Live" },
        { id: 2, title: "Upcoming" },
      ],
      collections: [{ _id: null }],
      liveCollections: [{ _id: null }],
      upcomingCollections: [{ _id: null }],
      loading: true,
    };
  },
  computed: {},
  methods: {
    async tabChanged(tab: any) {
      this.collections = [];
      this.liveCollections = [];
      this.upcomingCollections = [];

      if (tab === 0) {
        await this.mapAllCollections(1);
      } else if (tab === 1) {
        await this.mapLiveCollections(1);
      } else if (tab === 2) {
        await this.mapUpcomingCollections(1);
      }
    },
    async mapLiveCollections(page: any) {
      this.loading = true;

      const res = await getLiveCollections(page, 10);

      this.liveCollections.push(...res.data.data);

      this.loading = false;
    },
    async mapUpcomingCollections(page: any) {
      this.loading = true;

      const res = await getUpcomingCollections(page, 10);

      this.upcomingCollections.push(...res.data.data);

      this.loading = false;
    },
    async mapAllCollections(page: any) {
      this.loading = true;

      this.collections = await getCollections(page, 10);

      this.loading = false;
    },
    async getActiveTab() {
      this.collections = [];
      this.liveCollections = [];
      this.upcomingCollections = [];

      this.exploreTab = 1;

      const activeTabTitle = this.$store.state.exploreStore.tab;

      const activeTab = this.exploreTabs.find(
        (tab: any) => tab.title.toLowerCase() === activeTabTitle.toLowerCase()
      );

      if (activeTab.id === 0) {
        await this.mapAllCollections(1);
      } else if (activeTab.id === 1) {
        await this.mapLiveCollections(1);
      } else {
        await this.mapUpcomingCollections(1);
      }

      this.exploreTab = activeTab.id;
    },
  },
  async mounted() {
    await this.getActiveTab();

    this.loading = false;
  },
};
</script>
<style scoped>
.v-window {
  overflow: visible !important;
}
</style>
