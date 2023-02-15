<template>
  <div class="tw-w-full">
    <div
      class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-center tw-text-wapal-pink tw-text-xl"
      v-if="upcomingCollection.length < 1"
    >
      No Upcoming Collections
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-4"
    >
      <div class="tw-flex tw-flex-row tw-flex-wrap">
        <div
          class="tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-4"
        >
          <nft-card
            v-for="collection in upcomingCollection"
            :key="collection._id"
            :collection="collection"
          />
        </div>
      </div>
      <NuxtLink
        class="landing-gradient-border-button tw-w-fit !tw-text-white tw-transition-all tw-duration-150 tw-ease-linear"
        to="/explore"
      >
        <span
          class="tw-rounded tw-h-full tw-bg-wapal-background tw-px-6 tw-py-2"
        >
          View All</span
        >
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Collection from "@/interfaces/collection";
export default {
  props: { collections: { type: Array } },
  components: { NftCard },
  data() {
    return {
      upcomingCollection: [
        {
          _id: "",
          name: "",
          image: "",
          supply: "",
          candyMachine_id: {
            whitelist_sale_time: null,
            public_sale_time: null,
            whitelist_sale_price: null,
            public_sale_price: null,
          },
        },
      ],
    };
  },
  mounted() {
    const collections: Collection[] = this.collections;
    this.upcomingCollection = collections;
  },
};
</script>
