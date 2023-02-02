<template>
  <div
    class="tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:tw-text-wapal-pink"
  >
    {{ name }}
  </div>
</template>
<script lang="ts">
export default {
  props: { name: { type: String } },
};
</script>
