<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-relative"
  >
    <input
      class="search-bar-input tw-peer tw-min-h-[70px] md:tw-min-h-0"
      placeholder="Search Item, Collection, NFTs"
      v-model="searchInput"
      @input="search"
    />
    <v-icon
      class="!tw-text-black !tw-text-2xl !tw-absolute !tw-left-[1%] tw-peer peer-focus:!tw-text-wapal-gray"
      >mdi-magnify</v-icon
    >
    <v-icon
      class="!tw-text-black !tw-text-2xl !tw-absolute !tw-right-[1%] tw-peer peer-focus:!tw-text-wapal-gray"
      v-if="searchInput.length > 0"
      @click="clearSearch"
      >mdi-close</v-icon
    >
    <v-icon
      class="!tw-flex !tw-text-black !tw-text-2xl !tw-absolute !tw-right-[1%] tw-peer peer-focus:!tw-text-wapal-gray md:!tw-hidden"
      @click.native="closeSearchBar"
      v-if="searchInput.length === 0"
      >mdi-close</v-icon
    >
    <div
      class="tw-absolute tw-top-[110%] tw-bg-modal-gray tw-rounded tw-py-4 tw-px-8 tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center"
      v-if="showSearchResults"
    >
      <v-progress-circular
        indeterminate
        :color="defaultTheme.wapalPink"
      ></v-progress-circular>
    </div>
  </div>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  data() {
    return {
      searchInput: "",
      debounce: null,
      showSearchResults: false,
      defaultTheme,
    };
  },
  methods: {
    search() {
      if (this.searchInput.length < 3) {
        this.showSearchResults = false;
      } else {
        this.showSearchResults = true;
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          console.log("first");
        }, 500);
      }
    },
    clearSearch() {
      this.searchInput = "";
      this.showSearchResults = false;
    },
    closeSearchBar() {
      this.$emit("closeSearchBar");
    },
  },
};
</script>
<style scoped>
.search-bar-input {
  border-style: solid !important;
  @apply tw-w-full tw-pl-10 tw-pr-4 tw-py-2 tw-bg-modal-gray  tw-text-white tw-border tw-border-transparent tw-transition-all tw-duration-200 tw-ease-linear placeholder:tw-text-white focus:tw-outline-none focus:tw-border-modal-gray focus:tw-shadow focus:tw-shadow-modal-gray md:tw-rounded md:focus:tw-bg-transparent;
}
</style>
