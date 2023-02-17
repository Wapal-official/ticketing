<template>
  <div class="tw-w-full">
    <div class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full">
      <h1 class="tw-text-lg">Application</h1>
      <NuxtLink to="/dashboard/create-collection" class="dashboard-gradient-button">Create New Collection</NuxtLink>
    </div>
    <!-- <div v-if="!loading && collections[0]._id !== null"
        class="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3">
        <nft-card v-for="collection in collections" :key="collection._id" :collection="collection" />
      </div>
      <div class="py-16" v-else>
        <loading />
      </div> -->
</div>
</template>

<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Loading from "@/components/Reusable/Loading.vue";
import { getCollections } from "@/services/CollectionService";
export default {
  layout: "dashboard",
  components: { NftCard, Loading },
  data() {
    return {
      collections: [{ _id: null }],
      loading: true,
    };
  },
  methods: {
    async getAllCollections() {
      this.collections = await getCollections();
    },
  },
  mounted() {
    this.getAllCollections();
    this.loading = false;
  },
};
</script>
