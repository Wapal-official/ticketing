<template>
  <v-app class="!bg-wapal-background min-h-screen w-full">
    <Navbar />
    <Nuxt />
    <wapal-footer />
  </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Landing/Navbar/Navbar.vue";
import WapalFooter from "@/components/Landing/Footer/WapalFooter.vue";
export default {
  components: { Navbar, WapalFooter },
};
</script>
