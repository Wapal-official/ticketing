<template>
  <v-app class="!tw-bg-dark-9 tw-w-full tw-overflow-hidden tw-relative">
    <div>
      <Navbar @landingMenuToggled="toggleMainContainer" />
      <Nuxt :class="mainClass" v-if="!$slots.default" />
      <slot></slot>
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

    const script = document.createElement("script");
    script.id = "intergram";
    script.type = "text/javascript";
    script.src = "https://telegram-chat-widget-t3ez.onrender.com/js/widget.js";
    document.head.appendChild(script);

    // Set the intergramId after the script is loaded
    script.onload = () => {
      window.intergramId = "6407851940";
      window.intergramCustomizations = {
        mainColor: "#8759FF",
        alwaysUseFloatingButton:true
      };
    };
  },
};
</script>
