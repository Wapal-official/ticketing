<template>
  <section
    class="rounded-lg px-4 py-8 container mx-auto lg:py-12 lg:px-12 bg-[#010416]"
  >
    <div class="flex flex-col items-center justify-center gap-8 lg:flex-row">
      <div
        class="w-[300px] h-[300px] md:w-full md:h-auto lg:w-1/2 hover:scale-105 hover:lg:scale-100 hover:lg:w-[55%] transition-all duration-300 ease-linear"
      >
        <img :src="firstImage" alt="image" class="w-full h-full" />
      </div>
      <div
        class="w-[300px] md:w-full lg:w-1/2 flex flex-col items-end justify-end gap-8 transition-all duration-300 ease-linear display-images hover:scale-105 hover:lg:scale-100 hover:lg:w-[55%]"
      >
        <img
          :src="secondImage"
          alt="image"
          class="w-full h-[300px] transition-all ease-linear duration-300 transform hover:!w-full md:h-auto second-display-image"
        />
        <img
          :src="thirdImage"
          alt="image"
          class="w-full h-[300px] transition-all ease-linear duration-300 transform hover:!w-full md:h-auto third-display-image"
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
