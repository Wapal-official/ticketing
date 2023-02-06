<template>
  <div
    v-if="vertical"
    class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1"
      v-if="days > 0"
    >
      <div>Days</div>
      <span class="live-counter">{{ days }}</span>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
      <div>Hours</div>
      <span class="live-counter">{{ hours }}</span>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
      <div>Minutes</div>
      <span class="live-counter">{{ minutes }}</span>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
      <div>Seconds</div>
      <span class="live-counter">{{ seconds }}</span>
    </div>
  </div>
  <div v-else>
    <span v-if="shadow">
      <span v-if="days > 0" class="live-counter live-counter-shadow"
        >{{ days }} D</span
      >
      <span class="live-counter live-counter-shadow">{{ hours }} H</span>
      <span class="live-counter live-counter-shadow">{{ minutes }} M</span>
      <span class="live-counter live-counter-shadow">{{ seconds }} S</span>
    </span>
    <span class="tw-text-wapal-pink tw-pl-2" v-else>
      <span v-if="days > 0">{{ days }}d </span>
      {{ hours }}h {{ minutes }}m {{ seconds }}s
    </span>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    shadow: { type: Boolean },
    vertical: { type: Boolean },
    startTime: { type: String },
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
    startCountdown(saleTime: string) {
      const timer = setInterval(() => {
        const date = new Date(saleTime);
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

        if (this.interval < 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    setDate(saleTime: string) {
      const date = new Date(saleTime);
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
    },
  },
  mounted() {
    this.setDate(this.startTime);
    this.startCountdown(this.startTime);
  },
};
</script>
