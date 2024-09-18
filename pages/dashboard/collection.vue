<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <dashboard-page-heading heading="Events" v-if="showTabs" />
    <!-- <launchpad-guide
      v-if="showLaunchpadGuide"
      title="Collection Guide"
      itemLink="https://docs.wapal.io/launchpad-overall-guide/create-a-collection"
    ></launchpad-guide> -->
    <div
      class="tw-w-full tw-pb-6 tw-pt-2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
      v-if="showTabs"
    >
      <div class="tw-w-full">
        <tab-bordered
          :tab="launchpadTab"
          :tabs="launchpadTabs"
          @tabChanged="tabChanged"
        />
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start md:tw-justify-end"
      >
        <button-primary
          :bordered="true"
          title="Create New Event"
          @click="$router.push('/dashboard/edition/create')"
        >
          <template #prepend-icon>
            <i class="bx bx-plus tw-text-xl tw-pr-2"></i>
          </template>
        </button-primary>
      </div>
    </div>
    <div class="tw-pb-6 tw-w-full">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
// import LaunchpadGuide from "~/components/Dashboard/launchpadGuide.vue";

export default {
  layout: "dashboard",
  components: {
    // LaunchpadGuide,
  },
  data() {
    return {
      launchpadTabs: ["Live", "Draft"],
      launchpadTab: 0,
    };
  },
  methods: {
    tabChanged(tab: number) {
      if (tab === 0) {
        this.$router.push("/dashboard/collection/live");
      } else if (tab === 1) {
        this.$router.push("/dashboard/collection/draft");
      } else {
        this.$router.push("/dashboard/collection/draft");
      }
    },
  },
  mounted() {
    if (
      this.$route.path === "/dashboard/collection" ||
      this.$route.path === "/dashboard/collection/"
    ) {
      this.$router.push("/dashboard/collection/live");
      this.launchpadTab = 0;
    } else if (this.$route.path === "/dashboard/collection/live") {
      this.launchpadTab = 0;
    } else if (this.$route.path === "/dashboard/collection/draft") {
      this.launchpadTab = 1;
    } else {
      this.launchpadTab = 2;
    }
  },
  computed: {
    showTabs() {
      const routeRegex =
        /^\/dashboard\/collection\/edit(?:\/((?:[^\/]+?)))?(?:\/(?=$))?$/i;

      if (routeRegex.test(this.$route.path)) {
        return false;
      }

      return true;
    },
    path() {
      return this.$route.path;
    },
    // showLaunchpadGuide() {
    //   return !/^\/dashboard\/collection\/edit(?:\/((?:[^\/]+?)))?(?:\/(?=$))?$/i.test(
    //     this.$route.path
    //   );
    // },
  },
  watch: {
    path() {
      if (
        this.$route.path === "/dashboard/collection" ||
        this.$route.path === "/dashboard/collection/"
      ) {
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
  },
};
</script>
