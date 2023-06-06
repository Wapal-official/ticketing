<template>
  <div class="tw-w-full">
    <div
      class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-center tw-text-wapal-pink tw-text-xl"
      v-if="upcomingCollection.length < 1"
    >
      No Upcoming Collections
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4"
      v-else
    >
      <div class="tw-flex tw-flex-row tw-flex-wrap tw-w-full">
        <div
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 md:tw-grid-rows-2 lg:tw-grid-cols-3 lg:grid-rows-1 1xl:tw-grid-cols-4 lg:tw-grid-rows-1 lg:tw-gap-12"
        >
          <nft-card
            v-for="(collection, index) in upcomingCollection"
            :key="collection._id"
            :collection="collection"
            :redirectTo="collection.redirectTo ? collection.redirectTo : ''"
            :class="{
              'lg:tw-hidden 1xl:tw-flex': index === 3,
            }"
          />
        </div>
      </div>
      <gradient-border-button
        @click.native="goToExplorePage"
        class="tw-mt-2 tw-self-end"
      >
        View All
      </gradient-border-button>
    </div>
  </div>
</template>
<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Collection from "@/interfaces/collection";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
export default {
  props: { collections: { type: Array } },
  components: { NftCard, GradientBorderButton },
  data() {
    return {
      upcomingCollection: [
        {
          _id: "",
          name: "",
          image: "",
          supply: "",
          candyMachine: {
            whitelist_sale_time: null,
            public_sale_time: null,
            whitelist_sale_price: null,
            public_sale_price: null,
          },
          status: { sold_out: false },
          redirectTo: "",
        },
      ],
    };
  },
  mounted() {
    const collections: Collection[] = this.collections;
    this.upcomingCollection = collections;
  },
  methods: {
    goToExplorePage() {
      this.$router.push("/explore/upcoming");
    },
  },
};
</script>
