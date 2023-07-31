<template>
  <div
    class="tw-w-screen tw-h-screen !tw-bg-cover !tw-bg-no-repeat !tw-bg-center"
    :style="`background:linear-gradient(0deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.82) 100%),url(${launchBg})`"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full tw-gap-12 tw-pt-16"
    >
      <!-- <h1
        class="tw-uppercase tw-font-semibold tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-tracking-[-0.04rem] tw-leading-[200%] tw-text-3xl md:tw-leading-[120%] md:tw-text-[3.5rem] 3xl:tw-text-[4rem]"
      >
        <span>Wapal's Marketplace</span> <span>Launches in</span>
      </h1> -->
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8"
      >
        <span
          class="tw-text-wapal-pink tw-uppercase tw-font-semibold tw-tracking-[0.72rem] tw-text-2xl"
          >Time Remaining</span
        >
        <reusable-animated-count-down />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import launchBg from "@/assets/img/launch-bg-2.png";
export default {
  data() {
    return {
      launchBg,
    };
  },
};
</script>
