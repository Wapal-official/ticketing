<template>
  <div class="tw-group">
    <div class="tw-rounded tw-relative tw-w-full tw-h-full">
      <div class="tw-w-full tw-h-full tw-overflow-hidden tw-rounded-md">
        <img
          :src="collection.image"
          :alt="collection.name"
          class="tw-w-full tw-h-full tw-min-h-[370px] tw-transition-all tw-duration-200 tw-ease-linear tw-transform group-hover:tw-scale-110"
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
            <span class="tw-pr-1">25/100</span>
          </div>
          <div
            class="tw-relative tw-w-full tw-h-2 tw-rounded-full tw-bg-wapal-gray"
          >
            <div
              class="tw-absolute tw-top-0 tw-left-0 tw-w-1/4 tw-h-full tw-bg-wapal-pink tw-rounded-full"
            ></div>
          </div>
          <div
            class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between tw-text-wapal-gray tw-pt-1"
          >
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
            >
              <div class="tw-text-xl">Mint Date</div>
              <div class="tw-text-xs">{{ getMintDate }}</div>
            </div>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
            >
              <div class="tw-text-xl">End Time</div>
              <div class="tw-text-xs">{{ getEndDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import pirate from "@/assets/img/6195.png";
import { getCollection } from "~/services/CollectionService";
import moment from "moment";
export default {
  props: { whitelist: { type: Object } },
  data() {
    return { collection: { _id: "", name: "", image: "" }, pirate };
  },
  computed: {
    getMintDate() {
      return moment(this.whitelist.whitelist_start).format("MMM DD, hh:mm A");
    },
    getEndDate() {
      return moment(this.whitelist.whitelist_end).format("MMM DD, hh:mm A");
    },
  },
  async mounted() {
    if (this.whitelist.collection_id) {
      const res = await getCollection(this.whitelist.collection_id);
      this.collection = res.collection[0];
    }
  },
};
</script>
<style>
.collection-name {
  overflow-wrap: break-word;
}
</style>
