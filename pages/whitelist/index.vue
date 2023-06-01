<template>
  <div
    class="tw-container tw-mx-auto tw-px-4 tw-py-8 md:tw-px-8 tw-min-h-screen"
  >
    <h1 class="tw-text-white tw-text-3xl tw-pb-6">Whitelist Opportunities</h1>
    <v-data-table
      :headers="headers"
      :items="paginatedWhitelists"
      :items-per-page="5"
      class="whitelist-data-table"
      mobile-breakpoint="0"
      :hide-default-footer="true"
      disable-pagination
      v-if="!loading || paginatedWhitelists.length > 0"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="item in items"
            :key="item._id"
            class="tw-cursor-pointer hover:!tw-bg-black/60"
            @click="redirectToWhitelist(item.username)"
          >
            <td
              class="!tw-border-none tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 !tw-py-8"
            >
              <img
                :src="item.image"
                :alt="item.collectionName"
                class="tw-w-[50px] tw-h-[50px] tw-object-cover"
              />{{ item.collectionName }}
            </td>
            <td class="!tw-border-none">
              <div
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <a
                  :href="
                    item.twitter.slice(0, 4).includes('http')
                      ? item.twitter
                      : `https://${item.twitter}`
                  "
                  target="_blank"
                  @click.stop
                  ><v-icon class="!tw-text-lg !tw-text-white"
                    >mdi-twitter</v-icon
                  ></a
                >
                <a
                  class="!tw-text-lg !tw-text-white"
                  :href="
                    item.discord.slice(0, 4).includes('http')
                      ? item.discord
                      : `https://${item.discord}`
                  "
                  target="_blank"
                  @click.stop
                  ><img :src="discord" alt="discord"
                /></a>
              </div>
            </td>
            <td class="!tw-border-none">
              {{ getFormattedDate(item.mintDate) }}
            </td>
            <td class="!tw-border-none tw-px-2">
              <div
                class="tw-w-full tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-1"
              >
                <div class="tw-text-xs">
                  {{ item.spot.spotPercent }}% ({{ item.spot.occupiedSpots }} of
                  {{ item.spot.totalSpots }} )
                </div>
                <div
                  class="tw-relative tw-w-full tw-rounded-full tw-h-2 tw-bg-[#263D68] tw-overflow-hidden"
                >
                  <div
                    class="tw-absolute tw-rounded-full tw-h-2 tw-top-0 tw-left-0 tw-bg-wapal-pink"
                    :style="`width:${item.spot.spotPercent}%`"
                  ></div>
                </div>
              </div>
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

import {
  getAllWhitelist,
  getWhitelistEntryById,
} from "@/services/WhitelistService";
import { getCollection } from "@/services/CollectionService";

import discord from "@/assets/img/footer/discord.svg";

import moment from "moment";

export default {
  components: { Loading },
  data() {
    return {
      headers: [
        {
          text: "Collection Name",
          align: "start",
          sortable: true,
          value: "collectionName",
          width: "300px",
          class:
            "!tw-text-white !tw-border-b-wapal-pink !tw-text-base tw-font-normal",
        },
        {
          text: "Social Link",
          align: "start",
          width: "150px",
          class:
            "!tw-text-white !tw-border-b-wapal-pink !tw-text-base tw-font-normal",
        },
        {
          text: "Mint Date",
          align: "start",
          sortable: true,
          value: "mintDate",
          width: "150px",
          class:
            "!tw-text-white !tw-border-b-wapal-pink !tw-text-base tw-font-normal",
        },
        {
          text: "No. Of Spots",
          align: "start",
          sortable: true,
          value: "noOfSpots",
          width: "200px",
          class:
            "!tw-text-white !tw-border-b-wapal-pink !tw-text-base tw-font-normal",
        },
      ],
      whitelists: [],
      paginatedWhitelists: [],
      loading: true,
      discord,
    };
  },
  methods: {
    async fetchWhitelists() {
      this.loading = true;

      const res = await getAllWhitelist();
      const whitelists = res.data.whitelists;

      const collectionRes = await Promise.all(
        whitelists.map(async (whitelist: any) => {
          try {
            const res = await getCollection(whitelist.collection_id);

            const collection = res.collection[0];

            const spotRes = await getWhitelistEntryById(
              whitelist.collection_id,
              1,
              1,
              "whitelist"
            );

            const spots = {
              occupiedSpots: spotRes.data.spotsCount,
              totalSpots: whitelist.whitelist_spots,
              spotPercent: 0,
            };

            const spotPercent = Math.floor(
              (spots.occupiedSpots / spots.totalSpots) * 100
            );

            spots.spotPercent = spotPercent;

            return {
              _id: whitelist._id,
              username: collection.username,
              collectionName: collection.name,
              twitter: collection.twitter,
              discord: collection.discord,
              mintDate: whitelist.whitelist_end,
              noOfSpots: whitelist.whitelist_spots,
              image: collection.image,
              spot: spots,
            };
          } catch (error) {
            const id = Math.floor(Math.random() * 100);
            return {
              _id: id,
              username: "",
              collectionName: "",
              twitter: "",
              discord: "",
              mintDate: "",
              noOfSpots: "",
              image: "",
              spot: { occupiedSpots: 0, totalSpots: 0, spotPercent: 0 },
            };
          }
        })
      );

      this.whitelists = collectionRes;

      this.paginatedWhitelists = this.whitelists;

      this.loading = false;
    },
    getFormattedDate(date: string) {
      return moment(date).format("MMM DD, HH:MM A");
    },
    redirectToWhitelist(id: string) {
      if (id) {
        this.$router.push(`/whitelist/${id}`);
      }
    },
  },
  async mounted() {
    await this.fetchWhitelists();
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
