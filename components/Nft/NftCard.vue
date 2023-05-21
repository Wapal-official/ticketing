<template>
  <NuxtLink
    :to="getRedirectLink"
    class="tw-group tw-w-full tw-h-[360px] lg:tw-w-[320px] lg:tw-h-[360px] 3xl:tw-h-[450px] 3xl:tw-w-[400px]"
  >
    <div class="tw-rounded tw-relative tw-w-full tw-h-full" v-if="!domainName">
      <div class="tw-w-full tw-h-full tw-overflow-hidden tw-rounded-md">
        <img
          :src="collection?.image"
          :alt="collection?.name"
          class="tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-200 tw-ease-linear tw-transform group-hover:tw-scale-110"
        />
      </div>
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-px-8 tw-py-4 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card"
      >
        <h5 class="tw-text-lg tw-uppercase tw-font-medium collection-name">
          {{ collection?.name }}
        </h5>
        <h6
          v-if="collection?.status && collection.status.sold_out && !domainName"
          class="tw-text-xl tw-text-wapal-pink tw-font-normal"
        >
          Soldout
        </h6>
        <div v-else>
          <h6
            class="tw-text-xl tw-text-wapal-pink tw-font-normal"
            v-if="status"
          >
            {{ collection?.candyMachine ? "Live" : "TBD" }}
          </h6>
          <count-down
            :startTime="getStartTime"
            @countdownComplete="countdownComplete"
            v-else
          />
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-8 tw-capitalize tw-w-full"
        >
          <div>
            items
            {{ getSupply }}
          </div>
          <div v-if="getPrice != '0 apt'">price {{ getPrice }}</div>
          <div v-else>Free Mint</div>
        </div>
      </div>
    </div>
    <div class="tw-rounded tw-relative tw-w-full tw-h-full" v-else>
      <div class="tw-w-full tw-h-full tw-overflow-hidden tw-rounded-md">
        <img
          :src="domainImage"
          alt="Domain Name"
          class="tw-w-full tw-h-full tw-object-fill tw-transition-all tw-duration-200 tw-ease-linear tw-transform group-hover:tw-scale-110"
        />
      </div>
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-px-8 tw-py-8 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card"
      >
        <h5 class="tw-text-lg tw-uppercase tw-font-medium collection-name">
          Domain Name
        </h5>
        <h6 class="tw-text-xl tw-text-wapal-pink tw-font-normal">Live</h6>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import CountDown from "@/components/Reusable/CountDown.vue";

import domainImage from "@/assets/img/domain-name.png";

export default {
  components: { CountDown },
  props: {
    collection: { type: Object },
    redirectTo: { type: String, default: "nft" },
    domainName: { type: Boolean, default: false },
  },
  data() {
    return {
      status: false,
      domainImage,
    };
  },
  computed: {
    getStatus() {
      if (this.domainName) {
        return true;
      }
      if (!this.collection.candyMachine) {
        return true;
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
    getStartTime() {
      if (!this.collection.candyMachine) {
        return;
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
        return this.collection.candyMachine.public_sale_price + " apt";
      }

      if (now > publicSaleDate) {
        return this.collection.candyMachine.public_sale_price + " apt";
      }

      if (whiteListDate && publicSaleDate > now) {
        return this.collection.candyMachine.whitelist_price + " apt";
      } else {
        return this.collection.candyMachine.public_sale_price + " apt";
      }
    },
    getRedirectLink() {
      if (this.redirectTo === "whitelist") {
        return `/dashboard/whitelist/${this.collection.username}`;
      }

      if (this.redirectTo === "domainName") {
        return `/domain-name`;
      }

      if (this.redirectTo === "draft") {
        return `/dashboard/draft/${this.collection._id}`;
      }

      return `/nft/${this.collection.username}`;
    },
    getSupply() {
      if (!this.collection.supply) {
        return "TBD";
      }
      if (this.collection._id === "642bf277c10560ca41e179fa") {
        return 777;
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        return 222;
      }

      return this.collection.supply;
    },
  },
  methods: {
    countdownComplete() {
      this.status = true;
    },
  },
  mounted() {
    this.status = this.getStatus;
  },
};
</script>
