<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-text-base tw-gap-4 lg:tw-flex-row lg:!tw-justify-end lg:tw-items-center lg:tw-gap-8"
  >
    <div class="tw-hidden lg:tw-flex">
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <NuxtLink
              to="/explore"
              class="!tw-text-white tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink tw-uppercase !tw-font-normal"
            >
              Explore
            </NuxtLink>
          </div>
        </template>
        <v-list class="!tw-bg-modal-gray !tw-min-w-[200px]">
          <explore-list-item name="All NFTs" @close="close" />
          <explore-list-item name="Arts" :last="true" @close="close" />
        </v-list>
      </v-menu>
    </div>
    <div class="tw-flex tw-w-full lg:tw-hidden">
      <v-list-group
        :ripple="false"
        id="explore-list-group"
        v-model="showExploreMenu"
        active-class="!tw-text-wapal-pink "
        class="!tw-text-white tw-w-full"
      >
        <template
          v-slot:activator
          class="focus:before:!tw-opacity-0"
          @click="showExploreMenu = !showExploreMenu"
        >
          <span class="tw-w-full"> Explore</span>
        </template>
        <explore-list-item name="All NFTs" @close="close" />
        <explore-list-item name="Arts" :last="true" @close="close" />
      </v-list-group>
    </div>
    <menu-item text="FAQS" link="/faq" @close="close" />
    <connect-wallet @close="close" />
  </div>
</template>
<script lang="ts">
import MenuItem from "@/components/Landing/Navbar/MenuItem.vue";
import ConnectWallet from "@/components/Reusable/ConnectWallet.vue";
import ExploreListItem from "@/components/Landing/Navbar/ExploreListItem.vue";
export default {
  components: { MenuItem, ConnectWallet, ExploreListItem },
  data() {
    return { showExploreMenu: false };
  },
  methods: {
    close() {
      this.showExploreMenu = false;
      this.$emit("close");
    },
  },
};
</script>
