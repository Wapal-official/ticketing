<template>
  <div id="audio-player-container" ref="audioPlayerContainer">
    <audio ref="audio" :src="audioUrl" preload="metadata"></audio>
    <div
      class="tw-flex tw-flex-col tw-align-center tw-justify-center"
      style="align-items: center"
    >
      <div
        class="tw-flex tw-align-center tw-justify-between"
        style="align-items: center; width: 100%; position: relative"
      >
        <div class="tw-flex tw-items-center">
          <button
            ref="playIconContainer"
            id="play-icon"
            class="icon tw-mr-2"
            @click="isPlay = !isPlay"
          >
            <span v-if="!isPlay" class="mdi mdi-play"></span>
            <span v-else class="mdi mdi-pause"></span>
          </button>
          <span
            ref="currentTimeContainer"
            id="current-time"
            class="time audio-fonts"
            >0:00</span
          >
          <span class="tw-px-1"> / </span>
          <span ref="durationContainer" id="duration" class="time audio-fonts"
            >0:00</span
          >
        </div>
        <div
          class="tw-flex tw-align-center tw-justify-end"
          style="align-items: center"
        >
          <output ref="outputContainer" class="audio-fonts" id="volume-output"
            >100</output
          >
          <input
            ref="volumeSlider"
            type="range"
            id="volume-slider"
            max="100"
            value="100"
          />
          <button
            ref="muteIconContainer"
            id="mute-icon"
            @click="isMute = !isMute"
          >
            <span v-if="!isMute" class="mdi mdi-volume-high"></span>
            <span v-else class="mdi mdi-volume-mute"></span>
          </button>
        </div>
      </div>
      <input
        ref="seekSlider"
        type="range"
        id="seek-slider"
        max="100"
        value="0"
      />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    isPlay: false,
    isMute: false,
    audioUrl: null,
  }),
  props: {
    audioSrc: { type: String },
  },

  mounted() {
    if (!this.audioSrc.startsWith("blob:")) {
      this.audioUrl = this.audioSrc + "?refreshcache=true";
    } else {
      this.audioUrl = this.audioSrc;
    }
    // this.audioUrl = this.audioSrc + "?refreshcache=true";

    const audioPlayerContainer = this.$refs.audioPlayerContainer;
    const playIconContainer = this.$refs.playIconContainer;
    const seekSlider = this.$refs.seekSlider;
    const volumeSlider = this.$refs.volumeSlider;
    const muteIconContainer = this.$refs.muteIconContainer;
    const audio = this.$refs.audio;
    const durationContainer = this.$refs.durationContainer;
    const currentTimeContainer = this.$refs.currentTimeContainer;
    const outputContainer = this.$refs.outputContainer;
    let playState = "play";
    let muteState = "unmute";
    let raf = null;
    const whilePlaying = () => {
      seekSlider.value = Math.floor(audio.currentTime);
      currentTimeContainer.textContent = calculateTime(seekSlider.value);
      audioPlayerContainer.style.setProperty(
        "--seek-before-width",
        `${(seekSlider.value / seekSlider.max) * 100}%`
      );
      raf = requestAnimationFrame(whilePlaying);
    };

    const showRangeProgress = (rangeInput) => {
      if (rangeInput === seekSlider)
        audioPlayerContainer.style.setProperty(
          "--seek-before-width",
          (rangeInput.value / rangeInput.max) * 100 + "%"
        );
      else
        audioPlayerContainer.style.setProperty(
          "--volume-before-width",
          (rangeInput.value / rangeInput.max) * 100 + "%"
        );
    };

    const calculateTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${returnedSeconds}`;
    };

    const displayDuration = () => {
      durationContainer.textContent = calculateTime(audio.duration);
    };

    const setSliderMax = () => {
      seekSlider.max = Math.floor(audio.duration);
    };

    const displayBufferedAmount = () => {
      const bufferedAmount = Math.floor(
        audio.buffered.end(audio.buffered.length - 1)
      );
      audioPlayerContainer.style.setProperty(
        "--buffered-width",
        `${(bufferedAmount / seekSlider.max) * 100}%`
      );
    };

    if (audio.readyState > 0) {
      displayDuration();
      setSliderMax();
      displayBufferedAmount();
    } else {
      audio.addEventListener("loadedmetadata", () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
      });
    }

    playIconContainer.addEventListener("click", () => {
      if (playState === "play") {
        audio.play();
        // playAnimation.playSegments([14, 27], true);
        requestAnimationFrame(whilePlaying);
        playState = "pause";
      } else {
        audio.pause();
        // playAnimation.playSegments([0, 14], true);
        cancelAnimationFrame(raf);
        playState = "play";
      }
    });

    muteIconContainer.addEventListener("click", () => {
      if (muteState === "unmute") {
        // muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = "mute";
      } else {
        // muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = "unmute";
      }
    });

    audio.addEventListener("progress", displayBufferedAmount);

    seekSlider.addEventListener("input", (e) => {
      showRangeProgress(e.target);
      currentTimeContainer.textContent = calculateTime(seekSlider.value);
      if (!audio.paused) {
        cancelAnimationFrame(raf);
      }
    });

    seekSlider.addEventListener("change", () => {
      audio.currentTime = seekSlider.value;
      if (!audio.paused) {
        requestAnimationFrame(whilePlaying);
      }
    });

    volumeSlider.addEventListener("input", (e) => {
      const value = e.target.value;
      showRangeProgress(e.target);
      outputContainer.textContent = value;
      audio.volume = value / 100;
    });
  },
};
</script>

<style scoped>
#seek-slider {
  width: 94%;
  margin: 0 auto;
}
#volume-output {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
.audio-fonts {
  font-size: 16px !important;
  color: #ffffff;
}
#play-icon span {
  font-size: 24px;
  color: #ffffff;
}
button {
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
  width: 40px;
  height: 40px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

#audio-player-container {
  --seek-before-width: 0%;
  --volume-before-width: 100%;
  --buffered-width: 0%;
  margin: 0 auto;
  background: transparent;
}

path {
  stroke: #ffffff;
}
#volume-slider {
  width: 38%;
}
#volume-slider::-webkit-slider-runnable-track {
  background: #54525a;
}
#volume-slider::-moz-range-track {
  background: #54525a;
}
#volume-slider::-ms-fill-upper {
  background: #54525a;
}
#volume-slider::before {
  width: var(--volume-before-width);
}

#mute-icon span {
  font-size: 24px;
  color: #ffffff;
}
input[type="range"] {
  position: relative;
  -webkit-appearance: none;
  width: 38%;
  margin: 0;
  padding: 0;
  height: 19px;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: linear-gradient(
    to right,
    #9d9ca2 var(--buffered-width),
    rgba(82, 82, 83, 0.2) var(--buffered-width)
  );
}
input[type="range"]::before {
  position: absolute;
  content: "";
  top: 8px;
  left: 0;
  width: var(--seek-before-width);
  height: 3px;
  background-color: #ffffff;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  box-sizing: content-box;
  border: 1px solid #ffffff;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  margin: -7px 0 0 0;
}
input[type="range"]:active::-webkit-slider-thumb {
  transform: scale(1.2);
  background: #ffffff;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: linear-gradient(
    to right,
    #54525a var(--buffered-width),
    rgba(97, 100, 100, 0.2) var(--buffered-width)
  );
}
input[type="range"]::-moz-range-progress {
  background-color: #ffffff;
}
input[type="range"]::-moz-focus-outer {
  border: 0;
}
input[type="range"]::-moz-range-thumb {
  box-sizing: content-box;
  border: 1px solid #ffffff;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
}
input[type="range"]:active::-moz-range-thumb {
  transform: scale(1.2);
  background: #ffffff;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: transparent;
  border: solid transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background-color: #ffffff;
}
input[type="range"]::-ms-fill-upper {
  background: linear-gradient(
    to right,
    #54525a var(--buffered-width),
    rgba(93, 96, 97, 0.2) var(--buffered-width)
  );
}
input[type="range"]::-ms-thumb {
  box-sizing: content-box;
  border: 1px solid #ffffff;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
}
input[type="range"]:active::-ms-thumb {
  transform: scale(1.2);
  background: #ffffff;
}
</style>
