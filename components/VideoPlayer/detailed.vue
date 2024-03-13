<template>
  <div class="video-holder-detailed" @click.stop="playVideo">
    <video
      ref="videoPlayer"
      controls
      controlslist="nodownload"
      loop
      playsinline
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-fill video-opacity"
    >
      <source :src="videoSource" />
    </video>
    <div class="play-icon-detailed" v-if="!isPlaying">
      <span class="mdi mdi-play"></span>
    </div>
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
      isPlaying: false,
    };
  },
  mounted() {
    const uncachedSource = this.source + "?refreshCache=true";
    // this.videoSource = uncachedSource + "#t=0.1";
    this.videoSource = uncachedSource;
  },
  methods: {
    playVideo() {
      const video = this.$refs.videoPlayer as HTMLVideoElement;
      if (!this.isPlaying) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    },
  },
};
</script>
<style lang="css">
.video-holder-detailed {
  /* max-width: 421px !important; */
  /* height: 421px; */
  background: #333;
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  /* padding-top: 15.44%; */
  position: relative;
  /* z-index: 10; */
  overflow: hidden;
  /* height: 104px; */
  width: 100%;
  border-radius: 4px;
}

.video-holder-detailed video {
  width: 100%;
  height: 100%;
  -webkit-transform: translate(0%, -25%);
  -ms-transform: translate(0%, -25%);
  transform: translate(0%, 0%);
  /* z-index: 10; */

  /* opacity: 0.7; */
}

.play-icon-detailed {
  display: none;
  position: absolute;
  top: 35%;
  left: 40%;
  margin: auto;
  z-index: 2;
}
</style>
