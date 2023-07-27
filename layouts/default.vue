<template>
  <v-app class="landing-background tw-w-full tw-overflow-hidden tw-relative">
    <div>
      <Navbar
        @landingMenuToggled="toggleMainContainer"
        class="tw-absolute tw-top-0 tw-left-0"
      />
      <Nuxt :class="mainClass" />
      <wapal-footer :class="mainClass" />
    </div>
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
  created() {
    this.$store.dispatch("walletStore/initializeWallet");
  },
  mounted() {
    if (this.$store.state.toast.message) {
      this.$toast.showMessage({
        message: this.$store.state.toast.message,
        error: this.$store.state.toast.error,
      });
    }
  },
};
</script>
