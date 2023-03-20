<template>
  <section class="tw-py-16 tw-select-none tw-cursor-grab">
    <div class="swiper mySwiper" ref="swiper">
      <div class="swiper-wrapper">
        <slider-card
          v-for="(collection, index) in collections"
          :key="index"
          :collection="collection"
        />
      </div>
    </div>
  </section>
</template>
<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";

import SliderCard from "@/components/Landing/SliderCard.vue";

export default {
  props: { collections: { type: Array }, loading: { type: Boolean } },
  components: { SliderCard },
  data() {
    return {
      sliderImages: [],
    };
  },
  async mounted() {
    await this.$nextTick();
    new Swiper(this.$refs.swiper, {
      autoplay: {
        delay: 3000,
      },
      grabCursor: true,
      loop: true,
      touchEventsTarget: "container",
      breakpoints: {
        375: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 1,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 4,
          slidesPerGroup: 1,
          spaceBetween: 16,
        },
        1536: {
          slidesPerView: 5,
          slidesPerGroup: 1,
          spaceBetween: 24,
        },
        1920: {
          slidesPerView: 6,
          slidesPerGroup: 1,
          spaceBetween: 24,
        },
      },
    });
  },
};
</script>
<style>
.swiper-wrapper {
  transition-timing-function: linear;
}

.swiper {
  overflow: visible;
}
</style>
