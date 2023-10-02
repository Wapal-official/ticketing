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
        <div class="tw-rounded-[0.9375rem]">
          <video class="tw-rounded-[0.9375rem]" controls>
            <source :src="video.source" />
          </video>
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
