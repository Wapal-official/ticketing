<template>
  <div class="tw-w-full">
    <h1 class="tw-text-white tw-text-3xl tw-py-4">NFTs</h1>
    <div class="tw-py-4">
      <div
        class="tw-w-full tw-py-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
      >
        <tab-bordered :tabs="tabs" v-model="tab" />
        <!-- <v-tabs
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
        </v-tabs> -->
        <div
          class="tw-w-1/5 tw-flex tw-flex-row tw-items-center tw-justify-end"
        >
          <button-primary
            title="Create"
            @click="$router.push('/dashboard/edition/create')"
            :bordered="true"
          >
            <template #prepend-icon>
              <i class="bx bx-plus tw-text-xl tw-pr-2"></i>
            </template>
          </button-primary>
        </div>
      </div>
    </div>
    <dashboard-no-collection
      message="You Do Not Have any NFTs of this type"
      buttonTitle="Create"
      @click="$router.push('/dashboard/edition/create')"
    />
  </div>
</template>
<script lang="ts">
export default {
  layout: "dashboard",
  data() {
    return {
      tab: null,
      tabs: ["1/1s", "Limited Editions", "Open Edition"],
    };
  },
};
</script>
<style scoped>
::v-deep #explore-tab .v-tabs-slider {
  @apply !tw-bg-transparent;
}
</style>
