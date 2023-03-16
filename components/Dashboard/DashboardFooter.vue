<template>
  <div
    class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-bg-[#000229] tw-py-4 tw-px-4 tw-text-white tw-text-xs tw-font-normal">
    &#169; Copyright {{ currentYear }} - Wapal
  </div>
</template>
<script lang="ts">
export default {
  computed: {
    currentYear() {
      const date = new Date();
      return date.getFullYear();
    },
  },
};
</script>
