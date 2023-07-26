<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-bg-dark-9 tw-py-4 tw-border-b tw-border-dark-6"
  >
    <nav
      class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-text-white tw-w-full tw-px-6 tw-max-h-[40px] lg:tw-gap-0 xl:tw-px-[3.75em]"
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-12 lg:tw-w-[224px]"
      >
        <NuxtLink to="/" class="">
          <img
            :src="logo"
            alt="logo"
            class="tw-min-w-[106px] tw-max-w-[106px] tw-min-h-[28px] tw-max-h-[28px]"
          />
        </NuxtLink>
        <div class="tw-hidden lg:tw-flex">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <NuxtLink
                  to="/latest-collection"
                  class="!tw-text-[#A6A7AB] tw-transition tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-center tw-gap-0.5 tw-justify-start hover:!tw-text-primary-1"
                >
                  <span>Explore</span>
                  <i class="bx bx-chevron-down !tw-text-[#A6A7AB]"></i>
                </NuxtLink>
              </div>
            </template>
            <v-list class="tw-bg-dark-7 !tw-min-w-[250px]">
              <explore-list-item
                name="All NFT"
                link="/latest-collection"
                @close="close"
              />
              <explore-list-item
                name="Live"
                link="/latest-collection"
                @close="close"
              />
              <explore-list-item
                name="Upcoming"
                link="/upcoming-collection"
                @close="close"
              />
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
        class="tw-hidden tw-w-full md:tw-flex md:tw-flex-row md:tw-items-center md:tw-justify-end md:tw-w-4/5 lg:tw-w-[90%] xl:tw-w-4/5"
      >
        <div
          class="tw-w-4/5 tw-flex tw-flex-row tw-items-center tw-justify-between lg:tw-w-[90%] xl:tw-w-4/5"
        >
          <div
            class="tw-hidden md:tw-flex md:tw-flex-row md:tw-items-center md:tw-justify-center lg:tw-w-[392px] xl:tw-w-[424px]"
          >
            <search-bar />
          </div>
          <div class="tw-w-fit tw-hidden lg:tw-flex">
            <landing-menu />
          </div>
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
          <i class="bx bx-search !tw-text-wapal-gray tw-text-2xl"></i>
        </button>
        <button @click="toggleLandingMenu" class="tw-flex lg:tw-hidden">
          <i
            class="bx bx-menu !tw-text-wapal-gray tw-text-2xl"
            v-if="!landingMenuShowing"
          ></i>
          <i class="bx bx-x !tw-text-wapal-gray tw-text-2xl" v-else></i>
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
import logo from "@/assets/img/logo/logo.svg";
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
