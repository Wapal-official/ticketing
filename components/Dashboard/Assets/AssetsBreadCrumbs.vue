<template>
  <h1 class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1">
    <NuxtLink class="!tw-text-white" to="/dashboard/assets">Folders</NuxtLink>
    <span><v-icon class="!tw-text-white">mdi-chevron-right</v-icon></span>
    <span v-if="folderName">{{ folderName }}</span>
  </h1>
</template>
<script lang="ts">
export default {
  props: { folderName: { type: String } },
};
</script>
