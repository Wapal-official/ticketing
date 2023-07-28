<template>
  <div
    class="tw-w-screen tw-h-screen !tw-bg-cover !tw-bg-no-repeat !tw-bg-center"
    :style="`background:url(${launchBg})`"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full tw-gap-4 tw-pt-16"
    >
      <h1
        class="tw-uppercase tw-font-semibold tw-text-white tw-text-[4rem] tw-flex tw-flex-col tw-items-center tw-justify-center tw-tracking-[-0.04rem] tw-leading-[120%]"
      >
        <span>Wapal's Marketplace</span> <span>Launches in</span>
      </h1>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8"
      >
        <span
          class="tw-text-wapal-pink tw-uppercase tw-font-semibold tw-tracking-[0.6rem] tw-text-[1.5rem]"
          >Time Remaining</span
        >
        <reusable-animated-count-down />
        <a
          class="tw-px-[3.25em] tw-py-3 tw-bg-wapal-pink !tw-text-white tw-text-sm tw-rounded-md tw-mb-6"
          href="https://forms.gle/h4YXLDoveqQL62Zj7"
          target="_blank"
          >Apply for closed beta</a
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import launchBg from "@/assets/img/launch-bg.png";
export default {
  data() {
    return {
      launchBg,
    };
  },
};
</script>
