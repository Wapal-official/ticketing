<template>
  <div
    class="tw-flex tw-flex-row tw-items-center tw-justify-between md:tw-w-[50%] xl:tw-w-[26%] lg:tw-max-w-[450px]"
  >
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-fit"
    >
      <div
        class="tw-text-sm tw-font-semibold tw-text-[#C1C2C5] tw-uppercase tw-leading-5 tw-tracking-[0.06rem] tw-text-right tw-w-full"
      >
        Hours
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
      >
        <div
          class="tw-text-black tw-bg-white tw-rounded-lg tw-font-bold tw-text-[2rem] tw-leading-[90%] tw-tracking-[-0.02rem] tw-h-[45px] tw-overflow-hidden"
        >
          <ul ref="hoursOnes" class="tw-transition-all tw-ease-linear !tw-pl-0">
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
          <ul ref="hoursTens" class="tw-transition-all tw-ease-linear !tw-pl-0">
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
        class="tw-text-sm tw-font-semibold tw-text-[#C1C2C5] tw-uppercase tw-leading-5 tw-tracking-[0.06rem] tw-text-right tw-w-full"
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
            class="tw-transition-all tw-ease-linear !tw-pl-0"
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
            class="tw-transition-all tw-ease-linear !tw-pl-0"
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
        class="tw-text-sm tw-font-semibold tw-text-[#C1C2C5] tw-uppercase tw-leading-5 tw-tracking-[0.06rem] tw-text-right tw-w-full"
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
            class="tw-transition-all tw-ease-linear !tw-pl-0"
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
            class="tw-transition-all tw-ease-linear !tw-pl-0"
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
    const date = new Date("2023-08-01");

    this.launchDate = new Date(date.toUTCString());

    console.log(this.launchDate);

    this.startLaunchCountdown();
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

        const margin = -1.4;

        //Set last margins for hours and seconds. Last margin for minutes and seconds is same
        const lastMarginSecondsTens = -12.6;
        const lastMarginSecondsOnes = -7;
        const lastMarginHoursTens = -12.6;
        const lastMarginHoursOnes = -12.6;

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

        this.$refs.secondsTens.style.marginTop = secondsTensMargin + "em";
        this.$refs.secondsOnes.style.marginTop = secondsOnesMargin + "em";

        this.$refs.minutesTens.style.marginTop = minutesTensMargin + "em";
        this.$refs.minutesOnes.style.marginTop = minutesOnesMargin + "em";

        this.$refs.hoursTens.style.marginTop = hoursTensMargin + "em";
        this.$refs.hoursOnes.style.marginTop = hoursOnesMargin + "em";

        if (interval <= 0) {
          this.$refs.secondsTens.style.marginTop = lastMarginSecondsTens + "em";
          this.$refs.secondsOnes.style.marginTop = lastMarginSecondsOnes + "em";

          this.$refs.minutesTens.style.marginTop = lastMarginSecondsTens + "em";
          this.$refs.minutesOnes.style.marginTop = lastMarginSecondsOnes + "em";

          this.$refs.hoursTens.style.marginTop = lastMarginHoursTens + "em";
          this.$refs.hoursOnes.style.marginTop = lastMarginHoursOnes + "em";

          clearInterval(this.launchCountdown);
        }
      }, 1000);
    },
  },
};
</script>
