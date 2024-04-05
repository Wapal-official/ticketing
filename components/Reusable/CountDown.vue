<template>
  <div
    v-if="vertical"
    class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
    :class="{ 'tw-text-[#F0F0F0]': textWhite, 'tw-text-base': textSmall }"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1"
      v-if="days > 0"
    >
      <div>Days</div>
      <span class="live-counter" :class="{ 'live-counter-shadow': shadow }">{{
        days
      }}</span>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
      <div>Hours</div>
      <span class="live-counter" :class="{ 'live-counter-shadow': shadow }">{{
        hours
      }}</span>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
      <div>Minutes</div>
      <span class="live-counter" :class="{ 'live-counter-shadow': shadow }">{{
        minutes
      }}</span>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
      <div>Seconds</div>
      <span class="live-counter" :class="{ 'live-counter-shadow': shadow }">{{
        seconds
      }}</span>
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
    <span :class="[changeColor ? 'tw-text-wapal-pink' : 'change-color']" v-else>
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
    textWhite: { type: Boolean, default: false },
    textSmall: { type: Boolean, default: false },
    changeColor: { type: Boolean, default: true },
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
  created() {
    this.setDate();
    this.startCountdown(this.startTime);
  },
};
</script>
<style lang="css">
.change-color {
  color: #fff;
  font-size: 26px;
}
</style>
