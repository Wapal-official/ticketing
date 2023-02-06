<template>
  <div class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full">
    <h1 class="tw-text-lg">Application</h1>
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
