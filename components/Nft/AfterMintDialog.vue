<template>
  <dialog
    class="tw-fixed tw-top-0 tw-w-screen tw-h-screen tw-bg-black/70 tw-z-[999] tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4 md:tw-px-0"
    open
    @click.self="closeModal"
  >
    <div
      class="tw-max-h-[95dvh] tw-w-full tw-rounded-lg tw-bg-dark-9 tw-px-3 tw-py-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      :class="[tweetContainerWidthClass]"
    >
      <h3
        class="tw-px-3 tw-w-full tw-text-center tw-font-bold tw-text-white tw-tracking-[-3%]"
      >
        You Minted
      </h3>
      <div
        class="loonies-preview-scrollbar tw-w-full tw-overflow-y-auto tw-grid tw-items-center tw-justify-items-center tw-gap-3 tw-px-3 tw-rounded-lg"
        :class="[gridClass, imageContainerClass]"
        v-if="!loading"
      >
        <div
          v-for="(token, index) in tokens"
          :key="index"
          class="tw-border tw-border-dark-4 tw-rounded-md"
        >
          <img
            :src="token.image"
            :alt="token.name"
            :class="[
              imageSizeClass,
              {
                'md:tw-col-span-2':
                  tokens.length % 2 !== 0 && index === tokens.length - 1,
              },
            ]"
            class="tw-rounded-t-md"
          />
          <span
            class="tw-block tw-font-bold tw-text-white tw-text-center tw-py-2"
            >{{ token.processedName }}</span
          >
        </div>
      </div>
      <div
        class="tw-px-3 tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center"
        :class="[imageContainerClass]"
        v-else
      >
        <v-progress-circular
          color="white"
          :indeterminate="true"
        ></v-progress-circular>
      </div>
      <div
        class="tw-px-3 tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-4"
      >
        <button
          v-if="collectionTweet !== ''"
          class="tw-w-full !tw-max-w-[98px] tw-h-10 tw-bg-primary-1 tw-rounded tw-text-white tw-bg-primary tw-py-2.5 tw-px-6 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-0.5 tw-font-medium disabled:tw-cursor-not-allowed"
          :disabled="loading"
          @click="tweet"
        >
          <img :src="xLogo" alt="X" width="16px" height="16px" />
          <span>Tweet</span>
        </button>
        <button
          class="tw-w-full !tw-max-w-[98px] tw-h-10 tw-bg-primary-1 tw-rounded tw-text-white tw-bg-primary tw-py-2.5 tw-px-6 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-0.5 tw-font-medium disabled:tw-cursor-not-allowed"
          :disabled="loading"
          @click="tweet"
        >
          <img :src="xLogo" alt="X" width="16px" height="16px" />
          <span>Tweet</span>
        </button>
        <button
          class="tw-w-full tw-h-10 tw-rounded tw-bg-primary-1 tw-text-white tw-py-2.5 tw-px-4 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-0.5 tw-font-medium tw-border tw-border-solid tw-border-loonies-primary disabled:tw-cursor-not-allowed"
          :disabled="loading || downloading"
          :class="[downloading ? '!tw-max-w-[144px]' : '!tw-max-w-[120px]']"
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
    collectionType: { type: String },
    collectionUserName: { type: String },
    collectionTweet: { type: String },
  },
  data() {
    return {
      loading: true,
      tweetContainerWidthClass: "md:tw-w-[800px]",
      imageSizeClass: "tw-w-full tw-h-[220px] md:tw-w-[220px]",
      gridClass: "tw-grid-cols-1",
      imageContainerClass: "tw-h-[315px] md:tw-h-[315px]",
      downloading: false,
      xLogo,
      tokens: [],
    };
  },
  mounted() {
    this.setGridStyle();
    console.log("token collectionType", this.collectionType);
    console.log("token collectionUserName", this.collectionUserName);

    console.log("token collectionTweet", this.collectionTweet);

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

      const tokens = await getTokenDetailsFromTokenDataIds({
        tokenDataIds: this.tokenDataIds,
      });

      this.tokens = tokens.map((token) => {
        const nameParts = token.name.split("#");
        const processedName =
          nameParts.length > 1 ? `#${nameParts[1]}` : token.name;
        return {
          ...token,
          processedName,
        };
      });

      console.log("Tokens", this.tokens);
      this.loading = false;
    },
    setGridStyle() {
      if (this.tokenDataIds.length <= 1) {
        this.tweetContainerWidthClass = "md:tw-w-[380px]";
        this.imageSizeClass = "tw-w-full tw-h-[315px] md:tw-w-[315px]";
        this.gridClass = "!tw-h-[100%] tw-max-h-[366px] tw-grid-cols-1";
      } else if (this.tokenDataIds.length <= 2) {
        this.tweetContainerWidthClass = "md:tw-w-[500px]";
        this.imageSizeClass =
          "tw-w-full tw-h-[315px] md:tw-h-[220px] md:tw-w-[220px]";
        this.gridClass =
          "!tw-h-[100%] tw-max-h-[366px] tw-grid-cols-1 md:tw-grid-cols-2";

        if (this.tokenDataIds.length > 2) {
          this.imageContainerClass = "tw-h-[456px]";
        } else if (this.tokenDataIds.length > 3) {
          this.imageContainerClass = "tw-h-[356px]";
        } else {
          this.imageContainerClass = "tw-h-[315px] md:tw-h-[220px]";
        }
      } else if (this.tokenDataIds.length <= 3) {
        this.tweetContainerWidthClass = "md:tw-w-[750px] md:tw-h-[400px]";
        this.imageSizeClass =
          "tw-w-full tw-h-[315px] md:tw-h-[220px] md:tw-w-[220px]";
        this.gridClass = "tw-grid-cols-1 md:tw-grid-cols-3";

        if (this.tokenDataIds.length > 2) {
          this.imageContainerClass = "tw-h-[456px]";
        } else if (this.tokenDataIds.length > 3) {
          this.imageContainerClass = "tw-h-[256px]";
        } else {
          this.imageContainerClass = "tw-h-[315px] md:tw-h-[220px]";
        }
      } else {
        this.tweetContainerWidthClass = "md:tw-w-[750px]  ";
        this.imageSizeClass =
          "tw-w-full tw-h-[315px] md:tw-h-[220px] md:tw-w-[220px]";
        this.gridClass =
          "tw-h-[100%] tw-max-h-[550px] tw-grid-cols-1 md:tw-grid-cols-3";

        if (this.tokenDataIds.length > 2) {
          this.imageContainerClass = "tw-h-[456px]";
        } else if (this.tokenDataIds.length > 3) {
          this.imageContainerClass = "tw-h-[256px]";
        } else {
          this.imageContainerClass = "tw-h-[315px] md:tw-h-[220px]";
        }
      }
    },
    tweet() {
      // const baseURL = process.env.baseURL?.includes("staging")
      //   ? "https://staging.wapal.io"
      //   : "https://launchpad.wapal.io";

      // const twitterURL = "https://twitter.com";

      // const link = `${baseURL}/${
      //   this.collection.isEdition ? "editions" : "nft"
      // }/${this.collection.username}`;

      // const text = encodeURIComponent(this.collection.tweet);

      // const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}`;

      // window.open(twitterShareLink, "_blank");
      // const checkUrl = process.env.baseURL?.includes("staging")
      //   ? "https://staging.wapal.io"
      //   : "https://launchpad.wapal.io";
      // const checkCollection = this.collectionType;
      // const tokenDataId = this.tokens[0].tokenDataId;
      // const title = encodeURI(this.tokens[0].name.replaceAll("#", "-"));
      // const description = encodeURI(this.tokens[0].description);
      // const image = this.tokens[0].image;
      // const baseURL = `${checkUrl}/${checkCollection}/${tokenDataId}?title=${title}&description=${description}&image=${image}`;

      // const twitterURL = "https://twitter.com";

      // const tweetText = encodeURIComponent(
      //   `I just minted a ${title}${description} , on Aptos.` +
      //     "\n" +
      //     "\n" +
      //     "#wapal #aptos" +
      //     "\n" +
      //     baseURL
      // );

      // const twitterShareLink = `${twitterURL}/intent/tweet?text=${tweetText}`;

      // window.open(twitterShareLink, "_blank");
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      const twitterURL = "https://twitter.com";
      const checkCollection = this.collectionType;
      const username = this.collectionUserName;
      const link = `${baseURL}/${checkCollection}/${username}`;
      const tweet = this.collectionTweet;
      const text = encodeURIComponent(tweet);

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
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
  @apply tw-bg-dark-9 tw-rounded-full;
}

/* Handle */
.loonies-preview-scrollbar::-webkit-scrollbar-thumb {
  @apply tw-bg-dark-6 tw-rounded-full;
}
</style>
