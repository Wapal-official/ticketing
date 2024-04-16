<template>
  <div class="video-holder">
    <video
      ref="videoPlayer"
      no-controls
      controlslist="nodownload"
      loop
      playsinline
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-cover video-opacity"
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

      isPlaying: false,
    };
  },
  mounted() {
    const uncachedSource = this.source + "?refreshCache=true";
    // this.videoSource = uncachedSource + "#t=0.1";
    this.videoSource = uncachedSource;
  },
  methods: {},
};
</script>
<style lang="css">
.video-holder {
  background: #333;
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 4px;
}

.video-holder video {
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(0%, 0%);
  -ms-transform: translate(0%, 0);
  transform: translate(0%, 0%);
}

.play-icon {
  font-size: 20px;
  position: absolute;
  top: 35%;
  left: 40%;
  margin: auto;
  z-index: 2;
}
</style>
