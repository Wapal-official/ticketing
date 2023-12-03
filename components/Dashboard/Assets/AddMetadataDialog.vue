<template>
  <div
    class="tw-text-white tw-bg-dark-9 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 tw-py-2 md:tw-py-4"
  >
    <div
      class="tw-w-full tw-px-2 md:tw-px-8 tw-flex tw-flex-col tw-items-center tw-justify-center"
    >
      <img
        :src="image"
        alt="asset"
        width="300px"
        height="300px"
        class="tw-max-w-[300px] tw-max-h-[300px]"
      />
    </div>
    <form @submit.prevent="" class="tw-w-full">
      <ValidationObserver
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-h-[285px] tw-max-h-[285px] tw-overflow-y-auto tw-px-2 no-scrollbar md:tw-px-8"
        ref="metadataForm"
      >
        <h3>Token Details</h3>
        <ValidationProvider
          rules="required"
          name="name"
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
          v-slot="{ errors }"
        >
          <input-text-field
            label="Token Name"
            v-model="metadata.name"
            :required="true"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          rules="required"
          name="description"
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
          v-slot="{ errors }"
        >
          <input-text-area
            label="Description"
            v-model="metadata.description"
            :required="true"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <h3>Attributes</h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-4"
          v-for="(attribute, index) in metadata.attributes"
          :key="index"
        >
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-justify-between tw-gap-4"
          >
            <ValidationProvider
              rules="required"
              name="traitType"
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
              v-slot="{ errors }"
            >
              <input-text-field
                label="Attribute Type"
                v-model="attribute.trait_type"
                :required="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              name="value"
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
              v-slot="{ errors }"
            >
              <input-text-field
                label="Value"
                v-model="attribute.value"
                :required="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <button aria-label="Delete Attribute" @click="deleteAttribute(index)">
            <i class="bx bxs-trash tw-text-dark-3 tw-text-lg tw-mt-10"></i>
          </button>
        </div>
        <button-primary
          title="Add Attribute"
          :bordered="true"
          @click="addAttribute"
        >
          <template #prepend-icon>
            <i class="bx bx-plus"></i>
          </template>
        </button-primary>
        <button-primary
          title="Save Changes"
          @click="saveChanges"
          :loading="saving"
        />
      </ValidationObserver>
    </form>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {
  addMetadata,
  editMetadata,
  getFolderById,
} from "@/services/AssetsService";
export default {
  props: {
    image: { type: String },
    folderName: { type: String },
    id: { type: [String, Number] },
    propMetadata: { type: Object },
  },
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      metadata: {
        name: "",
        description: "",
        attributes: [{ trait_type: "", value: "" }],
        image: this.image,
      },
      saving: false,
      edit: false,
      folderInfo: null,
    };
  },
  methods: {
    addAttribute() {
      this.metadata.attributes.push({ trait_type: "", value: "" });
    },
    deleteAttribute(index) {
      this.metadata.attributes.splice(index, 1);
    },
    saveChanges() {
      if (this.edit) {
        this.editMetadata();
      } else {
        this.saveMetadata();
      }
    },
    async saveMetadata() {
      try {
        this.saving = true;

        const validated = await this.$refs.metadataForm.validate();

        if (!validated) {
          this.saving = false;
          return;
        }

        const user_id = this.$store.state.userStore.user.user_id;

        const folder_name = this.folderName;
        const folder_id = this.$route.params.id;
        const nftId = this.id;

        const res = await addMetadata({
          user_id,
          folder_name,
          nftId,
          folder_id,
          metadata: this.metadata,
        });

        if (res.data.data) {
          this.saving = false;

          this.$emit("closeModal", this.metadata);

          this.$toast.showMessage({
            message: "Metadata Added Successfully",
            error: false,
          });

          this.checkIfAllFilesHaveMetadata();
        } else {
          throw new Error("Metadata Already Added");
        }
      } catch (error) {
        this.saving = false;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async editMetadata() {
      try {
        this.saving = true;

        const validated = await this.$refs.metadataForm.validate();

        if (!validated) {
          this.saving = false;
          return;
        }

        const user_id = this.$store.state.userStore.user.user_id;

        const folder_name = this.folderName;
        const folder_id = this.$route.params.id;
        const nftId = this.id;

        const res = await editMetadata({
          user_id,
          folder_name,
          nftId,
          folder_id,
          metadata: this.metadata,
        });

        if (res.data.data) {
          this.saving = false;

          this.$emit("closeModal", this.metadata);

          this.$toast.showMessage({
            message: "Metadata Edited Successfully",
            error: false,
          });
          this.checkIfAllFilesHaveMetadata();
        } else {
          throw new Error("Something Went Wrong Please Try Again");
        }
      } catch (error) {
        this.saving = false;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async checkIfAllFilesHaveMetadata() {
      if (!this.showSetMetadataButton) {
        await this.getFolderInfo();

        if (
          this.folderInfo.assets.files.length === this.folderInfo.traits.length
        ) {
          this.$store.commit("asset/setShowMetadataButton", true);
        }
      }
    },
    async getFolderInfo() {
      const res = await getFolderById(this.$route.params.id);

      this.folderInfo = res.data.folderInfo;
    },
  },
  mounted() {
    if (this.propMetadata) {
      this.edit = true;
      this.metadata = this.propMetadata;
      this.metadata.image = this.image;
    }
  },
  watch: {
    id() {
      if (this.propMetadata) {
        this.edit = true;
        this.metadata = this.propMetadata;
        this.metadata.image = this.image;
      }
    },
    propMetadata() {
      if (this.propMetadata) {
        this.edit = true;
        this.metadata = this.propMetadata;
        this.metadata.image = this.image;
      }
    },
  },
  computed: {
    showSetMetadataButton() {
      return this.$store.state.asset.showSetMetadataButton;
    },
  },
};
</script>
