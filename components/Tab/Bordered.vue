<template>
  <v-tabs
    v-model="internalValue"
    class="tw-w-full"
    background-color="transparent"
    slider-color="transparent"
  >
    <v-tab
      v-for="(tab, index) in tabs"
      :key="tab"
      :ripple="false"
      class="tw-px-6 tw-text-dark-0 tw-border-t tw-border-r tw-border-b tw-border-dark-3 tw-border-solid !tw-h-[40px] !tw-max-h-[40px] !tw-text-left !tw-capitalize !tw-text-base !tw-font-medium tw-transition-all tw-duration-150 tw-ease-linear 3xl:tw-text-lg hover:!tw-bg-white hover:!tw-text-black hover:!tw-border-white hover:!tw-font-semibold"
      :class="[
        { 'tw-rounded-l tw-border-l': index === 0 },
        { 'tw-rounded-r': getLastItem(index) },
      ]"
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
  methods: {
    getLastItem(index: number) {
      return index === this.tabs.length - 1;
    },
  },
};
</script>
<style scoped>
.v-tab--active {
  @apply !tw-text-black !tw-border-white !tw-bg-white !tw-font-semibold;
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

::v-deep .v-slide-group__prev--disabled {
  display: none !important;
}
</style>
