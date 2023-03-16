<template>
  <h1 class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1">
    <NuxtLink class="!tw-text-white" to="/dashboard/assets">Folders</NuxtLink>
    <div v-if="folderName">
      <span><v-icon class="!tw-text-white">mdi-chevron-right</v-icon></span>
      <span>{{ folderName }}</span>
    </div>
  </h1>
</template>
<script lang="ts">
export default {
  props: { folderName: { type: String } },
};
</script>
