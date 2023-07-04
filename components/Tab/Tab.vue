<template>
  <v-tabs
    v-model="tab"
    class="!tw-bg-dark-6 tw-rounded-lg tw-p-2 md:!tw-w-fit"
    slider-color="transparent"
    background-color="transparent"
    @change="$emit('tabChanged', tab)"
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab"
      :ripple="false"
      class="tw-text-dark-0 !tw-capitalize !tw-text-base !tw-font-medium tw-transition-all tw-duration-150 tw-ease-linear 3xl:tw-text-lg hover:!tw-bg-transparent hover:!tw-text-white"
    >
      {{ tab }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
export default {
  props: { tabs: { type: Array } },
  data() {
    return {
      tab: null,
    };
  },
};
</script>
<style scoped>
.v-tab--active {
  @apply !tw-text-white !tw-bg-dark-9 !tw-rounded;
}

.v-tab--active:hover {
  @apply !tw-text-white !tw-bg-dark-9 !tw-rounded;
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
