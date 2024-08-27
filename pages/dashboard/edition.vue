<template>
  <div class="tw-w-full">
    <div v-if="this.$route.path !== '/dashboard/edition/create'">
      <h1 class="tw-text-white tw-text-3xl">NFTs</h1>
      <launchpad-guide
        title="Edition Guide"
        itemLink="https://docs.wapal.io/launchpad-overall-guide/create-editions"
      ></launchpad-guide>
      <div
        class="tw-pb-6 tw-pt-3 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
      >
        <div class="tw-w-full">
          <tab-bordered
            :tabs="tabs"
            :tab="launchpadTab"
            @tabChanged="tabChanged"
          />
        </div>
        <div
          class="tw-w-1/5 tw-flex tw-flex-row tw-items-center tw-justify-end"
        >
          <button-primary
            title="Create Event"
            @click="$router.push('/dashboard/edition/create')"
            :bordered="true"
          >
            <template #prepend-icon>
              <i class="bx bx-plus tw-text-xl tw-pr-2"></i>
            </template>
          </button-primary>
        </div>
      </div>
    </div>
    <div class="tw-w-full tw-h-full">
      <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">
import LaunchpadGuide from "~/components/Dashboard/launchpadGuide.vue";

export default {
  layout: "dashboard",
  components: {
    LaunchpadGuide,
  },
  data() {
    return {
      launchpadTab: 0,
      tabs: ["Live"],
    };
  },
  methods: {
    tabChanged(tab: number) {
      switch (tab) {
        case 0:
          this.$router.push("/dashboard/edition/open-edition");
          break;
        case 1:
          this.$router.push("/dashboard/edition/open-edition");
          break;
        case 2:
          this.$router.push("/dashboard/edition/limited-edition");
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    if (
      this.$route.path === "/dashboard/edition" ||
      this.$route.path === "/dashboard/edition/"
    ) {
      this.$router.push("/dashboard/edition/open-edition"); //changed
      this.launchpadTab = 0;
    } else if (this.$route.path === "/dashboard/edition/open-edition") { //changed
      this.launchpadTab = 0;
    } else if (this.$route.path === "/dashboard/edition/open-edition") {
      this.launchpadTab = 1;
    } else {
      this.launchpadTab = 2;
    }
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  watch: {
    path() {
      if (
        this.path === "/dashboard/edition" ||
        this.path === "/dashboard/edition/"
      ) {
        this.$router.push("/dashboard/edition/open-edition"); //changed
        this.launchpadTab = 0;
      } else if (this.path === "/dashboard/edition/open-edition") { //changed
        this.launchpadTab = 0;
      } else if (this.path === "/dashboard/edition/open-edition") {
        this.launchpadTab = 1;
      } else {
        this.launchpadTab = 2;
      }
    },
  },
};
</script>
<style scoped>
::v-deep #explore-tab .v-tabs-slider {
  @apply !tw-bg-transparent;
}
</style>
