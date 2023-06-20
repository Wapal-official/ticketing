<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <div
      class="tw-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <div class="collection1">
        <NuxtLink to="/dashboard/create-collection"
          ><button-gradient-border-button
            >Create New Collection</button-gradient-border-button
          >
        </NuxtLink>
      </div>
    </div>
    <div class="tw-w-full tw-py-2">
      <v-tabs
        active-class="!tw-text-wapal-pink"
        class="!tw-bg-transparent"
        id="explore-tab"
        v-model="launchpadTab"
        @change="tabChanged(launchpadTab)"
      >
        <v-tab
          :ripple="false"
          class="!tw-capitalize !tw-text-white"
          v-for="tab in launchpadTabs"
          :key="tab.id"
          >{{ tab.title }}</v-tab
        >
      </v-tabs>
    </div>
    <div class="tw-py-8 tw-w-full">
      <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  layout: "dashboard",
  data() {
    return {
      launchpadTabs: [
        { id: 0, title: "Live" },
        { id: 1, title: "Under Review" },
        { id: 2, title: "Draft" },
      ],
      launchpadTab: 0,
    };
  },
  methods: {
    tabChanged(tab: number) {
      if (tab === 0) {
        this.$router.push("/dashboard/collection/live");
      } else if (tab === 1) {
        this.$router.push("/dashboard/collection/under-review");
      } else {
        this.$router.push("/dashboard/collection/draft");
      }
    },
  },
  mounted() {
    if (this.$route.path === "/dashboard/collection") {
      this.$router.push("/dashboard/collection/live");
      this.launchpadTab = 0;
    } else if (this.$route.path === "/dashboard/collection/live") {
      this.launchpadTab = 0;
    } else if (this.$route.path === "/dashboard/collection/under-review") {
      this.launchpadTab = 1;
    } else {
      this.launchpadTab = 2;
    }
  },
};
</script>
