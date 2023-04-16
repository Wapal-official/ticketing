<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
    <form
      class="tw-w-full tw-bg-modal-gray tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-text-white"
      @submit.prevent="handleSubmit(sendCSVForMetadataUpload)"
    >
      <h2 class="tw-text-lg tw-font-medium">Import CSV</h2>
      <ValidationProvider
        name="name"
        rules="required"
        v-slot="{ errors }"
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Name</label
        >
        <input
          v-model="name"
          class="tw-w-full tw-border-none tw-bg-wapal-gray focus:tw-outline-none tw-rounded tw-py-2 tw-px-2 tw-text-black"
        />
        <div class="tw-text-[#FF322C]">{{ errors[0] }}</div>
      </ValidationProvider>
      <ValidationProvider
        name="description"
        rules="required"
        v-slot="{ errors }"
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Description</label
        >

        <textarea
          v-model="description"
          class="tw-w-full tw-border-none tw-bg-wapal-gray focus:tw-outline-none tw-rounded tw-py-2 tw-px-2 tw-text-black"
          rows="4"
        >
        </textarea>
        <div class="tw-text-[#FF322C]">{{ errors[0] }}</div>
      </ValidationProvider>
      <ValidationProvider
        name="createdDate"
        rules="required"
        v-slot="{ errors }"
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Created Date
        </label>
        <date-picker
          v-model="createdDate"
          type="datetime"
          placeholder="Select Created Date"
        />
        <div class="tw-text-[#FF322C]">{{ errors[0] }}</div>
      </ValidationProvider>
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >CSV</label
        >
        <label>
          <input
            @change="CSVFileSelected"
            class="tw-hidden tw-w-0 tw-h-0"
            type="file"
            accept=".csv"
          />
          <div
            class="tw-bg-wapal-gray tw-cursor-pointer tw-text-black tw-rounded tw-py-2 tw-px-2"
          >
            {{ !metadataCSV.name ? "Select CSV File" : metadataCSV.name }}
          </div>
        </label>
        <p class="tw-text-[#FF322C]" v-if="metadataError">
          Your metadata does not have same length as assets (Required length:
          {{ assetLength }}, Metadata length: {{ metadataLength }})
        </p>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-pt-4"
      >
        <button class="tw-py-2 tw-px-4 tw-bg-wapal-success">Import</button>
        <button
          class="tw-py-2 tw-px-4 tw-bg-wapal-danger"
          @click.prevent="closeImportCSVModal"
        >
          Cancel
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>
<script lang="ts">
import { uploadMetadataCSV } from "@/services/AssetsService";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import papa from "papaparse";

import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  props: { assetLength: { type: Number } },
  components: { DatePicker, ValidationObserver, ValidationProvider },
  data() {
    return {
      name: null,
      description: "",
      createdDate: null,
      metadataCSV: { name: "" },
      metadataError: false,
      metadataLength: 0,
    };
  },
  methods: {
    CSVFileSelected(event: any) {
      this.metadataCSV = event.target.files[0];

      this.metadataError = false;

      papa.parse(this.metadataCSV, {
        header: true,
        skipEmptyLines: true,
        complete: (data: any) => {
          this.metadataLength = data.data.length;
          if (data.data.length !== this.assetLength) {
            this.metadataError = true;
          }
        },
      });
    },
    async sendCSVForMetadataUpload() {
      if (!this.metadataError && this.metadataCSV.name) {
        try {
          const formData = new FormData();

          formData.append("user_id", this.$store.state.userStore.user.user_id);
          formData.append("name", this.name);
          formData.append("description", this.description);
          formData.append("created_date", this.createdDate);
          formData.append("csv", this.metadataCSV);

          const res = await uploadMetadataCSV(formData);

          if (res.data.success) {
            this.$toast.showMessage({
              message: "Metadata Generated Successfully",
            });

            this.$emit("csvUploaded", this.metadataLength);
            this.clearCSVForm();
          }
        } catch (error) {
          console.log(error);
          this.$toast.showMessage({ message: error, error: true });
        }
      }
    },
    closeImportCSVModal() {
      this.$emit("closeImportCSVModal");
      this.clearCSVForm();
    },
    clearCSVForm() {
      this.name = null;
      this.description = null;
      this.createdDate = null;
      this.metadataCSV = { name: "" };

      this.$refs.form.reset();
    },
  },
};
</script>
<style>
.mx-input-wrapper,
.mx-datepicker {
  width: 100% !important;
}

.mx-input {
  width: 100% !important;
  background: #d9d9d9 !important;
  border: none !important;
  height: 50px !important;
  color: #000 !important;
  font-size: 1em;
  border-radius: 7px !important;
}

.mx-icon-calendar,
.mx-icon-clear,
.mx-input::placeholder {
  color: #000 !important;
}
</style>
