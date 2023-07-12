<template>
  <button
    class="tw-rounded-md tw-bg-primary-1 tw-text-white tw-px-8 tw-py-2.5 tw-box-border tw-font-medium tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 disabled:tw-cursor-not-allowed"
    :class="{
      '!tw-border-solid tw-border tw-border-dark-4 tw-bg-transparent': bordered,
      'tw-w-full': fullWidth,
      'tw-text-sm 3xl:tw-text-base': small,
      'tw-bg-dark-6': dark,
    }"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <v-progress-circular
      :size="24"
      color="#fff"
      :width="2"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
    <slot name="prepend-icon"> </slot>
    <span>{{ title }}</span>
    <slot name="append-icon"> </slot>
  </button>
</template>
<script lang="ts">
export default {
  props: {
    bordered: { type: Boolean, default: false },
    title: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
  },
};
</script>
