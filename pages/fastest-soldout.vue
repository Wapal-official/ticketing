<template>
  <div
    class="tw-container tw-mx-auto tw-px-4 tw-py-8 md:tw-px-8 tw-min-h-screen"
  >
    <h1 class="tw-text-white tw-text-3xl tw-pb-6">Fastest Soldout</h1>
    <v-data-table
      :headers="headers"
      :items="paginatedCollections"
      :items-per-page="5"
      class="whitelist-data-table"
      mobile-breakpoint="0"
      :hide-default-footer="true"
      disable-pagination
      v-if="!loading || paginatedCollections.length > 0"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="item in items"
            :key="item._id"
            class="tw-cursor-pointer hover:!tw-bg-black/60"
            @click="redirectToCollection(item.username)"
          >
            <td class="!tw-border-none">
              {{ item.rank }}
            </td>
            <td
              class="!tw-border-none tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 !tw-py-8"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="tw-w-[50px] tw-h-[50px] tw-object-cover"
              />{{ item.name }}
            </td>
            <td class="!tw-border-none">
              {{ getFormattedTimeForSoldOutIn(item.soldOutIn) }}
            </td>
            <td class="!tw-border-none">{{ item.price }} APT</td>
            <td class="!tw-border-none">
              {{ item.supply }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <div v-if="loading">
      <loading />
    </div>
  </div>
</template>
<script lang="ts">
import Loading from "@/components/Reusable/Loading.vue";

import { getCollections } from "@/services/CollectionService";

export default {
  components: { Loading },
  data() {
    return {
      headers: [
        {
          text: "Rank",
          align: "start",
          sortable: true,
          value: "rank",
          width: "100px",
          class:
            "!tw-text-white !tw-border-b-wapal-dashboard-active !tw-text-base tw-font-normal",
        },
        {
          text: "Collection Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "300px",
          class:
            "!tw-text-white !tw-border-b-wapal-dashboard-active !tw-text-base tw-font-normal",
        },
        {
          text: "Soldout In",
          align: "start",
          sortable: true,
          value: "soldOutIn",
          width: "100px",
          class:
            "!tw-text-white !tw-border-b-wapal-dashboard-active !tw-text-base tw-font-normal",
        },
        {
          text: "Price",
          align: "start",
          sortable: true,
          value: "price",
          width: "100px",
          class:
            "!tw-text-white !tw-border-b-wapal-dashboard-active !tw-text-base tw-font-normal",
        },
        {
          text: "Items",
          align: "start",
          sortable: true,
          value: "supply",
          width: "100px",
          class:
            "!tw-text-white !tw-border-b-wapal-dashboard-active !tw-text-base tw-font-normal",
        },
      ],
      collections: [],
      paginatedCollections: [],
      loading: true,
    };
  },
  methods: {
    async fetchCollections() {
      this.loading = true;

      const collections = await getCollections(1, 100);

      collections.map((collection: any) => {
        const whitelistSaleTime = collection.candyMachine.whitelist_sale_time
          ? new Date(collection.candyMachine.whitelist_sale_time).getTime()
          : null;

        const publicSaleTime = new Date(
          collection.candyMachine.public_sale_time
        ).getTime();

        let soldOutIn: any = 0;

        if (collection.status.sold_out) {
          const soldOutTime = new Date(collection.status.time).getTime();

          if (whitelistSaleTime) {
            soldOutIn = Math.floor((soldOutTime - whitelistSaleTime) / 1000);
          } else {
            soldOutIn = Math.floor((soldOutTime - publicSaleTime) / 1000);
          }

          this.collections.push({
            _id: collection._id,
            rank: 1,
            name: collection.name,
            image: collection.image,
            soldOutIn: soldOutIn,
            supply: collection.supply,
            price: collection.candyMachine.public_sale_price,
            username: collection.username,
          });
        }
      });

      this.sortCollectionBasedOnSoldOutTime();

      this.rankCollectionBasedOnSoldOutTime();

      this.paginatedCollections = this.collections;

      this.loading = false;
    },

    sortCollectionBasedOnSoldOutTime() {
      this.collections.sort((a: any, b: any) => a.soldOutIn - b.soldOutIn);
    },
    rankCollectionBasedOnSoldOutTime() {
      let i = 1;

      this.collections.map((collection: any) => {
        collection.rank = i;
        i++;
      });
    },
    redirectToCollection(username: string) {
      if (username) {
        this.$router.push(`/nft/${username}`);
      }
    },
    getFormattedTimeForSoldOutIn(soldOutIn: any) {
      if (soldOutIn > 60 * 60 * 24) {
        soldOutIn = Math.floor(soldOutIn / (60 * 60 * 24)) + " Days";
      } else if (soldOutIn > 60 * 60) {
        soldOutIn = Math.floor(soldOutIn / (60 * 60)) + " Hours";
      } else if (soldOutIn > 60) {
        soldOutIn = (soldOutIn / 60).toFixed(2) + " Minutes";
      } else {
        soldOutIn = soldOutIn + " Seconds";
      }
      return soldOutIn;
    },
  },
  async mounted() {
    await this.fetchCollections();
  },
};
</script>
<style>
.whitelist-data-table {
  min-width: 100% !important;
  max-width: 100% !important;
  overflow-x: auto !important;
  background: transparent !important;
}
</style>
