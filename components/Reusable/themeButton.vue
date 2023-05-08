<template>
  <button
    class="tw-text-base tw-capitalize tw-text-white tw-bg-wapal-pink tw-rounded tw-px-6 tw-py-2 tw-text-center disabled:tw-cursor-not-allowed"
    @click="$emit('click')"
    :disabled="getDisabled"
  >
    <v-progress-circular indeterminate v-if="loading" color="white">
    </v-progress-circular>
    <span v-else> {{ title }}</span>
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
