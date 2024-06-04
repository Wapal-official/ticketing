<template>
  <ValidationObserver ref="form">
    <div
      class="tw-w-full tw-bg-dark-7 tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-text-dark-0"
    >
      <h2 class="tw-text-lg tw-font-medium">Set Metadata</h2>
      <ValidationProvider
        name="name"
        rules="required"
        v-slot="{ errors }"
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
      >
        <input-text-field
          v-model="name"
          placeholder="Name"
          label="Name"
          :required="true"
        />
        <div class="tw-text-[#FF322C] tw-text-sm">{{ errors[0] }}</div>
      </ValidationProvider>
      <ValidationProvider
        name="description"
        rules="required"
        v-slot="{ errors }"
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
      >
        <input-text-area
          v-model="description"
          label="Description"
          placeholder="Description"
          :required="true"
        />
        <div class="tw-text-[#FF322C] tw-text-sm">{{ errors[0] }}</div>
      </ValidationProvider>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-pt-4"
      >
        <button-primary
          title="Set Metadata"
          @click="sendCSVForMetadataUpload"
          :disabled="settingMetadata"
          :loading="settingMetadata"
        />
        <button-primary
          title="Cancel"
          :bordered="true"
          :disabled="settingMetadata"
          @click="closeSetMetadataModal"
        />
      </div>
    </div>
  </ValidationObserver>
</template>
<script lang="ts">
import { generateMetadataFolderInServer } from "@/services/AssetsService";

import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  props: { folderName: { type: String } },
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      name: null,
      description: "",
      settingMetadata: false,
    };
  },
  methods: {
    async sendCSVForMetadataUpload() {
      const validate = await this.$refs.form.validate();

      if (!validate) {
        return;
      }

      try {
        this.settingMetadata = true;

        this.generatingMetadata = true;

        await generateMetadataFolderInServer({
          folder_name: this.folderName,
          collectionName: this.name,
          description: this.description,
        });

        this.generatingMetadata = true;

        this.settingMetadata = false;
        this.clearForm();

        this.$emit("generatedMetadata");
      } catch (error) {
        this.settingMetadata = false;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    closeSetMetadataModal() {
      this.$emit("closeSetMetadataModal");
      this.clearForm();
    },
    clearForm() {
      this.name = null;
      this.description = null;

      this.$refs.form.reset();
    },
  },
};
</script>
