<template>
  <div>
    <video
      controls
      controlslist="nodownload"
      loop
      playsinline
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-cover"
    >
      <source :src="videoSource" />
    </video>
  </div>
</template>

<script lang="ts">
import videoPoster from "@/assets/img/logo/logo-vertical.png";
export default {
  name: "VideoPlayer",
  props: {
    source: { type: String },
  },
  data() {
    return {
      player: null,
      videoSource: "",
      videoPoster,
    };
  },
  mounted() {
    const uncachedSource = this.source + "?refreshCache=true";
    // this.videoSource = uncachedSource + "#t=0.1";
    this.videoSource = uncachedSource;
  },
};
</script>
