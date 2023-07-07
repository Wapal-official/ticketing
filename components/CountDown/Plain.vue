<template>
  <div
    class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-1"
    :class="{ '!tw-gap-1': small }"
  >
    <div
      class="tw-text-white"
      v-if="days > 0"
      :class="{ '!tw-text-base': small }"
    >
      {{ days }}D
    </div>
    <div class="tw-text-white" :class="{ '!tw-text-base': small }">
      {{ hours }}H
    </div>
    <div class="tw-text-white" :class="{ '!tw-text-base': small }">
      {{ minutes }}M
    </div>
    <div class="tw-text-white" :class="{ '!tw-text-base': small }">
      {{ seconds }}S
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    startTime: { type: String },
    small: { type: Boolean, default: false },
  },
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  methods: {
    startCountdown(startTime: string) {
      const timer = setInterval(() => {
        const date = new Date(startTime);

        const now = new Date().getTime();

        const interval = date.getTime() - now;

        let days = Math.floor(interval / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((interval % (1000 * 60)) / 1000);

        this.days = days < 10 ? "0" + days : days;
        this.hours = hours < 10 ? "0" + hours : hours;
        this.minutes = minutes < 10 ? "0" + minutes : minutes;
        this.seconds = seconds < 10 ? "0" + seconds : seconds;

        if (interval <= 0) {
          this.days = "00";
          this.hours = "00";
          this.minutes = "00";
          this.seconds = "00";
          this.$emit("countdownComplete");
          clearInterval(timer);
        }
      }, 1000);
    },
    setDate() {
      this.days = "00";
      this.hours = "00";
      this.minutes = "00";
      this.seconds = "00";
    },
  },
  mounted() {
    this.setDate();
    this.startCountdown(this.startTime);
  },
};
</script>
