<template>
  <div class="tw-w-full tw-h-full">
    <dashboard-no-collection
      message="You Do Not Have any Events"
      buttonTitle="Create Event"
      @click="$router.push('/dashboard/edition/create')"
    />
  </div>
</template>
<script>
export default {};
</script>
