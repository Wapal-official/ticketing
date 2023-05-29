<template>
  <div
    class="sidebar tw-flex tw-flex-col tw-items-start tw-justify-start tw-px-16"
  >
    <div class="dashboard1 tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-pink"
        to="/dashboard/assets"
        @click.native="close"
      >
        Assets
      </NuxtLink>
    </div>
    <div class="dashboard2 tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-pink"
        to="/dashboard"
        @click.native="close"
      >
        Launchpad
      </NuxtLink>
    </div>
    <div class="dashboard3 tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-pink"
        to="/dashboard/whitelist"
        @click.native="close"
      >
        Whitelist
      </NuxtLink>
    </div>
    <div class="dashboard4 tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-pink"
        to="/dashboard/auction"
        @click.native="close"
      >
        Auction
      </NuxtLink>
    </div>
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
  },
  mounted() {},
};
</script>
<style scoped>
.sidebar {
  height: calc(100vh - 95px);
  width: 320px;
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
  @apply !tw-text-wapal-pink;
}
</style>
