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
    <!-- <div class="play-icon" v-if="!isPlaying">
      <span class="mdi mdi-play"></span>
    </div> -->
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
    // playVideo() {
    //   const video = this.$refs.videoPlayer as HTMLVideoElement;
    //   if (!this.isPlaying) {
    //     video.play();
    //     this.isPlaying = true;
    //   } else {
    //     video.pause();
    //     this.isPlaying = false;
    //   }
    // },
  },
};
</script>
<style lang="css">
.video-holder {
  /* max-width: 100px; */
  background: #333;
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  /* padding-top: 15.44%; */
  position: relative;
  overflow: hidden;
  /* height: 104px; */
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
  /* right: 0; */
  margin: auto;
  z-index: 2;
}
</style>
