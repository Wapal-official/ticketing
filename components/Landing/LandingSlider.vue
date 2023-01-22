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
            class="object-fill w-full h-[250px] md:w-[250px] md:h-[250px]"
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
import fox from "@/assets/img/fox.png";
import firstImage from "@/assets/img/800.png";
import secondImage from "@/assets/img/921.png";
import thirdImage from "@/assets/img/6896.png";
export default {
  data() {
    return {
      sliderImages: [],
      fox,
      firstImage,
      secondImage,
      thirdImage,
    };
  },
  async mounted() {
    this.sliderImages.push(fox);
    this.sliderImages.push(firstImage);
    this.sliderImages.push(secondImage);
    this.sliderImages.push(thirdImage);
    this.sliderImages.push(fox);
    this.sliderImages.push(firstImage);
    this.sliderImages.push(secondImage);
    this.sliderImages.push(thirdImage);
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
