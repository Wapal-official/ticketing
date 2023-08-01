<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-28 lg:tw-pb-0 lg:tw-px-28 xl:!tw-w-[1320px] 1xl:!tw-max-w-[1320px]"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-center lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <img
        :src="auction?.nft.meta.image"
        :alt="auction?.nft.meta.name"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[400px] md:tw-h-[400px] md:tw-max-h-[400px] lg:tw-w-[400px] lg:tw-min-w-[400px] lg:tw-h-[400px] xl:tw-w-[400px] xl:tw-h-[400px] xl:tw-max-h-[400px] tw-object-cover tw-rounded-xl"
      />
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 lg:tw-mb-8 lg:tw-w-[624px] xl:tw-pr-[7em]"
      >
        <h2
          class="tw-text-lg tw-font-medium tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1.5 3xl:tw-text-xl"
        >
          <span>{{ auction?.nft.nft.current_token_data.collection_name }}</span>
          <i
            class="bx bxs-badge-check tw-text-primary-1"
            v-if="auction?.isVerified"
          ></i>
        </h2>
        <h1
          class="tw-text-4xl tw-font-bold 3xl:tw-text-5xl tw-tracking-[-0.025em]"
        >
          {{ auction?.nft.meta.name }}
        </h1>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <a
            :href="auction?.twitter"
            target="_blank"
            v-if="auction?.twitter"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-twitter tw-text-lg tw-transition tw-duration-200 tw-ease-linear tw-ml-0.5"
            ></i>
          </a>
          <a
            :href="auction?.instagram"
            target="_blank"
            v-if="auction?.instagram"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-instagram tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
            ></i>
          </a>
          <button
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6"
          >
            <i
              class="bx bxs-share-alt tw-text-lg tw-transition tw-duration-200 tw-ease-linear !tw-text-white"
            ></i>
          </button>
        </div>
        <div class="tw-text-dark-0 tw-pb-4 3xl:tw-text-lg">
          {{ auction?.nft.meta.description }}
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
        >
          <h3
            class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-sm 3xl:tw-text-lg"
          >
            Auction Starts In
          </h3>

          <div>
            <span class="tw-text-[1.75rem] tw-tracking-tight tw-font-medium"
              >23</span
            ><span class="tw-text-lg tw-text-dark-2 tw-font-bold">H</span>
            <span class="tw-text-[1.75rem] tw-tracking-tight tw-font-medium"
              >25</span
            ><span class="tw-text-lg tw-text-dark-2 tw-font-bold">M</span>
            <span class="tw-text-[1.75rem] tw-tracking-tight tw-font-medium"
              >25</span
            ><span class="tw-text-lg tw-text-dark-2 tw-font-bold">S</span>
          </div>
        </div>
        <!-- <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start"
      v-else
    >
      <h3
        class="tw-text-dark-0 tw-text-[1.375rem] tw-uppercase tw-font-medium tw-tracking-[-0.01375em]"
      >
        Current Bid
      </h3>
      <h4
        class="tw-text-white tw-uppercase tw-text-[1.75rem] tw-pt-4 tw-pb-6"
      >
        {{ getBid }} Apt
      </h4>
      <button-primary
        :title="!auctionEnded ? 'Place a Bid' : 'Auction Ended'"
        :fullWidth="true"
        @click="$router.push(`/auctions/${auction?.auction_name}`)"
      />
    </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import celestial from "@/assets/img/celestial.png";

export default {
  data() {
    return {
      auction: {
        nft: {
          meta: {
            name: "Celestia#6737",
            description:
              "Celestia #1642 - A Denizen of the Celestials world, embodying the essence of love, boundless creativity, and transformative evolution.",
            image: celestial,
          },
          nft: {
            current_token_data: {
              collection_name: "Celestials",
            },
          },
        },
        isVerified: true,
        twitter: "twitter.com",
        instagram: "instagram.com",
      },
    };
  },
};
</script>
