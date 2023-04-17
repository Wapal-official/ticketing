<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <nav
      class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-text-white tw-w-full tw-px-8 tw-py-6 xl:!tw-px-24"
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-8 lg:tw-w-[20%]"
      >
        <NuxtLink to="/" class="tw-min-w-[140px] tw-max-w-[140px]">
          <img :src="logo" alt="logo" />
        </NuxtLink>
        <div class="tw-hidden lg:tw-flex">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <NuxtLink
                  to="/explore"
                  class="!tw-text-white tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink tw-uppercase !tw-font-normal"
                >
                  Explore
                </NuxtLink>
              </div>
            </template>
            <v-list class="!tw-bg-modal-gray !tw-min-w-[200px]">
              <explore-list-item name="All NFT" @close="close" />
              <explore-list-item name="Live" @close="close" />
              <explore-list-item name="Upcoming" @close="close" />
              <explore-list-item
                name="Domain Name"
                link="/domain-name"
                :last="true"
                @close="close"
              />
            </v-list>
          </v-menu>
        </div>
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-w-full tw-gap-8 lg:tw-w-[80%]"
      >
        <div
          class="tw-hidden tw-mx-auto md:tw-flex md:tw-flex-row md:tw-items-center md:tw-justify-center lg:tw-w-[60%]"
        >
          <search-bar />
        </div>
        <div class="tw-hidden lg:tw-flex tw-w-full lg:tw-w-[40%]">
          <landing-menu />
        </div>
      </div>
      <div
        class="tw-w-full tw-absolute tw-transition-all tw-duration-300 tw-ease-linear tw-z-50 tw-left-0 tw-top-0"
        :class="searchBarClass"
      >
        <search-bar @closeSearchBar="closeSearchBar" />
      </div>
      <div class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4">
        <button @click="displaySearchBar" class="tw-flex md:tw-hidden">
          <v-icon class="!tw-text-wapal-gray">mdi-magnify</v-icon>
        </button>
        <button @click="toggleLandingMenu" class="tw-flex lg:tw-hidden">
          <v-icon class="!tw-text-wapal-gray" v-if="!landingMenuShowing"
            >mdi-menu</v-icon
          >
          <v-icon class="!tw-text-wapal-gray" v-else>mdi-close</v-icon>
        </button>
      </div>
    </nav>
    <div
      class="tw-overflow-auto tw-px-4 tw-transition-all tw-duration-500 tw-ease-linear tw-bg-wapal-background tw-text-white tw-absolute tw-z-40 tw-top-[95px] tw-left-0 tw-w-screen tw-transform lg:tw-hidden mobile-menu"
      :class="landingMenuClass"
    >
      <landing-menu class="tw-py-4" @close="close" />
    </div>
  </div>
</template>

<script lang="ts">
import logo from "@/assets/img/logo/mainnet-beta.png";
import LandingMenu from "@/components/Landing/Navbar/LandingMenu.vue";
import SearchBar from "@/components/Landing/Navbar/SearchBar.vue";
import ExploreListItem from "@/components/Landing/Navbar/ExploreListItem.vue";
export default {
  name: "Navbar",
  components: { LandingMenu, SearchBar, ExploreListItem },
  data() {
    return {
      landingMenuClass: "tw-translate-x-full",
      landingMenuShowing: false,
      searchBarShowing: false,
      searchBarClass: "tw--translate-y-full",
      logo,
    };
  },
  methods: {
    toggleLandingMenu() {
      if (!this.landingMenuShowing) {
        this.landingMenuClass = "tw-flex tw-translate-x-full";
        setTimeout(() => {
          this.landingMenuClass = "tw-translate-x-0";
        }, 100);
      } else {
        this.landingMenuClass = "tw-translate-x-full";
      }
      this.landingMenuShowing = !this.landingMenuShowing;
      this.$emit("landingMenuToggled", this.landingMenuShowing);
    },
    close() {
      this.landingMenuClass = "tw-translate-x-full";
      this.landingMenuShowing = false;
      this.$emit("landingMenuToggled", this.landingMenuShowing);
      setTimeout(() => {
        this.landingMenuClass = "tw-hidden";
      }, 200);
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
<style scoped>
.mobile-menu {
  height: calc(100vh - 95px);
}
</style>
