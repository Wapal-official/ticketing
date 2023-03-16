<template>
  <NuxtLink :to="`/nft/${collection?._id}`" class="tw-group">
    <div class="tw-rounded tw-relative tw-w-full tw-h-full">
      <div class="tw-w-full tw-h-full tw-overflow-hidden tw-rounded-md">
        <img
          :src="collection?.image"
          :alt="collection?.name"
          class="tw-w-full tw-h-full tw-min-h-[370px] tw-transition-all tw-duration-200 tw-ease-linear tw-transform group-hover:tw-scale-110"
        />
      </div>
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-px-8 tw-py-2 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card"
      >
        <h5 class="tw-text-lg tw-uppercase tw-font-medium collection-name">
          {{ collection?.name }}
        </h5>
        <h6 class="tw-text-xl tw-text-wapal-pink tw-font-normal" v-if="status">
          Live
        </h6>
        <count-down
          :startTime="getStartTime"
          @countdownComplete="countdownComplete"
          v-else
        />
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-8 tw-capitalize tw-w-full"
        >
          <div>items {{ collection?.supply }}</div>
          <div>price {{ getPrice }} apt</div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import CountDown from "@/components/Reusable/CountDown.vue";

export default {
  components: { CountDown },
  props: {
    collection: { type: Object },
  },
  data() {
    return {
      status: false,
    };
  },
  computed: {
    getStatus() {
      const whiteListDate = new Date(
        this.collection.candyMachine_id.whitelist_sale_time
      );
      const publicSaleDate = new Date(
        this.collection.candyMachine_id.public_sale_time
      );

      const date = new Date();

      if (date > whiteListDate || date > publicSaleDate) {
        return true;
      }

      return false;
    },
    getStartTime() {
      const whiteListDate = new Date(
        this.collection.candyMachine_id.whitelist_sale_time
      );
      const publicSaleDate = new Date(
        this.collection.candyMachine_id.public_sale_time
      );

      if (whiteListDate > publicSaleDate) {
        return publicSaleDate.toString();
      } else {
        return whiteListDate.toString();
      }
    },
    getPrice() {
      const whiteListDate = new Date(
        this.collection.candyMachine_id.whitelist_sale_time
      );
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

      if (whiteListDate > now && whiteListDate < publicSaleDate) {
        return this.collection.candyMachine_id.whitelist_price;
      } else {
        return this.collection.candyMachine_id.public_sale_price;
      }
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
