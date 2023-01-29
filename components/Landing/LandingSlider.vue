<template>
  <section class="px-4 py-16">
    <div class="swiper mySwiper" ref="swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(image, index) in sliderImages"
          :key="index"
        >
          <img
            :src="image"
            class="object-fill w-[300] h-[300px] mx-auto md:mx-0 md:w-[250px] md:h-[250px]"
            alt="Image"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";
import sliderImage1 from "@/assets/img/slider1.png";
import sliderImage2 from "@/assets/img/slider2.png";
import sliderImage3 from "@/assets/img/slider3.png";
import sliderImage4 from "@/assets/img/slider4.png";
import sliderImage5 from "@/assets/img/slider5.png";
import sliderImage6 from "@/assets/img/slider6.png";
import sliderImage7 from "@/assets/img/slider7.png";
export default {
  data() {
    return {
      sliderImages: [],
      sliderImage1,
      sliderImage2,
      sliderImage3,
      sliderImage4,
      sliderImage5,
      sliderImage6,
      sliderImage7,
    };
  },
  async mounted() {
    this.sliderImages.push(this.sliderImage1);
    this.sliderImages.push(this.sliderImage2);
    this.sliderImages.push(this.sliderImage3);
    this.sliderImages.push(this.sliderImage4);
    this.sliderImages.push(this.sliderImage5);
    this.sliderImages.push(this.sliderImage6);
    this.sliderImages.push(this.sliderImage7);
    await this.$nextTick();
    new Swiper(this.$refs.swiper, {
      spaceBetween: 16,
      autoplay: true,
      loop: true,
      breakpoints: {
        375: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 1,
        },
        1920: {
          slidesPerView: 7,
          slidesPerGroup: 1,
        },
      },
    });
  },
};
</script>
