<template>
  <section
    class="swiper mySwiper tw-w-full tw-container"
    ref="swiper"
    v-if="!loading"
  >
    <div class="swiper-wrapper tw-w-full xl:!tw-px-[3.75em]">
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
  <loading-featured-collection v-else />
</template>
<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";
import { getFeaturedCollection } from "@/services/CollectionService";
import { getFeaturedAuctions } from "@/services/AuctionService";
import sanctuary from "@/assets/img/199.png";
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
    // const res = await getFeaturedCollection();
    // this.featuredCollections.push(...res);

    // const auctionRes = await getFeaturedAuctions();

    // this.featuredAuctions.push(...auctionRes);

    const collection = {
      name: "Aptos Monkeys Sanctuary",
      description:
        "Sanctuaries are homes to the fighting Monkeys who stood their ground to protect their lands and fortunes.",
      image: sanctuary,
      twitter: "https://twitter.com/AptosMonkeys",
      website: "https://www.aptosmonkeys.club/",
      discord: "https://discord.com/invite/sFfe75BHQ3",
      mintDetails: {
        link: "https://monkeys.wapal.io",
      },
      candyMachine: {
        public_sale_time: "2023-10-31T06:23:35.216Z",
        resource_account:
          "0x39f1338e6b69c3ed2f0caa95876e898dbe4c9b272d721626d577554015d033b8",
        candy_id:
          "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0",
      },
      status: {
        sold_out: false,
      },
      username: "aptos-monkeys-sanctuary",
    };

    this.featuredCollections.push(collection);

    this.loading = false;

    await this.$nextTick();
    this.swiper = new Swiper(this.$refs.swiper, {
      grabCursor: true,
      centeredSlides: true,
      rewind: true,
      slidesPerView: 1,
      autoplay: {
        delay: 6000,
      },
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
