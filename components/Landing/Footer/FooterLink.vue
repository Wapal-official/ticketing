<template>
  <a
    v-if="external"
    :href="to"
    :target="target"
    class="!tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink"
  >
    {{ name }}
  </a>
  <NuxtLink
    v-else
    :to="to"
    class="!tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink"
  >
    {{ name }}
  </NuxtLink>
</template>
<script lang="ts">
export default {
  props: {
    name: { type: String },
    to: { type: String, default: "/" },
    target: { type: String, default: "_self" },
    external: { type: Boolean, default: false },
  },
};
</script>
