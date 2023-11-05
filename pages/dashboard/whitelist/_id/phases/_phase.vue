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
            class="!tw-text-white !tw-capitalize"
            :to="item.href ? item.href : $route.fullPath"
          >
            {{ item.text }}
          </NuxtLink>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <div
      class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-4 tw-w-full md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <!-- <div class="tw-relative">
        <reusable-theme-button title="" :bordered="true" @click="">
          <template #icon> Filter <v-icon>mdi-tune</v-icon> </template>
        </reusable-theme-button>
        <div
          class="tw-absolute tw-top-[90%] tw-w-full px-8 tw-py-4 tw-bg-wapal-background tw-rounded-b-md tw-rounded-t-none tw-border !tw-border-solid tw-border-wapal-pink tw-min-w-screen md:tw-min-w-[300px]"
        >
          <button
            class="tw-w-full tw-px-8 tw-py-6 tw-flex tw-flex-row tw-items-center tw-justify-between tw-bg-wapal-background"
          >
            <span>Role</span>
            <v-icon class="!tw-text-wapal-pink">mdi-chevron-down</v-icon>
          </button>
          <div class="tw-w-full tw-bg-wapal-background tw-px-8">
            <input
              class="tw-w-full tw-border !tw-border-solid tw-border-white tw-py-4 tw-px-2 focus:tw-outline-none"
            />
            <reusable-theme-button title="Apply" class="tw-my-4" />
          </div>
        </div>
      </div>
      <v-menu offset-y id="filter-dropdown" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <button
            class="tw-text-base tw-capitalize tw-text-white tw-bg-transparent !tw-border !tw-border-solid !tw-border-wapal-pink tw-rounded-md tw-px-6 tw-py-2 tw-text-center tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 disabled:tw-cursor-not-allowed"
            v-bind="attrs"
            v-on="on"
          >
            Filter <v-icon>mdi-tune</v-icon>
          </button>
        </template>

        <button
          class="tw-w-full tw-px-8 tw-py-6 tw-flex tw-flex-row tw-items-center tw-justify-between tw-bg-wapal-background"
        >
          <span>Role</span>
          <v-icon class="!tw-text-wapal-pink">mdi-chevron-down</v-icon>
        </button>
        <div class="tw-w-full tw-bg-wapal-background tw-px-8">
          <input
            class="tw-w-full tw-border !tw-border-solid tw-border-white tw-py-4 tw-px-2 focus:tw-outline-none"
          />
          <reusable-theme-button title="Apply" class="tw-my-4" />
        </div>
      </v-menu> -->
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full md:tw-flex-row md:tw-items-center md:tw-justify-end"
      >
        <!-- <div class="tw-relative tw-w-full md:tw-w-fit">
          <button-primary
            :bordered="true"
            title="Role"
            @click="showRoleFilter = !showRoleFilter"
          >
            <template #append-icon>
              <i
                class="bx bx-chevron-down tw-text-xl tw-text-white tw-pl-16"
              ></i>
            </template>
          </button-primary>
          <div
            class="tw-absolute tw-w-full tw-top-[110%] tw-rounded tw-border tw-border-dark-4 tw-bg-dark-8 tw-py-5 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
            v-if="showRoleFilter"
          >
            <input-text-field v-model="role" placeholder="Role" />
            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
            >
              <button class="tw-text-white tw-uppercase tw-text-xs">
                Clear
              </button>
              <button
                class="tw-bg-primary-1 tw-px-6 tw-py-2 tw-text-xs tw-text-white tw-rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div class="tw-w-full md:tw-w-[380px] xl:tw-w-[424px]">
          <input-text-field
            v-model="search"
            placeholder="Search Wallet Address"
          />
        </div> -->
        <form @submit.prevent="" class="tw-w-full md:tw-w-fit">
          <label
            class="tw-cursor-pointer tw-flex tw-flex-row tw-items-start tw-justify-start"
          >
            <input
              type="file"
              class="tw-invisible tw-w-0 tw-h-0 disabled:tw-cursor-not-allowed"
              @change="setCSVFile"
              ref="csv"
            />
            <button-primary
              :bordered="true"
              title="Import CSV"
              @click="showFileSelectionDialog"
            >
              <template #prepend-icon>
                <i class="bx bx-import tw-text-xl tw-text-white tw-pr-2"></i>
              </template>
            </button-primary>
          </label>
        </form>
      </div>
    </div>
    <div class="tw-rounded tw-w-full tw-py-4 tw-my-4">
      <dashboard-collection-table
        :headers="headers"
        :items="paginatedWhitelistEntries"
      />
      <!-- <v-data-table
        :headers="headers"
        :items="paginatedWhitelistEntries"
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
                {{ item.discord.username }}
              </td>
              <td class="!tw-border-none tw-font-light">
                {{ item.wallet_address }}
              </td>
              <td class="!tw-border-none tw-font-light">
                <span v-for="(role, index) in item.discord.roles" :key="role">
                  {{
                    index === item.discord.roles.length - 1 ? role : `${role}, `
                  }}
                </span>
              </td>
              <td class="!tw-border-none tw-font-light">
                {{ getFormattedDate(item.date) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table> -->
      <div
        v-if="!loaded"
        v-intersect="{ handler: handleIntersect, threshold: [] }"
      ></div>
      <reusable-loading v-if="loading" />
    </div>
    <v-dialog
      v-model="showCSVUploadModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-bg-dark-7 tw-text-dark-0 tw-rounded"
      >
        <h3 class="tw-text-lg" v-if="!uploading">
          Are you sure you want to import this CSV file?
        </h3>
        <h3 v-else>Uploading CSV File</h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-8"
          v-if="!uploading"
        >
          <button-primary title="Yes" @click="uploadCSV" />
          <button-primary title="No" @click="resetCSV" :bordered="true" />
        </div>
        <div
          class="tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-center"
          v-else
        >
          <reusable-loading />
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {
  getWhitelistEntryById,
  uploadCSVInWhitelistEntry,
} from "@/services/WhitelistService";

import moment from "moment";
import { getCollectionByUsername } from "@/services/CollectionService";

export default {
  layout: "dashboard",
  data() {
    return {
      breadcrumbs: [
        { text: "Whitelist", href: "/dashboard/whitelist" },
        {
          text: "Phase",
          href: `/dashboard/whitelist/${this.$route.params.id}`,
        },
        { text: this.$route.params.phase },
      ],
      headers: [
        {
          text: "Discord Username",
          align: "start",
          sortable: true,
          value: "discord_username",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          text: "Wallet Address",
          align: "start",
          sortable: true,
          value: "wallet_address",
          class: "default-data-table-header",
        },
        {
          text: "Role",
          align: "start",
          sortable: true,
          value: "discord_roles",
          width: "165px",
          class: "default-data-table-header",
        },
        {
          text: "Date Joined",
          align: "start",
          sortable: true,
          value: "date_joined",
          class: "default-data-table-header",
          width: "165px",
        },
      ],
      whitelistEntries: [],
      paginatedWhitelistEntries: [],
      selectedCSVFile: null,
      showCSVUploadModal: false,
      collection: {
        _id: null,
        phases: [{ id: "", name: "", mint_time: "", mint_price: "" }],
      },
      loading: true,
      page: 0,
      mappingData: false,
      uploading: false,
      search: null,
      role: null,
      showRoleFilter: false,
      loaded: false,
    };
  },
  methods: {
    getFormattedDate(date: any) {
      return moment(date).format("MMM DD, YYYY");
    },
    setCSVFile(event: any) {
      if (event.target.files[0]) {
        this.selectedCSVFile = event.target.files[0];
        this.showCSVUploadModal = true;
      }
    },
    async uploadCSV() {
      try {
        this.uploading = true;
        const formData = new FormData();

        formData.append("collection_id", this.collection._id);
        formData.append("user_id", this.$store.state.userStore.user.user_id);
        formData.append("phase", this.$route.params.phase);
        formData.append("csv", this.selectedCSVFile);

        const res = await uploadCSVInWhitelistEntry(formData);

        this.$toast.showMessage({ message: "CSV File Imported Successfully" });
        this.showCSVUploadModal = false;

        this.page = 0;
        this.mapWhitelistEntries();
        this.uploading = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.uploading = false;
      }
    },
    resetCSV() {
      this.showCSVUploadModal = false;
      this.selectedCSVFile = false;
    },
    async mapWhitelistEntries() {
      this.loading = true;

      this.page++;

      const res = await getWhitelistEntryById(
        this.collection._id,
        100,
        this.page,
        this.$route.params.phase
      );

      if (res.data.whitelistEntries.length === 0) {
        this.loading = false;
        this.mappingData = true;
        return;
      }

      this.whitelistEntries = res.data.whitelistEntries;

      this.whitelistEntries.map((whitelistEntry: any) => {
        whitelistEntry.date_joined = this.getFormattedDate(whitelistEntry.date);
        let roles: string = "";
        whitelistEntry.discord.roles.map((role: any, index: number) => {
          roles =
            index === whitelistEntry.discord.roles.length - 1
              ? role
              : `${role}, `;
        });

        whitelistEntry.discord_roles = roles;

        whitelistEntry.discord_username = whitelistEntry.discord.username;
      });

      this.paginatedWhitelistEntries.push(...this.whitelistEntries);

      this.loading = false;
      this.mappingData = false;
    },
    showFileSelectionDialog() {
      this.$refs.csv.click();
    },
    async handleIntersect(entries: any) {
      if (entries[0].isIntersecting) {
        this.mappingData = true;

        await this.mapWhitelistEntries();
      }
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

    await this.mapWhitelistEntries();
  },
};
</script>
<style scoped>
.v-menu__content {
  box-shadow: none;
  border: 1px solid #ff36ab;
  border-radius: 0px 0px 10px 10px;
}
</style>
