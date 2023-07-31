<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
  >
    <div class="tw-text-white tw-font-semibold tw-capitalize">
      {{ phase?.name }}
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between"
    >
      <div>
        <div
          class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
        >
          Mint Date
        </div>
        <div class="tw-text-white">
          {{ getFormattedMintDate }}
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
        <div
          class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
        >
          Price
        </div>
        <div class="tw-text-white">
          {{ getMintPrice }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import moment from "moment";
export default {
  props: { phase: { type: Object } },
  computed: {
    getFormattedMintDate() {
      if (!this.phase.mint_time) {
        return "TBD";
      }
      return moment(this.phase.mint_time).format("MMM DD, hh:mm A");
    },
    getMintPrice() {
      if (isNaN(this.phase.mint_price)) {
        return "TBD";
      }

      return this.phase?.mint_price === 0
        ? "Free Mint"
        : this.phase?.mint_price + "APT";
    },
  },
};
</script>
