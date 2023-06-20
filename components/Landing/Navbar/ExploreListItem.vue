<template>
  <div>
    <button @click="goToExplorePage">
      <v-list-item>
        <v-list-item-title
          class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-pink"
          >{{ name }}</v-list-item-title
        >
      </v-list-item>
    </button>
    <div class="tw-w-full tw-px-4" v-if="!last">
      <div class="tw-w-full tw-h-[1.5px] tw-bg-white"></div>
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
    goToExplorePage() {
      this.$router.push(this.link);
      this.$emit("close");
    },
  },
};
</script>
