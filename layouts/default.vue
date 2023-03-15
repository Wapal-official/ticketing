<template>
  <v-app class="landing-background tw-w-full tw-overflow-hidden tw-relative">
    <verification v-if="!getVerifiedStatus" />
    <div v-else>
      <Navbar @landingMenuToggled="toggleMainContainer" />
      <Nuxt :class="mainClass" class="tw-pb-16" />
      <wapal-footer :class="mainClass" />
    </div>
    <toast />
  </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Landing/Navbar/Navbar.vue";
import WapalFooter from "@/components/Landing/Footer/WapalFooter.vue";
import Toast from "@/components/Reusable/Toast.vue";
import Verification from "@/components/Landing/Verification.vue";
export default {
  components: { Navbar, WapalFooter, Toast, Verification },
  data() {
    return { mainClass: "", showVerification: true };
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
  computed: {
    getVerifiedStatus() {
      if (process.client) {
        return JSON.parse(localStorage.getItem("verified") || "false");
      }
      return false;
    },
  },
};
</script>
