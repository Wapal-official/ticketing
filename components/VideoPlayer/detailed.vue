<template>
  <div class="video-holder-detailed">
    <video
      ref="videoPlayer"
      :controls="videoControl"
      controlslist="nodownload"
      loop
      playsinline
      preload="metadata"
      class="tw-w-full tw-h-full tw-object-cover video-opacity"
      :style="{ opacity: playIcon && !isPlaying ? '0.6' : '1' }"
    >
      <source :src="videoSource" />
    </video>
    <div class="play-icon-detailed" v-if="!isPlaying && playIcon">
      <span class="mdi mdi-play"></span>
    </div>
    <div class="play-icon-detailed" v-if="isPlaying && playIcon">
      <span class="mdi mdi-pause"></span>
    </div>
    <div v-if="playIcon" class="volume-control">
      <span v-if="!isMuted" class="mdi mdi-volume-high"></span>
      <span v-else class="mdi mdi-volume-mute"></span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    source: { type: String },
    videoControl: {
      type: Boolean,
      default: true,
    },
    playIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      player: null,
      videoSource: "",
      isPlaying: false,
      isMuted: false,
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
  background: #333;
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 4px;
}

.video-holder-detailed video {
  width: 100%;
  height: 100%;
  -webkit-transform: translate(0%, -25%);
  -ms-transform: translate(0%, -25%);
  transform: translate(0%, 0%);
}

.play-icon-detailed {
  color: #fff;
  font-size: 36px;
  position: absolute;
  top: 38%;
  left: 45%;
  margin: auto;
  z-index: 2;
}
.volume-control {
  position: absolute;
  top: 0px;
  font-size: 30px;
  right: 10px;
  color: white;
  cursor: pointer;
}
</style>
