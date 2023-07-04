<template>
  <section
    class="swiper mySwiper tw-w-full lg:tw-mt-[18px]"
    ref="swiper"
    v-if="!loading"
  >
    <div class="swiper-wrapper tw-w-full">
      <div
        class="swiper-slide tw-w-full"
        v-for="collection in featuredCollections"
        :key="collection._id"
      >
        <featured :propCollection="collection" />
      </div>
      <div
        class="swiper-slide tw-w-full"
        v-for="auction in featuredAuctions"
        :key="auction._id"
      >
        <auction-featured :auction="auction" />
      </div>
    </div>

    <div
      class="tw-w-4/5 tw-mx-auto tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4 tw-pb-4 lg:tw-pb-24 2xl:!tw-max-w-[1152px]"
    >
      <button
        class="tw-w-12 tw-h-12 tw-border tw-border-solid tw-border-dark-3 tw-rounded-full tw-transition-all tw-duration-150 tw-ease-linear tw-flex tw-flex-col tw-items-center tw-justify-center tw-group hover:tw-bg-dark-0"
        @click="previous"
      >
        <v-icon
          class="!tw-text-dark-0 !tw-text-3xl tw-group group-hover:!tw-text-dark-2"
          >mdi-chevron-left</v-icon
        >
      </button>
      <button
        class="tw-w-12 tw-h-12 tw-border tw-border-solid tw-border-dark-3 tw-rounded-full tw-transition-all tw-duration-150 tw-ease-linear tw-flex tw-flex-col tw-items-center tw-justify-center tw-group hover:tw-bg-dark-0"
        @click="next"
      >
        <v-icon
          class="!tw-text-dark-0 !tw-text-3xl tw-group group-hover:!tw-text-dark-2"
          >mdi-chevron-right</v-icon
        >
      </button>
    </div>
  </section>
  <div
    class="tw-w-full tw-container tw-px-8 tw-py-16 tw-mx-auto md:!tw-w-4/5 lg:tw-pt-16 lg:tw-pb-24"
    v-else
  >
    <div
      class="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2 lg:tw-gap-16 lg:tw-items-center lg:tw-justify-center"
    >
      <div
        class="tw-bg-wapal-gray tw-w-full tw-h-[300px] tw-rounded-xl tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse md:tw-w-[550px] md:tw-h-[550px]"
      ></div>
      <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6">
        <div
          class="tw-py-2 tw-bg-wapal-gray tw-w-[60%] tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
        <div
          class="tw-py-2 tw-bg-wapal-gray tw-w-[60%] tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
        <div
          class="tw-py-6 tw-bg-wapal-gray tw-w-[75%] tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
        <div
          class="tw-py-16 tw-bg-wapal-gray tw-w-full tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
        <div
          class="tw-py-4 tw-bg-wapal-gray tw-w-full tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
        <div
          class="tw-py-4 tw-bg-wapal-gray tw-w-full tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";
import {
  getFeaturedCollection,
  getCollectionByUsername,
} from "@/services/CollectionService";
import { getAuctionByName } from "@/services/AuctionService";
export default {
  data() {
    return {
      loading: true,
      featuredCollections: [],
      featuredCollection: null,
      swiper: null,
      featuredAuctions: [],
    };
  },
  async mounted() {
    const res = await getFeaturedCollection();
    this.featuredCollection = res.data.collection;

    const liveRes = await getCollectionByUsername("degen-star-wars");

    const upcomingCollectionRes = await getCollectionByUsername("ring-runner");

    const whitelistRes = await getCollectionByUsername("celestials");

    this.featuredCollections.push(this.featuredCollection);
    this.featuredCollections.push(liveRes.data.collection[0]);
    this.featuredCollections.push(upcomingCollectionRes.data.collection[0]);
    this.featuredCollections.push(whitelistRes.data.collection[0]);

    const upcomingAuctionRes = await getAuctionByName("awakened-panda-465");
    const liveAuctionRes = await getAuctionByName("doggy-style-9");

    this.featuredAuctions.push(liveAuctionRes.data.auction);
    this.featuredAuctions.push(upcomingAuctionRes.data.auction);

    this.loading = false;

    await this.$nextTick();
    this.swiper = new Swiper(this.$refs.swiper, {
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
    });
  },
  methods: {
    next() {
      this.swiper.slideNext();
    },
    previous() {
      this.swiper.slidePrev();
    },
  },
};
</script>
