<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-py-16 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-16 lg:tw-pb-6"
  >
    <div
      class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-6 tw-place-items-center lg:tw-grid-cols-2 lg:tw-gap-16 lg:tw-items-center lg:tw-justify-center"
    >
      <img
        :src="auction?.nft.meta.image"
        :alt="auction?.nft.meta.name"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[550px] md:tw-h-[550px] md:tw-max-h-[550px] tw-object-cover tw-rounded-xl 3xl:tw-w-[750px] 3xl:tw-h-[750px]"
      />
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
      >
        <h2
          class="tw-text-lg tw-font-medium tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1.5 3xl:tw-text-xl"
        >
          <span>{{ auction?.nft.nft.current_token_data.collection_name }}</span>
          <v-icon
            class="!tw-text-primary-1 !tw-text-base"
            v-if="auction?.isVerified"
            >mdi-check-decagram</v-icon
          >
        </h2>
        <h1 class="tw-text-4xl tw-font-bold 3xl:tw-text-5xl">
          {{ auction?.nft.meta.name }}
        </h1>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
        >
          <a :href="auction?.twitter" target="_blank" v-if="auction?.twitter">
            <v-icon
              class="!tw-text-2xl tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-primary-1"
              >mdi-twitter</v-icon
            >
          </a>
          <a
            :href="auction?.instagram"
            target="_blank"
            v-if="auction?.instagram"
          >
            <v-icon
              class="!tw-text-2xl tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-primary-1"
              >mdi-instagram</v-icon
            >
          </a>
        </div>
        <div class="tw-text-dark-0 3xl:tw-text-lg">
          {{ auction?.nft.meta.description }}
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
          v-if="!auctionStarted"
        >
          <h3
            class="tw-uppercase tw-text-dark-2 tw-font-semibold 3xl:tw-text-lg"
          >
            Auction Starts In
          </h3>
          <count-down
            :startTime="auction?.startAt"
            @countdownComplete="startAuction"
          />
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start"
          v-else
        >
          <h3
            class="tw-text-dark-0 tw-text-[1.375rem] tw-uppercase tw-font-medium tw-tracking-[-0.01375rem] 2xl:tw-tracking-normal"
          >
            Current Bid
          </h3>
          <h4
            class="tw-text-white tw-uppercase tw-text-[1.75rem] tw-pt-4 tw-pb-6"
          >
            {{ getBid }} Apt
          </h4>
          <button-primary
            :title="!auctionEnded ? 'Place a Bid' : 'Auction Ended'"
            :fullWidth="true"
            @click="$router.push(`/auctions/${auction?.auction_name}`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: { auction: { type: Object } },
  data() {
    return {
      loading: true,
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
  computed: {
    getBid() {
      if (this.auction.biddings.length > 0) {
        return this.auction.biddings[this.auction.biddings.length - 1].bid;
      }

      return this.auction.min_bid;
    },
  },
  async mounted() {
    if (new Date(this.auction.startAt) < new Date()) {
      this.auctionStarted = true;
    }

    if (new Date(this.auction.endAt) < new Date()) {
      this.auctionEnded = true;
    }
  },
};
</script>
