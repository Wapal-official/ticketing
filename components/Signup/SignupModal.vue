<template>
  <div class="bg-modal-gray px-8 py-4 text-white text-center">
    <div class="w-full flex flex-row items-center justify-end">
      <button class="text-black text-base" @click="close">
        <v-icon class="!text-black !font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <p class="text-sm md:text-lg font-normal pb-4">
      Wallet registered successfully.
    </p>
    <p class="text-sm md:text-lg font-normal pb-4">
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
