<template>
  <div>
    <video
      controls
      controlslist="nodownload"
      looop
      playsinline
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-cover"
    >
      <source :src="videoSource" />
    </video>
  </div>
</template>

<script lang="ts">
export default {
  name: "VideoPlayer",
  props: {
    source: { type: String },
  },
  data() {
    return {
      player: null,
      videoSource: "",
    };
  },
  mounted() {
    const uncachedSource = this.source + "?refreshCache=true";
    this.videoSource = uncachedSource;
  },
};
</script>
