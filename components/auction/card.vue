<template>
  <div>
    <div
      class="tw-border tw-border-wapal-pink tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-h-full tw-w-full lg:tw-w-[320px] 3xl:tw-w-[400px]"
    >
      <img
        :src="auction.nft.meta.image"
        :alt="auction.nft.meta.name"
        class="tw-rounded-t tw-w-full tw-h-[450px] md:tw-min-h-[450px] lg:tw-min-h-[360px] md:tw-max-h-[450px] lg:tw-max-h-[360px] 3xl:tw-min-h-[450px] 3xl:tw-max-h-[450px] tw-object-cover"
      />
      <div class="tw-px-8 tw-w-full tw-py-8 tw-h-full">
        <h3
          class="tw-text-uppercase tw-text-xl tw-font-medium tw-pb-4 3xl:tw-text-2xl"
        >
          {{ auction.nft.meta.name }}
        </h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
        >
          <div v-if="!auctionStarted">
            <div>Starts In</div>
            <reusable-count-down
              :startTime="auction.startAt"
              :textSmall="true"
              @countdownComplete="startAuction"
            />
          </div>
          <div v-if="auctionStarted">
            <div v-if="!auctionEnded">
              <div>Ends In</div>
              <reusable-count-down
                :startTime="auction.endAt"
                :textSmall="true"
                @countdownComplete="endAuction"
              />
            </div>

            <div class="tw-text-wapal-pink" v-else>Ended</div>
          </div>
          <div>
            <div>Current Bid</div>
            <div class="tw-text-wapal-pink">{{ auction.min_bid }} APT</div>
          </div>
        </div>
        <ReusableThemeButton
          title="Place You bid"
          @click="$router.push('/auctions/' + auction.auction_name)"
          class="tw-w-full tw-my-5 !tw-py-3"
        />
      </div>
    </div>
  </div>
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
