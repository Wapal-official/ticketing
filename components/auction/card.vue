<template>
  <NuxtLink
    :to="`/auctions/${auction.auction_name}`"
    class="!tw-text-white tw-border tw-border-wapal-pink tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-h-full tw-w-full tw-group lg:tw-w-[320px] 3xl:tw-w-[400px]"
  >
    <div
      class="tw-overflow-hidden tw-rounded-t tw-w-full tw-min-h-[260px] tw-max-h-[260px] 3xl:tw-min-h-[450px] 3xl:tw-max-h-[450px]"
    >
      <img
        :src="auction.nft.meta.image"
        :alt="auction.nft.meta.name"
        class="tw-rounded-t tw-w-full tw-min-h-[260px] tw-max-h-[260px] 3xl:tw-min-h-[450px] 3xl:tw-max-h-[450px] tw-object-cover tw-group tw-transform tw-transition-all tw-duration-300 tw-ease-linear group-hover:tw-scale-125"
      />
    </div>
    <div class="tw-px-8 tw-w-full tw-pt-6 tw-pb-8 tw-h-full">
      <h3
        class="tw-text-uppercase tw-text-xl tw-font-medium tw-pb-4 !tw-text-white 3xl:tw-text-2xl"
      >
        {{ auction.nft.meta.name }}
      </h3>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
      >
        <div v-if="!auctionStarted">
          <div class="!tw-text-white">Starts In</div>
          <reusable-count-down
            :startTime="auction.startAt"
            :textSmall="true"
            @countdownComplete="startAuction"
          />
        </div>
        <div v-if="auctionStarted">
          <div v-if="!auctionEnded">
            <div class="!tw-text-white">Ends In</div>
            <reusable-count-down
              :startTime="auction.endAt"
              :textSmall="true"
              @countdownComplete="endAuction"
            />
          </div>

          <div class="tw-text-wapal-pink" v-else>Ended</div>
        </div>
        <div>
          <div class="!tw-text-white">Current Bid</div>
          <div class="tw-text-wapal-pink">
            {{
              auction.biddings[0] ? auction.biddings[0].bid : auction.min_bid
            }}
            APT
          </div>
        </div>
      </div>
      <ReusableThemeButton
        title="Place Your bid"
        class="tw-w-full tw-my-5 !tw-py-3"
      />
    </div>
  </NuxtLink>
</template>
<script>
export default {
  props: {
    auction: {
      Type: Object,
      require: true,
    },
  },
  data() {
    return {
      endInterval: "",
      auctionStarted: false,
      auctionEnded: false,
    };
  },
  computed: {
    getLiveStatus() {
      if (new Date(this.auction.endAt) > new Date()) {
        return true;
      }
      return false;
    },
  },
  methods: {
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
  },
  mounted() {
    this.auctionStarted = this.checkAuctionStarted();
    this.auctionEnded = this.checkAuctionEnded();
  },
};
</script>
