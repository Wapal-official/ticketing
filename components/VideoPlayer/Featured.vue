<template>
  <div class="tw-w-full tw-h-full tw-rounded-xl">
    <video
      no-controls
      loop
      autoplay
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-cover tw-rounded-xl"
      muted
    >
      <source :src="videoSource" />
    </video>
  </div>
</template>

<script lang="ts">
export default {
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
    this.videoSource = this.source;
  },
};
</script>
