<template>
  <div
    class="text-white transition-all duration-200 ease-linear hover:text-wapal-pink"
  >
    {{ name }}
  </div>
</template>
<script lang="ts">
export default {
  props: { name: { type: String } },
};
</script>
