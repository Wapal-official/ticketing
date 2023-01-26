<template>
  <div class="flex flex-col items-start justify-start w-full">
    <nav
      class="flex flex-row items-center justify-between gap-8 text-white w-full px-8 py-6 lg:!px-24"
    >
      <NuxtLink to="/" class="text-lg font-medium min-w-[120px] max-w-[120px]">
        <img :src="logo" alt="logo" />
      </NuxtLink>
      <div class="flex flex-row items-center justify-end gap-8 w-full">
        <div class="hidden md:flex lg:w-[60%]">
          <search-bar />
        </div>
        <div class="hidden lg:flex lg:w-[40%]">
          <landing-menu />
        </div>
      </div>
      <div
        class="w-full absolute transition-all duration-500 ease-linear z-50 left-0 top-0"
        :class="searchBarClass"
      >
        <search-bar @closeSearchBar="closeSearchBar" />
      </div>
      <div class="flex flex-row items-center justify-end gap-4">
        <button @click="displaySearchBar" class="flex md:hidden">
          <v-icon class="!text-wapal-gray">mdi-magnify</v-icon>
        </button>
        <button @click="toggleLandingMenu" class="flex lg:hidden">
          <v-icon class="!text-wapal-gray">mdi-menu</v-icon>
        </button>
      </div>
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
import LandingMenu from "@/components/Landing/Navbar/LandingMenu.vue";
import SearchBar from "@/components/Landing/Navbar/SearchBar.vue";
export default {
  name: "Navbar",
  components: { LandingMenu, SearchBar },
  data() {
    return {
      landingMenuClass: "h-0",
      landingMenuShowing: false,
      searchBarShowing: false,
      searchBarClass: "-translate-y-full",
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
    displaySearchBar() {
      this.searchBarClass = "translate-y-0";
    },
    closeSearchBar() {
      this.searchBarClass = "-translate-y-full";
    },
  },
};
</script>
