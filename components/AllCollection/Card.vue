<template>
  <NuxtLink
    :to="getRedirectLink"
    class="!tw-text-white tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
  >
    <div class="tw-text-sm tw-font-semibold">{{ collectionNumber }}.</div>
    <div style="position: relative">
      <div
        class="tw-w-[96px] tw-h-[96px] tw-object-cover tw-rounded"
        v-if="video"
      >
        <video-player-featured :source="video" />
      </div>
      <utility-image
        v-else
        :source="collection?.image"
        :onerror="imageNotFound()"
        :alt="collection?.name"
        class="tw-w-[96px] tw-h-[96px] tw-object-cover tw-rounded"
      />
      <div
        v-if="isAudio(collection?.media2)"
        @click.prevent.stop="checkit()"
        class="forAudio-2"
      >
        <audio-player-list
          v-if="isAudio(collection?.media2)"
          class="audio-list-bg-2"
          :audioSrc="collection?.media2"
          iconSize="34"
          @click.prevent.stop="checkit()"
        ></audio-player-list>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1">
      <div class="tw-font-medium">{{ collection?.name }}</div>
      <div
        class="tw-text-dark-2 tw-text-sm tw-font-medium"
        v-if="collection?.isEdition"
      >
        {{ minted }}
        Minted
      </div>
      <div class="tw-text-dark-2 tw-text-sm tw-font-medium" v-else>
        {{ minted }}/{{ totalSupply }}
        Minted
      </div>
      <div
        class="tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2.5"
      >
        <div
          class="tw-rounded-full tw-w-2.5 tw-h-2.5"
          :class="{
            'tw-bg-utility-green': getLiveStatus,
            'tw-bg-utility-yellow': !getLiveStatus,
            '!tw-bg-utility-red': soldOut || paused,
          }"
        ></div>
        <div
          class="tw-font-medium tw-text-[0.875rem]"
          v-if="!soldOut && !paused"
        >
          {{ getLiveStatus ? "Live" : "Upcoming" }}
        </div>
        <div class="tw-font-medium tw-text-[0.875rem]" v-else>
          {{ soldOut ? "Soldout" : "Ended" }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
import { getCollection } from "@/services/CollectionService";
import imageNotFound from "@/utils/imageNotFound";
import santa from "@/assets/video/wapal-santa.MP4";
import { checkIfCollectionIsSoldOut } from "@/utils/soldoutCollections";
export default {
  props: {
    collection: { type: Object },
    collectionNumber: { type: Number },
  },
  data() {
    return {
      totalSupply: 0,
      minted: 0,
      soldOut: false,
      video: "",
      paused: false,
      imageNotFound,
    };
  },
  async mounted() {
    try {
      if (this.collection.username === "wapal-santa") {
        this.video = santa;
      }

      const collection = await getCollection(this.collection._id);

      if (
        new Date(this.collection.candyMachine.whitelist_sale_time).getTime() >
        Date.now()
      ) {
        this.totalSupply = this.collection.supply;
        this.minted = 0;
        return;
      }

      const res = await this.$store.dispatch(
        "walletStore/getSupplyAndMintedOfCollection",
        {
          resourceAccountAddress: collection.candyMachine.resource_account,
          candyMachineId: collection.candyMachine.candy_id,
        }
      );

      this.totalSupply = res.total_supply;
      this.minted = res.minted;
      this.paused = res.paused;

      if (this.collection._id === "642bf277c10560ca41e179fa") {
        this.totalSupply = 239;
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        this.totalSupply = 222;
      } else if (this.collection._id === "64686db77db14461740bab0f") {
        this.totalSupply = 355;
      } else if (this.collection._id === "64625d957c7212d927559962") {
        this.totalSupply = 2333;
      } else if (this.collection._id === "6466a09b6fee90eea757521c") {
        this.totalSupply = 343;
      } else if (this.collection._id === "654e26260a58324d3465b4cb") {
        this.totalSupply = 955;
      }

      const soldOutCollectionSupply = checkIfCollectionIsSoldOut(
        this.collection
      );

      if (soldOutCollectionSupply) {
        this.totalSupply = soldOutCollectionSupply.supply;
      }

      if (this.totalSupply == this.minted) {
        this.soldOut = true;
      }
    } catch {
      if (this.collection.mintDetails) {
        if (
          new Date(this.collection.candyMachine.whitelist_sale_time).getTime() >
          Date.now()
        ) {
          this.totalSupply = this.collection.supply;
          this.minted = 0;
          return;
        }

        if (
          this.collection.edition &&
          this.collection.edition === "open-edition" &&
          new Date(this.collection.candyMachine.public_sale_time).getTime() >
            Date.now()
        ) {
          this.totalSupply = this.collection.supply;
          this.minted = 0;
          return;
        }
        const res = await this.$store.dispatch(
          "walletStore/getSupplyAndMintedOfExternalCollection",
          {
            collectionId: this.collection.candyMachine.resource_account,
          }
        );

        this.totalSupply = res.total_supply;
        this.minted = res.minted;

        if (this.collection._id === "654c9afff8961c791c804cf1") {
          this.totalSupply = 1350;
        }

        if (this.totalSupply == this.minted) {
          this.soldOut = true;
        }
      } else {
        this.totalSupply = 0;
        this.minted = 0;
      }
    }
  },
  computed: {
    getLiveStatus() {
      if (!this.collection.candyMachine) {
        return false;
      }

      const whiteListDate = this.collection.candyMachine.whitelist_sale_time
        ? new Date(this.collection.candyMachine.whitelist_sale_time)
        : null;
      const publicSaleDate = new Date(
        this.collection.candyMachine.public_sale_time
      );

      const date = new Date();

      if (!whiteListDate) {
        if (date > publicSaleDate) {
          return true;
        }
      } else {
        if (date > whiteListDate || date > publicSaleDate) {
          return true;
        }
      }
    },
    getRedirectLink() {
      if (this.collection.redirectTo === "landingDraft") {
        return `/nft/draft/${this.collection?._id}`;
      }

      return `/nft/${this.collection?.username}`;
    },
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
    isImage(source: string) {
      if (!source) {
        return false;
      }
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp",
            "svg",
            "ico",
            "tiff",
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
<style lang="css" scoped>
.forAudio-2 {
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 4;
  width: 100%;
}
.audio-list-bg-2 {
  position: absolute;
  left: 0;
  right: 0;
  top: 0%;
  bottom: 0;
  margin: auto;
  z-index: 5;
  transform: translate(0%, 30%);
}
</style>
