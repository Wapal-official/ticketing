<template>
  <div
    class="sidebar tw-flex tw-flex-col tw-items-start tw-justify-start tw-px-16"
  >
    <NuxtLink
      class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-dashboard-active"
      to="/dashboard"
    >
      Launchpad
    </NuxtLink>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style>
.sidebar {
  height: calc(100vh - 95px);
  width: 320px;
}
</style>
