<template>
  <div
    class="tw-bg-wapal-background tw-w-screen tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred - {{ error.statusCode }}</h1>
    <NuxtLink to="/">Go To Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
