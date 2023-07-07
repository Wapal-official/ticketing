<template>
  <default-layout>
    <featured :propCollection="collection" v-if="!loading" />
    <loading-collection v-else />
    <div class="tw-px-8 tw-pt-[6.75em] tw-pb-24 lg:tw-px-[3.75em]">
      <tab-bordered :tab="tab" @tabChanged="tabChanged" class="tw-mb-10" />
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
    };
  },
  async mounted() {
    const res = await getFeaturedCollection();
    this.collection = res.data.collection;
    if (this.$route.path === "/latest-collection") {
      this.tab = 0;
    } else if (this.$route.path === "/upcoming-collection") {
      this.tab = 1;
    }

    this.loading = false;
  },
  methods: {
    tabChanged(tab: number) {
      this.tab = tab;

      switch (tab) {
        case 0:
          this.$router.push("/latest-collection");
          break;
        case 1:
          this.$router.push("/upcoming-collection");
          break;
        default:
          this.$router.push("/latest-collection");
          break;
      }
    },
  },
};
</script>
