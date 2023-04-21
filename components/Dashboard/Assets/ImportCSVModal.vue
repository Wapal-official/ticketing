<template>
  <ValidationObserver ref="form">
    <form
      class="tw-w-full tw-bg-modal-gray tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-text-white"
      @submit.prevent="sendCSVForMetadataUpload"
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

import papa from "papaparse";

import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  props: { assetLength: { type: Number }, folderName: { type: String } },
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      name: null,
      description: "",
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
      const validate = this.$refs.form.validate();

      if (!validate) {
        return;
      }

      if (!this.metadataError && this.metadataCSV.name) {
        try {
          const formData = new FormData();

          formData.append("user_id", this.$store.state.userStore.user.user_id);
          formData.append("folder_name", this.folderName);
          formData.append("name", this.name);
          formData.append("description", this.description);
          formData.append("csv", this.metadataCSV);

          const res = await uploadMetadataCSV(formData);

          if (res.data.files) {
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
      this.metadataCSV = { name: "" };

      this.$refs.form.reset();
    },
  },
};
</script>
