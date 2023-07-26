<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <nav
      class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-text-white tw-w-full tw-px-6 tw-py-4"
    >
      <NuxtLink to="/">
        <img
          :src="logo"
          alt="logo"
          class="tw-min-w-[106px] tw-max-w-[106px] tw-min-h-[28px] tw-max-h-[28px]"
        />
      </NuxtLink>
      <div class="tw-hidden lg:tw-flex">
        <connect-wallet />
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4 lg:tw-hidden"
      >
        <button @click="toggleSidebar" class="tw-flex">
          <v-icon class="!tw-text-wapal-gray" v-if="!sidebarIsShowing"
            >mdi-menu</v-icon
          >
          <v-icon class="!tw-text-wapal-gray" v-else>mdi-close</v-icon>
        </button>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import logo from "@/assets/img/logo/logo.svg";
import ConnectWallet from "@/components/Reusable/ConnectWallet.vue";
export default {
  components: { ConnectWallet },
  props: {
    closeIcon: {
      type: Boolean,
    },
  },
  data() {
    return {
      sidebarIsShowing: false,
      logo,
    };
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggleSidebar", this.sidebarIsShowing);
      this.sidebarIsShowing = !this.sidebarIsShowing;
    },
  },
  watch: {
    closeIcon(closeIcon: Boolean) {
      this.sidebarIsShowing = closeIcon;
    },
  },
};
</script>
