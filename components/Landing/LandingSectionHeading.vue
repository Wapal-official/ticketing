<template>
  <h2 class="tw-text-2xl tw-text-wapal-pink tw-font-semibold tw-py-6">
    {{ heading }}
  </h2>
</template>
<script lang="ts">
export default {
  props: { heading: { type: String } },
};
</script>
