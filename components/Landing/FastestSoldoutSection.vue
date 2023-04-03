<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-4"
  >
    <div class="tw-w-full tw-h-[0.5px] tw-bg-wapal-pink"></div>
    <div
      class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-center tw-text-wapal-pink tw-text-xl"
      v-if="!fastestSoldOutCollections[0]._id"
    >
      No Soldouts
    </div>
    <div
      class="tw-grid tw-grid-cols-1 tw-py-4 tw-gap-4 tw-w-full lg:tw-grid-cols-2 xl:tw-grid-cols-3"
      v-else
    >
      <table class="tw-w-full">
        <thead class="tw-select-none">
          <th
            class="tw-text-white tw-py-2 tw-font-normal tw-text-left tw-px-2 2xl:tw-px-4"
          >
            Collection
          </th>
          <th class="tw-text-white tw-py-2 tw-font-normal tw-text-left">
            Soldout In
          </th>
        </thead>
        <tbody>
          <tr
            v-for="item in fastestSoldOutCollections.slice(0, 6)"
            :key="item._id"
            class="tw-cursor-pointer hover:!tw-bg-black/60 tw-select-none"
            @click="redirectToCollection(item.username)"
          >
            <td
              class="!tw-border-none tw-flex tw-flex-row tw-items-center tw-justify-start tw-px-2 tw-py-2 tw-gap-8 2xl:tw-gap-16 2xl:tw-px-4"
            >
              <span>{{ item.rank }}</span>
              <div
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="tw-w-[50px] tw-h-[50px] tw-object-cover"
                />{{ item.name }}
              </div>
            </td>
            <td class="!tw-border-none tw-w-[80px] tw-py-2">
              {{ getFormattedTimeForSoldOutIn(item.soldOutIn) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="tw-hidden tw-w-full lg:tw-flex"
        v-if="fastestSoldOutCollections.length > 6"
      >
        <table class="tw-w-full tw-h-fit">
          <thead class="tw-select-none">
            <th
              class="tw-text-white tw-py-2 tw-font-normal tw-text-left tw-px-2 2xl:tw-px-4"
            >
              Collection
            </th>
            <th class="tw-text-white tw-py-2 tw-font-normal tw-text-left">
              Soldout In
            </th>
          </thead>
          <tbody>
            <tr
              v-for="item in fastestSoldOutCollections.slice(6, 12)"
              :key="item._id"
              class="tw-cursor-pointer hover:!tw-bg-black/60 tw-select-none"
              @click="redirectToCollection(item.username)"
            >
              <td
                class="!tw-border-none tw-flex tw-flex-row tw-items-center tw-justify-start tw-px-2 tw-py-2 tw-gap-8 2xl:tw-gap-16 2xl:tw-px-4"
              >
                <span>{{ item.rank }}</span>
                <div
                  class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="tw-w-[50px] tw-h-[50px] tw-object-cover"
                  />{{ item.name }}
                </div>
              </td>
              <td class="!tw-border-none tw-w-[80px] tw-py-2">
                {{ getFormattedTimeForSoldOutIn(item.soldOutIn) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="tw-hidden tw-w-full xl:tw-flex"
        v-if="fastestSoldOutCollections.length > 12"
      >
        <table class="tw-w-full tw-h-fit">
          <thead class="tw-select-none">
            <th
              class="tw-text-white tw-py-2 tw-font-normal tw-text-left tw-px-2 2xl:tw-px-4"
            >
              Collection
            </th>
            <th class="tw-text-white tw-py-2 tw-font-normal tw-text-left">
              Soldout In
            </th>
          </thead>
          <tbody>
            <tr
              v-for="item in fastestSoldOutCollections.slice(12, 18)"
              :key="item._id"
              class="tw-cursor-pointer hover:!tw-bg-black/60 tw-select-none"
              @click="redirectToCollection(item.username)"
            >
              <td
                class="!tw-border-none tw-flex tw-flex-row tw-items-center tw-justify-start tw-px-2 tw-py-2 tw-gap-8 2xl:tw-gap-16 2xl:tw-px-4"
              >
                <span>{{ item.rank }}</span>
                <div
                  class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="tw-w-[50px] tw-h-[50px] tw-object-cover"
                  />{{ item.name }}
                </div>
              </td>
              <td class="!tw-border-none tw-w-[80px] tw-py-2">
                {{ getFormattedTimeForSoldOutIn(item.soldOutIn) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <gradient-border-button
      @click.native="goToFastestSoldOutPage"
      class="tw-mt-2 tw-self-end"
      v-if="fastestSoldOutCollections[0]._id"
    >
      View All
    </gradient-border-button>
  </div>
</template>
<script lang="ts">
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
export default {
  props: { collections: { type: Array } },
  components: { GradientBorderButton },
  data() {
    return {
      fastestSoldOutCollections: [
        { _id: "", name: "", image: "", soldOutIn: "", rank: 0, username: "" },
      ],
    };
  },
  methods: {
    async fetchCollections() {
      let i = 1;

      if (this.collections.length > 0) {
        this.fastestSoldOutCollections = [];
        this.collections.map((collection: any) => {
          const whitelistSaleTime = collection.candyMachine_id
            .whitelist_sale_time
            ? new Date(collection.candyMachine_id.whitelist_sale_time).getTime()
            : null;

          const publicSaleTime = new Date(
            collection.candyMachine_id.public_sale_time
          ).getTime();

          let soldOutIn: any = 0;

          if (collection.status.sold_out) {
            const soldOutTime = new Date(collection.status.time).getTime();

            if (whitelistSaleTime) {
              soldOutIn = Math.floor((soldOutTime - whitelistSaleTime) / 1000);
            } else {
              soldOutIn = Math.floor((soldOutTime - publicSaleTime) / 1000);
            }

            this.fastestSoldOutCollections.push({
              _id: collection._id,
              rank: i,
              name: collection.name,
              image: collection.image,
              soldOutIn: soldOutIn,
              supply: collection.supply,
              price: collection.candyMachine_id.public_sale_price,
              username: collection.username,
            });

            i++;
          }
        });
      }
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
        soldOutIn = Math.floor(soldOutIn / (60 * 60)) + " Hrs";
      } else if (soldOutIn > 60) {
        soldOutIn = (soldOutIn / 60).toFixed(2) + " Min";
      } else {
        soldOutIn = soldOutIn + " Sec";
      }
      return soldOutIn;
    },
    goToFastestSoldOutPage() {
      this.$router.push("/fastest-soldout");
    },
  },
  mounted() {
    this.fetchCollections();
  },
};
</script>
