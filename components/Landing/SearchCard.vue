<template>
  <NuxtLink
    :to="`/nft/${collection?._id}`"
    class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-px-4 tw-py-2 tw-w-full tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-[#454545]"
    @click.native="close"
  >
    <img
      :src="collection?.image"
      :alt="collection?.name"
      class="tw-object-fill tw-rounded tw-w-[40px] tw-h-[40px]"
    />
    <div
      class="tw-flex tw-flex-row tw-items-end tw-justify-end tw-gap-2 tw-text-sm tw-font-semibold"
    >
      {{ collection?.name }}
    </div>
  </NuxtLink>
</template>
<script lang="ts">
export default {
  props: { collection: { type: Object } },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
