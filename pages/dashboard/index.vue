<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <div
      class="tw-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <h1 class="tw-text-lg">Application</h1>
      <NuxtLink
        to="/dashboard/create-collection"
        class="dashboard-gradient-button"
        >Create New Collection</NuxtLink
      >
    </div>
  </div>
</template>
<script lang="ts">
export default {
  layout: "dashboard",
};
</script>
