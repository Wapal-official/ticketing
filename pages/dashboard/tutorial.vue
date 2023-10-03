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
          <!-- <video
            class="tw-rounded-[0.9375rem]"
            controls
            controlslist="fullscreen"
          >
            <source
              src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            />
          </video> -->
          <iframe
            class="tw-rounded-[0.9375rem] !tw-w-full"
            src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            id="video"
            frameborder="0"
            allowscriptaccess="always"
            allow="autoplay"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
        </div>
        <h3 class="tw-text-lg tw-font-bold tw-text-white">{{ video.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import sample from "@/assets/video/video.mp4";
export default {
  layout: "dashboard",
  data() {
    return {
      videos: [
        { title: "Creating Vault", source: sample },
        { title: "Creating a Collection", source: sample },
        { title: "Creating a WL Campaign", source: sample },
        { title: "Setting up an Auction", source: sample },
      ],
    };
  },
};
</script>
<style scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  overflow: hidden;
  width: 100%;
  height: auto;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
