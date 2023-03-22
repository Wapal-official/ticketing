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
    <div
      class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-4 tw-w-full md:tw-flex-row md:tw-items-center"
    >
      <button class="tw-bg-wapal-pink tw-rounded tw-px-8 tw-py-2">
        Import CSV
      </button>
      <button class="tw-bg-wapal-pink tw-rounded tw-px-8 tw-py-2">
        Set Whitelist
      </button>
    </div>
    <div
      class="tw-rounded tw-w-full tw-py-4 tw-px-4 tw-border-[3px] tw-border-wapal-secondary-blue tw-my-4"
    >
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="whitelist-data-table"
        mobile-breakpoint="0"
        :hide-default-footer="true"
        disable-pagination
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="item in items"
              :key="item._id"
              class="tw-cursor-pointer hover:!tw-bg-black/60"
            >
              <td class="!tw-border-none tw-font-light">
                {{ item.discord_username }}
              </td>
              <td class="!tw-border-none tw-font-light">
                {{ item.wallet_address }}
              </td>
              <td class="!tw-border-none tw-font-light">
                {{ item.discord_roles }}
              </td>
              <td class="!tw-border-none tw-font-light">
                {{ getFormattedDate(item.date_joined) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script lang="ts">
import moment from "moment";
export default {
  layout: "dashboard",
  data() {
    return {
      breadcrumbs: [
        { text: "Whitelist", href: "/dashboard/whitelist" },
        { text: "Whitelist Entries" },
      ],
      headers: [
        {
          text: "Discord Username",
          align: "start",
          sortable: true,
          value: "discord_username",
          width: "200px",
          class:
            "!tw-text-white !tw-text-base !tw-font-normal !tw-border-none !tw-bg-transparent",
        },
        {
          text: "Wallet Address",
          align: "start",
          sortable: true,
          value: "wallet_address",
          class:
            "!tw-text-white !tw-text-base !tw-font-normal !tw-border-none !tw-bg-transparent",
        },
        {
          text: "Discord Roles",
          align: "start",
          sortable: true,
          value: "discord_roles",
          width: "165px",
          class:
            "!tw-text-white !tw-text-base !tw-font-normal !tw-border-none !tw-bg-transparent",
        },
        {
          text: "Date Joined",
          align: "start",
          sortable: true,
          value: "date_joined",
          class:
            "!tw-text-white !tw-text-base !tw-font-normal !tw-border-none !tw-bg-transparent",
          width: "165px",
        },
      ],
      items: [
        {
          discord_username: "Meol #3300",
          wallet_address:
            "0x11f0323f1d5b867414fdd80a4765f329546999241fc03bd9ec8bb089b1e9eea1",
          discord_roles: "Verified",
          date_joined: "03/22/2023",
        },
      ],
    };
  },
  methods: {
    getFormattedDate(date: any) {
      return moment(date).format("MMM DD, YYYY");
    },
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

.whitelist-data-table::v-deep.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: none !important;
}
</style>
