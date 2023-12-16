<template>
  <NuxtLink :to="getRedirectLink">
    <div
      class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-cursor-pointer tw-group/landing-card md:!tw-w-[312px] md:!tw-h-[312px]"
    >
      <div
        class="tw-relative tw-w-full tw-h-full tw-rounded-lg md:!tw-w-[312px] md:!tw-h-[312px]"
      >
        <div
          class="tw-w-full tw-h-full tw-rounded-lg tw-overflow-hidden tw-relative md:!tw-w-[312px] md:!tw-h-[312px]"
        >
          <img
            :src="isCollection ? collection?.image : collection?.nft.meta.image"
            :alt="isCollection ? collection?.name : collection?.nft.meta.name"
            :onerror="imageNotFound()"
            class="tw-w-full tw-h-full tw-object-cover tw-rounded-lg tw-absolute tw-top-0 tw-transition-all tw-ease-linear tw-duration-300 tw-transform group-hover/landing-card:tw-scale-110"
          />
        </div>
        <div
          class="tw-absolute tw-w-full tw-h-1/2 tw-bottom-[-1px] gradient tw-rounded-lg"
        ></div>
        <div
          class="tw-absolute tw-top-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-items-start tw-justify-between tw-px-4"
        >
          <div
            class="tw-rounded-full tw-bg-black/20 tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2.5 tw-px-3.5 tw-py-1.5 tw-mt-4 tw-backdrop-blur-[2px]"
          >
            <div
              class="tw-rounded-full tw-w-2.5 tw-h-2.5"
              :class="{
                'tw-bg-utility-green': getLiveStatus,
                'tw-bg-utility-yellow': !getLiveStatus,
              }"
            ></div>
            <div class="tw-font-medium !tw-text-white">
              {{ getLiveStatus ? "Live" : "Upcoming" }}
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-pb-4"
          >
            <h3
              class="tw-font-semibold tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
            >
              <span class="!tw-text-white">
                {{
                  isCollection ? collection?.name : collection?.nft.meta.name
                }}</span
              >
              <i
                class="bx bxs-badge-check tw-text-primary-1"
                v-if="collection?.isVerified"
              ></i>
            </h3>
            <div v-if="getPrice">
              <div
                class="tw-text-white/70 tw-text-[0.875rem]"
                v-if="getPrice != '0APT'"
              >
                {{
                  isCollection
                    ? "Price"
                    : getLiveStatus
                    ? "Current Bid"
                    : "Min Bid"
                }}
                {{ getPrice }}
              </div>
              <div class="!tw-text-white/70 tw-text-[0.875rem]" v-else>
                Free Mint
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import imageNotFound from "@/utils/imageNotFound";
export default {
  props: {
    collection: { type: Object },
    type: { type: String, default: "collection" },
  },
  data() {
    return {
      imageNotFound,
    };
  },
  computed: {
    isCollection() {
      return this.type === "collection";
    },
    getLiveStatus() {
      if (this.type === "auction") {
        if (new Date(this.collection.startAt) > new Date()) {
          return false;
        }

        return true;
      }
      if (!this.collection.candyMachine) {
        if (
          !this.collection.public_sale_time &&
          !this.collection.whitelist_sale_time
        ) {
          return true;
        }
        return false;
      }

      const whiteListDate = this.collection.candyMachine.whitelist_sale_time
        ? new Date(this.collection.candyMachine.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine.public_sale_time
      );

      const date = new Date();

      if (!whiteListDate) {
        if (date > publicSaleDate) {
          return true;
        }
      } else {
        if (date > whiteListDate || date > publicSaleDate) {
          return true;
        }
      }

      return false;
    },
    getPrice() {
      if (this.type === "auction") {
        if (this.collection.biddings.length > 0) {
          return (
            this.collection.biddings[this.collection.biddings.length - 1].bid +
            "APT"
          );
        }

        return this.collection.min_bid + "APT";
      }

      if (!this.collection.candyMachine) {
        if (this.collection.whitelist_price) {
          return this.collection.whitelist_price + "APT";
        }
        if (this.collection.public_sale_price) {
          return this.collection.public_sale_price + "APT";
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
        return this.collection.candyMachine.public_sale_price + "APT";
      }

      if (now > publicSaleDate) {
        return this.collection.candyMachine.public_sale_price + "APT";
      }

      if (whiteListDate && publicSaleDate > now) {
        return this.collection.candyMachine.whitelist_price + "APT";
      } else {
        return this.collection.candyMachine.public_sale_price + "APT";
      }
    },
    getRedirectLink() {
      if (this.type === "auction") {
        return `/auctions/${this.collection.auction_name}`;
      }

      if (this.collection.isEdition) {
        return `/editions/${this.collection.username}`;
      }
      return `/nft/${this.collection.username}`;
    },
  },
};
</script>
<style>
.gradient {
  background: linear-gradient(180deg, rgba(16, 17, 19, 0) 0%, #000000 100%);
}
</style>
