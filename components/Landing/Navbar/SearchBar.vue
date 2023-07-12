<template>
  <div
    class="!tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-relative"
  >
    <input
      class="search-bar-input tw-peer tw-min-h-[70px] tw-w-full md:tw-min-h-0"
      placeholder="Search"
      v-model="searchInput"
      @input="search"
    />
    <i
      class="bx bx-x !tw-text-black !tw-text-2xl !tw-absolute !tw-right-[1%] tw-peer peer-focus:!tw-text-wapal-gray"
      v-if="searchInput.length > 0"
      @click="clearSearch"
    ></i>
    <i
      class="bx bx-x !tw-flex !tw-text-black !tw-text-2xl !tw-absolute !tw-right-[1%] tw-peer peer-focus:!tw-text-wapal-gray md:!tw-hidden"
      @click="closeSearchBar"
      v-if="searchInput.length === 0"
    ></i>
    <div
      class="tw-absolute tw-top-[110%] tw-bg-modal-gray tw-rounded tw-py-4 tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50"
      v-if="showSearchResults"
    >
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 tw-max-h-[350px] tw-overflow-auto"
        v-if="!loading"
      >
        <div
          class="tw-text-wapal-pink tw-w-full tw-text-center tw-py-4"
          v-if="searchResult.length === 0"
        >
          No Results Found
        </div>
        <search-card
          v-for="result in searchResult"
          :key="result._id"
          :collection="result"
          @close="close"
          v-else
        />
      </div>
      <v-progress-circular
        indeterminate
        :color="defaultTheme.wapalPink"
        v-else
      ></v-progress-circular>
    </div>
  </div>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";
import SearchCard from "@/components/Landing/SearchCard.vue";
import { searchCollection } from "@/services/CollectionService";
export default {
  components: { SearchCard },
  data() {
    return {
      searchInput: "",
      debounce: null,
      showSearchResults: false,
      searchResult: [{ _id: "" }],
      loading: true,
      defaultTheme,
    };
  },
  methods: {
    async search() {
      this.loading = true;
      if (this.searchInput.length < 3) {
        this.showSearchResults = false;
      } else {
        this.showSearchResults = true;
        clearTimeout(this.debounce);
        this.debounce = setTimeout(async () => {
          const res = await searchCollection(this.searchInput);
          this.searchResult = res.data.result;
          this.loading = false;
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
    close() {
      this.clearSearch();
      this.closeSearchBar();
    },
  },
};
</script>
