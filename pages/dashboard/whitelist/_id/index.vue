<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
  >
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumb !tw-text-base">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled">
          <NuxtLink
            class="!tw-text-white"
            :to="item.href ? item.href : $route.fullPath"
          >
            {{ item.text }}
          </NuxtLink>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <table class="tw-w-full tw-text-wapal-gray" v-if="!loading">
      <thead class="tw-border-b tw-border-[#ff36ab33]">
        <th class="tw-text-left tw-text-lg tw-py-7 tw-px-4">Phase Name</th>
        <th class="tw-text-left tw-text-lg tw-py-7 tw-px-4">Mint Date</th>
      </thead>
      <tbody>
        <tr
          v-if="checkWhitelistSale"
          class="tw-border-b tw-border-[#ff36ab33] tw-transition tw-duration-200 tw-ease-linear tw-cursor-pointer hover:tw-bg-black/80"
          @click="
            $router.push(
              `/dashboard/whitelist/${$route.params.id}/phases/whitelist`
            )
          "
        >
          <td class="tw-py-8 tw-px-4">Whitelist Sale</td>
          <td class="tw-py-8 tw-px-4">
            {{
              getFormattedDate(this.collection.candyMachine.whitelist_sale_time)
            }}
          </td>
        </tr>
        <tr
          class="tw-border-b tw-border-[#ff36ab33] tw-transition tw-duration-200 tw-ease-linear tw-cursor-pointer hover:tw-bg-black/80"
          v-for="(phase, index) in collection.phases"
          :key="index"
          @click="
            $router.push(
              `/dashboard/whitelist/${$route.params.id}/phases/${phase.id}`
            )
          "
        >
          <td class="tw-py-8 tw-px-4">{{ phase.name }}</td>
          <td class="tw-py-8 tw-px-4">
            {{ getFormattedDate(phase.mint_time) }}
          </td>
        </tr>
      </tbody>
    </table>
    <loading v-else />
  </div>
</template>
<script lang="ts">
import Loading from "@/components/Reusable/Loading.vue";

import moment from "moment";
import { getCollectionByUsername } from "@/services/CollectionService";
export default {
  components: { Loading },
  layout: "dashboard",
  data() {
    return {
      breadcrumbs: [
        { text: "Whitelist", href: "/dashboard/whitelist" },
        { text: "Phase" },
      ],
      collection: {
        _id: null,
        phases: [{ id: "", name: "", mint_time: "", mint_price: "" }],
      },
      loading: true,
    };
  },
  methods: {
    getFormattedDate(date: any) {
      return moment(date).format("MMM DD, YYYY");
    },
  },
  computed: {
    checkWhitelistSale() {
      const whitelistTime = new Date(
        this.collection.candyMachine.whitelist_sale_time
      ).getTime();
      const publicSaleTime = new Date(
        this.collection.candyMachine.public_sale_time
      ).getTime();

      if (publicSaleTime - whitelistTime === 1000) {
        return false;
      } else {
        return true;
      }
    },
  },
  async mounted() {
    const collectionRes = await getCollectionByUsername(this.$route.params.id);

    this.collection = collectionRes.data.collection[0];

    this.loading = false;
  },
};
</script>
