<template>
  <div
    class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2"
    v-if="!loading"
  >
    <div class="tw-w-full">
      <img :src="collection.image" :alt="collection.name" />
    </div>
    <div class="tw-w-full tw-flex tw-flex-col tw-gap-4">
      <h2 class="tw-text-2xl tw-font-semibold">{{ collection.name }}</h2>
      <p>{{ collection.description }}</p>
      <h3>Total Supply</h3>
      <div
        class="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-start"
      >
        <div>
          {{ collection.supply }}
        </div>
        <reusable-theme-button
          title="Change Total Supply"
          @click="changeWhitelistSaleTimeDialog = true"
        />
      </div>
      <div>
        <reusable-theme-button
          title="Edit Collection"
          @click="editCollectionDialog = true"
        />
      </div>
    </div>
    <v-dialog
      v-model="changeWhitelistSaleTimeDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">Change Supply</h2>
      <div class="tw-w-full">
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Total Supply</label
          >
          <reusable-text-field
            v-model="editCollection.totalSupply"
            placeholder="Enter Supply"
          />
        </ValidationProvider>
      </div>
      <reusable-theme-button
        title="Set Total Supply"
        @click="updateWhitelistSaleTime"
      />
    </v-dialog>
    <v-dialog
      v-model="editCollectionDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">Edit Collection</h2>
      <ValidationProvider
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
        rules="required"
        v-slot="{ errors }"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Whitelist Sale Time</label
        >
        <reusable-date-picker
          v-model="editCollection.whitelistSaleTime"
          placeholder="Select Whitelist Sale Time"
          type="datetime"
        />
      </ValidationProvider>

      <ValidationProvider
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
        rules="required"
        v-slot="{ errors }"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Public Sale Time</label
        >
        <reusable-date-picker
          v-model="editCollection.publicSaleTime"
          placeholder="Select Public Sale Time"
          type="datetime"
        />
      </ValidationProvider>
      <ValidationProvider
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
        rules="required"
        v-slot="{ errors }"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Whitelist Price</label
        >
        <reusable-text-field
          v-model="editCollection.whitelistPrice"
          placeholder="Enter Pre-sale Price"
        />
      </ValidationProvider>
      <ValidationProvider
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
        rules="required"
        v-slot="{ errors }"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Public Sale Price</label
        >
        <reusable-text-field
          v-model="editCollection.publicSalePrice"
          placeholder="Enter Public sale Price"
        />
      </ValidationProvider>
      <ValidationProvider
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
        rules="required"
        v-slot="{ errors }"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Total Supply</label
        >
        <reusable-text-field
          v-model="editCollection.totalSupply"
          placeholder="Enter Total Supply"
        />
      </ValidationProvider>
      <ValidationProvider
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
        rules="required"
        v-slot="{ errors }"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Royalty</label
        >
        <reusable-text-field
          v-model="editCollection.royalty"
          placeholder="Enter Royalty Percent"
        />
      </ValidationProvider>
      <reusable-theme-button title="Edit" @click="sendDataToEditCollection" />
    </v-dialog>
  </div>
  <div class="py-16" v-else>
    <reusable-loading />
  </div>
</template>
<script lang="ts">
import { getCollection } from "@/services/CollectionService";
import {
  updateWhitelistSaleTime,
  getCollectionDetails,
  updateCollection,
  updateTotalSupply,
} from "@/services/AptosCollectionService";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: { ValidationProvider },
  data() {
    return {
      collection: {
        _id: null,
        name: "",
        image: "",
        description: "",
        candyMachine: {
          whitelist_sale_time: "",
          whitelist_price: "",
          public_sale_time: "",
          public_sale_price: "",
        },
        supply: "",
      },
      loading: true,
      changeWhitelistSaleTimeDialog: false,
      whitelistSaleTime: "",
      editCollectionDialog: false,
      editCollection: {
        whitelistSaleTime: "",
        publicSaleTime: "",
        whitelistPrice: "",
        publicSalePrice: "",
        totalSupply: "",
        royalty: "",
      },
    };
  },
  async mounted() {
    const res = await getCollection(this.$route.params.id);

    this.collection = res.collection[0];

    const chainRes = await getCollectionDetails(
      this.collection.candyMachine.candy_id,
      this.collection.candyMachine.resource_account
    );

    this.editCollection.whitelistSaleTime = new Date(
      this.collection.candyMachine.whitelist_sale_time
    );
    this.editCollection.publicSaleTime = new Date(
      this.collection.candyMachine.public_sale_time
    );
    this.editCollection.publicSalePrice =
      this.collection.candyMachine.public_sale_price;
    this.editCollection.whitelistPrice =
      this.collection.candyMachine.whitelist_price;
    this.editCollection.totalSupply = this.collection.supply;

    this.editCollection.royalty =
      (chainRes.royalty_points_numerator * 10) /
      chainRes.royalty_points_denominator;

    this.loading = false;
  },
  methods: {
    async updateWhitelistSaleTime() {
      try {
        const res = await updateTotalSupply(
          this.collection.candyMachine.resource_account,
          this.editCollection.totalSupply
        );

        this.$toast.showMessage({ message: "Collection Updated Successfully" });

        this.changeWhitelistSaleTimeDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    async sendDataToEditCollection() {
      try {
        const res = await updateCollection(
          this.collection.candyMachine.resource_account,
          this.editCollection
        );
        this.$toast.showMessage({ message: "Collection Updated Successfully" });

        this.editCollectionDialog = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
      }
    },
  },
};
</script>
