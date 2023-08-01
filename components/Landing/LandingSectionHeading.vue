<template>
  <h2 class="tw-uppercase tw-text-white tw-font-bold tw-text-[2rem]">
    {{ heading }}
  </h2>
</template>
<script lang="ts">
export default {
  props: { heading: { type: String } },
};
</script>
