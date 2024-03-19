<template>
  <div>
    <div class="audio-player">
      <div class="timeline" @click="seekTimeline($event)">
        <div class="progress" :style="{ width: progressWidth }"></div>
      </div>
      <div class="controls">
        <div class="play-container">
          <div
            class="toggle-playy play"
            :class="!isPaused ? 'mdi mdi-pause' : 'mdi mdi-play'"
            @click="togglePlay"
          ></div>
        </div>
        <div class="time">
          <div class="current">{{ currentTime }}</div>
          <div class="divider">/</div>
          <div class="length">{{ duration }}</div>
        </div>
        <div class="name">Music Song</div>
        <div
          class="volume-container"
          @mouseenter="showVolumeSlider"
          @mouseleave="hideVolumeSlider"
          @click="toggleMute"
        >
          <div class="volume-button">
            <span
              class="volume"
              :class="[isMuted ? 'mdi mdi-volume-mute' : 'mdi mdi-volume-high']"
            ></span>
          </div>
          <div
            class="volume-slider"
            v-show="isVolumeSliderVisible"
            @click="adjustVolume"
            ref="volumeSlider"
          >
            <div
              class="volume-percentage"
              :style="{ width: volume * 100 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audio: null,
      isPaused: true,
      isMuted: false,
      progressWidth: "0%",
      currentTime: "0:00",
      duration: "0:00",
      volumeWidth: "75%",
      isVolumeSliderVisible: true,
    };
  },
  mounted() {
    this.audio = new Audio(
      "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
    );

    this.audio.addEventListener("loadeddata", () => {
      this.duration = this.getTimeCodeFromNum(this.audio.duration);
    });

    setInterval(() => {
      this.progressWidth =
        (this.audio.currentTime / this.audio.duration) * 100 + "%";
      this.currentTime = this.getTimeCodeFromNum(this.audio.currentTime);
    }, 500);
  },
  methods: {
    togglePlay() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
    },
    seekTimeline(event) {
      const timelineWidth = event.currentTarget.offsetWidth;
      const timeToSeek = (event.offsetX / timelineWidth) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    },
    getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0)
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
      ).padStart(2, 0)}`;
    },
    showVolumeSlider() {
      this.isVolumeSliderVisible = true;
    },
    hideVolumeSlider() {
      this.isVolumeSliderVisible = true;
    },
    adjustVolume(e) {
      const volumeSlider = this.$refs.volumeSlider;
      if (volumeSlider) {
        const sliderWidth = volumeSlider.getBoundingClientRect().width;
        const newVolume =
          (e.clientX - volumeSlider.getBoundingClientRect().left) / sliderWidth;
        this.audio.volume = newVolume;
        this.volume = newVolume;
      }
    },
  },
};
</script>

<style scoped>
.audio-player {
  height: 50px;
  width: 350px;
  background: #444;
  box-shadow: 0 0 20px 0 #000a;
  font-family: arial;
  color: white;
  font-size: 0.75em;
  overflow: hidden;
  display: grid;
  grid-template-rows: 6px auto;
  position: relative;
}
.audio-player .timeline {
  background: white;
  width: 100%;
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 10px 0 #0008;
}
.audio-player .progress {
  background: rgb(135 89 255);
  width: 0%;
  height: 100%;
  transition: 0.25s;
}
.audio-player .controls {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 0 20px;
}
.audio-player .controls > * {
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle-playy {
  cursor: pointer;
  font-size: 24px;
}
/* .audio-player .toggle-playy.play {
  cursor: pointer;
  position: relative;
  left: 0;
  height: 0;
  width: 0;
  border: 7px solid #0000;
  border-left: 13px solid white;
} */
/* .audio-player .toggle-playy.pause {
  height: 15px;
  width: 20px;
  cursor: pointer;
  position: relative;
}
.audio-player .toggle-playy.pause:before {
  position: absolute;
  top: 0;
  left: 0px;
  background: white;
  content: "";
  height: 15px;
  width: 3px;
}
.audio-player .toggle-playy.pause:after {
  position: absolute;
  top: 0;
  right: 8px;
  background: white;
  content: "";
  height: 15px;
  width: 3px;
} */
.audio-player .time {
  display: flex;
}
.audio-player .time > * {
  padding: 2px;
}
.audio-player .volume-container {
  cursor: pointer;
}
.audio-player .volume-button {
  height: 26px;
  display: flex;
  align-items: center;
}
.audio-player .volume {
  transform: scale(0.7);
  font-size: 24px;
}

.audio-player .volume-slider {
  position: absolute;
  right: 50px;
  top: 20px;
  /* z-index: -1; */
  width: 120px;

  height: 15px;
  background: white;
  box-shadow: 0 0 20px #000a;
  transition: 0.25s;
}
.audio-player .volume-slider .volume-percentage {
  background: rgb(135 89 255);
  height: 100%;
  width: 75%;
}
.audio-player .volume-container:hover .volume-slider {
  /* left: -123px;
  width: 120px; */
  display: block;
  transition: 0.3s ease-in-out;
}
</style>
