<template>
  <button
    class="tw-font-semibold tw-bg-[#FF36AB] tw-px-6 tw-py-2 tw-rounded"
    :disabled="loading"
  >
    {{ !loading ? text : loadingText }}
  </button>
</template>
<script lang="ts">
export default {
  props: {
    text: { type: String },
    loadingText: { type: String },
    loading: { type: Boolean },
  },
};
</script>
