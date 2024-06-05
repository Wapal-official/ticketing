<template>
  <div
    class="tw-w-full tw-relative tw-bg-wapal-background tw-h-full tw-overflow-auto"
    v-if="!loading"
  >
    <button
      class="tw-absolute tw-top-4 tw-right-4"
      @click="close"
      style="z-index: 2"
    >
      <v-icon class="!tw-text-white">mdi-close</v-icon>
    </button>
    <div
      class="tw-w-full tw-min-h-full tw-border tw-border-transparent tw-px-4 tw-py-16 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 md:tw-border-primary-tint md:tw-py-8"
    >
      <img
        :src="this.fileData?.image ? this.fileData?.image : url"
        :alt="this.fileData?.name"
        class="tw-max-w-[300px] tw-max-h-[300px]"
        draggable="false"
        v-if="checkFileType() === 'image'"
      />
      <video-player-detailed
        v-else-if="checkFileType() === 'video'"
        :source="urlFromJson ? urlFromJson : videoUrl"
      />
      <div
        class="tw-w-full tw-h-full tw-object-cover"
        v-else
        style="height: 200px; position: relative"
      >
        <audio-player
          :audioSrc="urlFromJson ? urlFromJson : videoUrl"
          class="audio-postion"
        ></audio-player>
      </div>
      <h3 class="tw-text-white tw-font-medium tw-uppercase tw-text-sm">
        {{ this.fileData?.name }}
      </h3>
      <div class="tw-h-[2px] tw-w-full tw-bg-primary-tint"></div>
      <h4 class="tw-text-xl tw-text-primary-tint tw-font-normal">Properties</h4>
      <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4 tw-w-full">
        <div
          class="tw-rounded-md tw-bg-primary-tint/25 tw-px-2 tw-py-2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1 tw-text-sm"
          v-for="attribute in attributes"
          :key="attribute.trait_type"
          v-if="attributes[0] && attributes[0].trait_type"
        >
          <h5 class="tw-text-wapal-gray">{{ attribute.trait_type }}</h5>
          <h5>{{ attribute.value }}</h5>
        </div>
      </div>
    </div>
  </div>
  <div v-else></div>
</template>
<script lang="ts">
export default {
  props: { file: { type: Object }, extension: { type: String } },
  data() {
    return {
      loading: true,
      attributes: [{ trait_type: "", value: "" }],
      fileData: null,
      url: "",
      urlFromJson: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
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
    checkFileType() {
      if (this.extension === ".json") {
        return "json";
      }

      const imageRegex = /\.((jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?))$/i;

      const videoRegex =
        /\.((mp4|avi|mov|mkv|wmv|flv|webm|3gp|ogv|mpeg|mpg|m4v|divx|rm|asf|vob|ts|m2ts?))$/i;

      if (imageRegex.test(this.extension)) {
        return "image";
      } else if (videoRegex.test(this.extension)) {
        return "video";
      }
      if (this.isImage(this.extension)) {
        return "image";
      } else if (this.isVideo(this.extension)) {
        return "video";
      }
      return "json";
    },
  },
  computed: {
    videoUrl() {
      this.url = this.fileData.animation_url;
      return this.url;
    },
  },
  async mounted() {
    if (this.file.metadata) {
      this.fileData = this.file.metadata;
      if (this.fileData.attributes) {
        this.attributes = this.fileData.attributes;
      }
    } else {
      const res = await this.$axios.get(this.file.name);
      const url = res.config.url;

      this.url = url;
      this.fileData = res.data;

      if (this.fileData.attributes) {
        this.attributes = this.fileData.attributes;
      }

      if (res.data.properties) {
        let filterSrc;
        const mediaFile = res.data.properties.files.find(
          (file: { type: string }) => file.type === "video/mp4"
        );
        if (mediaFile) {
          filterSrc = mediaFile.uri;
        }
        this.urlFromJson = filterSrc;
      }
    }
    this.loading = false;
  },
  watch: {
    async file(newFile: any) {
      this.loading = true;
      if (newFile.metadata) {
        this.fileData = newFile.metadata;
        if (this.fileData.attributes) {
          this.attributes = this.fileData.attributes;
        }
      } else {
        const res = await this.$axios.get(newFile.name);
        const url = res.config.url;
        this.url = url;
        this.fileData = res.data;
        if (this.fileData.attributes) {
          this.attributes = this.fileData.attributes;
        }
        if (res.data.properties) {
          let filterSrc;
          const mediaFile = res.data.properties.files.find(
            (file: { type: string }) => file.type === "video/mp4"
          );
          if (mediaFile) {
            filterSrc = mediaFile.uri;
          }
          this.urlFromJson = filterSrc;
        }
      }
      this.loading = false;
    },
  },
};
</script>
<style>
.audio-postion {
  position: absolute;
  bottom: 10px;
}
</style>
