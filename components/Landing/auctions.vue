<template>
  <div class="tw-w-full">
    <div
      class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-center tw-text-wapal-pink tw-text-xl"
      v-if="auctions.length < 1"
    >
      No Auctions
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4"
      v-else
    >
      <div class="tw-flex tw-flex-row tw-flex-wrap tw-w-full">
        <div
          class="tw-grid tw-w-full tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 md:tw-grid-rows-2 lg:tw-grid-cols-3 lg:grid-rows-1 1xl:tw-grid-cols-4 lg:tw-grid-rows-1 lg:tw-gap-12"
        >
          <auction-card
            v-for="(auction, index) in auctions"
            :key="auction._id"
            :auction="auction"
            :class="{
              'lg:tw-hidden xl:tw-flex': index === 3,
            }"
          />
        </div>
      </div>
      <gradient-border-button
        @click.native="$router.push('/auctions')"
        class="tw-mt-2 tw-self-end"
      >
        View All
      </gradient-border-button>
    </div>
  </div>
</template>

<script>
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
export default {
  components: { GradientBorderButton },
  props: {
    auctions: {
      Type: Array,
      required: true,
    },
  },
};
</script>
