<template>
  <NuxtLink
    :to="link"
    class="!tw-text-white tw-transition tw-duration-200 tw-ease-linear tw-uppercase !tw-font-normal tw-px-4 hover:!tw-text-primary-1 lg:tw-px-0"
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
