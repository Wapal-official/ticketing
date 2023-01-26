<template>
  <div>
    <NuxtLink :to="link" @click.native="close">
      <v-list-item>
        <v-list-item-title
          class="!text-white transition-all duration-150 ease-linear hover:!text-wapal-pink"
          >{{ name }}</v-list-item-title
        >
      </v-list-item></NuxtLink
    >
    <div class="w-full px-4" v-if="!last">
      <div class="w-full h-[1.5px] bg-white"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    name: { type: String, default: "" },
    link: { type: String, default: "/" },
    last: { type: Boolean, default: false },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
