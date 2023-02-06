<template>
  <div class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full">
    <h1 class="tw-text-lg">Dashboard</h1>
    <NuxtLink
      to="/dashboard/create-collection"
      class="dashboard-gradient-button"
      >Create New Collection</NuxtLink
    >
  </div>
</template>
<script lang="ts">
export default {
  layout: "dashboard",
};
</script>
<style>
.dashboard-gradient-button {
  background: linear-gradient(
    264.44deg,
    #fe87ff 2.87%,
    #c202d3 34.05%,
    #48cae4 67.82%,
    #48cae4 99.15%
  ) !important;
  @apply tw-rounded tw-text-sm tw-px-4 tw-py-2 !tw-text-white;
}
</style>
