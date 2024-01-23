<template>
  <img
    :src="finalSource"
    :alt="alt"
    v-if="!loading"
    :class="imageClass"
    :width="width"
    :height="height"
    loading="lazy"
  />

  <div v-else-if="error">
    <h2
      :class="[
        imageClass,
        'tw-bg-white tw-w-full tw-h-full tw-text-black tw-flex tw-flex-col tw-items-center tw-justify-center',
      ]"
    >
      {{ alt.slice(0, 1) }}
    </h2>
  </div>
  <div
    class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center"
    v-else
  >
    <v-progress-circular
      :size="24"
      :width="2"
      color="#fff"
      indeterminate
      class="progress-bar"
    ></v-progress-circular>
  </div>
</template>
<script>
import axios from "axios";
import {
  checkIfImageIsFromCacheServer,
  extractImageLinkFromCacheServerUrl,
} from "@/utils/imageCache";
export default {
  props: {
    source: { type: String, default: "" },
    alt: { type: String, default: "" },
    width: { type: String, default: "" },
    height: { type: String, default: "" },
    imageClass: { type: String, default: "" },
  },
  data() {
    return {
      loading: true,
      imageSource: null,
      finalSource: null,
      error: false,
      loadedSource: false,
    };
  },
  async mounted() {
    if (this.source) {
      this.loadImage();
    }
  },
  methods: {
    async loadSource() {
      if (checkIfImageIsFromCacheServer(this.source)) {
        const res = await axios.get(this.source);

        if (res.headers["content-type"].includes("image")) {
          this.finalSource = this.source;
          this.loading = false;
        } else {
          const link = extractImageLinkFromCacheServerUrl(this.source);

          this.finalSource = link;
          this.loading = false;

          this.loadedSource = true;
        }
      } else {
        this.loadedSource = true;
        this.loadImage();
      }
    },
    loadImage() {
      const image = new Image();

      image.src = this.source;

      image.onload = () => {
        this.finalSource = image.src;
        this.loading = false;
      };

      image.onerror = () => {
        if (!this.loadedSource) {
          this.loadSource();
        } else {
          this.error = true;
          this.loading = false;
        }
      };
    },
  },
  watch: {
    source(newSource) {
      if (newSource) {
        this.loadImage();
      } else {
        this.loading = true;
      }
    },
  },
};
</script>
