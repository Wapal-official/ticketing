<template>
  <NuxtLink
    :to="`/nft/${collection?._id}`"
    class="swiper-slide tw-flex tw-flex-row tw-items-center tw-justify-center tw-transition-all tw-duration-150 tw-ease-linear tw-transform tw-cursor-pointer tw-group tw-select-none"
    :draggable="false"
  >
    <div
      class="tw-relative tw-rounded-lg tw-w-[300px] tw-h-[300px] md:tw-w-[350px] md:tw-h-[350px] lg:tw-w-[250px] lg:tw-h-[250px] 2xl:tw-w-[280px] 2xl:tw-h-[280px]"
    >
      <div
        class="tw-rounded-lg tw-w-[300px] tw-h-[300px] tw-overflow-hidden md:tw-w-[350px] md:tw-h-[350px] lg:tw-w-[250px] lg:tw-h-[250px] 2xl:tw-w-[280px] 2xl:tw-h-[280px]"
      >
        <img
          class="tw-object-cover tw-rounded-lg tw-w-[300px] tw-h-[300px] tw-mx-auto tw-group tw-transition-all tw-duration-200 tw-ease-linear md:tw-w-[350px] md:tw-h-[350px] lg:tw-w-[250px] lg:tw-h-[250px] md:tw-mx-0 group-hover:tw-scale-110 xl:tw-w-[280px] xl:tw-h-[280px]"
          :src="collection?.image"
          :alt="collection?.name"
        />
      </div>
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-py-2 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card tw-opacity-0 tw-group tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
      >
        <h5 class="tw-uppercase tw-font-medium tw-pl-2 tw-pr-8 collection-name">
          {{ collection?.name }}
        </h5>
        <div class="tw-pr-4">
          <h6
            v-if="collection?.status.sold_out"
            class="tw-text-xl tw-text-wapal-pink tw-font-normal"
          >
            Soldout
          </h6>
          <div v-else>
            <h6
              class="tw-text-xl tw-text-wapal-pink tw-font-normal"
              v-if="status"
            >
              Live
            </h6>
            <count-down
              :startTime="getStartTime"
              @countdownComplete="countdownComplete"
              v-else
            />
          </div>
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-6 tw-capitalize tw-w-full tw-text-sm tw-pr-4"
        >
          <div>items {{ collection?.supply }}</div>
          <div v-if="getPrice != 0">{{ getPrice }} Apt</div>
          <div v-else>Free Mint</div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import CountDown from "@/components/Reusable/CountDown.vue";
export default {
  components: { CountDown },
  props: { collection: { type: Object } },
  data() {
    return {
      status: false,
    };
  },
  computed: {
    getStatus() {
      const whiteListDate = this.collection.candyMachine_id.whitelist_sale_time
        ? new Date(this.collection.candyMachine_id.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine_id.public_sale_time
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
      const whiteListDate = this.collection.candyMachine_id.whitelist_sale_time
        ? new Date(this.collection.candyMachine_id.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine_id.public_sale_time
      );

      const now = new Date();
      if (
        this.collection.candyMachine_id.public_sale_price ==
        this.collection.candyMachine_id.whitelist_price
      ) {
        return this.collection.candyMachine_id.public_sale_price;
      }

      if (now > publicSaleDate) {
        return this.collection.candyMachine_id.public_sale_price;
      }

      if (whiteListDate && publicSaleDate > now) {
        return this.collection.candyMachine_id.whitelist_price;
      } else {
        return this.collection.candyMachine_id.public_sale_price;
      }
    },
    getStartTime() {
      const whiteListDate = this.collection.candyMachine_id.whitelist_sale_time
        ? new Date(this.collection.candyMachine_id.whitelist_sale_time)
        : null;

      const publicSaleDate = new Date(
        this.collection.candyMachine_id.public_sale_time
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
  methods: {
    countdownComplete() {
      this.status = true;
    },
  },
};
</script>
