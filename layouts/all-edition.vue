<template>
  <default-layout>
    <nft-detail :collection="collection" v-if="!loading && collection" />
    <loading-collection v-else-if="loading" />
    <div
      class="tw-container tw-mx-auto tw-px-8 tw-pb-24 lg:tw-px-[3.75em]"
      ref="tab"
      :class="{ 'tw-pt-8': !loading }"
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
      tabs: ["Live Editions", "Paused Editions"],
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
    await this.checkFeaturedEdition();

    if (this.$route.path === "/live-editions") {
      this.tab = 0;
    } else if (this.$route.path === "/paused-editions") {
      this.tab = 1;
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
          this.$router.push("/paused-editions");
          break;
        default:
          this.$router.push("/live-editions");
          break;
      }
    },
    async checkFeaturedEdition() {
      const res = await getFeaturedCollection();

      const editions = [];

      res.forEach((collection: any) => {
        if (collection.isEdition) {
          editions.push(collection);
        }
      });

      if (editions.length > 0) {
        this.collection = res[0];
      }
    },
  },
  watch: {
    path() {
      setTimeout(() => {
        if (this.$route.path === "/live-editions") {
          this.tab = 0;
        } else if (this.$route.path === "/paused-editions") {
          this.tab = 1;
        }

        this.$refs.tab.scrollIntoView({ behavior: "smooth" });
      }, 50);
    },
  },
};
</script>
