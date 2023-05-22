<template>
  <div
    class="tw-w-full tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 md:tw-px-8 tw-pb-8 tw-pt-4 lg:tw-gap-16 lg:tw-flex-row lg:tw-justify-start xl:tw-w-4/5"
    v-if="!loading"
  >
    <div
      class="tw-px-8 tw-py-8 tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 tw-group md:tw-px-0 md:tw-py-8 md:tw-max-w-[60%] lg:tw-max-w-full lg:tw-w-[90%] xl:tw-w-full"
    >
      <div
        class="tw-rounded-lg nft-preview-card-border tw-w-full tw-overflow-hidden tw-transition-all tw-duration-150 tw-ease-linear xl:tw-w-[60%]"
      >
        <img
          :src="auction.nft.meta.image"
          :alt="auction.nft.meta.name"
          class="tw-w-full tw-max-h-[500px] tw-rounded-lg tw-object-fill"
        />
      </div>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full lg:tw-flex-col 2xl:tw-flex-row tw-gap-4"
        v-if="!auctionStarted"
      >
        <span
          class="tw-text-wapal-pink tw-text-3xl 2xl:tw-text-2xl 3xl:tw-text-3xl"
          >Auction Starts In</span
        >
        <reusable-count-down
          :startTime="auction.startAt"
          :shadow="true"
          @countdownComplete="startAuction"
        />
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
        v-if="auctionStarted"
      >
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full lg:tw-flex-row xl:tw-flex-col 2xl:tw-flex-row tw-gap-4"
          v-if="!auctionEnded"
        >
          <span
            class="tw-text-wapal-pink tw-text-3xl 2xl:tw-text-2xl 3xl:tw-text-3xl"
            >Auction Ends In</span
          >
          <reusable-count-down
            :startTime="auction.endAt"
            :shadow="true"
            @countdownComplete="endAuction"
          />
        </div>
        <span
          class="tw-text-wapal-pink tw-text-3xl 2xl:tw-text-2xl 3xl:tw-text-3xl"
          v-else
          >Auction Ended</span
        >
      </div>
    </div>
    <div
      class="tw-rounded tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-bg-[#001233] banner-shadow tw-px-8 tw-py-8"
    >
      <div class="tw-text-wapal-gray tw-pb-4">
        <h1
          class="tw-text-2xl tw-pb-4 tw-font-medium tw-uppercase md:tw-text-[2rem]"
        >
          {{ auction.nft.meta.name }}
        </h1>
        <div class="tw-font-light">
          {{ auction.nft.meta.description }}
        </div>
      </div>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-bg-[#0C224B] tw-text-[#F0F0F0] tw-px-6 tw-py-4 tw-w-full tw-rounded"
      >
        <div class="tw-text-lg">Min Bid: {{ auction.min_bid }} APT</div>
        <reusable-theme-button
          title="Place Your Bid"
          @click="$router.push('/auctions/lost-in-my-thoughts')"
        />
      </div>
    </div>
  </div>
  <div
    class="tw-w-[95%] tw-mx-auto tw-px-8 tw-py-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-16 lg:tw-flex-row lg:tw-justify-start"
    v-else
  >
    <div
      class="tw-w-full lg:tw-w-[40%] tw-bg-wapal-gray tw-min-h-[400px] tw-rounded-lg tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
    ></div>
    <div
      class="tw-px-8 tw-py-8 tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 lg:tw-w-[60%] tw-bg-[#001233] banner-shadow"
    >
      <div
        class="tw-py-4 tw-bg-wapal-gray tw-w-[75%] tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
      ></div>
      <div
        class="tw-py-4 tw-bg-wapal-gray tw-w-[75%] tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
      ></div>
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-w-full"
      >
        <div
          class="tw-py-16 tw-bg-wapal-gray tw-w-full tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
        <div
          class="tw-py-16 tw-bg-wapal-gray tw-w-full tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getAuctionByName } from "@/services/AuctionService";
export default {
  data() {
    return {
      loading: true,

      auction: {
        nft: { meta: { name: "", image: "", description: "" } },
        endAt: "",
        startAt: "",
        min_bid: 0,
      },
      auctionEnded: false,
      auctionStarted: false,
    };
  },
  methods: {
    endAuction() {
      this.auctionEnded = true;
    },
    startAuction() {
      this.auctionStarted = true;
    },
  },
  async mounted() {
    this.loading = true;
    const res = await getAuctionByName("lost-in-my-thoughts");
    this.auction = res.data.auction;

    const now = new Date();

    this.loading = false;
  },
};
</script>
