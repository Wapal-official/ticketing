<template>
  <div class="tw-pb-8 tw-w-full tw-min-h-screen tw-px-8">
    <div class="tw-container tw-mx-auto">
      <v-tabs
        active-class="!tw-text-wapal-pink"
        class="!tw-bg-transparent"
        id="explore-tab"
        v-model="exploreTab"
        @change="tabChanged(exploreTab)"
      >
        <v-tab
          :ripple="false"
          class="!tw-capitalize !tw-text-white"
          v-for="tab in exploreTabs"
          :key="tab.id"
          >{{ tab.title }}</v-tab
        >
      </v-tabs>
    </div>
    <div class="tw-py-8">
      <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      exploreTab: 0,
      exploreTabs: [
        { id: 0, title: "All NFT" },
        { id: 1, title: "Live" },
        { id: 2, title: "Upcoming" },
      ],
    };
  },
  methods: {
    tabChanged(tab: number) {
      if (tab === 0) {
        this.$router.push(`/explore/all`);
      } else if (tab === 1) {
        this.$router.push(`/explore/live`);
      } else if (tab === 2) {
        this.$router.push(`/explore/upcoming`);
      }
    },
  },
};
</script>
