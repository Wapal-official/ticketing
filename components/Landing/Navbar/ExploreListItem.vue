<template>
  <div>
    <button
      @click="goToExplorePage"
      class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-start"
    >
      <v-list-item>
        <v-list-item-title
          class="!tw-text-white tw-rounded !tw-text-left tw-px-4 tw-py-3 tw-w-full tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-dark-6"
          >{{ name }}</v-list-item-title
        >
      </v-list-item>
    </button>
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
