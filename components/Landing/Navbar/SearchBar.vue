<template>
  <div class="w-full flex flex-col items-center justify-center relative">
    <input
      class="search-bar-input peer min-h-[70px] md:min-h-0"
      placeholder="Search Item, Collection, NFTs"
      v-model="searchInput"
      @input="search"
    />
    <v-icon
      class="!text-black !text-2xl !absolute !left-[1%] peer peer-focus:!text-wapal-gray"
      >mdi-magnify</v-icon
    >
    <v-icon
      class="!text-black !text-2xl !absolute !right-[1%] peer peer-focus:!text-wapal-gray"
      v-if="searchInput.length > 0"
      @click="clearSearch"
      >mdi-close</v-icon
    >
    <v-icon
      class="!flex !text-black !text-2xl !absolute !right-[1%] peer peer-focus:!text-wapal-gray md:!hidden"
      @click.native="closeSearchBar"
      v-if="searchInput.length === 0"
      >mdi-close</v-icon
    >
    <div
      class="absolute top-[110%] bg-modal-gray rounded py-4 px-8 w-full flex flex-col items-center justify-center"
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
  @apply w-full pl-10 pr-4 py-2 bg-modal-gray  text-white border border-transparent transition-all duration-200 ease-linear placeholder:text-white focus:outline-none focus:border-modal-gray focus:shadow focus:shadow-modal-gray md:rounded md:focus:bg-transparent;
}
</style>
