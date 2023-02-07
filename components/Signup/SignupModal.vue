<template>
  <div class="tw-bg-modal-gray tw-px-8 tw-py-4 tw-text-white tw-text-center">
    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
      <button class="tw-text-black tw-text-base" @click="close">
        <v-icon class="!tw-text-black !tw-font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <p class="tw-text-sm md:tw-text-lg tw-font-normal tw-pb-4">
      Wallet registered successfully.
    </p>
    <p class="tw-text-sm md:tw-text-lg tw-font-normal tw-pb-4">
      Are you a creator? If yes, submit your project details to get chance for
      free promotion when we launch in March.
    </p>
    <NuxtLink to="/signup">
      <primary-button @click.native="close">Sign Up Early</primary-button>
    </NuxtLink>
  </div>
</template>
<script lang="ts">
import PrimaryButton from "@/components/Button/PrimaryButton.vue";

export default {
  components: { PrimaryButton },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
