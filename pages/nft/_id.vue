<template>
  <div
    class="container mx-auto flex flex-col items-center justify-start gap-8 px-4 py-16 md:px-16 lg:flex-row lg:gap-16"
  >
    <div
      class="flex flex-col items-start justify-start gap-8 w-full md:w-[60%] lg:w-[40%]"
    >
      <div class="rounded-lg nft-preview-card-border w-full">
        <img :src="pirateImage" alt="pirate" class="w-full rounded-lg" />
      </div>
      <h3 class="text-[1.75rem] text-wapal-pink font-normal">
        Live In
        <span class="live-counter live-counter-shadow pl-4 md:pl-8"
          >{{ whitelistSaleHours }} </span
        ><span class="live-counter live-counter-shadow">H</span>
        <span class="live-counter live-counter-shadow"
          >{{ whitelistSaleMinutes }} </span
        ><span class="live-counter live-counter-shadow">M</span>
        <span class="live-counter live-counter-shadow"
          >{{ whitelistSaleSeconds }} </span
        ><span class="live-counter live-counter-shadow">S</span>
      </h3>
    </div>
    <div
      class="rounded w-full bg-[#001233] flex flex-col items-start justify-start gap-6 px-8 py-8 lg:w-[60%]"
    >
      <div class="flex flex-row items-center justify-start gap-4">
        <div
          class="border border-[#e229a0] uppercase text-xs text-[#e229a0] px-4 py-2"
        >
          Doxxed
        </div>
        <a href="https://twitter.com/wapal_official" target="_blank">
          <v-icon
            class="!text-2xl transition duration-200 ease-linear hover:!text-wapal-pink"
            >mdi-twitter</v-icon
          > </a
        ><a
          href="https://t.co/3KwwcoQ2xW"
          target="_blank"
          class="nft-discord-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
            ></path>
          </svg>
        </a>
      </div>
      <div class="text-wapal-gray pb-12">
        <h3 class="text-2xl pb-4 font-medium uppercase md:text-[2rem]">
          Pontem Space Pirates
        </h3>
        <p class="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a
          rhoncus augue. Phasellus egestas varius ex, vitae egestas velit
          aliquet sed.
        </p>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div
          class="flex flex-row items-center justify-between w-full text-white"
        >
          <span class="capitalize text-sm">pre sale mint</span>
          <span class="capitalize text-sm"
            >10% <span class="text-[#ACACAC]">(100 out of 1000)</span></span
          >
        </div>
        <div class="w-full rounded-full relative bg-[#263D68] h-[10px]">
          <div
            class="absolute h-[10px] top-0 bg-[#E500A4] w-[10%] rounded-full transition-all duration-200 ease-linear"
          ></div>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-start gap-8 bg-[#0C224B] text-[#F0F0F0] px-6 py-4 w-full rounded md:flex-row md:gap-24"
      >
        <div class="flex flex-col items-center justify-center gap-4 w-full">
          <h6 class="capitalize text-white">price 0.2 sol</h6>
          <button
            class="text-base uppercase text-white bg-[#FF36AB] rounded w-full py-2 text-center font-semibold"
          >
            Mint
          </button>
        </div>
        <div class="flex flex-col items-center justify-center gap-4 w-full">
          <h6 class="uppercase text-wapal-pink text-xl font-medium">End In</h6>
          <div class="flex flex-row items-center justify-between w-full">
            <div class="flex flex-col items-center justify-center gap-1">
              <div>Hours</div>
              <span class="live-counter">{{ whitelistSaleHours }}</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-1">
              <div>Minutes</div>
              <span class="live-counter">{{ whitelistSaleMinutes }}</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-1">
              <div>Seconds</div>
              <span class="live-counter">{{ whitelistSaleSeconds }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-between gap-2 bg-[#0C224B] text-white px-6 py-4 w-full rounded md:flex-row"
      >
        <div class="flex flex-col items-start justify-start gap-0 md:gap-4">
          <div>Whitelist Sale</div>
          <div class="capitalize">price 0.5 sol</div>
        </div>
        <div class="text-lg">
          Starts In
          <span class="text-wapal-pink pl-2">
            {{ whitelistSaleHours }}h {{ whitelistSaleMinutes }}m
            {{ whitelistSaleSeconds }}s</span
          >
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-between gap-2 bg-[#0C224B] text-white px-6 py-4 w-full rounded md:flex-row"
      >
        <div class="flex flex-col items-start justify-start gap-0 md:gap-4">
          <div>Public Sale</div>
          <div class="capitalize">price 0.5 sol</div>
        </div>
        <div class="text-lg">
          Starts In
          <span class="text-wapal-pink pl-2"
            >{{ whitelistSaleHours }}h {{ whitelistSaleMinutes }}m
            {{ whitelistSaleSeconds }}s</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import pirateImage from "@/assets/img/6195.png";
export default {
  data() {
    return {
      pirateImage,
      date: null,
      whitelistSaleHours: 0,
      whitelistSaleMinutes: 0,
      whitelistSaleSeconds: 0,
    };
  },
  methods: {
    getWhitelistSaleTime() {
      const timer = setInterval(() => {
        if (this.date) {
          const now = new Date().getTime();
          const interval = this.date.getTime() - now;
          let hours = Math.floor(
            (interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((interval % (1000 * 60)) / 1000);

          this.whitelistSaleHours = hours < 10 ? "0" + hours : hours;
          this.whitelistSaleMinutes = minutes < 10 ? "0" + minutes : minutes;
          this.whitelistSaleSeconds = seconds < 10 ? "0" + seconds : seconds;
        }
        if (this.interval < 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  computed: {},
  mounted() {
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 1);
    this.getWhitelistSaleTime();
  },
};
</script>
