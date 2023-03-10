<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <div
      class="tw-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <h1 class="tw-text-lg">Application</h1>
      <NuxtLink to="/dashboard/create-collection"
        ><gradient-border-button
          >Create New Collection</gradient-border-button
        ></NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Loading from "@/components/Reusable/Loading.vue";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import { getCollections } from "@/services/CollectionService";
export default {
  layout: "dashboard",
  components: { NftCard, Loading, GradientBorderButton },
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
