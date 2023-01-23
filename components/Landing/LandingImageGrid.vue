<template>
  <section class="rounded-lg px-4 py-8 lg:py-12 lg:px-12 bg-[#010416]">
    <div class="flex flex-col items-center justify-center gap-8 lg:flex-row">
      <div
        class="w-full lg:w-1/2 hover:lg:w-[55%] transition-all duration-300 ease-linear"
      >
        <img :src="firstImage" alt="image" class="w-full h-full" />
      </div>
      <div
        class="lg:w-1/2 flex flex-col items-end justify-end gap-8 transition-all duration-300 ease-linear display-images hover:lg:w-[55%]"
      >
        <img
          :src="secondImage"
          alt="image"
          class="w-full transition-all ease-linear duration-300 transform hover:!w-full second-display-image"
        />
        <img
          :src="thirdImage"
          alt="image"
          class="w-full transition-all ease-linear duration-300 transform hover:!w-full third-display-image"
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
