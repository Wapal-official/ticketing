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
      <button
        @click="gotoSetupWhitelistPage"
        class="!tw-bg-wapal-pink tw-rounded tw-px-8 tw-py-2 disabled:tw-cursor-not-allowed"
        :disabled="!setupWhitelistStatus"
      >
        Setup Whitelist
      </button>
      <form @submit.prevent="">
        <label
          class="tw-cursor-pointer tw-flex tw-flex-row tw-items-start tw-justify-start"
        >
          <input
            type="file"
            class="tw-invisible tw-w-0 tw-h-0"
            @change="setCSVFile"
          />
          <div class="tw-bg-wapal-pink tw-rounded tw-px-8 tw-py-2">
            Import CSV
          </div>
        </label>
      </form>
      <button
        class="tw-bg-wapal-pink tw-rounded tw-px-8 tw-py-2"
        @click="showSetWhitelistModal = true"
        :disabled="sendingDataToSetRoot"
      >
        Set Whitelist
      </button>
    </div>
    <div
      class="tw-rounded tw-w-full tw-py-4 tw-px-4 tw-border-[3px] tw-border-wapal-secondary-blue tw-my-4"
    >
      <v-data-table
        :headers="headers"
        :items="paginatedWhitelistEntries"
        :items-per-page="5"
        class="whitelist-data-table"
        mobile-breakpoint="0"
        :hide-default-footer="true"
        disable-pagination
        v-if="!loading"
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
      </v-data-table>
      <loading v-else />
    </div>
    <v-dialog
      v-model="showCSVUploadModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-bg-modal-gray tw-rounded"
      >
        <h3 class="tw-text-lg">
          Are you sure you want to import this CSV file?
        </h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-8"
        >
          <button
            class="tw-py-2 tw-px-8 tw-rounded tw-text-white tw-bg-[#1C452C]"
            @click="uploadCSV"
          >
            Yes
          </button>
          <button
            class="tw-py-2 tw-px-8 tw-rounded tw-text-white tw-bg-[#7B0707]"
            @click="resetCSV"
          >
            No
          </button>
        </div>
      </div>
    </v-dialog>
    <v-dialog
      v-model="showSetWhitelistModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-bg-modal-gray tw-rounded"
      >
        <h3 class="tw-text-lg">Are you sure you want to set Whitelist?</h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-8"
        >
          <button
            class="tw-py-2 tw-px-8 tw-rounded tw-text-white tw-bg-[#1C452C]"
            @click="sendDataToSetRoot"
          >
            Yes
          </button>
          <button
            class="tw-py-2 tw-px-8 tw-rounded tw-text-white tw-bg-[#7B0707]"
            @click="showSetWhitelistModal = false"
          >
            No
          </button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Loading from "@/components/Reusable/Loading.vue";
import {
  getWhitelistById,
  getWhitelistEntryById,
  setRoot,
  uploadCSVInWhitelistEntry,
} from "@/services/WhitelistService";

import moment from "moment";
import { getCollection } from "@/services/CollectionService";
export default {
  components: { Loading },
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
      whitelistEntries: [],
      paginatedWhitelistEntries: [],
      selectedCSVFile: null,
      showCSVUploadModal: false,
      collection: { _id: null },
      loading: true,
      sendingDataToSetRoot: false,
      showSetWhitelistModal: false,
      setupWhitelistStatus: true,
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
        const formData = new FormData();

        formData.append("collection_id", this.collection._id);
        formData.append("user_id", this.$store.state.userStore.user.user_id);
        formData.append("csv", this.selectedCSVFile);

        const res = await uploadCSVInWhitelistEntry(formData);

        this.$toast.showMessage({ message: "CSV File Imported Successfully" });
        this.showCSVUploadModal = false;

        this.fetchWhitelistEntries();
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    resetCSV() {
      this.showCSVUploadModal = false;
      this.selectedCSVFile = false;
    },
    async fetchWhitelistEntries() {
      this.loading = true;

      const res = await getWhitelistEntryById(this.collection._id, 100, 1);

      this.whitelistEntries = res.data.whitelistEntries;
      this.paginatedWhitelistEntries = this.whitelistEntries;

      this.loading = false;
    },
    async sendDataToSetRoot() {
      try {
        this.showSetWhitelistModal = false;
        this.sendingDataToSetRoot = true;

        const rootData = {
          collection_id: this.collection._id,
        };

        const res = await setRoot(rootData);

        const root: any[] = [];

        res.data.root.data.map((rootData: any) => {
          rootData.data;

          root.push(rootData);
        });

        const transactionRes = await this.$store.dispatch(
          "walletStore/setMerkleRoot",
          {
            root: root,
            resourceAccount: this.collection.candyMachine_id.resource_account,
            candyMachineId: this.collection.candyMachine_id.candy_id,
          }
        );

        this.$toast.showMessage({
          message: "Wallet Addresses Added For Whitelist",
        });

        this.sendingDataToSetRoot = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    gotoSetupWhitelistPage() {
      this.$router.push(
        `/dashboard/whitelist/setup-whitelist/${this.collection._id}`
      );
    },
  },
  async mounted() {
    let id = this.$route.params.id;
    const res = await getWhitelistById(this.$route.params.id);

    const whitelist = res.data.whitelist;

    if (whitelist) {
      this.setupWhitelistStatus = false;
      id = whitelist.collection_id;
    }

    const collectionRes = await getCollection(id);

    this.collection = collectionRes.collection[0];

    await this.fetchWhitelistEntries();
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
