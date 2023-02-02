<template>
  <v-app class="!tw-bg-wapal-background tw-w-full tw-overflow-hidden">
    <Navbar @landingMenuToggled="toggleMainContainer" />
    <Nuxt :class="mainClass" />
    <wapal-footer :class="mainClass" />
  </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Landing/Navbar/Navbar.vue";
import WapalFooter from "@/components/Landing/Footer/WapalFooter.vue";
export default {
  components: { Navbar, WapalFooter },
  data() {
    return { mainClass: "" };
  },
  methods: {
    toggleMainContainer(landingMenuShowing: boolean) {
      if (landingMenuShowing) {
        this.mainClass = "tw-hidden lg:tw-flex";
      } else {
        this.mainClass = "";
      }
    },
  },
};
</script>
