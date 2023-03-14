<template>
  <v-app>
    <dashboard-navbar :closeIcon="closeIcon" @toggleSidebar="toggleSidebar" />
    <div class="tw-flex tw-flex-row tw-items-start relative">
      <dashboard-sidebar class="tw-hidden lg:tw-flex" />
      <Nuxt class="!tw-px-8 !tw-py-4" />
    </div>
    <div
      class="tw-absolute tw-w-full tw-top-[95px] tw-left-0 tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-background tw-z-50"
      :class="sidebarClass"
    >
      <dashboard-sidebar @close="closeSideBar" />
    </div>
    <dashboard-footer />
    <upload-progress
      v-if="getUploadingStatus && showUploadProgress"
      @close="closeUploadProgress"
    />
    <toast />
  </v-app>
</template>
<script lang="ts">
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar.vue";
import DashboardFooter from "@/components/Dashboard/DashboardFooter.vue";
import DashboardSidebar from "@/components/Dashboard/Sidebar/DashboardSidebar.vue";
import Toast from "@/components/Reusable/Toast.vue";
import UploadProgress from "@/components/Dashboard/UploadProgress.vue";
import { socket, uploadSocketState } from "@/sockets/socket";
export default {
  middleware: "signup",
  components: {
    DashboardNavbar,
    DashboardFooter,
    DashboardSidebar,
    Toast,
    UploadProgress,
  },
  data() {
    return {
      sidebarClass: "-tw-translate-x-full",
      closeIcon: false,
      showUploadProgress: true,
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
    closeUploadProgress() {
      this.showUploadProgress = false;
    },
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    getUploadingStatus() {
      return uploadSocketState.progress > 0;
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
  watch: {
    walletAddress(newVal: any) {
      if (!newVal) {
        this.$router.push("/");
      }
    },
  },
};
</script>
