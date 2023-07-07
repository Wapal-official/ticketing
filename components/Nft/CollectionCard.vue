<template>
  <NuxtLink
    class="!tw-text-white tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-rounded-lg tw-border-solid tw-border tw-border-dark-4 tw-group md:tw-w-[312px] md:tw-max-w-[312px]"
    :to="getRedirectLink"
  >
    <div
      class="tw-w-full tw-h-[312px] tw-rounded-t-lg tw-overflow-hidden md:tw-w-[312px] md:tw-h-[312px]"
    >
      <img
        class="tw-w-full tw-h-[312px] tw-object-cover tw-rounded-t-lg tw-transition-all tw-duration-200 tw-ease-linear tw-transform md:tw-w-[312px] md:tw-h-[312px] group-hover:tw-scale-125"
        :src="collection?.image"
        :alt="collection?.name"
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
          <v-icon
            class="!tw-text-primary-1 !tw-text-sm"
            v-if="collection?.isVerified"
            >mdi-check-decagram</v-icon
          >
        </div>
      </div>
      <div
        class="tw-px-4 tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
      >
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-start">
          <div class="tw-uppercase tw-text-xs tw-font-semibold tw-text-dark-2">
            Price
          </div>
          <div class="tw-text-white tw-font-normal" v-if="getPrice !== '0 APT'">
            {{ getPrice }}
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
export default {
  props: {
    collection: { type: Object },
    live: { type: Boolean, default: true },
  },
  data() {
    return {
      status: true,
    };
  },
  computed: {
    getPrice() {
      if (!this.collection.candyMachine) {
        if (this.collection.whitelist_price) {
          return this.collection.whitelist_price + " apt";
        }
        if (this.collection.public_sale_price) {
          return this.collection.public_sale_price + " apt";
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
        return this.collection.candyMachine.public_sale_price + " APT";
      }

      if (now > publicSaleDate) {
        return this.collection.candyMachine.public_sale_price + " APT";
      }

      if (whiteListDate && publicSaleDate > now) {
        return this.collection.candyMachine.whitelist_price + " APT";
      } else {
        return this.collection.candyMachine.public_sale_price + " APT";
      }
    },
    getSupply() {
      if (!this.collection.supply) {
        return "TBD";
      }
      if (this.collection._id === "642bf277c10560ca41e179fa") {
        return 777;
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        return 222;
      } else if (this.collection._id === "64686db77db14461740bab0f") {
        return 355;
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
  },
};
</script>
