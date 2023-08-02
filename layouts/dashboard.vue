<template>
  <v-app
    class="tw-w-full tw-h-full tw-overflow-hidden !tw-bg-dark-8 no-scrollbar"
  >
    <verification v-if="!getVerifiedStatus" />
    <div v-else>
      <dashboard-navbar :closeIcon="closeIcon" @toggleSidebar="toggleSidebar" />
      <div class="tw-w-full tw-h-[1px] tw-bg-dark-6"></div>
      <div class="tw-flex tw-flex-row tw-items-start relative tw-w-full">
        <dashboard-sidebar class="tw-hidden lg:tw-flex" />
        <div
          class="dashboard-container tw-overflow-auto no-scrollbar"
          ref="container"
          id="container"
        >
          <Nuxt class="!tw-px-6 !tw-py-8 tw-h-screen" />
        </div>
      </div>
      <div
        class="tw-absolute tw-w-full tw-top-[95px] tw-left-0 tw-transition-all tw-duration-150 tw-ease-linear tw-bg-dark-8 tw-z-50"
        :class="sidebarClass"
      >
        <dashboard-sidebar @close="closeSideBar" />
      </div>
      <!-- <dashboard-footer /> -->
      <upload-progress
        v-if="getUploadingStatus && getUploadingBar"
        @close="closeUploadProgress"
      />
    </div>
    <toast />
  </v-app>
</template>
<script lang="ts">
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar.vue";
import DashboardFooter from "@/components/Dashboard/DashboardFooter.vue";
import DashboardSidebar from "@/components/Dashboard/Sidebar/DashboardSidebar.vue";
import Toast from "@/components/Reusable/Toast.vue";
import UploadProgress from "@/components/Dashboard/UploadProgress.vue";
import Verification from "@/components/Landing/Verification.vue";
import tourMixin from "@/mixins/tourMixin.js";
import { uploadSocketState } from "@/sockets/socket";
export default {
  middleware: "signup",
  components: {
    DashboardNavbar,
    DashboardFooter,
    DashboardSidebar,
    Toast,
    UploadProgress,
    Verification,
  },
  mixins: [tourMixin],
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
    userId() {
      return this.$store.state.userStore.user.user_id;
    },
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    getUploadingStatus() {
      return uploadSocketState.progress > 0;
    },
    getVerifiedStatus() {
      if (process.client) {
        return JSON.parse(localStorage.getItem("verified") || "false");
      }
      return false;
    },
    getUploadingBar() {
      return uploadSocketState.showUploadBar;
    },

    walkthroughMobile() {
      return this.$store.state.tourStore.openSidebar;
    },
    path() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    // this.startTour({ store: this.$store });

    const verified = JSON.parse(localStorage.getItem("verified") || "");
    if (verified) {
      if (localStorage.getItem("seen_asset_tour") === null) {
        this.startTour({ store: this.$store });

        localStorage.setItem("seen_asset_tour", "true");
      }
    }
    this.$store.dispatch("walletStore/initializeWallet");
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
    walkthroughMobile(storage: any) {
      if (storage) {
        this.sidebarClass = "tw-translate-x-0";
      } else {
        this.sidebarClass = "-tw-translate-x-full";
      }
    },

    walletAddress(newVal: any) {
      if (!newVal) {
        this.$router.push("/");
      }
    },
    userId(newVal: any) {
      if (!newVal) {
        this.$router.push("/");
        this.$toast.showMessage({
          message: `${this.walletStore.wallet} Wallet Disconnected Successfully`,
        });
      }
    },
    path() {
      this.$refs.container.scrollTo(0, 0);
    },
  },
};
</script>
<style>
.v-breadcrumbs {
  padding-left: 0 !important;
}

.dashboard-container {
  width: calc(100vw - 230px);
  height: calc(100vh - 75px);
}

@media only screen and (max-width: 1024px) {
  .dashboard-container {
    width: 100%;
    height: 100%;
  }
}
</style>
