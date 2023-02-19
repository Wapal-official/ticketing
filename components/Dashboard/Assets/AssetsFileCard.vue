<template>
  <div
    class="tw-max-w-[250px] tw-max-h-[300px] tw-group tw-cursor-pointer"
    @click="displayFileDetails"
    v-if="checkFileType === 'image'"
  >
    <div class="tw-relative tw-max-h-[250px] tw-overflow-hidden">
      <img
        :src="pirate"
        :alt="name"
        class="tw-w-[250px] tw-h-[250px] tw-object-cover"
      />
      <div
        class="tw-w-full tw-h-full tw-px-4 tw-absolute tw-top-0 tw-left-0 tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-4 group-hover:tw-bg-black/25 group-hover:tw-opacity-100"
      >
        <button class="tw-rounded-full tw-w-8 tw-h-8 tw-mt-2 file-options">
          <v-icon class="!tw-text-white !tw-text-sm">mdi-code-tags</v-icon>
        </button>
        <button class="tw-rounded-full tw-w-8 tw-h-8 tw-mt-2 file-options">
          <v-icon class="!tw-text-white !tw-text-sm">mdi-dots-vertical</v-icon>
        </button>
      </div>
    </div>
    <div
      class="tw-bg-[#F0F0F0] tw-text-[#363636] tw-uppercase tw-px-4 tw-text-center tw-py-4 tw-text-sm"
    >
      <h2>{{ name }}</h2>
    </div>
  </div>
  <button
    class="tw-bg-wapal-gray tw-px-4 tw-py-2 tw-text-black tw-rounded-sm tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-gray-300"
    v-else
  >
    <div class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2">
      <v-icon class="!tw-text-black">mdi-file</v-icon>
      {{ name }}
    </div>
  </button>
</template>
<script lang="ts">
import pirate from "@/assets/img/6195.png";
export default {
  props: { type: { type: String, default: "json" }, name: { type: String } },
  data() {
    return {
      pirate,
    };
  },
  methods: {
    displayFileDetails() {
      this.$emit("displayFileDetails");
    },
  },
  computed: {
    checkFileType() {
      if (this.type.includes("image/")) {
        return "image";
      }
      return "json";
    },
  },
};
</script>
<style>
.file-options {
  background: linear-gradient(
    180deg,
    #0e0d0d 0%,
    #010a1b 23.47%,
    #11151c 81.73%,
    #0e0d0d 100%
  );
}
</style>
