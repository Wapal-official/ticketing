<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <v-breadcrumbs
        :items="breadcrumbs"
        class="breadcrumb !tw-text-base !tw-w-full"
      >
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
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-end"
      >
        <button-primary
          @click="gotoSetupWhitelistPage"
          :disabled="!setupWhitelistStatus"
          title="Setup Whitelist"
          :bordered="true"
        />
        <button-primary
          @click="showSetWhitelistModal = true"
          :disabled="sendingDataToSetRoot"
          :bordered="true"
          title="
          Set Whitelist"
        />
      </div>
    </div>
    <table class="tw-w-full tw-text-wapal-gray" v-if="!loading">
      <thead class="">
        <th class="default-data-table-header tw-text-left !tw-py-3 tw-px-3">
          Phase Name
        </th>
        <th class="default-data-table-header tw-text-right !tw-py-3 tw-px-3">
          Mint Date
        </th>
      </thead>
      <tbody>
        <tr
          class="tw-border-b !tw-border-b-dark-6 tw-transition tw-duration-200 tw-ease-linear tw-cursor-pointer hover:tw-bg-black/80"
          v-for="(phase, index) in collection.phases"
          :key="index"
          @click="
            $router.push(
              `/dashboard/whitelist/${$route.params.id}/phases/${phase.id}`
            )
          "
        >
          <td
            class="tw-py-3 tw-px-3 tw-capitalize tw-text-white tw-font-medium tw-text-left"
          >
            {{ phase.name }}
          </td>
          <td
            class="tw-py-3 tw-px-3 tw-text-white tw-font-medium tw-text-right"
          >
            {{ getFormattedDate(phase.mint_time) }}
          </td>
        </tr>
      </tbody>
    </table>
    <reusable-loading v-else />
    <v-dialog
      v-model="showSetWhitelistModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-bg-dark-7 tw-text-dark-0 tw-rounded"
      >
        <h3 class="tw-text-lg">Are you sure you want to set Whitelist?</h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-8"
        >
          <button-primary title="Yes" @click="sendDataToSetRoot" />
          <button-primary
            @click="showSetWhitelistModal = false"
            title="No"
            :bordered="true"
          />
        </div>
      </div>
    </v-dialog>
    <v-dialog
      v-model="sendingDataToSetRoot"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-bg-modal-gray tw-rounded"
      >
        <h2>Setting Root</h2>
        <div
          class="tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-center"
        >
          <reusable-loading />
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import moment from "moment";
import {
  getCollectionByUsername,
  updateCollection,
} from "@/services/CollectionService";
import { getWhitelistByUsername, setRoot } from "@/services/WhitelistService";
export default {
  components: {},
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

      setupWhitelistStatus: false,

      sendingDataToSetRoot: false,
      showSetWhitelistModal: false,
    };
  },
  methods: {
    getFormattedDate(date: any) {
      return moment(date).format("MMM DD, YYYY");
    },
    gotoSetupWhitelistPage() {
      this.$router.push(
        `/dashboard/whitelist/setup-whitelist/${this.collection._id}`
      );
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
            resourceAccount: this.collection.candyMachine.resource_account,
            candyMachineId: this.collection.candyMachine.candy_id,
          }
        );

        await updateCollection(this.collection._id, this.collection);

        this.$toast.showMessage({
          message: "Wallet Addresses Added For Whitelist",
        });

        this.sendingDataToSetRoot = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.sendingDataToSetRoot = false;
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
    const res = await getWhitelistByUsername(this.$route.params.id);

    const whitelist = res.data.whitelist;

    this.collection = await getCollectionByUsername(this.$route.params.id);

    if (whitelist) {
      this.setupWhitelistStatus = false;
    } else {
      this.setupWhitelistStatus = true;
    }

    this.loading = false;
  },
};
</script>
