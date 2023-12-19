<template>
  <NuxtLink
    class="!tw-text-white tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-rounded-lg tw-border-solid tw-border tw-border-dark-4 tw-group md:tw-w-[313.6px] md:tw-max-w-[314px]"
    :to="getRedirectLink"
  >
    <div
      class="tw-w-full tw-h-[312px] tw-rounded-t-lg tw-overflow-hidden md:tw-w-[312px] md:tw-h-[312px]"
    >
      <div
        class="tw-w-full tw-h-[312px] tw-object-cover tw-rounded-t-lg tw-transition-all tw-duration-200 tw-ease-linear tw-transform md:tw-w-[312px] md:tw-h-[312px] group-hover:tw-scale-110"
        v-if="video"
      >
        <video-player-featured :source="video" />
      </div>
      <img
        class="tw-w-full tw-h-[312px] tw-object-cover tw-rounded-t-lg tw-transition-all tw-duration-200 tw-ease-linear tw-transform md:tw-w-[312px] md:tw-h-[312px] group-hover:tw-scale-110"
        :src="collection?.image"
        :alt="collection?.name"
        :onerror="imageNotFound()"
        v-else
      />
    </div>
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-w-full"
    >
      <div class="tw-px-4">
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5"
        >
          <h2 class="tw-font-medium tw-text-lg">
            {{ collection?.name }}
          </h2>
          <i
            class="bx bxs-badge-check !tw-text-primary-1"
            v-if="collection?.isVerified"
          ></i>
        </div>
      </div>
      <div
        class="tw-px-4 tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
      >
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-start">
          <div class="tw-uppercase tw-text-xs tw-font-semibold tw-text-dark-2">
            Price
          </div>
          <div
            class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
            v-if="getPrice !== 0"
          >
            {{ getPrice }}<span><img :src="aptIcon" alt="apt" /></span>
          </div>
          <div class="tw-text-white tw-font-normal" v-else>Free Mint</div>
        </div>
        <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
          <div class="tw-uppercase tw-text-xs tw-font-semibold tw-text-dark-2">
            Item
          </div>
          <div class="tw-text-white tw-font-normal">{{ getSupply }}</div>
        </div>
      </div>
      <div
        class="tw-border-t tw-border-solid tw-border-t-dark-4 tw-py-4 tw-flex tw-flex-row tw-items-center tw-justify-center tw-w-full tw-px-4"
        v-if="status"
      >
        <button-secondary title="Mint" :fullWidth="true" />
      </div>
      <div
        class="tw-border-t tw-border-solid tw-border-t-dark-4 tw-py-4 tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-px-4"
        v-else
      >
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
        >
          <div class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-xs">
            Live In
          </div>
          <count-down
            :startTime="getStartTime()"
            :small="true"
            @countdownComplete="countdownComplete"
            v-if="!getTbd"
          />
          <div
            class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-sm"
            v-else
          >
            Tbd
          </div>
        </div>
        <button-secondary title="View NFT" :small="true" />
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import aptIcon from "@/assets/img/apt.svg";
import imageNotFound from "@/utils/imageNotFound";
import santa from "@/assets/video/wapal-santa.MP4";
export default {
  props: {
    collection: { type: Object },
    live: { type: Boolean, default: true },
  },
  data() {
    return {
      status: true,
      video: "",
      aptIcon,
      imageNotFound,
    };
  },
  computed: {
    getPrice() {
      if (!this.collection.candyMachine) {
        if (this.collection.whitelist_price) {
          return this.collection.whitelist_price;
        }
        if (this.collection.public_sale_price) {
          return this.collection.public_sale_price;
        }

        return "TBD";
      }

      const whiteListDate = this.collection.candyMachine.whitelist_sale_time
        ? new Date(this.collection.candyMachine.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine.public_sale_time
      );
      const now = new Date();
      if (
        this.collection.candyMachine.public_sale_price ==
        this.collection.candyMachine.whitelist_price
      ) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (now > publicSaleDate) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (whiteListDate && publicSaleDate > now) {
        return this.collection.candyMachine.whitelist_price;
      } else {
        return this.collection.candyMachine.public_sale_price;
      }
    },
    getSupply() {
      if (!this.collection.supply) {
        return "TBD";
      }
      if (this.collection._id === "642bf277c10560ca41e179fa") {
        return 239;
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        return 222;
      } else if (this.collection._id === "64686db77db14461740bab0f") {
        return 355;
      } else if (this.collection._id === "64625d957c7212d927559962") {
        return 2333;
      } else if (this.collection._id === "6466a09b6fee90eea757521c") {
        return 343;
      }

      return this.collection.supply;
    },
    getTbd() {
      if (!this.candyMachine) {
        if (!this.collection.candyMachine) {
          if (
            !this.collection.whitelist_sale_time &&
            !this.collection.public_sale_time
          ) {
            return true;
          }
        }
      }

      return false;
    },
    getRedirectLink() {
      if (!this.getTbd) {
        return `/nft/${this.collection.username}`;
      }

      return `/nft/draft/${this.collection._id}`;
    },
  },
  methods: {
    countdownComplete() {
      this.status = true;
    },
    getStartTime() {
      if (!this.collection.candyMachine) {
        const whiteListDate = this.collection.whitelist_sale_time
          ? new Date(this.collection.whitelist_sale_time)
          : null;
        const publicSaleDate = new Date(this.collection.public_sale_time);

        if (!whiteListDate) {
          return publicSaleDate.toString();
        }

        if (whiteListDate > publicSaleDate) {
          return publicSaleDate.toString();
        } else {
          return whiteListDate.toString();
        }
      }

      const whiteListDate = this.collection.candyMachine.whitelist_sale_time
        ? new Date(this.collection.candyMachine.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine.public_sale_time
      );

      if (!whiteListDate) {
        return publicSaleDate.toString();
      }

      if (whiteListDate > publicSaleDate) {
        return publicSaleDate.toString();
      } else {
        return whiteListDate.toString();
      }
    },
  },
  mounted() {
    this.status = this.live;

    if (this.collection.username === "wapal-santa") {
      this.video = santa;
    }
  },
};
</script>
