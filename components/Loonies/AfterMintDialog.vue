<template>
  <dialog
    class="tw-fixed tw-top-0 tw-w-screen tw-h-screen tw-bg-black/70 tw-z-[999] tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4 md:tw-px-0"
    open
    @click.self="closeModal"
  >
    <div
      class="tw-max-h-[95dvh] tw-w-full tw-rounded-xl tw-bg-loonies-bg-1 tw-px-3 tw-py-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      :class="[tweetContainerWidthClass]"
    >
      <h3
        class="tw-px-3 tw-w-full tw-text-center tw-font-oswald tw-font-bold tw-text-2xl tw-text-loonies-primary tw-tracking-[-3%]"
      >
        DITCHED LIMITS ⚡️
      </h3>
      <div
        class="loonies-preview-scrollbar tw-w-full tw-overflow-y-auto tw-grid tw-items-center tw-justify-items-center tw-gap-4 tw-px-3 tw-rounded-lg"
        :class="[gridClass, imageContainerClass]"
        v-if="!loading"
      >
        <img
          v-for="(token, index) in tokens"
          :key="index"
          :src="token.image"
          :alt="token.name"
          :class="[
            imageSizeClass,
            {
              'md:tw-col-span-2':
                tokens.length % 2 !== 0 && index === tokens.length - 1,
            },
          ]"
          class="tw-rounded-lg"
        />
      </div>
      <div
        class="tw-px-3 tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center"
        :class="[imageContainerClass]"
        v-else
      >
        <v-progress-circular :indeterminate="true"></v-progress-circular>
      </div>
      <div
        class="tw-px-3 tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
      >
        <button
          class="tw-w-full tw-h-10 tw-rounded tw-text-white tw-bg-loonies-primary tw-py-2.5 tw-px-4 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-0.5 tw-font-medium disabled:tw-cursor-not-allowed"
          :disabled="loading"
          @click="tweet"
        >
          <img :src="xLogo" alt="X" width="16px" height="16px" />
          <span>Tweet</span>
        </button>
        <button
          class="tw-w-full tw-h-10 tw-rounded tw-text-loonies-primary tw-bg-loonies-bg-1 tw-py-2.5 tw-px-4 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-0.5 tw-font-medium tw-border tw-border-solid tw-border-loonies-primary disabled:tw-cursor-not-allowed"
          :disabled="loading || downloading"
          @click="downloadImages"
        >
          <i class="bx bxs-download tw-text-2xl"></i>
          <span>{{ downloading ? "Downloading..." : "Download" }}</span>
        </button>
      </div>
    </div>
  </dialog>
</template>
<script>
import xLogo from "@/assets/img/x-logo.svg";
import { getTokenDetailsFromTokenDataIds } from "@/services/TokenDetailService";
export default {
  props: {
    tokenDataIds: { type: Array },
  },
  data() {
    return {
      loading: true,
      tweetContainerWidthClass: "md:tw-w-[500px]",
      imageSizeClass: "tw-w-full tw-h-[220px] md:tw-w-[220px]",
      gridClass: "tw-grid-cols-1",
      imageContainerClass: "tw-h-[315px] md:tw-h-[315px]",
      downloading: false,
      xLogo,
    };
  },
  mounted() {
    this.setGridStyle();

    let seconds = this.tokenDataIds.length * 1500;

    if (seconds > 5000) {
      seconds = 5000;
    }

    setTimeout(() => {
      this.getTokenDetailsFromTokenDataIds();
    }, seconds);
  },
  methods: {
    async getTokenDetailsFromTokenDataIds() {
      this.loading = true;

      this.tokens = await getTokenDetailsFromTokenDataIds({
        tokenDataIds: this.tokenDataIds,
      });

      this.loading = false;
    },
    setGridStyle() {
      if (this.tokenDataIds.length <= 1) {
        this.tweetContainerWidthClass = "md:tw-w-[380px]";
        this.imageSizeClass = "tw-w-full tw-h-[315px] md:tw-w-[315px]";
        this.gridClass = "tw-grid-cols-1";
      } else {
        this.tweetContainerWidthClass = "md:tw-w-[500px]";
        this.imageSizeClass =
          "tw-w-full tw-h-[315px] md:tw-h-[220px] md:tw-w-[220px]";
        this.gridClass = "tw-grid-cols-1 md:tw-grid-cols-2";

        if (this.tokenDataIds.length > 2) {
          this.imageContainerClass = "tw-h-[456px]";
        } else {
          this.imageContainerClass = "tw-h-[315px] md:tw-h-[220px]";
        }
      }
    },
    tweet() {
      const tokenDataId = this.tokens[0].tokenDataId;
      const title = encodeURI(this.tokens[0].name.replaceAll("#", "-"));
      const description = encodeURI(this.tokens[0].description);
      const image = this.tokens[0].image;
      const baseURL = `https://preview.theloonies.xyz/preview/${tokenDataId}?title=${title}&description=${description}&image=${image}`;

      const twitterURL = "https://twitter.com";

      const tweetText = encodeURIComponent(
        "I just minted a @theloonies_nft, one of the most hyped nft collection on Aptos." +
          "\n" +
          "\n" +
          "Lets ditch limits together." +
          "\n" +
          "\n" +
          "#theloonies #aptos" +
          "\n" +
          baseURL
      );

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${tweetText}`;

      window.open(twitterShareLink, "_blank");
    },
    async downloadImages() {
      const res = await Promise.all(
        this.tokens.map(async (token) => {
          this.downloading = true;
          const metadata = await this.$axios.get(token.token_uri);

          const image = await fetch(metadata.data.image);
          const imageBlog = await image.blob();
          const imageURL = URL.createObjectURL(imageBlog);

          const link = document.createElement("a");
          link.href = imageURL;
          link.download = token.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      );

      this.downloading = false;
    },
    closeModal() {
      if (!this.loading) {
        this.$emit("close");
      }
    },
  },
};
</script>
<style scoped>
/* width */
.loonies-preview-scrollbar::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.loonies-preview-scrollbar::-webkit-scrollbar-track {
  @apply tw-bg-loonies-bg-2 tw-rounded-full;
}

/* Handle */
.loonies-preview-scrollbar::-webkit-scrollbar-thumb {
  @apply tw-bg-loonies-primary tw-rounded-full;
}
</style>
