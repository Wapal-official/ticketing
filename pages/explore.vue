<template>
  <div class="tw-w-full tw-min-h-screen tw-px-8 tw-pt-32 tw-pb-14">
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
      <div class="tw-py-8">
        <Nuxt />
      </div>
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
  getApprovedDrafts,
} from "@/services/CollectionService";
export default {
  components: { NftCard, Loading },
  data() {
    return {
      exploreTab: 0,
      exploreTabs: [
        { id: 0, title: "All NFT" },
        { id: 1, title: "Live" },
        { id: 2, title: "Upcoming" },
      ],
      collections: [{ _id: null }],
      liveCollections: [{ _id: null }],
      upcomingCollections: [{ _id: null, redirectTo: "" }],
      loading: true,
    };
  },
  computed: {
    getPath() {
      return this.$route.path.slice(9, this.$route.path.length);
    },
  },
  methods: {
    tabChanged(tab: number) {
      if (tab === 0) {
        this.$router.push(`/explore/all`);
      } else if (tab === 1) {
          this.$router.push(`/explore/live`);
      } else if (tab === 2) {
        this.$router.push(`/explore/upcoming`);
      }
    },
    async getActiveTab() {
      if (this.getPath === "all") {
        this.exploreTab = 0;
      } else if (this.getPath === "live") {
        this.exploreTab = 1;
      } else {
        this.exploreTab = 2;
      }
    },
  },
  mounted() {
    if (this.$route.path === "/explore" || this.$route.path === "/explore/") {
      this.$router.push("/explore/all");
    }
    this.getActiveTab();

    this.loading = false;
  },
  watch: {
    getPath(path: string) {
      if (path === "all") {
        this.exploreTab = 0;
      } else if (path === "live") {
        this.exploreTab = 1;
      } else {
        this.exploreTab = 2;
      }
    },
  },
};
</script>
<style scoped>
.v-window {
  overflow: visible !important;
}
</style>
