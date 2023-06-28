<template>
  <button
    class="tw-rounded-md tw-bg-primary-1 tw-text-white tw-px-8 tw-py-2.5 tw-box-border disabled:tw-cursor-not-allowed 3xl:tw-text-lg"
    :class="{
      '!tw-border-solid tw-border tw-border-dark-4 tw-bg-transparent': bordered,
      'tw-w-full': fullWidth,
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
  },
};
</script>
