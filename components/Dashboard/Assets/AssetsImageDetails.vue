<template>
  <div
    class="tw-w-full tw-relative tw-bg-wapal-background tw-h-full tw-overflow-auto"
    v-if="!loading"
  >
    <button class="tw-absolute tw-top-4 tw-right-4" @click="close">
      <v-icon class="!tw-text-white">mdi-close</v-icon>
    </button>
    <div
      class="tw-w-full tw-min-h-full tw-border tw-border-transparent tw-px-4 tw-py-16 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 md:tw-border-primary-tint md:tw-py-8"
    >
      <img
        :src="this.fileData?.image"
        :alt="this.fileData?.name"
        class="tw-max-w-[300px] tw-max-h-[300px]"
        draggable="false"
        v-if="checkFileType() === 'image'"
      />
      <video
        controls
        controlslist="nodownload"
        looop
        playsinline
        preload="metadata"
        class="tw-max-w-[80%] tw-object-cover"
        v-else-if="checkFileType() === 'video'"
      >
        <source :src="this.fileData?.image" />
      </video>
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
    };
  },
  methods: {
    close() {
      this.$emit("close");
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

      return "json";
    },
  },
  async mounted() {
    const res = await this.$axios.get(this.file.name);
    this.fileData = res.data;
    if (this.fileData.attributes) {
      this.attributes = this.fileData.attributes;
    }
    this.loading = false;
  },
  watch: {
    async file(newFile: any) {
      this.loading = true;
      const res = await this.$axios.get(newFile.name);
      this.fileData = res.data;
      if (this.fileData.attributes) {
        this.attributes = this.fileData.attributes;
      }
      this.loading = false;
    },
  },
};
</script>
