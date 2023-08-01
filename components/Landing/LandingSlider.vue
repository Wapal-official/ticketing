<template>
  <section class="tw-py-16 tw-select-none tw-cursor-grab">
    <div class="swiper mySwiper" ref="swiper">
      <div class="swiper-wrapper">
        <slider-card
          v-for="(collection, index) in sliderCollections"
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
      sliderCollections: [],
    };
  },
  async mounted() {
    await this.$nextTick();
    new Swiper(this.$refs.swiper, {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
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
          slidesPerView: 5,
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
  watch: {
    async collections(mountedCollections) {
      if (mountedCollections.length > 0) {
        this.sliderCollections = mountedCollections;
      }
    },
    sliderCollections(newSliderCollection) {
      if (newSliderCollection.length < 12) {
        newSliderCollection.map((collection) => {
          this.sliderCollections.push(collection);
        });
      }
    },
  },
};
</script>
<style>
.swiper-wrapper {
  transition-timing-function: linear;
}
</style>
