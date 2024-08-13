<template>
  <div
    class="sidebar tw-py-4 tw-border-solid tw-border-r tw-border-r-dark-6 tw-flex-col tw-items-start tw-justify-start"
  >
      
    <div
      class="tw-group tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-h-fit tw-px-4"
    >
      <NuxtLink
        v-for="(item, index) in sidebarItems"
        :key="item.path"
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear tw-py-3 tw-px-4 tw-w-full tw-rounded tw-font-medium sidebar-item tw-group hover:!tw-text-primary-2 hover:!tw-bg-dark-6 group-hover:tw-text-white group-hover:tw-bg-transparent"
        :to="item.path"
        :class="{
          'nuxt-link-exact-active': checkCurrentPageRegex(item.path),
          ['dashboard' + (index + 1)]: true,
        }"
        @click.native="close"
      >
        {{ item.name }}
      </NuxtLink>
    </div>
    <!-- <div class="dashboard5 tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-pink"
        to="/dashboard/edition"
        @click.native="close"
      >
        Edition
      </NuxtLink>
    </div> -->
    <!-- <button @click="startTour">Start Tour</button> -->
    <!-- <div class="tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-pink"
        to="/dashboard/verification"
        @click.native="close"
      >
        Verification
      </NuxtLink>
    </div> -->
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      showWhitelist: false,
      showVerification: false,
      showSidebar: true,
      sidebarItems: [
        { path: "/dashboard/edition", name: "Create Events" },
        { path: "/dashboard/collection", name: "Events" }
      ],
    };
  },
  methods: {
    close() {
      this.showSidebar = false;
      this.$emit("close");
    },
    closeClick() {
      this.$emit("hidden");
    },
    checkCurrentPageRegex(path: string) {
      if (this.$route.path.includes(path)) {
        return true;
      }
      return false;
    },
    getDashboardClass(index: number) {
      return `dashboard-${index + 1}`;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.sidebar {
  height: calc(100vh - 75px);
  width: 230px;
}

.relative {
  position: relative;
}

.hidden {
  display: none;
}

.hover\:bg-gray-200:hover {
  background-color: #edf2f7;
}

a.nuxt-link-exact-active {
  @apply !tw-text-primary-2 tw-bg-dark-6;
}
</style>
