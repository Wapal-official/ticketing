<template>
  <section class="swiper mySwiper tw-w-full" ref="swiper" v-if="!loading">
    <div class="swiper-wrapper tw-w-full lg:!tw-px-[3.75em]">
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
      class="tw-w-4/5 tw-mx-auto tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4 tw-pb-6 lg:tw-pt-6 lg:tw-pb-12 1xl:!tw-max-w-[1320px]"
    >
      <button
        class="tw-w-12 tw-h-12 tw-border tw-border-solid tw-border-dark-3 tw-rounded-full tw-transition-all tw-duration-150 tw-ease-linear tw-flex tw-flex-col tw-items-center tw-justify-center tw-group hover:tw-bg-dark-0"
        @click="previous"
      >
        <i
          class="bx bx-chevron-left !tw-text-dark-0 !tw-text-3xl tw-group group-hover:!tw-text-dark-2"
        ></i>
      </button>
      <button
        class="tw-w-12 tw-h-12 tw-border tw-border-solid tw-border-dark-3 tw-rounded-full tw-transition-all tw-duration-150 tw-ease-linear tw-flex tw-flex-col tw-items-center tw-justify-center tw-group hover:tw-bg-dark-0"
        @click="next"
      >
        <i
          class="bx bx-chevron-right !tw-text-dark-0 !tw-text-3xl tw-group group-hover:!tw-text-dark-2"
        ></i>
      </button>
    </div>
  </section>
  <loading-collection v-else />
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
    // this.featuredCollection = res.data.collection;
    // this.featuredCollections.push(this.featuredCollection);

    const liveRes = await getCollectionByUsername("degen-star-wars");

    const upcomingCollectionRes = await getCollectionByUsername("ring-runner");

    const whitelistRes = await getCollectionByUsername("celestials");

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
      centeredSlides: true,
      rewind: true,
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
