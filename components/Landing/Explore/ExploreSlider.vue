<template>
  <div class="tw-w-full tw-relative tw-group" v-if="collections.length > 0">
    <div class="swiper mySwiper tw-w-full" ref="swiper">
      <div class="swiper-wrapper tw-w-full">
        <div
          class="swiper-slide"
          v-for="collection in sliderCollections"
          :key="collection._id"
        >
          <nft-landing-card :collection="collection" :type="type" />
        </div>
      </div>
    </div>
    <button
      class="tw-group tw-opacity-0 tw-absolute tw-z-10 tw-left-0.5 tw-top-[44%] tw-w-12 tw-h-12 tw-rounded-full tw-transition-all tw-duration-150 tw-ease-linear tw-flex tw-flex-col tw-items-center tw-justify-center tw-group tw-bg-white group-hover:tw-opacity-100 md:-tw-left-6"
      @click="previous"
    >
      <i class="bx bx-chevron-left !tw-text-black tw-text-2xl"></i>
    </button>
    <button
      class="tw-group tw-opacity-0 tw-absolute tw-z-10 tw-right-0.5 tw-top-[44%] tw-w-12 tw-h-12 tw-rounded-full tw-transition-all tw-duration-150 tw-ease-linear tw-flex tw-flex-col tw-items-center tw-justify-center tw-group tw-bg-white group-hover:tw-opacity-100 md:-tw-right-6"
      @click="next"
    >
      <i class="bx bx-chevron-right !tw-text-black tw-text-2xl"></i>
    </button>
  </div>
  <div class="tw-text-center tw-text-xl tw-text-primary-1" v-else>
    No Collections
  </div>
</template>
<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";
export default {
  props: {
    collections: { type: Array },
    type: { type: String, default: "collection" },
  },
  data() {
    return {
      swiper: null,
      sliderCollections: [],
    };
  },
  async mounted() {
    this.sliderCollections = this.collections;
    await this.$nextTick();
    this.swiper = new Swiper(this.$refs.swiper, {
      autoplay: {
        delay: 6000,
      },
      grabCursor: true,
      touchEventsTarget: "container",
      rewind: true,
      breakpoints: {
        375: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 74,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1336: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1536: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
        1920: {
          slidesPerView: 5,
          spaceBetween: 32,
        },
      },
      virtual: {
        slides: this.sliderCollections,
        renderExternal: (data) => {},
      },
    });
  },
  methods: {
    previous() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    },
  },
  watch: {
    collections(collections) {
      this.sliderCollections = this.collections;
    },
  },
};
</script>
