<template>
  <NuxtLink :to="getRedirectLink">
    <div
      class="!tw-w-full !tw-h-[338px] !tw-max-h-[338px] tw-cursor-pointer tw-group/landing-card md:!tw-w-[312px] md:!tw-h-[312px]"
    >
      <div
        class="tw-relative tw-w-full tw-h-full tw-rounded-lg md:!tw-w-[312px] md:!tw-h-[312px]"
      >
        <!-- <div
          class="video-player-absolute"
          v-if="
            isVideo(
              isCollection ? collection?.image : collection?.nft.meta.image
            )
          "
          @click.prevent.stop="playVideo()"
        ></div>
        <div
          class="video-player-sound-absolute"
          v-if="
            isVideo(
              isCollection ? collection?.image : collection?.nft.meta.image
            )
          "
          @click.prevent.stop="playSound()"
        ></div> -->
        <div
          class="tw-w-full tw-h-full tw-rounded-lg tw-overflow-hidden tw-relative md:!tw-w-[312px] md:!tw-h-[312px]"
          style="position: relative"
        >
          <div
            class="tw-w-full tw-h-full tw-object-cover tw-rounded-lg tw-absolute tw-top-0 tw-transition-all tw-ease-linear tw-duration-300 tw-transform group-hover/landing-card:tw-scale-110"
            v-if="video"
          >
            <video-player-featured :source="video" />
          </div>
          <!-- <video-player-listed
            class="video-featured-2"
            v-else-if="
              isVideo(
                isCollection ? collection?.image : collection?.nft.meta.image
              )
            "
            :playIcon="true"
            :videoControl="false"
            :source="
              isCollection ? collection?.image : collection?.nft.meta.image
            "
          /> -->
          <utility-image
            v-else
            :source="
              isCollection ? collection?.image : collection?.nft.meta.image
            "
            :alt="isCollection ? collection?.name : collection?.nft.meta.name"
            :onerror="imageNotFound()"
            class="tw-w-full tw-h-full tw-object-cover tw-rounded-lg tw-absolute tw-top-0 tw-transition-all tw-ease-linear tw-duration-300 tw-transform group-hover/landing-card:tw-scale-110"
          />
          <div
            v-if="isAudio(collection?.media2)"
            @click.prevent.stop="checkit()"
            class="forAudio"
          >
            <audio-player-list
              v-if="isAudio(collection?.media2)"
              class="audio-list-bg"
              :audioSrc="collection?.media2"
              @click.prevent.stop="checkit()"
              iconSize="44"
            ></audio-player-list>
          </div>
        </div>
        <div
          class="tw-absolute tw-w-full tw-h-1/2 tw-bottom-[-1px] gradient tw-rounded-lg"
        ></div>
        <div
          class="tw-absolute tw-top-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-items-start tw-justify-between tw-px-4"
        >
          <div
            class="tw-rounded-full tw-bg-black/20 tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2.5 tw-px-3.5 tw-py-1.5 tw-mt-4 tw-backdrop-blur-[2px]"
          >
            <div
              class="tw-rounded-full tw-w-2.5 tw-h-2.5"
              :class="{
                'tw-bg-utility-green': getLiveStatus === 1,
                'tw-bg-utility-yellow': getLiveStatus === 0,
                'tw-bg-utility-red': getLiveStatus === -1,
              }"
            ></div>
            <div class="tw-font-medium !tw-text-white">
              {{
                getLiveStatus === -1
                  ? collection?.status.sold_out
                    ? "Soldout"
                    : "Ended"
                  : getLiveStatus === 0
                  ? "Upcoming"
                  : "Live"
              }}
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-pb-4"
          >
            <h3
              class="tw-font-semibold tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
            >
              <span class="!tw-text-white">
                {{
                  isCollection ? collection?.name : collection?.nft.meta.name
                }}</span
              >
              <i
                class="bx bxs-badge-check tw-text-primary-1"
                v-if="collection?.isVerified"
              ></i>
            </h3>
            <div v-if="getPrice">
              <div
                class="tw-text-white/70 tw-text-[0.875rem]"
                v-if="getPrice != '0APT'"
              >
                {{
                  isCollection
                    ? "Price"
                    : getLiveStatus
                    ? "Current Bid"
                    : "Min Bid"
                }}
                {{ getPrice }}
              </div>
              <div class="!tw-text-white/70 tw-text-[0.875rem]" v-else>
                Free Mint
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import imageNotFound from "@/utils/imageNotFound";
import santa from "@/assets/video/wapal-santa.MP4";
export default {
  props: {
    collection: { type: Object },
    type: { type: String, default: "collection" },
  },
  data() {
    return {
      resource: { minted: 0, total_supply: 0, paused: false },
      video: "",
      imageNotFound,
    };
  },
  computed: {
    getVideoPlay() {
      return this.$store.state.general.isVideoPlay;
    },
    isCollection() {
      return this.type === "collection";
    },
    getLiveStatus() {
      if (this.resource.paused || this.collection.status.sold_out) {
        return -1;
      }

      if (this.type === "auction") {
        if (new Date(this.collection.startAt) > new Date()) {
          return 0;
        }

        return 1;
      }
      if (!this.collection.candyMachine) {
        if (
          !this.collection.public_sale_time &&
          !this.collection.whitelist_sale_time
        ) {
          return 1;
        }
        return 0;
      }

      const whiteListDate = this.collection.candyMachine.whitelist_sale_time
        ? new Date(this.collection.candyMachine.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine.public_sale_time
      );

      const date = new Date();

      if (this.collection.edition) {
        if (date > publicSaleDate) {
          return 1;
        }

        return 0;
      }

      if (!whiteListDate) {
        if (date > publicSaleDate) {
          return 1;
        }
      } else {
        if (date > whiteListDate || date > publicSaleDate) {
          return 1;
        }
      }

      return 0;
    },
    getCoinType() {
      if (this.type === "auction") {
        return this.collection.coin_type ? this.collection.coin_type : "APT";
      }

      return this.collection.seed && this.collection.seed.coin_type
        ? this.collection.seed.coin_type
        : "APT";
    },
    getPrice() {
      if (this.type === "auction") {
        if (this.collection.biddings.length > 0) {
          return (
            this.collection.biddings[this.collection.biddings.length - 1].bid +
            this.getCoinType
          );
        }

        return this.collection.min_bid + this.getCoinType;
      }

      if (
        (this.collection.candyMachine.whitelist_price === undefined ||
          this.collection.candyMachine.whitelist_price === null) &&
        (this.collection.candyMachine.public_sale_price === undefined ||
          this.collection.candyMachine.public_sale_price === null)
      ) {
        return "";
      }

      if (!this.collection.candyMachine) {
        if (this.collection.whitelist_price) {
          return this.collection.whitelist_price + this.getCoinType;
        }
        if (this.collection.public_sale_price) {
          return this.collection.public_sale_price + this.getCoinType;
        }

        return "TBD";
      }

      const whiteListDate = this.collection.candyMachine.whitelist_sale_time
        ? new Date(this.collection.candyMachine.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine.public_sale_time
      );
      const now = new Date();
      if (
        this.collection.candyMachine.public_sale_price ==
        this.collection.candyMachine.whitelist_price
      ) {
        return (
          this.collection.candyMachine.public_sale_price + this.getCoinType
        );
      }

      if (now > publicSaleDate) {
        return (
          this.collection.candyMachine.public_sale_price + this.getCoinType
        );
      }

      if (whiteListDate && publicSaleDate > now) {
        return this.collection.candyMachine.whitelist_price + this.getCoinType;
      } else {
        return (
          this.collection.candyMachine.public_sale_price + this.getCoinType
        );
      }
    },
    getRedirectLink() {
      if (this.type === "auction") {
        return `/auctions/${this.collection.auction_name}`;
      }

      if (this.collection.isEdition) {
        return `/editions/${this.collection.username}`;
      }
      return `/nft/${this.collection.username}`;
    },
  },
  async mounted() {
    try {
      if (this.collection.username === "wapal-santa") {
        this.video = santa;
      }

      if (this.type === "collection") {
        this.resource = await this.$store.dispatch(
          "walletStore/getSupplyAndMintedOfCollection",
          {
            resourceAccountAddress:
              this.collection.candyMachine.resource_account,
            candyMachineId: this.collection.candyMachine.candy_id,
          }
        );
      }

      if (this.collection.username === "wapal-santa") {
        this.video = santa;
      }
    } catch (error) {
      this.resource = { paused: false, total_supply: 0, minted: 0 };
    }
  },
  methods: {
    checkit() {
      console.log("");
    },
    isAudio(source: string) {
      if (!source) {
        return false;
      }
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp3",
            "wav",
            "ogg",
            "aac",
            "flac",
            "wma",
            "alac",
            "aiff",
            "opus",
          ].includes(extension)
        : false;
    },
    isVideo(source: string) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp4",
            "mkv",
            "m4v",
            "webm",
            "avi",
            "mov",
            "wmv",
            "flv",
            "3gp",
            "ogv",
            "mpeg",
            "mpg",
            "divx",
            "rm",
            "asf",
            "vob",
            "ts",
            "m2ts",
          ].includes(extension)
        : false;
    },
  },
};
</script>
<style>
.gradient {
  background: linear-gradient(180deg, rgba(16, 17, 19, 0) 0%, #000000 100%);
}
.audio-list-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 55%;
  bottom: 0;
  margin: auto;
  z-index: 5;
}
.forAudio {
  height: 70%;
  position: absolute;
  top: 0;
  z-index: 4;
  width: 100%;
}
</style>
