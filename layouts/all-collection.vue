<template>
  <default-layout>
    <!-- <nft-detail :collection="collection" v-if="!loading" />
    <loading-collection v-else /> -->
    <div
      class="tw-container tw-mx-auto tw-px-8 tw-pb-24 lg:tw-px-[3.75em]"
      ref="tab"
    >
      <Tab :tab="tab" :tabs="tabs" @tabChanged="tabChanged" class="tw-mb-10" />
      <NuxtChild />
    </div>
  </default-layout>
</template>
<script lang="ts">
import { getFeaturedCollection } from "@/services/CollectionService";
import DefaultLayout from "@/layouts/default.vue";
export default {
  layout: "default",
  components: { DefaultLayout },
  data() {
    return {
      collection: null,
      loading: true,
      tab: 0,
      tabs: [
        "Latest Events",
        "Upcoming Events",
        "Soldout Events",
        "Events",
      ],
    };
  },
  async asyncData({ from }: { from: any }) {
    const previousPage = from;

    return { previousPage };
  },
  computed: {
    path() {
      return this.$route.fullPath;
    },
  },
  async mounted() {
    const res = await getFeaturedCollection();

    this.collection = res[0];

    if (this.$route.path === "/live-editions") {
      this.tab = 0;
    } else if (this.$route.path === "/upcoming-editions") {
      this.tab = 1;
    } else if (this.$route.path === "/paused-editions") {
      this.tab = 2;
    } else if (this.$route.path === "/editions") {
      this.tab = 3;
    } else if (this.$route.path === "/auctions") {
      this.tab = 4;
    }

    this.loading = false;
  },
  methods: {
    tabChanged(tab: number) {
      this.tab = tab;

      switch (tab) {
        case 0:
          this.$router.push("/live-editions");
          break;
        case 1:
          this.$router.push("/upcoming-editions");
          break;
        case 2:
          this.$router.push("/paused-editions");
          break;
        case 3:
          this.$router.push("/editions");
          break;
        default:
          this.$router.push("/live-editions");
          break;
      }
    },
  },
  watch: {
    path() {
      setTimeout(() => {
        if (this.$route.path === "/live-editions") {
          this.tab = 0;
        } else if (this.$route.path === "/upcoming-editions") {
          this.tab = 1;
        } else if (this.$route.path === "/paused-editions") {
          this.tab = 2;
        } else if (this.$route.path === "/editions") {
          this.tab = 3;
        } else if (this.$route.path === "/auctions") {
          this.tab = 4;
        }

        this.$refs.tab.scrollIntoView({ behavior: "smooth" });
      }, 50);
    },
  },
};
</script>
