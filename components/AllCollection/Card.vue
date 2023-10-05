<template>
  <NuxtLink
    :to="getRedirectLink"
    class="!tw-text-white tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
  >
    <div class="tw-text-sm tw-font-semibold">{{ collectionNumber }}.</div>
    <img
      class="tw-w-[96px] tw-h-[96px] tw-object-cover tw-rounded"
      :src="collection?.image"
      :onerror="imageNotFound()"
      :alt="collection?.name"
    />
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1">
      <div class="tw-font-medium">{{ collection?.name }}</div>
      <div class="tw-text-dark-2 tw-text-sm tw-font-medium">
        {{ minted }}/{{ totalSupply }}
        Minted
      </div>
      <div
        class="tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2.5"
      >
        <div
          class="tw-rounded-full tw-w-2.5 tw-h-2.5"
          :class="{
            'tw-bg-utility-green': getLiveStatus,
            'tw-bg-utility-yellow': !getLiveStatus,
            '!tw-bg-utility-red': soldOut,
          }"
        ></div>
        <div class="tw-font-medium tw-text-[0.875rem]" v-if="!soldOut">
          {{ getLiveStatus ? "Live" : "Upcoming" }}
        </div>
        <div class="tw-font-medium tw-text-[0.875rem]" v-else>Soldout</div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import { getCollection } from "@/services/CollectionService";
import imageNotFound from "@/utils/imageNotFound";
export default {
  props: {
    collection: { type: Object },
    collectionNumber: { type: Number },
  },
  data() {
    return {
      totalSupply: 0,
      minted: 0,
      imageNotFound,
      soldOut: false,
    };
  },
  async mounted() {
    try {
      const collectionRes = await getCollection(this.collection._id);
      const collection = collectionRes.collection[0];
      const res = await this.$store.dispatch(
        "walletStore/getSupplyAndMintedOfCollection",
        {
          resourceAccountAddress: collection.candyMachine.resource_account,
          candyMachineId: collection.candyMachine.candy_id,
        }
      );

      this.totalSupply = res.total_supply;
      this.minted = res.minted;

      if (this.collection._id === "642bf277c10560ca41e179fa") {
        this.totalSupply = 239;
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        this.totalSupply = 222;
      } else if (this.collection._id === "64686db77db14461740bab0f") {
        this.totalSupply = 355;
      } else if (this.collection._id === "64625d957c7212d927559962") {
        this.totalSupply = 2333;
      } else if (this.collection._id === "6466a09b6fee90eea757521c") {
        this.totalSupply = 343;
      }

      if (this.totalSupply == this.minted) {
        this.soldOut = true;
      }
    } catch {
      this.totalSupply = 0;
      this.minted = 0;
    }
  },
  computed: {
    getLiveStatus() {
      if (!this.collection.candyMachine) {
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
    },
    getRedirectLink() {
      if (this.collection.redirectTo === "landingDraft") {
        return `/nft/draft/${this.collection?._id}`;
      }

      return `/nft/${this.collection?.username}`;
    },
  },
};
</script>
