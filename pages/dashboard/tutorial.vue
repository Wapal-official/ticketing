<template>
  <div class="tw-w-full">
    <div
      class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-8 tw-pb-6 md:tw-grid-cols-2 2xl:tw-px-8"
    >
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
        v-for="(video, index) in videos"
        :key="index"
      >
        <div class="tw-rounded-[0.9375rem] video-container">
          <video
            class="tw-rounded-[0.9375rem]"
            controls
            controlslist="fullscreen"
            playsinline
            webkit-playsinline
          >
            <source :src="video.source" type="video/mp4" />
          </video>
        </div>
        <h3 class="tw-text-lg tw-font-bold tw-text-white">{{ video.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import vault from "@/assets/video/vault.mp4";
import launchpad from "@/assets/video/Launchpad.mp4";
import whitelist from "@/assets/video/whitelist.mp4";
import auction from "@/assets/video/auction.mp4";

export default {
  layout: "dashboard",
  data() {
    return {
      videos: [
        { title: "Create A Collection", source: launchpad },
        { title: "Upload Whitelist Addresses", source: whitelist },
      ],
    };
  },
};
</script>
