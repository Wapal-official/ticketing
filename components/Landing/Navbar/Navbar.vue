<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <nav
      class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-text-white tw-w-full tw-px-8 tw-py-6 lg:!tw-px-24"
    >
      <NuxtLink to="/" class="tw-min-w-[120px] tw-max-w-[120px]">
        <img :src="logo" alt="logo" />
      </NuxtLink>
      <div
        class="tw-flex tw-flex-row tw-items-center jtw-ustify-end tw-gap-8 tw-w-full"
      >
        <div class="tw-hidden md:tw-flex lg:tw-w-[60%]">
          <search-bar />
        </div>
        <div class="tw-hidden lg:tw-flex lg:tw-w-[40%]">
          <landing-menu />
        </div>
      </div>
      <div
        class="tw-w-full tw-absolute tw-transition-all tw-duration-500 tw-ease-linear tw-z-50 tw-left-0 tw-top-0"
        :class="searchBarClass"
      >
        <search-bar @closeSearchBar="closeSearchBar" />
      </div>
      <div class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4">
        <button @click="displaySearchBar" class="tw-flex md:tw-hidden">
          <v-icon class="!tw-text-wapal-gray">mdi-magnify</v-icon>
        </button>
        <button @click="toggleLandingMenu" class="tw-flex lg:tw-hidden">
          <v-icon class="!tw-text-wapal-gray">mdi-menu</v-icon>
        </button>
      </div>
    </nav>
    <div
      class="tw-w-full tw-overflow-hidden tw-px-4 tw-transition-all tw-duration-500 tw-ease-linear tw-bg-modal-gray tw-text-white tw-flex lg:tw-hidden"
      :class="landingMenuClass"
    >
      <landing-menu class="tw-py-4" @close="close" />
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
      landingMenuClass: "tw-h-0",
      landingMenuShowing: false,
      searchBarShowing: false,
      searchBarClass: "tw--translate-y-full",
      logo,
    };
  },
  methods: {
    toggleLandingMenu() {
      if (!this.landingMenuShowing) {
        this.landingMenuClass = "tw-h-[250px]";
      } else {
        this.landingMenuClass = "tw-h-0";
      }
      this.landingMenuShowing = !this.landingMenuShowing;
    },
    close() {
      this.landingMenuClass = "tw-h-0";
      this.landingMenuShowing = false;
    },
    displaySearchBar() {
      this.searchBarClass = "tw-translate-y-0";
    },
    closeSearchBar() {
      this.searchBarClass = "tw--translate-y-full";
    },
  },
};
</script>
