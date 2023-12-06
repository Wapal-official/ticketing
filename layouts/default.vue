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
  async mounted() {
    if (this.$store.state.toast.message) {
      this.$toast.showMessage({
        message: this.$store.state.toast.message,
        error: this.$store.state.toast.error,
      });
    }

    // Create a script element
    const script = document.createElement("script");

    // Set attributes for the script
    script.src = "https://app.chatwoot.com/packs/js/sdk.js";
    script.defer = true;
    script.async = true;

    // Attach onload event listener
    script.onload = () => {
      // Once the script is loaded, execute the desired functionality
      window.chatwootSDK.run({
        websiteToken: "GyVMVFjjqQ4rEVcNfAe8v94z",
        baseUrl: "https://app.chatwoot.com",
      });
    };

    // Attach onerror event listener
    script.onerror = () => {
      console.error("Failed to load external script");
    };

    // Append the script to the document body
    document.body.appendChild(script);
  },
};
</script>
