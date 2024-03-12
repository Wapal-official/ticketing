<template>
  <div class="video-holder">
    <video
      autoplay
      controlslist="nodownload"
      loop
      muted
      playsinline
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-cover video-opacity"
    >
      <source :src="videoSource" />
    </video>
  </div>
</template>

<script lang="ts">
import videoPoster from "@/assets/img/logo/logo-vertical.png";

export default {
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
<style lang="css">
.video-holder {
  max-width: 100px;
  background: #333;
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  /* padding-top: 15.44%; */
  position: relative;
  overflow: hidden;
  height: 104px;
  width: 100%;
  border-radius: 4px;
}

.video-holder video {
  width: 100%;
  height: 200%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(0%, -25%);
  -ms-transform: translate(0%, -25%);
  transform: translate(0%, -25%);
}
</style>
