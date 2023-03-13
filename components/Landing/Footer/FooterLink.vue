<template>
  <NuxtLink
    :to="to"
    class="!tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink"
  >
    {{ name }}
  </NuxtLink>
</template>
<script lang="ts">
export default {
  props: { name: { type: String }, to: { type: String, default: "/" } },
};
</script>
