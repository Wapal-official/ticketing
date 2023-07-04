<template>
  <div
    class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-rounded-lg tw-cursor-pointer tw-group/landing-card md:!tw-w-[312px] md:!tw-h-[312px]"
    @click="redirectToCollection"
  >
    <div
      class="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-rounded-lg"
    >
      <div class="tw-w-full tw-h-full">
        <img
          :src="collection?.image"
          :alt="collection?.name"
          class="tw-w-full tw-h-full tw-object-cover tw-rounded-lg tw-absolute tw-top-0 tw-transition-all tw-ease-linear tw-duration-300 tw-transform group-hover/landing-card:tw-scale-125"
        />
      </div>
      <div
        class="tw-absolute tw-w-full tw-h-1/2 tw-top-[51%] gradient tw-rounded-lg"
      ></div>
      <div
        class="tw-absolute tw-top-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-items-start tw-justify-between tw-px-4"
      >
        <div
          class="tw-rounded-full tw-bg-black/20 tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2.5 tw-px-3.5 tw-py-1.5 tw-mt-4"
        >
          <div
            class="tw-rounded-full tw-w-2.5 tw-h-2.5"
            :class="{
              'tw-bg-utility-green': getLiveStatus,
              'tw-bg-utility-yellow': !getLiveStatus,
            }"
          ></div>
          <div class="tw-font-medium">
            {{ getLiveStatus ? "Live" : "Upcoming" }}
          </div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-pb-4"
        >
          <h3 class="tw-font-semibold">
            {{ collection?.name }}
          </h3>
          <div
            class="tw-text-white/70 tw-text-[0.875rem]"
            v-if="getPrice != '0APT'"
          >
            Price {{ getPrice }}
          </div>
          <div class="tw-text-white/70 tw-text-[0.875rem]" v-else>
            Free Mint
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: { collection: { type: Object } },
  computed: {
    getLiveStatus() {
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
  },
  methods: {
    redirectToCollection() {
      this.$router.push(`/nft/${this.collection.username}`);
    },
  },
};
</script>
<style>
.gradient {
  background: linear-gradient(180deg, rgba(16, 17, 19, 0) 0%, #000000 100%);
}
</style>
