<template>
  <NuxtLink
    class="tw-group tw-w-full tw-h-[360px] lg:tw-w-[320px] lg:tw-h-[360px] 3xl:tw-h-[450px] 3xl:tw-w-[400px]"
    v-if="!loading"
    :to="
      type === 'landing'
        ? `/whitelist/${collection.username}`
        : `/dashboard/whitelist/${collection?.username}`
    "
  >
    <div class="tw-rounded tw-relative tw-w-full tw-h-full">
      <div class="tw-w-full tw-h-full tw-overflow-hidden tw-rounded-md">
        <img
          :src="collection.image"
          :alt="collection.name"
          class="tw-w-full tw-h-full tw-object-fill tw-transition-all tw-duration-200 tw-ease-linear tw-transform group-hover:tw-scale-110"
        />
      </div>
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-pl-2 tw-pr-8 tw-py-2 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card"
      >
        <h5
          class="tw-text-lg tw-uppercase tw-font-medium tw-pr-8 collection-name"
        >
          {{ collection.name }}
        </h5>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1 tw-w-full"
        >
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-text-sm tw-w-full"
          >
            <span>No. Of Spots</span>
            <span class="tw-pr-1"
              >{{ spots.occupiedSpots }}/{{
                whitelist?.whitelist_spots ? whitelist.whitelist_spots : 0
              }}</span
            >
          </div>
          <div
            class="tw-relative tw-w-full tw-h-2 tw-rounded-full tw-bg-wapal-gray tw-overflow-hidden"
          >
            <div
              class="tw-absolute tw-top-0 tw-left-0 tw-h-2 tw-bg-wapal-pink tw-rounded-full"
              :class="getOccupiedWhitelistClass"
              :style="`width:${spots.spotPercent}%`"
            ></div>
          </div>
          <div
            class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between tw-text-wapal-gray tw-pt-1"
          >
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
            >
              <div class="tw-text-lg lg:tw-text-base xl:tw-text-lg">
                Whitelist Starts
              </div>
              <div class="tw-text-xs">{{ getMintDate }}</div>
            </div>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
            >
              <div class="tw-text-lg lg:tw-text-base xl:tw-text-lg">
                Whitelist Ends
              </div>
              <div class="tw-text-xs">{{ getEndDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
  <div v-else>
    <div
      class="tw-rounded tw-relative tw-w-full tw-h-[450px] lg:tw-w-[320px] lg:tw-h-[360px] 3xl:tw-h-[450px] 3xl:tw-w-[400px]"
    >
      <div
        class="tw-w-full tw-h-full tw-overflow-hidden tw-rounded-md tw-bg-gray-500 tw-transition-all tw-duration-300 tw-ease-linear tw-animate-pulse"
      ></div>
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-pl-2 tw-pr-8 tw-py-2 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card tw-h-[100px] tw-transition-all tw-duration-300 tw-ease-linear tw-animate-pulse"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { getCollection } from "@/services/CollectionService";
import moment from "moment";
import { getWhitelistEntryById } from "@/services/WhitelistService";
export default {
  props: {
    whitelist: { type: Object },
    type: { type: String, default: "landing" },
  },
  data() {
    return {
      collection: { _id: "", name: "", image: "", username: "" },
      loading: true,
      spots: { totalSpots: 0, occupiedSpots: 0, spotPercent: 0 },
    };
  },
  computed: {
    getMintDate() {
      return moment(this.whitelist.whitelist_start).format("MMM DD, hh:mm A");
    },
    getEndDate() {
      return moment(this.whitelist.whitelist_end).format("MMM DD, hh:mm A");
    },
    getOccupiedWhitelistClass() {
      return "tw-w-0";
    },
  },
  async mounted() {
    if (this.whitelist.collection_id) {
      const res = await getCollection(this.whitelist.collection_id);
      this.collection = res.collection[0];

      const spotRes = await getWhitelistEntryById(
        this.whitelist.collection_id,
        1,
        1
      );

      this.spots = {
        totalSpots: this.whitelist.whitelist_spots,
        occupiedSpots: spotRes.data.spotsCount,
      };

      this.spots.spotPercent = Math.floor(
        (this.spots.occupiedSpots / this.spots.totalSpots) * 100
      );
    }
    this.loading = false;
  },
};
</script>
<style>
.collection-name {
  overflow-wrap: break-word;
}
</style>
