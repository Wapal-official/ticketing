<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <nav
      class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-text-white tw-w-full tw-px-8 tw-py-6 lg:!tw-px-24">
      <NuxtLink to="/" class="tw-min-w-[120px] tw-max-w-[120px]">
        <img :src="logo" alt="logo" />
      </NuxtLink>
      <div class="tw-hidden lg:tw-flex">
        <connect-wallet />
      </div>
      <div class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4 lg:tw-hidden">
        <button @click="toggleSidebar" class="tw-flex">
          <v-icon class="!tw-text-wapal-gray" v-if="!sidebarIsShowing">mdi-menu</v-icon>
          <v-icon class="!tw-text-wapal-gray" v-else>mdi-close</v-icon>
        </button>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import logo from "@/assets/img/logo/logo-horizontal-white.png";
import ConnectWallet from "@/components/Reusable/ConnectWallet.vue";
export default {
  components: { ConnectWallet },
  data() {
    return { sidebarIsShowing: false, logo };
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggleSidebar", this.sidebarIsShowing);
      this.sidebarIsShowing = !this.sidebarIsShowing;
    },
  },
};
</script>
