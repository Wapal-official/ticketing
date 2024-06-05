<template>
  <div class="tw-w-full" v-if="!loading">
    <div
      class="tw-w-full tw-h-full tw-group tw-cursor-pointer"
      @click="displayFileDetails"
      v-if="checkFileType !== 'json'"
    >
      <div class="tw-relative tw-w-full tw-overflow-hidden">
        <img
          :src="imgFromJson ? imgFromJson : this.file.src"
          :alt="getAssetName"
          class="tw-w-full tw-h-full tw-object-cover"
          v-if="checkFileType === 'image'"
        />
        <video-player
          v-else-if="checkFileType === 'video'"
          :source="videoSrc ? videoSrc : this.file.src"
        />
        <div
          class="tw-w-full tw-h-full tw-object-cover"
          v-else
          style="height: 200px; position: relative"
        >
          <audio-player
            class="audio-postion"
            :audioSrc="videoSrc ? videoSrc : this.file.src"
          ></audio-player>
        </div>

        <div
          class="tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear tw-bg-black/[0.65] tw-backdrop-blur-[2px] group-hover:tw-opacity-100"
          :class="{
            'tw-h-fit': checkFileType === 'video',
          }"
        ></div>
        <div
          class="tw-absolute tw-w-full tw-h-full tw-px-4 tw-top-0 tw-left-0 tw-flex tw-flex-col tw-items-end tw-justify-start tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
        >
          <div
            class="tw-w-full tw-mt-2 tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-3"
          >
            <button
              class="tw-rounded-full tw-w-8 tw-h-8 tw-bg-primary-2 tw-flex tw-flex-col tw-items-center tw-justify-center"
              @click.stop="copyFileLink"
            >
              <i class="bx bx-link-alt tw-text-white tw-text-xl"></i>
            </button>
            <button
              class="tw-rounded-full tw-w-8 tw-h-8 tw-bg-primary-2 tw-flex tw-flex-col tw-items-center tw-justify-center"
              @click.stop="downloadFile"
            >
              <i class="bx bx-download tw-text-white tw-text-xl"></i>
            </button>
          </div>
          <div
            class="tw-h-full tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
            v-if="!this.file.name || !this.file.image"
          >
            <button-primary
              title="Edit Metadata"
              @click="showAddMetadataDialog = true"
              v-if="hasMetadata"
            >
              <template #prepend-icon
                ><i class="bx bx-edit tw-pr-2"></i>
              </template>
            </button-primary>
            <button-primary
              title="Add Metadata"
              @click="showAddMetadataDialog = true"
              v-else
            >
              <template #prepend-icon
                ><i class="bx bx-plus tw-pr-1"></i>
              </template>
            </button-primary>
          </div>
        </div>
      </div>
      <div
        class="tw-bg-[#F0F0F0] tw-text-[#363636] tw-uppercase tw-px-4 tw-text-center tw-py-4 tw-text-sm"
      >
        <h2>{{ getAssetName }}</h2>
      </div>
    </div>
    <button
      class="tw-w-full tw-bg-dark-4 tw-px-4 tw-py-3 tw-text-white tw-rounded tw-flex tw-flex-row tw-items-baseline tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-dark-5"
      v-else
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
      >
        <i class="bx bxs-folder tw-text-xl"></i>
        {{ file?.name }}
      </div>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <button v-on="on">
            <i class="bx bx-dots-vertical-rounded tw-text-xl"></i>
          </button>
        </template>
        <div
          class="tw-flex tw-flex-col tw-justify-items-start tw-items-start tw-bg-dark-7 tw-py-4"
        >
          <button
            class="tw-w-full tw-py-1 tw-px-4 tw-transition-all tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 hover:tw-bg-black/60"
            @click="downloadFile"
          >
            <v-icon class="!tw-text-white !tw-text-lg"
              >mdi-tray-arrow-down</v-icon
            >Download
          </button>
        </div>
      </v-menu>
    </button>
    <div v-else></div>
    <v-dialog
      v-model="showAddMetadataDialog"
      content-class="!tw-w-full md:!tw-w-1/2 1xl:!tw-w-1/3"
    >
      <dashboard-assets-add-metadata-dialog
        :folderName="folderName"
        :image="getAssetSrc"
        :id="id"
        :propAttributes="file.attributes"
        @closeModal="addMetadataInFile"
      />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { getCachedUrlOfImage } from "@/utils/imageCache";
export default {
  props: {
    propFile: { type: Object },
    type: { type: String },
    extension: { type: String },
    folderName: { type: String },
    id: { type: [String, Number] },
  },
  data() {
    return {
      loading: true,
      linkedAsset: { name: "", image: "" },
      showAddMetadataDialog: false,
      file: { name: "", metadata: null, attributes: null },
      videoSrc: "",
      imgFromJson: "",
      checkJson: false,
    };
  },
  methods: {
    displayFileDetails() {
      if (this.checkJson) {
        this.linkedAsset.name = this.file.src;
        // this.linkedAsset.image = this.file.image
        //   ? getCachedUrlOfImage(this.file.image)
        //   : this.file.metadata
        //   ? this.file.metadata.image
        //     ? getCachedUrlOfImage(this.file.metadata.image)
        //     : null
        //   : null;
        this.linkedAsset.image = this.imgFromJson
          ? getCachedUrlOfImage(this.imgFromJson)
          : this.file.src;
        this.linkedAsset.metadata = this.file.metadata;

        this.$emit("displayFileDetails", this.linkedAsset);
      }
    },
    async downloadFile() {
      if (process.client) {
        const res = await this.$axios.get(this.file.src, {
          responseType: "blob",
        });
        const blob = res.data;

        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.download = this.file.name;
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    },
    async copyFileLink() {
      if (process.client) {
        let textArea = document.createElement("textarea");
        textArea.value = this.file.src;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        this.$toast.showMessage({ message: "Link Copied Successfully" });
      }
    },
    addMetadataInFile() {
      this.showAddMetadataDialog = false;
    },
    async getVideoSrc(source: any) {
      const res = await this.$axios.get(source);
      this.videoSrc = res.data.animation_url;
    },
    isImage(source: string) {
      const extension = source;
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
    isVideo(source: string) {
      if (!source) {
        return false;
      }
      const extension = source;
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
    isAudio(source: string) {
      if (!source) {
        return false;
      }
      const extension = source;
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
  },
  computed: {
    checkFileType() {
      if (this.extension === ".json") {
        return "json";
      }

      const imageRegex = /\.((jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?))$/i;

      const videoRegex =
        /\.((mp4|avi|mov|mkv|wmv|flv|webm|3gp|ogv|mpeg|mpg|m4v|divx|rm|asf|vob|ts|m2ts?))$/i;

      const audioRegex = /\.((mp3|wav|aac|ogg|flac|wma|alac|aiff|opus?))$/i;

      if (imageRegex.test(this.extension)) {
        return "image";
      } else if (videoRegex.test(this.extension)) {
        return "video";
      } else if (audioRegex.test(this.extension)) {
        return "audio";
      }
      if (this.isImage(this.extension)) {
        return "image";
      } else if (this.isVideo(this.extension)) {
        return "video";
      } else if (this.isAudio(this.extension)) {
        return "audio";
      }
      return "json";
    },
    getAssetSrc() {
      // if (!this.file) {
      //   return null;
      // }
      // const res = await this.$axios.get(this.file.src);

      return this.file.image ? this.file.image : this.file?.src;
    },

    getAssetAudio() {
      return this.file.src;
    },
    getAssetName() {
      return this.file.image ? this.file.name : this.file.name;
    },
    hasMetadata() {
      return this.file.edit;
    },
  },
  watch: {
    propFile() {
      this.file = this.propFile;
    },
    hasMetadata() {
      return this.file.edit;
    },
  },

  async mounted() {
    this.file = this.propFile;

    const videoSrc = await this.getVideoSrc(this.file.src);
    const fileSrc = this.file.src;
    if (fileSrc && fileSrc.endsWith(".json")) {
      const res = await this.$axios.get(fileSrc);
      const url = res.data.image;
      this.imgFromJson = url;
      this.checkJson = true;
    }

    // this.getNftDetails(fileSrc);

    this.loading = false;
  },
};
</script>
<style>
.file-options {
  background: linear-gradient(
    180deg,
    #0e0d0d 0%,
    #010a1b 23.47%,
    #11151c 81.73%,
    #0e0d0d 100%
  );
}
.audio-postion {
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
