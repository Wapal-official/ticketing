<template>
  <section class="tw-w-full tw-bg-dark-8 tw-pb-24">
    <div
      class="tw-container tw-mx-auto tw-px-8 md:tw-w-[90%] lg:tw-w-full xl:tw-px-[3.75rem] 3xl:tw-w-[90%]"
    >
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-justify-between md:tw-items-center tw-pb-8"
      >
        <h2 class="tw-uppercase tw-text-white tw-font-bold tw-text-[2rem]">
          Auction
        </h2>
        <button-primary
          :bordered="true"
          title="View All"
          @click="$router.push('/live-auction')"
        />
      </div>
      <div
        class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3 1xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
        v-if="!loading"
      >
        <auction-landing-card
          v-for="(auction, index) in auctions"
          :key="index"
          :auction="auction"
          :class="{
            'lg:tw-hidden 1xl:tw-flex': index === 3,
            'tw-hidden 3xl:tw-flex': index === 4,
          }"
        />
      </div>
      <loading-collections v-else />
    </div>
  </section>
</template>
<script lang="ts">
import {
  getEndedAuctions,
  getUpcomingAuctions,
} from "@/services/AuctionService";

export default {
  data() {
    return { auctions: [], loading: true };
  },
  async mounted() {
    this.auctions = await getUpcomingAuctions({ page: 1, perPage: 5 });

    if (this.auctions.length < 5) {
      const endedRes = await getEndedAuctions({
        page: 1,
        perPage: 5 - this.auctions.length,
      });

      this.auctions.push(...endedRes);
    }

    this.loading = false;
  },
};
</script>
