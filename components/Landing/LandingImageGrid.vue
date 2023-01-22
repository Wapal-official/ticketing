<template>
  <section class="rounded-lg px-4 py-8 md:py-12 md:px-12 bg-[#010416]">
    <div
      class="flex flex-col lg:flex-row items-center justify-center gap-8 display-image-container"
    >
      <img
        :src="firstImage"
        alt="image"
        class="w-full h-full lg:w-[600px] lg:h-[600px] transition-all ease-linear duration-200 transform hover:!scale-110 hover:!translate-x-0 first-display-image"
      />
      <div class="flex flex-col items-start justify-start gap-8 display-images">
        <img
          :src="secondImage"
          alt="image"
          class="w-full h-full lg:w-[700px] lg:h-[280px] object-contain transition-all ease-linear duration-200 transform hover:!scale-110 second-display-image"
        />
        <img
          :src="thirdImage"
          alt="image"
          class="w-full h-full lg:w-[700px] lg:h-[280px] object-contain transition-all ease-linear duration-200 transform hover:!scale-110 third-display-image"
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
