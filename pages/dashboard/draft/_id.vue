<template>
  <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
    <h1 class="tw-text-xl tw-font-bold">Create NFT Collection</h1>
    <dashboard-collection-create-collection-form :draft="true" />
  </div>
</template>
<script lang="ts">
export default {
  layout: "dashboard",
};
</script>
<style scoped>
.image-collection {
  display: none;
  background-color: #878787;
}

::v-deep .mx-input {
  background: #0e0d0d !important;
}
</style>
