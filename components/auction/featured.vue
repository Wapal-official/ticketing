<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[7em] lg:tw-pb-0 lg:tw-px-28 xl:!tw-w-[1320px] 1xl:!tw-max-w-[1320px] 2xl:tw-pt-[7.5em]"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-center lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <utility-image
        :source="auction?.nft.meta.image"
        :alt="auction?.nft.meta.name"
        :onerror="imageNotFound()"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[400px] md:tw-h-[400px] md:tw-max-h-[400px] lg:tw-w-[400px] lg:tw-min-w-[400px] lg:tw-h-[400px] xl:tw-w-[400px] xl:tw-h-[400px] xl:tw-max-h-[400px] tw-object-cover tw-rounded-xl"
      />
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 lg:tw-mb-8 lg:tw-w-[512px] xl:tw-pr-[7em]"
      >
        <h2
          class="tw-text-lg tw-font-medium tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1.5"
        >
          <span>{{ auction?.nft.nft.current_token_data.collection_name }}</span>
          <i
            class="bx bxs-badge-check tw-text-primary-1"
            v-if="auction?.isVerified"
          ></i>
        </h2>
        <h1 class="tw-text-4xl tw-font-bold tw-tracking-[-0.025em]">
          {{ auction?.nft.meta.name }}
        </h1>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <a
            :href="auction?.twitter"
            target="_blank"
            v-if="auction?.twitter"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-twitter tw-text-lg tw-transition tw-duration-200 tw-ease-linear tw-ml-0.5"
            ></i>
          </a>
          <a
            :href="auction?.instagram"
            target="_blank"
            v-if="auction?.instagram"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-instagram tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
            ></i>
          </a>
          <div class="tw-relative">
            <button
              class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6"
              @click="showShareBox = !showShareBox"
            >
              <i
                class="bx bxs-share-alt tw-text-lg tw-transition tw-duration-200 tw-ease-linear !tw-text-white"
              ></i>
            </button>
            <div
              class="tw-absolute tw-z-20 tw-overflow-hidden tw-bg-dark-6 tw-top-[110%] tw-w-[200px] tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-py-4"
              v-if="showShareBox"
              v-click-outside="hideShareBox"
            >
              <button
                class="tw-w-full tw-px-4 tw-py-4 tw-relative tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 before:tw-w-full before:tw-h-full before:tw-left-0 before:tw-bg-white/20 before:tw-opacity-0 before:tw-absolute hover:before:tw-opacity-[0.08]"
                @click="copyLink"
              >
                <i class="bx bx-copy tw-text-lg"></i>
                <span>Copy Link</span>
              </button>
              <button
                class="tw-w-full tw-px-4 tw-py-4 tw-relative tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 before:tw-w-full before:tw-h-full before:tw-left-0 before:tw-bg-white/20 before:tw-opacity-0 before:tw-absolute hover:before:tw-opacity-[0.08]"
                @click="shareOnTwitter"
              >
                <i class="bx bxl-twitter tw-text-lg"></i>
                <span>Share on Twitter</span>
              </button>
            </div>
          </div>
        </div>
        <div class="tw-text-dark-0 tw-pb-4">
          {{ description }}
          <button
            class="tw-text-primary-1"
            @click="toggleDescription"
            v-if="auction?.nft.meta.description.length > 200"
          >
            {{ description.length <= 203 ? "Read More" : "Read Less" }}
          </button>
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
          v-if="!auctionStarted"
        >
          <h3 class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-sm">
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
            class="tw-text-dark-0 tw-text-[1.375rem] tw-uppercase tw-font-medium tw-tracking-[-0.01375em]"
          >
            Current Bid
          </h3>
          <h4
            class="tw-text-white tw-uppercase tw-text-[1.75rem] tw-pt-4 tw-pb-6 tw-font-medium"
          >
            {{ getBid }} {{ selectedCoinType.coinType }}
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
import imageNotFound from "@/utils/imageNotFound";
import { getCoinType } from "@/utils/getCoinType";
export default {
  props: { auction: { type: Object } },
  data() {
    return {
      loading: true,
      auctionEnded: false,
      auctionStarted: false,
      showShareBox: false,
      description: "",
      imageNotFound,
    };
  },
  methods: {
    endAuction() {
      this.auctionEnded = true;
    },
    startAuction() {
      this.auctionStarted = true;
    },
    async copyLink(event: any) {
      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent?.clipboardData ||
        navigator.clipboard;

      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      clipboardData.writeText(
        `${baseURL}/auctions/${this.auction.auction_name}`
      );

      this.$toast.showMessage({ message: "Link Copied" });

      this.showShareBox = false;
    },
    shareOnTwitter() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      const twitterURL = "https://twitter.com";

      const text = "Check out this collection on Wapal";

      const link = `${baseURL}/auctions/${this.auction.auction_name}`;

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}&via=wapal_official`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },
    hideShareBox() {
      this.showShareBox = false;
    },
    getDescription() {
      this.description = this.auction.nft.meta.description;

      if (this.auction.nft.meta.description.length > 200) {
        this.description =
          this.auction.nft.meta.description.slice(0, 200) + "...";
      }
    },
    toggleDescription() {
      if (this.description.length <= 203) {
        this.description = this.auction.nft.meta.description;
      } else {
        this.description =
          this.auction.nft.meta.description.slice(0, 200) + "...";
      }
    },
  },
  computed: {
    getBid() {
      if (this.auction.biddings && this.auction.biddings.length > 0) {
        return this.auction.biddings[this.auction.biddings.length - 1].bid;
      }

      return this.auction.min_bid;
    },
    selectedCoinType() {
      return getCoinType(this.auction.coin_type ? this.auction.coin_type : "");
    },
  },
  async mounted() {
    if (new Date(this.auction.startAt) < new Date()) {
      this.auctionStarted = true;
    }

    if (new Date(this.auction.endAt) < new Date()) {
      this.auctionEnded = true;
    }

    this.getDescription();
  },
};
</script>
