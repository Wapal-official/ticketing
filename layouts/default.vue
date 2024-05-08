<template>
  <v-app class="!tw-bg-dark-9 tw-w-full tw-overflow-hidden tw-relative">
    <div>
      <Navbar @landingMenuToggled="toggleMainContainer" />
      <Nuxt :class="mainClass" v-if="!$slots.default" />
      <slot></slot>
      <chat />
      <wapal-footer :class="mainClass" />

      <loonies-welcome-popup
        v-if="showWelcomeLooniesPopup"
        @closeWelcomePopup="showWelcomeLooniesPopup = false"
      />
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
    return { mainClass: "", showWelcomeLooniesPopup: false };
  },
  methods: {
    toggleMainContainer(landingMenuShowing: boolean) {
      if (landingMenuShowing) {
        this.mainClass = "tw-hidden lg:tw-flex";
      } else {
        this.mainClass = "";
      }
    },
    checkIfUserHasSeenWelcomeLooniesPopup() {
      const seenWelcomePopup = localStorage.getItem("seenWelcomePopup");

      if (!seenWelcomePopup) {
        this.showWelcomeLooniesPopup = true;
      }
    },
  },
  created() {
    this.$store.dispatch("walletStore/initializeWallet");
  },
  async mounted() {
    if (this.$store.state.toast.message) {
      this.$toast.showMessage({
        message: this.$store.state.toast.message,
        error: this.$store.state.toast.error,
      });
    }

    this.checkIfUserHasSeenWelcomeLooniesPopup();
  },
};
</script>
