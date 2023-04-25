<template>
  <div class="tw-w-full">
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
    >
      <h1 class="tw-text-lg tw-text-wapal-dashboard-active">All Collections</h1>
      <div
        class="tw-container tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3"
        v-if="!loading"
      >
        <nft-card
          v-for="collection in collections"
          :key="collection._id"
          :collection="collection"
          redirectTo="whitelist"
          type="dashboard"
          v-if="collections[0]._id"
        />
      </div>
      <loading v-else />

      <div
        class="tw-w-full tw-text-center tw-py-4 tw-text-wapal-dashboard-active"
        v-if="this.collections.length === 0"
      >
        No Collections
      </div>
    </div>
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-py-8 tw-w-full"
    >
      <h1 class="tw-text-lg tw-text-wapal-dashboard-active">
        Whitelisted Collections
      </h1>
      <div
        class="tw-container tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3"
        v-if="!loading"
      >
        <whitelist-card
          v-for="whitelist in whitelists"
          :key="whitelist._id"
          :whitelist="whitelist"
          type="dashboard"
          v-if="whitelists[0]._id"
        />
      </div>
      <loading v-else />
      <div
        class="tw-w-full tw-text-center tw-py-4 tw-text-wapal-dashboard-active"
        v-if="this.whitelists.length === 0"
      >
        No Whitelisted Collections
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import WhitelistCard from "@/components/Whitelist/WhitelistCard.vue";
import NftCard from "@/components/Nft/NftCard.vue";
import Loading from "@/components/Reusable/Loading.vue";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import { getCollectionsOfUser } from "@/services/CollectionService";
import { getWhitelistOfUser } from "@/services/WhitelistService";
export default {
  layout: "dashboard",
  components: { NftCard, Loading, GradientBorderButton, WhitelistCard },
  data() {
    return {
      collections: [{ _id: null }],
      whitelists: [{ _id: null }],
      loading: true,
    };
  },
  computed: {},
  methods: {},
  async mounted() {
    const collectionRes = await getCollectionsOfUser(
      this.$store.state.userStore.user.user_id
    );

    const whitelistRes = await getWhitelistOfUser(
      this.$store.state.userStore.user.user_id
    );

    this.collections = collectionRes.data.data.filter((collection: any) => {
      const whitelistSaleDate = new Date(
        collection.candyMachine.whitelist_sale_time
      ).getTime();

      const publicSaleDate = new Date(
        collection.candyMachine.public_sale_time
      ).getTime();

      if (publicSaleDate - whitelistSaleDate !== 1000) {
        return collection;
      }
    });

    this.whitelists = whitelistRes.data.whitelists;

    this.collections = this.collections.filter((collection: any) => {
      try {
        this.whitelists.map((whitelist: any) => {
          if (whitelist.collection_id === collection._id) {
            throw new Error("Collection In Whitelist");
          }
        });
        return collection;
      } catch (error) {}
    });

    this.loading = false;
  },
};
</script>
