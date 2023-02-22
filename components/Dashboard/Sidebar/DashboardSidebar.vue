<template>
  <div class="sidebar tw-flex tw-flex-col tw-items-start tw-justify-start tw-px-16">
    <div class="tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-dashboard-active"
        to="/dashboard">
        Launchpad
      </NuxtLink>
    </div>
    <div class="tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-dashboard-active"
        to="/dashboard/assets">
        Assets
      </NuxtLink>
    </div>
    <!-- <v-list-group :ripple="false" id="explore-list-group" v-model="showWhitelist"
      active-class="!tw-text-wapal-dashboard-active tw-pa-0" class="!tw-text-white tw-w-full">
      <template v-slot:activator class="focus:before:!tw-opacity-0" @click="showWhitelist = !showWhitelist">
        <span class="tw-w-full hover:!tw-text-wapal-dashboard-active"> WhiteList</span>
      </template>
      <v-list-item>
        <NuxtLink
          class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-dashboard-active"
          to="/dashboard/whitelist/create-whitelist">
          Create Whitelist
        </NuxtLink>
      </v-list-item>
      <v-list-item>
        <NuxtLink
          class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-dashboard-active"
          to="/dashboard/whitelist/list-whitelist">
          list Whitelist
        </NuxtLink>
      </v-list-item>
    </v-list-group> -->
    <div class="tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-dashboard-active"
        to="/dashboard/whitelist">
        WhiteList
      </NuxtLink>
    </div>
    <div class="tw-px-4 min-h-48 tw-d-block tw-my-3">
      <NuxtLink
        class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear hover:!tw-text-wapal-dashboard-active"
        to="/dashboard/verification">
        Verification
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return { showWhitelist: false, showVerification: false };
  },
  methods: {
    close() {
      this.showWhitelist = false;
      this.showVerification = false;
      this.$emit("close");
    },
  },
};
</script>
<style>
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
</style>