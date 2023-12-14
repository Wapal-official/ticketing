<template>
  <div class="tw-w-full tw-h-full">
    <dashboard-no-collection
      message="You Do Not Have any NFTs of this type"
      buttonTitle="Create"
      @click="$router.push('/dashboard/edition/create')"
    />
  </div>
</template>
<script>
export default {};
</script>
