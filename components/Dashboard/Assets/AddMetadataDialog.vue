<template>
  <div
    class="tw-text-white tw-bg-dark-9 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 tw-py-4 md:tw-py-6"
  >
    <div
      class="tw-w-full tw-px-2 md:tw-px-8 tw-flex tw-flex-col tw-items-center tw-justify-center"
    >
      <img
        v-if="checkFileType === 'image'"
        :src="image"
        alt="asset"
        width="300px"
        height="300px"
        class="tw-max-w-[300px] tw-max-h-[300px]"
      />
      <video-player v-else-if="checkFileType === 'video'" :source="image" />
      <div
        class="tw-w-full tw-h-full tw-object-cover"
        v-else-if="checkFileType === 'audio'"
        style="height: 200px; position: relative"
      >
        <audio-player class="audio-postion" :audioSrc="image"></audio-player>
      </div>
    </div>
    <form @submit.prevent="" class="tw-w-full">
      <ValidationObserver
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-h-[285px] tw-max-h-[285px] tw-overflow-y-auto tw-px-2 no-scrollbar md:tw-px-8"
        ref="metadataForm"
      >
        <h3>Attributes</h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-4"
          v-for="(attribute, index) in attributes"
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
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
        >
          <input-radio-button
            v-model="selectedRange"
            displayValue="applyForOne"
            label="Apply For One"
          />
          <input-radio-button
            v-model="selectedRange"
            displayValue="applyForAll"
            label="Apply For All"
          />
          <input-radio-button
            v-model="selectedRange"
            displayValue="applyInRange"
            label="Apply In Range"
          />
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            v-if="selectedRange === 'applyInRange'"
          >
            <h6 class="tw-text-white tw-text-xs">Range</h6>
            <div
              class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-w-1/2"
            >
              <input-text-field
                type="number"
                v-model="rangeFrom"
                :required="true"
              />
              <i class="bx bx-minus tw-text-dark-4 tw-text-2xl"></i>
              <input-text-field
                type="number"
                v-model="rangeTo"
                :required="true"
              />
            </div>
            <div v-if="rangeError" class="tw-text-red-600 tw-text-sm">
              Range is Required
            </div>
          </div>
        </div>
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
  addMultipleMetadata,
  editMetadata,
  getFolderById,
  getTraitsOfAsset,
} from "@/services/AssetsService";
export default {
  props: {
    image: { type: String },
    folderName: { type: String },
    id: { type: [String, Number] },
    propAttributes: { type: Array },
  },
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      attributes: [{ trait_type: "", value: "" }],
      saving: false,
      edit: false,
      selectedRange: "applyForOne",
      rangeFrom: null,
      rangeTo: null,
      rangeError: false,
    };
  },
  methods: {
    addAttribute() {
      this.attributes.push({ trait_type: "", value: "" });
    },
    deleteAttribute(index) {
      this.attributes.splice(index, 1);
    },
    saveChanges() {
      this.saveMetadata();
    },
    async saveMetadata() {
      try {
        this.saving = true;
        this.rangeError = false;

        const validated = await this.$refs.metadataForm.validate();

        if (!validated) {
          this.saving = false;
          return;
        }

        const folder_name = this.folderName;
        const nftId = this.id;

        let nftIdFrom = this.id;
        let nftIdTo = this.id;

        switch (this.selectedRange) {
          case "applyForOne":
            break;
          case "applyForAll":
            nftIdFrom = 0;
            nftIdTo = this.folderInfo.assets.files.length - 1;
            break;
          case "applyInRange":
            nftIdFrom = this.rangeFrom;
            nftIdTo = this.rangeTo;
            break;
          default:
            break;
        }

        if (
          this.selectedRange === "applyInRange" &&
          (this.rangeFrom === null || this.rangeTo === null)
        ) {
          this.rangeError = true;
          this.saving = false;

          return;
        }

        const res = await addMultipleMetadata({
          folder_name: folder_name,
          nftIdFrom: nftIdFrom,
          nftIdTo: nftIdTo,
          attributes: this.attributes,
        });

        this.saving = false;

        this.$emit("closeModal", {
          attributes: this.attributes,
        });

        this.$store.dispatch("asset/makeAttributesOfFileEditable", {
          attributes: this.attributes,
          nftIdFrom: nftIdFrom,
          nftIdTo: nftIdTo,
        });

        this.$toast.showMessage({
          message: "Metadata Added Successfully",
          error: false,
        });

        this.checkIfAllFilesHaveMetadata();
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

      const traits = await getTraitsOfAsset({ folderId: this.folderInfo._id });

      res.data.folderInfo.traits = traits;

      this.$store.commit("asset/setFolderInfo", res.data.folderInfo);
    },
    isImage(source) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp",
            "svg",
            "ico",
            "tiff",
          ].includes(extension)
        : false;
    },
    isAudio(source) {
      if (typeof source !== "string") {
        return false;
      }
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp3",
            "wav",
            "ogg",
            "aac",
            "flac",
            "wma",
            "alac",
            "aiff",
            "opus",
          ].includes(extension)
        : false;
    },
    isVideo(source) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp4",
            "mkv",
            "m4v",
            "webm",
            "avi",
            "mov",
            "wmv",
            "flv",
            "3gp",
            "ogv",
            "mpeg",
            "mpg",
            "divx",
            "rm",
            "asf",
            "vob",
            "ts",
            "m2ts",
          ].includes(extension)
        : false;
    },
  },
  mounted() {
    if (this.propAttributes) {
      this.edit = true;
      this.attributes = structuredClone(this.propAttributes);
      console.log("asd attri", this.attributes);
    }
  },
  watch: {
    id() {
      if (this.propAttributes) {
        this.edit = true;
        this.attributes = structuredClone(this.propAttributes);
      }
    },
    propAttributes() {
      if (this.propAttributes) {
        this.edit = true;
        this.attributes = structuredClone(this.attributes);
      }
    },
  },
  computed: {
    showSetMetadataButton() {
      return this.$store.state.asset.showSetMetadataButton;
    },
    folderInfo() {
      return this.$store.state.asset.folderInfo;
    },
    checkFileType() {
      if (this.isImage(this.image)) {
        return "image";
      } else if (this.isVideo(this.image)) {
        return "video";
      } else if (this.isAudio(this.image)) {
        return "audio";
      }
    },
  },
};
</script>
