<template>
  <NuxtLink
    class="!tw-text-white tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-rounded-lg tw-border-solid tw-border tw-border-dark-4 tw-group md:tw-w-[313.6px] md:tw-max-w-[314px]"
    :to="`/auctions/${auction?.auction_name}`"
  >
    <div
      class="tw-w-full tw-h-[312px] tw-rounded-t-lg tw-overflow-hidden md:tw-w-[312px] md:tw-h-[312px]"
    >
      <img
        class="tw-w-full tw-h-[312px] tw-object-cover tw-rounded-t-lg tw-transition-all tw-duration-200 tw-ease-linear tw-transform md:tw-min-w-[313px] md:tw-h-[312px] group-hover:tw-scale-125"
        :src="auction?.nft.meta.image"
        :alt="auction?.nft.meta.name"
        :onerror="imageNotFound()"
      />
    </div>
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-w-full"
    >
      <div class="tw-px-4">
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5"
        >
          <h2 class="tw-font-medium tw-text-xs">
            {{ auction?.nft.nft.current_token_data.collection_name }}
          </h2>
          <i
            class="bx bxs-badge-check !tw-text-primary-1"
            v-if="auction?.isVerified"
          ></i>
        </div>
        <h3 class="tw-font-bold tw-text-lg">{{ auction?.nft.meta.name }}</h3>
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-px-4"
      >
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
        >
          <div class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-xs">
            Current Bid
          </div>
          <div
            class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
          >
            {{
              auction?.biddings[0]
                ? auction?.biddings[auction?.biddings.length - 1].bid
                : auction?.min_bid
            }}
            <span><img :src="aptIcon" alt="apt" /></span>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-1">
          <div class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-xs">
            Min. Increment
          </div>
          <div>
            {{ auction?.minIncrement ? auction?.minIncrement + "%" : "0%" }}
          </div>
        </div>
      </div>
      <div
        class="tw-border-t tw-border-solid tw-border-t-dark-4 tw-py-4 tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-px-4"
      >
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
          v-if="!auctionEnded"
        >
          <div class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-xs">
            {{ checkAuctionStarted() ? "End Time" : "Start Time" }}
          </div>
          <count-down
            :startTime="getStartTime()"
            :small="true"
            @countdownComplete="completeCountDown"
          />
        </div>
        <div
          class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-xs"
          v-else
        >
          Auction Ended
        </div>
        <button-secondary title="View Auction" :small="true" />
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import aptIcon from "@/assets/img/apt.svg";
import imageNotFound from "@/utils/imageNotFound";
export default {
  props: { auction: { type: Object } },
  data() {
    return {
      auctionStarted: false,
      auctionEnded: false,
      aptIcon,
      imageNotFound,
    };
  },
  computed: {},
  methods: {
    getStartTime() {
      if (new Date(this.auction.startAt) < new Date()) {
        return this.auction.endAt;
      }
      return this.auction.startAt;
    },
    checkAuctionStarted() {
      if (new Date(this.auction.startAt) > new Date()) {
        return false;
      }
      return true;
    },
    checkAuctionEnded() {
      if (new Date(this.auction.endAt) > new Date()) {
        return false;
      }

      return true;
    },
    endAuction() {
      this.auctionEnded = true;
    },
    startAuction() {
      this.auctionStarted = true;
    },
    completeCountDown() {
      if (this.checkAuctionEnded()) {
        this.auctionEnded = true;
      }

      if (this.checkAuctionStarted()) {
        this.auctionStarted = true;
      }
    },
  },
};
</script>
