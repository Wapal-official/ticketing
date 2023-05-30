<template>
  <div class="tw-w-full">
    <h1 class="tw-text-white tw-text-3xl tw-py-4">NFTs</h1>
    <div class="tw-py-4">
      <div
        class="tw-w-full tw-py-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
      >
        <v-tabs
          v-model="tab"
          background-color="transparent"
          active-class="!tw-text-wapal-pink"
          id="explore-tab"
          class="tw-w-4/5"
        >
          <v-tab
            v-for="item in tabItems"
            :key="item.tab"
            :ripple="false"
            class="!tw-capitalize !tw-text-white"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>
        <div
          class="tw-w-1/5 tw-flex tw-flex-row tw-items-center tw-justify-end"
        >
          <reusable-theme-button
            title="Create"
            @click="$router.push('/dashboard/edition/create')"
          />
        </div>
      </div>
      <div class="tw-w-full tw-h-[1px] tw-bg-white/20"></div>
    </div>
    <dashboard-edition-no-edition class="tw-my-16" />
  </div>
</template>
<script lang="ts">
export default {
  layout: "dashboard",
  data() {
    return {
      tab: null,
      tabItems: [
        { tab: "1/1s" },
        { tab: "Limited Editions" },
        { tab: "Open Edition" },
      ],
    };
  },
};
</script>
<style scoped>
::v-deep #explore-tab .v-tabs-slider {
  @apply !tw-bg-transparent;
}
</style>
