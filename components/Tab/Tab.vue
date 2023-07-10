<template>
  <v-tabs
    v-model="internalValue"
    class="!tw-bg-transparent tw-rounded-lg tw-p-2 md:!tw-w-fit"
    slider-color="transparent"
    background-color="transparent"
  >
    <v-tab
      v-for="(tab, index) in tabs"
      :key="tab"
      :ripple="false"
      class="!tw-text-white tw-rounded-full tw-py-2 tw-px-6 !tw-capitalize !tw-text-base !tw-font-medium tw-transition-all tw-duration-200 tw-ease-linear tw-border-solid tw-border tw-border-dark-4 3xl:tw-text-lg hover:tw-border-white hover:!tw-bg-white hover:!tw-text-dark-9"
      :class="{ 'tw-ml-4': index !== 0 }"
    >
      {{ tab }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
export default {
  props: { tab: { type: Number, default: 0 }, tabs: { type: Array } },
  data() {
    return {};
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
  @apply !tw-text-dark-9 !tw-bg-white;
}

.v-tab--active:hover {
  @apply !tw-text-dark-9 !tw-bg-white;
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
