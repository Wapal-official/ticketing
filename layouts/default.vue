<template>
  <v-app class="landing-background tw-w-full tw-overflow-hidden tw-relative">
    <Navbar @landingMenuToggled="toggleMainContainer" />
    <Nuxt :class="mainClass" class="tw-pb-16" />
    <wapal-footer :class="mainClass" />
    <toast />
  </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Landing/Navbar/Navbar.vue";
import WapalFooter from "@/components/Landing/Footer/WapalFooter.vue";
import Toast from "@/components/Reusable/Toast.vue";
export default {
  components: { Navbar, WapalFooter, Toast },
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
