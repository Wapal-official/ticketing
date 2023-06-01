<template>
  <button
    class="tw-text-base tw-capitalize tw-text-white tw-bg-wapal-pink tw-rounded tw-px-6 tw-py-2 tw-text-center disabled:tw-cursor-not-allowed"
    @click="$emit('click')"
    :disabled="getDisabled"
    v-if="!bordered"
  >
    <v-progress-circular
      indeterminate
      v-if="loading"
      color="white"
      :width="2"
      :radius="16"
    >
    </v-progress-circular>
    <span v-else> {{ title }}</span>
  </button>
  <button
    class="tw-text-base tw-capitalize tw-text-white tw-bg-transparent !tw-border !tw-border-solid !tw-border-wapal-pink tw-rounded-md tw-px-6 tw-py-2 tw-text-center disabled:tw-cursor-not-allowed"
    @click="$emit('click')"
    :disabled="getDisabled"
    v-else
  >
    <v-progress-circular
      indeterminate
      v-if="loading"
      color="white"
      :width="2"
      :radius="16"
    >
    </v-progress-circular>
    <span
      class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
      v-else
    >
      {{ title }}
      <slot name="icon"></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getDisabled() {
      if (this.loading) {
        return true;
      } else {
        return this.disabled;
      }
    },
  },
};
</script>
