<template>
  <NuxtLink
    :to="`/nft/${collection?._id}`"
    class="tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-w-1/4"
  >
    <div class="tw-rounded tw-relative tw-w-full">
      <img
        :src="getImage"
        :alt="collection?.name"
        class="tw-w-full tw-h-full tw-object-contain tw-min-h-[370px]"
      />
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-px-8 tw-py-2 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card"
      >
        <h5 class="tw-text-lg tw-uppercase tw-font-medium">
          {{ collection?.name }}
        </h5>
        <h6
          class="tw-text-xl tw-text-wapal-pink tw-font-normal"
          v-if="getStatus"
        >
          Live
        </h6>
        <count-down :startTime="getStartTime" v-else />
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-12 tw-capitalize tw-w-full"
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
import fox from "@/assets/img/fox.png";
import astronaut from "@/assets/img/6195.png";
import pirate from "@/assets/img/6197.png";
import undead from "@/assets/img/3469.png";

export default {
  components: { CountDown },
  props: {
    collection: { type: Object },
  },
  data() {
    return { image: "", fox, astronaut, pirate, undead };
  },
  computed: {
    getStatus() {
      const whiteListDate = new Date(this.collection.whitelist_sale_time);
      const publicSaleDate = new Date(this.collection.public_sale_time);

      const date = new Date();

      if (date > whiteListDate || date > publicSaleDate) {
        return true;
      }

      return false;
    },
    getStartTime() {
      const whiteListDate = new Date(this.collection.whitelist_sale_time);
      const publicSaleDate = new Date(this.collection.public_sale_time);

      if (whiteListDate > publicSaleDate) {
        return publicSaleDate.toString();
      } else {
        return whiteListDate.toString();
      }
    },
    getPrice() {
      const whiteListDate = new Date(this.collection.whitelist_sale_time);
      const publicSaleDate = new Date(this.collection.public_sale_time);
      const now = new Date();
      if (
        this.collection.public_sale_price == this.collection.whitelist_price
      ) {
        return this.collection.public_sale_price;
      }

      if (whiteListDate > now && whiteListDate < publicSaleDate) {
        return this.collection.whitelist_price;
      } else {
        return this.collection.public_sale_price;
      }
    },
    getImage() {
      if (this.collection.image) {
        const test = this.collection.image.substring(18);
        if (test.includes("fox")) {
          return this.fox;
        } else if (test.includes("6195")) {
          return this.astronaut;
        } else if (test.includes("6197")) {
          return this.pirate;
        } else {
          return this.undead;
        }
      }
    },
  },
};
</script>
