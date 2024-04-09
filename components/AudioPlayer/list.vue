<template>
  <div id="audio-player-container">
    <audio ref="audio" :src="audioUrl" preload="metadata" loop></audio>
    <div class="tw-flex tw-justify-center">
      <button id="play-icon" class="icon" @click="togglePlayPause">
        <span
          v-if="!isPlay"
          class="mdi mdi-play"
          :style="{ fontSize: iconSize + 'px' }"
        ></span>
        <span
          v-else
          class="mdi mdi-pause"
          :style="{ fontSize: iconSize + 'px' }"
        ></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: false,
      audioUrl: null,
    };
  },
  props: {
    audioSrc: { type: String },
    iconSize: { type: String, default: "24" },
  },
  mounted() {
    this.audioUrl = this.audioSrc + "?refreshcache=true";
  },
  methods: {
    togglePlayPause() {
      const audio = this.$refs.audio;
      if (this.isPlay) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlay = !this.isPlay;
    },
  },
};
</script>

<style scoped>
#audio-player-container {
  margin: 0 auto;
  background: transparent;
}
button {
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#play-icon span {
  color: #fff;
}
</style>
