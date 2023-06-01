<template>
  <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
    <h1 class="tw-text-xl tw-font-bold">Create NFT Collection</h1>
    <dashboard-collection-create-collection-form />
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

::v-deep .mx-input-wrapper,
::v-deep .mx-datepicker {
  width: 100% !important;
}

::v-deep .mx-input {
  width: 100% !important;
  background: #0e0d0d !important;
  border: none !important;
  height: 50px !important;
  color: #d9d9d9 !important;
  font-size: 1em;
  border-radius: 7px !important;
}

.mx-icon-calendar,
.mx-icon-clear,
.mx-input::placeholder {
  color: #d9d9d9 !important;
}

.mdi-checkbox-blank-outline {
  color: #d9d9d9 !important;
}
</style>
