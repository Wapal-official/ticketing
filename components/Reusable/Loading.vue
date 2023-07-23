<template>
  <div
    class="tw-w-full tw-py-8 tw-flex tw-flex-row tw-items-center tw-justify-center"
  >
    <v-progress-circular
      indeterminate
      :color="defaultTheme.primary"
    ></v-progress-circular>
  </div>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";

export default {
  data() {
    return { defaultTheme };
  },
};
</script>
