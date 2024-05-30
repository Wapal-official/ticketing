<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
    >
      <div
        class="tw-text-white tw-font-semibold tw-capitalize tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        v-if="!editingName"
      >
        <div>{{ phase.name }}</div>
        <button
          class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
          @click="editingName = true"
        >
          <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
        </button>
      </div>
      <div class="tw-w-full" v-else>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
          rules="required"
          v-slot="{ errors }"
        >
          <input-text-field
            v-model="phase.name"
            placeholder="Phase Name"
            label="Phase Name"
            :required="true"
            :disabled="phase.id === 'whitelist'"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-baseline md:tw-justify-between"
      >
        <div class="tw-w-full">
          <div
            class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
          >
            {{ phase.name }} Time
          </div>
          <div
            class="tw-text-white tw-capitalize tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
            v-if="!editingTime"
          >
            <div>{{ formatDateTime(phase.mint_time) }}</div>
            <button
              class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
              @click="editingTime = true"
            >
              <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
            </button>
          </div>
          <ValidationProvider
            class="tw-w-full"
            rules="required|date"
            v-slot="{ errors }"
            v-else
          >
            <input-date-picker
              placeholder="Select Mint Time"
              v-model="phase.mint_time"
            />
            <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-items-end md:tw-justify-end"
        >
          <div
            class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
          >
            Price
          </div>
          <div
            class="tw-text-white tw-capitalize tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
            v-if="!editingPrice"
          >
            <div>
              {{ phase.mint_price }}
              {{ coinType }}
            </div>
            <button
              class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
              @click="editingPrice = true"
            >
              <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
            </button>
          </div>
          <ValidationProvider
            class="tw-w-full"
            rules="required|number"
            v-slot="{ errors }"
            v-else
          >
            <input-text-field
              placeholder="Mint Price"
              v-model="phase.mint_price"
            >
              <template #append-icon>
                <img
                  :src="selectedCoinType.imageWhite"
                  alt="Coin Type"
                  width="14px"
                  height="14px"
                />
              </template>
            </input-text-field>
          </ValidationProvider>
        </div>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row md:tw-justify-start"
        v-if="editing"
      >
        <button-primary
          title="Cancel"
          @click="resetEditing"
          :bordered="true"
          :fullWidth="true"
        />
        <button-primary
          title="Save Changes"
          @click="saveChanges"
          :loading="savingChanges"
          :fullWidth="true"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import moment from "moment";
import { ValidationProvider, extend } from "vee-validate";
import { getCoinType } from "@/utils/getCoinType";

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
  props: {
    phase: {
      type: Object,
      default: { name: "", mint_price: "", mint_time: "" },
    },
    coinType: { type: String },
    savingChanges: { type: Boolean, default: false },
  },
  components: { ValidationProvider },
  data() {
    return {
      editingName: false,
      editingTime: false,
      editingPrice: false,
    };
  },
  methods: {
    formatDateTime(date: string) {
      return moment(date).format("MMM DD, hh:mm A");
    },
    resetEditing() {
      this.editingName = false;
      this.editingTime = false;
      this.editingPrice = false;
    },
    saveChanges() {
      this.$emit("editPhases");
      this.resetEditing();
    },
  },
  computed: {
    editing() {
      return this.editingName || this.editingTime || this.editingPrice;
    },
    selectedCoinType() {
      return getCoinType(this.coinType);
    },
  },
};
</script>
