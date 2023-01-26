<template>
  <NuxtLink
    :to="link"
    class="!tw-text-white tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink tw-uppercase !tw-font-normal"
    @click.native="close"
    >{{ text }}</NuxtLink
  >
</template>

<script lang="ts">
export default {
  props: {
    text: { type: String, default: "" },
    link: { type: String, default: "/" },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
