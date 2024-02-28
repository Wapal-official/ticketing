<template>
  <button
    class="tw-rounded-md tw-bg-transparent tw-text-primary-2 tw-px-8 tw-box-border tw-transition-all tw-duration-200 tw-ease-linear tw-font-medium disabled:tw-cursor-not-allowed 3xl:tw-text-lg hover:tw-bg-dark-6"
    :class="{
      'tw-py-2.5': paddingTwoHalf,
      'tw-py-2': !paddingTwoHalf,
      '!tw-border-solid tw-border tw-border-dark-4 tw-bg-transparent': bordered,
      'tw-w-full': fullWidth,
      'tw-text-sm 3xl:tw-text-base tw-px-4': small,
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
    {{ title }}
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
    paddingTwoHalf: { type: Boolean, default: true },
  },
};
</script>
