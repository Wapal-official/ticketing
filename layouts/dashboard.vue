<template>
  <v-app>
    <dashboard-navbar :closeIcon="closeIcon" @toggleSidebar="toggleSidebar" />
    <div class="tw-flex tw-flex-row tw-items-start">
      <dashboard-sidebar class="tw-hidden lg:tw-flex" />
      <Nuxt class="!tw-px-8 !tw-py-4" />
    </div>
    <div
      class="tw-absolute tw-w-full tw-top-[95px] tw-left-0 tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-background"
      :class="sidebarClass">
      <dashboard-sidebar @close="closeSideBar" />
    </div>
    <dashboard-footer />
    <toast />
  </v-app>
</template>
<script lang="ts">
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar.vue";
import DashboardFooter from "@/components/Dashboard/DashboardFooter.vue";
import DashboardSidebar from "@/components/Dashboard/Sidebar/DashboardSidebar.vue";
import Toast from "@/components/Reusable/Toast.vue";
export default {
  middleware: "signup",
  components: { DashboardNavbar, DashboardFooter, DashboardSidebar, Toast },
  data() {
    return {
      sidebarClass: "-tw-translate-x-full",
      closeIcon: false
    };
  },
  methods: {
    toggleSidebar(isSidebarShowing: boolean) {
      if (!isSidebarShowing) {
        this.sidebarClass = "tw-translate-x-0";
        this.closeIcon = true;

      } else {
        this.sidebarClass = "-tw-translate-x-full";
        this.closeIcon = false;

      }
    },
    closeSideBar() {
      this.sidebarClass = "-tw-translate-x-full";
      this.closeIcon = false;
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener("dragenter", (e) => e.preventDefault());
      window.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer!.dropEffect = "copy";

        const element = e.target as Element;

        if (element.id !== "drop-zone") {
          e.preventDefault();
          e.dataTransfer!.effectAllowed = "none";
          e.dataTransfer!.dropEffect = "none";
        }
      });
      window.addEventListener("dragleave", (e) => e.preventDefault());
      window.addEventListener("drop", (e) => {
        e.preventDefault();

        const element = e.target as Element;

        e.dataTransfer!.dropEffect = "copy";

        if (element.id !== "drop-zone") {
          e.preventDefault();
          e.dataTransfer!.effectAllowed = "none";
          e.dataTransfer!.dropEffect = "none";
        }
      });
    }
  },
};
</script>
