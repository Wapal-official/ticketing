<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 xl:tw-flex-row xl:tw-items-start xl:tw-justify-start"
    v-if="!loading"
  >
    <img
      :src="collection.image"
      :alt="collection.name"
      class="tw-rounded tw-w-[421px] tw-h-[421px]"
    />

    <ValidationObserver
      class="tw-w-full tw-flex tw-flex-col tw-gap-5 xl:tw-max-w-[534px]"
      ref="editForm"
    >
      <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2">
        <h2
          class="tw-text-[1.375rem] tw-font-semibold tw-leading-7 tw-tracking-[0.01375rem] tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <span> {{ collection.name }}</span>
          <i
            class="bx bxs-badge-check tw-text-primary-1 tw-text-lg"
            v-if="collection.isVerified"
          ></i>
        </h2>
        <div class="">{{ collection.description }}</div>
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-text-sm tw-font-semibold tw-w-full"
        v-if="!editingTotalSupply"
      >
        <div class="">Total Supply: {{ collection.supply }}</div>
        <button
          class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
          @click="editingTotalSupply = true"
        >
          <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
          <span>Edit</span>
        </button>
      </div>
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-text-sm tw-gap-2"
        v-else
      >
        <div class="tw-font-medium">Total Supply</div>
        <div
          class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-3"
        >
          <ValidationProvider rules="required|number" v-slot="{ errors }">
            <input-text-field
              placeholder="Total Supply"
              v-model="editCollection.totalSupply"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <button-primary
            title="Save Changes"
            @click="checkChangeCondition('totalSupply')"
          />
        </div>
      </div>
      <div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
        >
          <div class="tw-text-white tw-font-semibold tw-capitalize">
            Whitelist Sale
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between"
            v-if="!editingWhitelistSaleTime && !editingWhitelistSalePrice"
          >
            <div class="">
              <div
                class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
              >
                Whitelist Sale Time
              </div>
              <div
                class="tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <span>
                  {{
                    formatDateTime(collection.candyMachine.whitelist_sale_time)
                  }}</span
                >
                <button
                  class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                  @click="editingWhitelistSaleTime = true"
                >
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
              <div
                class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
              >
                Price
              </div>
              <div
                class="tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <span>{{ collection.candyMachine.whitelist_price }}APT</span>
                <button
                  class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                  @click="editingWhitelistSalePrice = true"
                >
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-between"
            v-if="editingWhitelistSaleTime"
          >
            <ValidationProvider rules="required|date" v-slot="{ errors }">
              <input-date-picker
                placeholder="Select Whitelist Sale Time"
                v-model="editCollection.whitelistSaleTime"
              />
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <button-primary
              title="Save Changes"
              @click="checkChangeCondition('whitelist_sale_time')"
            />
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-between"
            v-if="editingWhitelistSalePrice"
          >
            <ValidationProvider rules="required|number" v-slot="{ errors }">
              <input-text-field
                placeholder="Whitelist Sale Price"
                v-model="editCollection.whitelistPrice"
              >
                <template #prepend-icon> </template>
              </input-text-field>
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <button-primary
              title="Save Changes"
              @click="checkChangeCondition('whitelist_sale_price')"
            />
          </div>
        </div>
      </div>
      <div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
        >
          <div class="tw-text-white tw-font-semibold tw-capitalize">
            Public Sale
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between"
            v-if="!editingPublicSaleTime && !editingPublicSalePrice"
          >
            <div class="">
              <div
                class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
              >
                Public Sale Time
              </div>
              <div
                class="tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <span>
                  {{
                    formatDateTime(collection.candyMachine.public_sale_time)
                  }}</span
                >
                <button
                  class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                  @click="editingPublicSaleTime = true"
                >
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
              <div
                class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
              >
                Price
              </div>
              <div
                class="tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <span>{{ collection.candyMachine.public_sale_price }}APT</span>
                <button
                  class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                  @click="editingPublicSalePrice = true"
                >
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-between"
            v-if="editingPublicSaleTime"
          >
            <ValidationProvider rules="required|date" v-slot="{ errors }">
              <input-date-picker
                placeholder="Select Whitelist Sale Time"
                v-model="editCollection.publicSaleTime"
              />
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <button-primary
              title="Save Changes"
              @click="checkChangeCondition('public_sale_time')"
            />
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-between"
            v-if="editingPublicSalePrice"
          >
            <ValidationProvider rules="required|number" v-slot="{ errors }">
              <input-text-field
                placeholder="Public Sale Price"
                v-model="editCollection.publicSalePrice"
              >
                <template #prepend-icon> </template>
              </input-text-field>
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <button-primary
              title="Save Changes"
              @click="checkChangeCondition('public_sale_price')"
            />
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
  <div class="py-16" v-else>
    <reusable-loading />
  </div>
</template>
<script lang="ts">
import { getCollection, updateCollection } from "@/services/CollectionService";
import {
  getCollectionDetails,
  updateWhitelistSaleTime,
  updatePublicSaleTime,
  updateWhitelistSalePrice,
  updatePublicSalePrice,
  updateTotalSupply,
} from "@/services/AptosCollectionService";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import moment from "moment";

extend("date", {
  validate(value) {
    if (new Date(value).getTime() < Date.now()) {
      return false;
    }
    return true;
  },
  message: "Sale time should be greater than current time",
});

extend("number", {
  validate(value) {
    if (isNaN(value)) {
      return false;
    }
    return true;
  },
  message: "This field must be a number",
});

export default {
  components: { ValidationProvider, ValidationObserver },
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
        isVerified: false,
      },
      loading: true,
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
      changeDialog: false,
      changeDialogTitle: "",
      changeDialogButtonTitle: "",
      changeDialogInputType: "",
      changeDialogValue: null,
      changeDialogType: "",
      editingTotalSupply: false,
      editingWhitelistSalePrice: false,
      editingWhitelistSaleTime: false,
      editingPublicSalePrice: false,
      editingPublicSaleTime: false,
    };
  },
  async mounted() {
    this.fetchCollection();
  },
  methods: {
    async fetchCollection() {
      this.loading = true;
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
        (chainRes.royalty_points_numerator * 100) /
        chainRes.royalty_points_denominator;

      this.loading = false;
    },
    formatDateTime(date: string) {
      return moment(date).format("MMM DD, hh:mm A");
    },
    async checkChangeCondition(type: string) {
      const validate = await this.$refs.editForm.validate();
      if (!validate) {
        return;
      }
      switch (type) {
        case "whitelist_sale_time":
          this.updateWhitelistSaleTime();
          break;
        case "public_sale_time":
          this.updatePublicSaleTime();
          break;
        case "whitelist_sale_price":
          this.updateWhitelistSalePrice();
          break;
        case "public_sale_price":
          this.updatePublicSalePrice();
          break;
        case "totalSupply":
          this.updateTotalSupply();
          break;
        default:
          break;
      }
    },
    async updateWhitelistSaleTime() {
      try {
        await updateWhitelistSaleTime(
          this.collection.candyMachine.resource_account,
          this.editCollection.whitelistSaleTime
        );

        const candyMachine = this.collection.candyMachine;

        candyMachine.whitelist_sale_time =
          this.editCollection.whitelistSaleTime;

        const res = await updateCollection(this.collection._id, {
          candyMachine,
        });

        this.editingWhitelistSaleTime = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });

        this.fetchCollection();
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
      }
    },
    async updatePublicSaleTime() {
      try {
        await updatePublicSaleTime(
          this.collection.candyMachine.resource_account,
          this.editCollection.publicSaleTime
        );

        const candyMachine = this.collection.candyMachine;

        candyMachine.public_sale_time = this.editCollection.publicSaleTime;

        const res = await updateCollection(this.collection._id, {
          candyMachine,
        });

        this.editingPublicSaleTime = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });

        this.fetchCollection();
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
      }
    },
    async updateWhitelistSalePrice() {
      try {
        await updateWhitelistSalePrice(
          this.collection.candyMachine.resource_account,
          this.editCollection.whitelistPrice
        );

        const candyMachine = this.collection.candyMachine;

        candyMachine.whitelist_price = this.editCollection.whitelistPrice;

        const res = await updateCollection(this.collection._id, {
          candyMachine,
        });

        this.editingWhitelistSalePrice = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });

        this.fetchCollection();
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
      }
    },
    async updatePublicSalePrice() {
      try {
        await updatePublicSalePrice(
          this.collection.candyMachine.resource_account,
          this.editCollection.publicSalePrice
        );

        const candyMachine = this.collection.candyMachine;

        candyMachine.public_sale_price = this.editCollection.publicSalePrice;

        const res = await updateCollection(this.collection._id, {
          candyMachine,
        });

        this.editingPublicSalePrice = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });

        this.fetchCollection();
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
      }
    },
    async updateTotalSupply() {
      try {
        await updateTotalSupply(
          this.collection.candyMachine.resource_account,
          this.editCollection.totalSupply
        );

        const res = await updateCollection(this.collection._id, {
          supply: this.editCollection.totalSupply,
        });

        this.editingTotalSupply = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });

        this.fetchCollection();
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
      }
    },
  },
};
</script>
