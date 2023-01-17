<template>
  <NuxtLink
    :to="link"
    class="!text-white transition duration-200 ease-linear hover:!text-wapal-pink"
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
