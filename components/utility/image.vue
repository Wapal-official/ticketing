<template>
  <img
    :src="finalSource"
    :alt="alt"
    v-if="!loading"
    :class="imageClass"
    :width="width"
    :height="height"
    :onerror="onerror"
  />
  <v-progress-circular
    :size="24"
    :width="2"
    color="#fff"
    indeterminate
    class="progress-bar"
    v-else
  ></v-progress-circular>
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
    onerror: { type: String, default: "" },
  },
  data() {
    return {
      loading: true,
      imageSource: null,
      finalSource: null,
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
        } else {
          const link = extractImageLinkFromCacheServerUrl(this.source);

          this.finalSource = link;
        }
      } else {
        this.finalSource = this.source;
      }

      this.loading = false;
    },
    loadImage() {
      const image = new Image();

      image.src = this.source;

      image.onload = () => {
        this.finalSource = image.src;
        this.loading = false;
      };

      image.onerror = () => {
        this.loadSource();
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
<style>
.progress-bar {
  margin: auto;
  display: block;
}
</style>
