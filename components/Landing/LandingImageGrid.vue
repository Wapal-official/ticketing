<template>
  <section
    class="tw-rounded-lg tw-px-4 tw-py-8 tw-container tw-mx-auto lg:tw-py-12 lg:tw-px-12 tw-bg-[#010416]"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 lg:tw-flex-row"
    >
      <div
        class="tw-w-[300px] tw-h-[300px] md:tw-w-full md:tw-h-auto lg:tw-w-1/2 hover:tw-scale-105 hover:lg:tw-scale-100 hover:lg:tw-w-[55%] tw-transition-all tw-duration-300 tw-ease-linear"
      >
        <img :src="firstImage" alt="image" class="w-full h-full" />
      </div>
      <div
        class="tw-w-[300px] md:tw-w-full lg:tw-w-1/2 tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-8 tw-transition-all tw-duration-300 tw-ease-linear display-images hover:tw-scale-105 hover:lg:tw-scale-100 hover:lg:tw-w-[55%]"
      >
        <img
          :src="secondImage"
          alt="image"
          class="tw-w-full tw-h-[300px] tw-transition-all tw-ease-linear tw-duration-300 tw-transform hover:!tw-w-full md:tw-h-auto second-display-image"
        />
        <img
          :src="thirdImage"
          alt="image"
          class="tw-w-full tw-h-[300px] tw-transition-all tw-ease-linear tw-duration-300 tw-transform hover:!tw-w-full md:tw-h-auto third-display-image"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import secondImage from "@/assets/img/800.png";
import firstImage from "@/assets/img/921.png";
import thirdImage from "@/assets/img/6896.png";
export default {
  data() {
    return {
      firstImage,
      secondImage,
      thirdImage,
    };
  },
};
</script>
