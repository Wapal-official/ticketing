<template>
  <NuxtLink
    class="!tw-text-white tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-rounded-lg tw-border-solid tw-border tw-border-dark-4 tw-group md:tw-w-[313.6px] md:tw-max-w-[314px]"
    v-if="!loading"
    :to="`/whitelist/${collection.username}`"
  >
    <div
      class="tw-w-full tw-h-[312px] tw-rounded-t-lg tw-overflow-hidden md:tw-w-[312px] md:tw-min-h-[312px]"
    >
      <img
        class="tw-w-full tw-h-[312px] tw-object-cover tw-rounded-t-lg tw-transition-all tw-duration-200 tw-ease-linear tw-transform md:tw-min-w-[313px] md:tw-h-[312px] group-hover:tw-scale-125"
        :src="collection.image"
        :alt="collection.name"
      />
    </div>
    <div
      class="tw-p-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-w-full"
    >
      <h3 class="tw-text-lg tw-font-bold">{{ collection.name }}</h3>
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
      >
        <div class="tw-text-sm tw-text-white/70">
          {{ this.takenSpots }}/{{ this.totalSpots }} Spot Taken
        </div>
        <div
          class="tw-w-full tw-relative tw-rounded-full tw-bg-white/20 tw-h-2"
        >
          <div
            class="tw-rounded-full tw-absolute tw-top-0 tw-h-2 tw-bg-primary-1"
            ref="takenSpotProgress"
          ></div>
        </div>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
      >
        <div class="tw-text-white/70 tw-uppercase tw-text-xs tw-font-semibold">
          Mint Date
        </div>
        <div class="tw-text-sm">{{ getMintDate }}</div>
      </div>
    </div>
  </NuxtLink>
  <div
    class="tw-w-full tw-h-[338px] tw-max-h-[338px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse md:tw-h-full md:tw-max-h-full 3xl:tw-flex"
    v-else
  ></div>
</template>
<script lang="ts">
import { getCollection } from "@/services/CollectionService";
import { getWhitelistEntryById } from "@/services/WhitelistService";
import moment from "moment";
export default {
  props: { whitelist: { type: Object } },
  data() {
    return {
      loading: true,
      collection: { _id: "", name: "", image: "", username: "" },
      totalSpots: 0,
      takenSpots: 0,
      takenSpotsPercent: 0,
    };
  },
  async mounted() {
    const res = await getCollection(this.whitelist.collection_id);
    const whitelistRes = await getWhitelistEntryById(
      this.whitelist.collection_id,
      1,
      1,
      "whitelist"
    );

    if (res.collection.length < 1) {
      this.loading = true;
      return;
    }

    this.collection = res.collection[0];

    this.totalSpots = this.whitelist.whitelist_spots;
    this.takenSpots = whitelistRes.data.spotsCount;

    this.takenSpotsPercent = Math.floor(
      (this.takenSpots * 100) / this.totalSpots
    );

    this.loading = false;

    setTimeout(() => {
      this.$refs.takenSpotProgress.style.width = this.takenSpotsPercent + "%";
    }, 100);
  },
  computed: {
    getMintDate() {
      if (this.collection.phases && this.collection.phases.length > 0) {
        return moment(this.collection.phases[0].mint_time).format(
          "MMM DD, hh:MM A"
        );
      }

      return moment(this.collection.candyMachine.public_sale_time).format(
        "MMM DD, hh:MM A"
      );
    },
  },
};
</script>
