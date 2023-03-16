<template>
  <div
    class="tw-w-full tw-max-w-[580px] tw-relative tw-bg-wapal-background tw-h-full tw-overflow-auto"
    v-if="!loading"
  >
    <button class="tw-absolute tw-top-4 tw-right-4" @click="close">
      <v-icon class="!tw-text-white">mdi-close</v-icon>
    </button>
    <div
      class="tw-w-full tw-min-h-full tw-border tw-border-transparent tw-px-4 tw-py-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 md:tw-border-wapal-dashboard-active"
    >
      <img
        :src="file?.image"
        :alt="file?.name"
        class="tw-max-w-[300px] tw-max-h-[300px]"
        draggable="false"
      />
      <h3 class="tw-text-white tw-font-medium tw-uppercase tw-text-sm">
        {{ file?.name }}
      </h3>
      <div class="tw-h-[2px] tw-w-full tw-bg-wapal-dashboard-active"></div>
      <h4 class="tw-text-xl tw-text-wapal-dashboard-active tw-font-normal">
        Properties
      </h4>
      <div class="tw-grid tw-grid-cols-3 tw-gap-4 tw-w-full">
        <div
          class="tw-rounded-md tw-bg-wapal-dashboard-active/25 tw-px-2 tw-py-2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1 tw-text-sm"
          v-for="attribute in attributes"
          :key="attribute.trait_type"
          v-if="attributes[0].trait_type"
        >
          <h5 class="tw-text-wapal-gray">{{ attribute.trait_type }}</h5>
          <h5>{{ attribute.value }}</h5>
        </div>
      </div>
    </div>
  </div>
  <div v-else></div>
</template>
<script lang="ts">
export default {
  props: { file: { type: Object } },
  data() {
    return {
      loading: false,
      attributes: [{ trait_type: "", value: "" }],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  mounted() {
    if (this.file.attributes) {
      this.attributes = this.file.attributes;
    }
  },
};
</script>
