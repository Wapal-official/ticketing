<template>
  <div class="flex flex-col items-start justify-start w-full">
    <nav
      class="flex flex-row items-center justify-between text-white w-full px-8 py-6 lg:!px-24"
    >
      <NuxtLink to="/" class="text-lg font-medium w-[120px]">
        <img :src="logo" alt="logo" />
      </NuxtLink>
      <div class="hidden lg:flex">
        <landing-menu />
      </div>
      <button @click="toggleLandingMenu" class="flex lg:hidden">
        <v-icon class="!text-wapal-gray">mdi-menu</v-icon>
      </button>
    </nav>
    <div
      class="w-full overflow-hidden px-4 transition-all duration-500 ease-linear bg-modal-gray text-white flex lg:hidden"
      :class="landingMenuClass"
    >
      <landing-menu class="py-4" @close="close" />
    </div>
  </div>
</template>

<script lang="ts">
import logo from "@/assets/img/logo/logo-horizontal-white.png";
export default {
  name: "Navbar",
  data() {
    return {
      landingMenuClass: "h-0",
      landingMenuShowing: false,
      logo,
    };
  },
  methods: {
    toggleLandingMenu() {
      if (!this.landingMenuShowing) {
        this.landingMenuClass = "h-[250px]";
      } else {
        this.landingMenuClass = "h-0";
      }
      this.landingMenuShowing = !this.landingMenuShowing;
    },
    close() {
      this.landingMenuClass = "h-0";
      this.landingMenuShowing = false;
    },
  },
};
</script>
