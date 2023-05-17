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
      v-if="!loading && collections[0]._id !== null"
      @change="tabChanged(exploreTab)"
    >
      <v-tab-item class="tw-container tw-mx-auto">
        <div
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-grid-rows-1 lg:tw-gap-12 2xl:tw-grid-cols-4"
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
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-grid-rows-1 lg:tw-gap-12 2xl:tw-grid-cols-4"
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
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-grid-rows-1 lg:tw-gap-12 2xl:tw-grid-cols-4"
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
import { getCollections } from "@/services/CollectionService";
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
    tabChanged(tab: any) {
      this.loading = true;

      if (tab === 1) {
        this.getLiveCollection();
      } else if (tab === 2) {
        this.getUpcomingCollection();
      }

      this.loading = false;
    },
    getLiveCollection() {
      this.liveCollections = this.collections.filter((collection: any) => {
        const whitelistSaleDate = collection.candyMachine.whitelist_sale_time
          ? new Date(collection.candyMachine.whitelist_sale_time)
          : null;

        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        );

        const now = new Date();

        if (!collection.status.sold_out) {
          if (!whitelistSaleDate) {
            if (publicSaleDate < now) {
              return collection;
            }
          } else {
            if (whitelistSaleDate < now && publicSaleDate < now) {
              return collection;
            }
          }
        }
      });
    },
    getUpcomingCollection() {
      this.upcomingCollections = this.collections.filter((collection: any) => {
        const whitelistSaleDate = collection.candyMachine.whitelist_sale_time
          ? new Date(collection.candyMachine.whitelist_sale_time)
          : null;

        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        );

        const now = new Date();

        if (!whitelistSaleDate) {
          if (publicSaleDate > now) {
            return collection;
          }
        } else {
          if (whitelistSaleDate > now && publicSaleDate > now) {
            return collection;
          }
        }
      });
    },
    async getAllCollections() {
      this.collections = await getCollections(1, 100);
    },
    getActiveTab() {
      this.exploreTab = 1;

      const activeTabTitle = this.$store.state.exploreStore.tab;

      const activeTab = this.exploreTabs.find(
        (tab: any) => tab.title.toLowerCase() === activeTabTitle.toLowerCase()
      );

      if (activeTab.id === 0) {
        this.getAllCollections();
      } else if (activeTab.id === 1) {
        this.getLiveCollection();
      } else {
        this.getUpcomingCollection();
      }

      this.exploreTab = activeTab.id;
    },
  },
  async mounted() {
    await this.getAllCollections();

    this.getActiveTab();

    this.loading = false;
  },
};
</script>
<style scoped>
.v-window {
  overflow: visible !important;
}
</style>
