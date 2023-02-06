<template>
  <v-app>
    <dashboard-navbar @toggleSidebar="toggleSidebar" />
    <div class="tw-flex tw-flex-row tw-items-start">
      <dashboard-sidebar class="tw-hidden lg:tw-flex" />
      <Nuxt class="tw-px-8" />
    </div>
    <div
      class="tw-absolute tw-w-full tw-top-[95px] tw-left-0 tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-background"
      :class="sidebarClass"
    >
      <dashboard-sidebar />
    </div>
    <dashboard-footer />
  </v-app>
</template>
<script lang="ts">
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar.vue";
import DashboardFooter from "@/components/Dashboard/DashboardFooter.vue";
import DashboardSidebar from "@/components/Dashboard/Sidebar/DashboardSidebar.vue";
export default {
  middleware: "signup",
  components: { DashboardNavbar, DashboardFooter, DashboardSidebar },
  data() {
    return { sidebarClass: "-tw-translate-x-full" };
  },
  methods: {
    toggleSidebar(isSidebarShowing: boolean) {
      if (!isSidebarShowing) {
        this.sidebarClass = "tw-translate-x-0";
      } else {
        this.sidebarClass = "-tw-translate-x-full";
      }
    },
  },
};
</script>
