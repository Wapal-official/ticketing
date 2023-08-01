<template>
  <div class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-flex-wrap tw-w-full">
  <div class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-12">
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-end tw-gap-2 tw-w-fit"
    >
      <div
        class="tw-font-medium tw-text-[#C1C2C5] tw-uppercase tw-leading-5 tw-tracking-[0.06rem] tw-text-right tw-w-full tw-text-xs 3xl:tw-text-sm"
      >
        Hours
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
      >
        <div
          class="tw-text-black tw-bg-white tw-rounded-lg tw-font-bold tw-text-[2rem] tw-leading-[90%] tw-tracking-[-0.02rem] tw-h-[45px] tw-overflow-hidden"
        >
          <ul
            ref="hoursOnes"
            class="tw-transition-all tw-ease-linear tw-duration-500 !tw-pl-0"
          >
            <li
              class="tw-p-2 tw-text-center"
              v-for="(i, index) in 10"
              :key="index"
            >
              {{ 9 - index }}
            </li>
          </ul>
        </div>
        <div
          class="tw-text-black tw-bg-white tw-rounded-lg tw-font-bold tw-text-[2rem] tw-leading-[90%] tw-tracking-[-0.02rem] tw-h-[45px] tw-overflow-hidden"
        >
          <ul
            ref="hoursTens"
            class="tw-transition-all tw-ease-linear tw-duration-500 !tw-pl-0"
          >
            <li
              class="tw-p-2 tw-text-center"
              v-for="(i, index) in 10"
              :key="index"
            >
              {{ 9 - index }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-2 tw-w-fit"
    >
      <div
        class="tw-font-medium tw-text-[#C1C2C5] tw-uppercase tw-leading-5 tw-tracking-[0.06rem] tw-text-right tw-w-full tw-text-xs 3xl:tw-text-sm"
      >
        Minutes
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
      >
        <div
          class="tw-text-black tw-bg-white tw-rounded-lg tw-font-bold tw-text-[2rem] tw-leading-[90%] tw-tracking-[-0.02rem] tw-h-[45px] tw-overflow-hidden"
        >
          <ul
            ref="minutesOnes"
            class="tw-transition-all tw-ease-linear tw-duration-500 !tw-pl-0"
          >
            <li
              class="tw-p-2 tw-text-center"
              v-for="(i, index) in 6"
              :key="index"
            >
              {{ 5 - index }}
            </li>
          </ul>
        </div>
        <div
          class="tw-text-black tw-bg-white tw-rounded-lg tw-font-bold tw-text-[2rem] tw-leading-[90%] tw-tracking-[-0.02rem] tw-h-[45px] tw-overflow-hidden"
        >
          <ul
            ref="minutesTens"
            class="tw-transition-all tw-ease-linear tw-duration-500 !tw-pl-0"
          >
            <li
              class="tw-p-2 tw-text-center"
              v-for="(i, index) in 10"
              :key="index"
            >
              {{ 9 - index }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-2 tw-w-fit"
    >
      <div
        class="tw-font-medium tw-text-[#C1C2C5] tw-uppercase tw-leading-5 tw-tracking-[0.06rem] tw-text-right tw-w-full tw-text-xs 3xl:tw-text-sm"
      >
        Seconds
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
      >
        <div
          class="tw-text-black tw-bg-white tw-rounded-lg tw-font-bold tw-text-[2rem] tw-leading-[90%] tw-tracking-[-0.02rem] tw-h-[45px] tw-overflow-hidden"
        >
          <ul
            ref="secondsOnes"
            class="tw-transition-all tw-ease-linear tw-duration-500 !tw-pl-0"
          >
            <li
              class="tw-p-2 tw-text-center"
              v-for="(i, index) in 6"
              :key="index"
            >
              {{ 5 - index }}
            </li>
          </ul>
        </div>
        <div
          class="tw-text-black tw-bg-white tw-rounded-lg tw-font-bold tw-text-[2rem] tw-leading-[90%] tw-tracking-[-0.02rem] tw-h-[45px] tw-overflow-hidden"
        >
          <ul
            ref="secondsTens"
            class="tw-transition-all tw-ease-linear tw-duration-500 !tw-pl-0"
          >
            <li
              class="tw-p-2 tw-text-center"
              v-for="(i, index) in 10"
              :key="index"
            >
              {{ 9 - index }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      launchCountdown: null,
      launchDate: null,
    };
  },
  mounted() {
    const date = new Date("2023-08-01 16:00 UTC");

    this.launchDate = date;

    this.launchDate = date;

    const interval = this.launchDate.getTime() - new Date().getTime();
    if (interval > 0) {
      this.startLaunchCountdown();
    } else {
      const lastMarginSecondsTens = -25.2;
      const lastMarginSecondsOnes = -14;
      const lastMarginHoursTens = -25.2;
      const lastMarginHoursOnes = -25.2;

      this.$refs.secondsTens.style.marginTop = lastMarginSecondsTens + "rem";
      this.$refs.secondsOnes.style.marginTop = lastMarginSecondsOnes + "rem";

      this.$refs.minutesTens.style.marginTop = lastMarginSecondsTens + "rem";
      this.$refs.minutesOnes.style.marginTop = lastMarginSecondsOnes + "rem";

      this.$refs.hoursTens.style.marginTop = lastMarginHoursTens + "rem";
      this.$refs.hoursOnes.style.marginTop = lastMarginHoursOnes + "rem";
    }
  },
  methods: {
    startLaunchCountdown() {
      this.launchCountdown = setInterval(() => {
        const interval = this.launchDate.getTime() - new Date().getTime();

        const days = Math.floor(interval / (1000 * 60 * 60 * 24));

        //Get Interval Hours
        const hours =
          Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
          days * 24;
        //Get Interval Minutes
        const minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        //Get Interval Seconds
        const seconds = Math.floor((interval % (1000 * 60)) / 1000);

        //Separate Interval hours, minutes and seconds into ones and tens places
        const hoursTens = hours % 10;
        const hoursOnes = Math.floor(hours / 10);

        const minutesTens = minutes % 10;
        const minutesOnes = Math.floor(minutes / 10);

        const secondsTens = seconds % 10;
        const secondsOnes = Math.floor(seconds / 10);

        const margin = -2.8;

        //Set last margins for hours and seconds. Last margin for minutes and seconds is same
        const lastMarginSecondsTens = -25.2;
        const lastMarginSecondsOnes = -14;
        const lastMarginHoursTens = -25.2;
        const lastMarginHoursOnes = -25.2;

        //Calculate current margins of hours
        let hoursTensMargin: number = lastMarginHoursTens - margin * hoursTens;
        let hoursOnesMargin: number = lastMarginHoursOnes - margin * hoursOnes;

        //Calculate current margins of minutes
        let minutesTensMargin: number =
          lastMarginSecondsTens - margin * minutesTens;
        let minutesOnesMargin: number =
          lastMarginSecondsOnes - margin * minutesOnes;

        //Calculate current margins of seconds
        let secondsTensMargin: number =
          lastMarginSecondsTens - margin * secondsTens;

        let secondsOnesMargin: number =
          lastMarginSecondsOnes - margin * secondsOnes;

        if (secondsTensMargin < lastMarginSecondsTens) {
          secondsTensMargin = lastMarginSecondsTens;
        }

        if (hoursTensMargin < lastMarginHoursTens) {
          hoursTensMargin = lastMarginHoursTens;
        }

        if (hoursOnesMargin < lastMarginHoursOnes) {
          hoursOnesMargin = lastMarginHoursOnes;
        }

        this.$refs.secondsTens.style.marginTop = secondsTensMargin + "rem";
        this.$refs.secondsOnes.style.marginTop = secondsOnesMargin + "rem";

        this.$refs.minutesTens.style.marginTop = minutesTensMargin + "rem";
        this.$refs.minutesOnes.style.marginTop = minutesOnesMargin + "rem";

        this.$refs.hoursTens.style.marginTop = hoursTensMargin + "rem";
        this.$refs.hoursOnes.style.marginTop = hoursOnesMargin + "rem";

        if (interval <= 0) {
          this.$refs.secondsTens.style.marginTop =
            lastMarginSecondsTens + "rem";
          this.$refs.secondsOnes.style.marginTop =
            lastMarginSecondsOnes + "rem";

          this.$refs.minutesTens.style.marginTop =
            lastMarginSecondsTens + "rem";
          this.$refs.minutesOnes.style.marginTop =
            lastMarginSecondsOnes + "rem";

          this.$refs.hoursTens.style.marginTop = lastMarginHoursTens + "rem";
          this.$refs.hoursOnes.style.marginTop = lastMarginHoursOnes + "rem";

          clearInterval(this.launchCountdown);

          location.reload();
        }
      }, 1000);
    },
  },
};
</script>
