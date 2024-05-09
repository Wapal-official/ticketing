<template>
  <div
    class="tw-w-screen tw-h-screen tw-absolute tw-top-0 tw-left-0 tw-bg-black tw-bg-opacity-[85%] tw-z-[999] tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-1 md:tw-px-4 xl:tw-px-0"
  >
    <div
      class="tw-w-full tw-h-[400px] tw-relative md:tw-h-[618px] xl:tw-w-[1100px] xl:tw-h-[618px]"
    >
      <img
        class="tw-object-cover tw-w-full tw-h-full"
        :src="congratulationsImage"
        alt="Congratulations"
      />
      <div
        class="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-items-start tw-justify-between tw-p-2"
      >
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
        >
          <button @click="closeCongratulationsPopup">
            <i class="bx bx-x tw-text-dark-0 tw-text-2xl"></i>
          </button>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-pb-2 md:tw-pb-4"
        >
          <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3"
          >
            <div
              class="tw-text-white tw-text-center tw-text-sm tw-font-normal md:tw-text-base"
            >
              To include the ticket, save image to your device, then browse to
              upload on Twitter.
            </div>
            <div class="tw-flex tw-flex-row tw-items-center tw-gap-3">
              <button
                class="tw-h-10 tw-py-2.5 tw-px-4 tw-rounded-xl tw-bg-loonies-primary tw-text-white tw-text-xs tw-font-medium tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 md:tw-h-14 md:tw-gap-2.5 md:tw-text-2xl"
                @click="tweetTicket"
              >
                <img :src="xLogo" alt="X" width="20px" height="20px" />
                <span> Tweet your ticket</span>
              </button>
              <button
                class="tw-h-10 tw-py-2.5 tw-px-4 tw-rounded-xl tw-bg-loonies-primary tw-text-white tw-text-xs tw-font-medium tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 md:tw-h-14 md:tw-gap-2.5 md:tw-text-2xl"
                @click="downloadTicket"
              >
                <i class="bx bx-download tw-text-base md:tw-text-2xl"></i>
                <span> Download your ticket</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import congratulationsImage from "@/assets/img/loonies/congratulations.gif";
import xLogo from "@/assets/img/x-logo.svg";
export default {
  data() {
    return {
      congratulationsImage,
      xLogo,
    };
  },
  mounted() {
    this.disableBodyOverflow();
  },
  methods: {
    disableBodyOverflow() {
      const body = document.querySelector("html");
      body.style.overflow = "hidden";
      body.scrollTop = 0;
    },
    enableBodyOverflow() {
      const body = document.querySelector("html");
      body.style.overflow = "auto";
    },
    closeCongratulationsPopup() {
      this.enableBodyOverflow();
      this.$emit("closeCongratulationsPopup");
    },
    async downloadTicket() {
      const image = await fetch(
        "https://2blvwanle5y4lbc4kvwqtxejwkcew3br2hea5jfba326gizvf46q.arweave.net/0FdbAasnccWEXFVtCdyJsoRLbDHRyA6koQb14yM1Lz0/"
      );
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "loonies-whitelist-ticket";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    tweetTicket() {
      const baseURL = "https://launchpad.wapal.io/nft/loonies";

      const twitterURL = "https://twitter.com";

      const text = `Just got whitelisted for the hottest collection dropping on @Aptos on @wapal_official!\n \nGetting my APT ready for @theloonies_nft.\n`;

      const link = `${baseURL}/whitelist`;

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}&hashtags=Aptos,Loonies,DitchLimits`;

      const encodedShareLink = encodeURI(twitterShareLink);

      window.open(encodedShareLink, "_blank");
    },
  },
};
</script>
