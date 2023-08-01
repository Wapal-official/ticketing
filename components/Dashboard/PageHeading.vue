<template>
  <h1 class="tw-text-white tw-font-semibold tw-text-[1.75em]">
    {{ heading }}
  </h1>
</template>
<script lang="ts">
export default {
  props: { heading: { type: String } },
};
</script>
