<template>
  <v-tabs
    v-model="internalValue"
    class="tw-w-full tw-border-b tw-border-solid tw-border-b-dark-4"
    background-color="transparent"
    :slider-color="defaultTheme.primarySecond"
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab"
      :ripple="false"
      class="tw-text-dark-0 !tw-text-left !tw-capitalize !tw-text-base !tw-font-medium tw-transition-all tw-duration-150 tw-ease-linear 3xl:tw-text-lg hover:!tw-bg-transparent hover:!tw-text-primary-2"
    >
      {{ tab }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  props: { tab: { type: Number }, tabs: { type: Array } },
  data() {
    return {
      defaultTheme,
    };
  },
  computed: {
    internalValue: {
      get() {
        return this.tab;
      },
      set(newValue: number) {
        this.$emit("tabChanged", newValue);
      },
    },
  },
};
</script>
<style scoped>
.v-tab--active {
  @apply !tw-text-primary-2;
}

.v-tab:hover {
  background-color: transparent;
}

.v-tab:hover::before {
  opacity: 0 !important;
}

.v-tab:focus::before {
  opacity: 0 !important;
}
</style>
