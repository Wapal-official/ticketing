<template>
  <v-app class="!bg-wapal-background min-h-screen w-full">
    <Navbar />
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Landing/Navbar/Navbar.vue";
export default {
  components: { Navbar },
};
</script>
