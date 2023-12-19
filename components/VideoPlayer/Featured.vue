<template>
  <div>
    <video
      no-controls
      loop
      autoplay
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-cover tw-rounded-xl"
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
