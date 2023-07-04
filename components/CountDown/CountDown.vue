<template>
  <div
    class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
    :class="{ '!tw-gap-1': small }"
  >
    <div
      class="tw-text-white tw-text-[1.75rem] tw-tracking-[-0.0175rem] tw-font-medium"
      v-if="days > 0"
      :class="{ '!tw-text-base': small }"
    >
      {{ days
      }}<span
        class="tw-text-lg tw-text-dark-2 tw-font-semibold"
        :class="{ '!tw-text-sm': small }"
        >D</span
      >
    </div>
    <div
      class="tw-text-white tw-text-[1.75rem] tw-tracking-tight tw-font-medium"
      :class="{ '!tw-text-base': small }"
    >
      {{ hours
      }}<span
        class="tw-text-lg tw-text-dark-2 tw-font-semibold"
        :class="{ '!tw-text-sm': small }"
        >H</span
      >
    </div>
    <div
      class="tw-text-white tw-text-[1.75rem] tw-tracking-tight tw-font-medium"
      :class="{ '!tw-text-base': small }"
    >
      {{ minutes
      }}<span
        class="tw-text-lg tw-text-dark-2 tw-font-semibold"
        :class="{ '!tw-text-sm': small }"
        >M</span
      >
    </div>
    <div
      class="tw-text-white tw-text-[1.75rem] tw-tracking-tight tw-font-medium"
      :class="{ '!tw-text-base': small }"
    >
      {{ seconds
      }}<span
        class="tw-text-lg tw-text-dark-2 tw-font-semibold"
        :class="{ '!tw-text-sm': small }"
        >S</span
      >
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
    console.log(this.startTime);
    this.startCountdown(this.startTime);
  },
};
</script>
