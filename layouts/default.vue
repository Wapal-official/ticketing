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
  head: {
    script: [
      {
        src: "https://app.chatwoot.com/packs/js/sdk.js",
        defer: true,
        async: true,
      },
    ],
  },
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

    window.chatwootSDK.run({
      websiteToken: "5JbXqHBZBesGHhoMUPinK8ix",
      baseUrl: "https://app.chatwoot.com",
    });

    //     const script = document.createElement("script");
    //     script.id = "intergram";
    //     script.type = "text/javascript";
    //     script.src = "https://telegram-chat-widget-t3ez.onrender.com/js/widget.js";
    //     document.head.appendChild(script);

    //     // Set the intergramId after the script is loaded
    //     script.onload = () => {
    //       window.intergramId = "6407851940";
    //       window.intergramCustomizations = {
    //         mainColor: "#8759FF",
    //         alwaysUseFloatingButton: true,
    //         introMessage: `Welcome to Wapal – Leading NFT No Code Creator Studio and Marketplace on Aptos!

    // How can we assist you today?`,
    //         autoResponse:
    //           "Connecting you with the first available admin. Thank you for your patience.",
    //         autoNoResponse: `We strive to respond within 24 hours. For emergencies, please create a ticket on our server or reach out via the provided Telegram channel. Thank you for your understanding.

    // Discord Link - https://discord.gg/wapal

    // TG - https://t.me/nrepesh`,
    //         desktopHeight: 400,
    //         desktopWidth: 300,
    //       };
    //     };
  },
};
</script>
