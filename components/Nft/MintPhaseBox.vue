<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
  >
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
    >
      <div
        class="tw-text-white tw-font-bold tw-capitalize tw-leading-6 tw-w-full"
      >
        {{ phase?.name }}
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
        v-if="showEnded"
      >
        <div
          class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-leading-5 tw-tracking-[3%] tw-uppercase"
          v-if="ended"
        >
          Ended
        </div>
      </div>
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between tw-bg-dark-8 tw-border tw-border-solid tw-border-dark-6 tw-rounded tw-pt-2 tw-pr-3 tw-pb-3 tw-pl-3"
    >
      <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1">
        <div
          class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
        >
          Mint Date
        </div>
        <div class="tw-text-white">
          {{ getFormattedMintDate }}
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-1">
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
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-text-sm tw-text-dark-0"
      v-if="showWhitelistText && phase?.id !== 'public-sale'"
    >
      <div
        v-if="phase?.whitelisted"
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <i class="bx bx-info-circle tw-text-xl"></i>
          <div class="tw-text-sm tw-text-dark-0 tw-font-semibold">
            You are eligible to mint for this phase.
          </div>
        </div>
        <div class="tw-text-sm tw-text-white tw-font-semibold">
          Limit {{ phase?.mintLimit }} per wallet
        </div>
      </div>
      <div v-else>You are not whitelisted for this phase</div>
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-text-sm tw-text-dark-0"
      v-if="
        phase?.id === 'public-sale' && showWhitelistText && publicSaleMintLimit
      "
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-flex-grow tw-gap-2"
      >
        <i class="bx bx-info-circle tw-text-xl"></i>
        <div class="tw-text-sm tw-text-dark-0 tw-font-semibold">
          You are eligible to mint for this phase.
        </div>
      </div>
      <div class="tw-text-right tw-w-fit tw-text-white tw-font-semibold">
        Limit {{ publicSaleMintLimit }} per wallet
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import moment from "moment";
export default {
  props: {
    phase: { type: Object },
    coinType: { type: String, default: "APT" },
    showWhitelistText: { type: Boolean, default: false },
    showEnded: { type: Boolean, default: false },
    publicSaleMintLimit: { type: Number, default: 0 },
  },
  data() {
    return {
      ended: true,
    };
  },
  computed: {
    getFormattedMintDate() {
      if (!this.phase.mint_time) {
        return "TBD";
      }
      return moment(this.phase.mint_time).format("MMM DD, hh:mm A");
    },
    getMintPrice() {
      if (isNaN(this.phase.mint_price) || this.phase.mint_price === "") {
        return "TBD";
      }

      return this.phase?.mint_price == 0
        ? "Free Mint"
        : this.phase?.mint_price + this.coinType;
    },
  },
};
</script>
