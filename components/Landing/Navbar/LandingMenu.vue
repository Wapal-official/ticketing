<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-text-base tw-gap-8 md:tw-w-1/2 lg:tw-w-full lg:tw-flex-row lg:!tw-justify-end lg:tw-items-center lg:tw-gap-8"
  >
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div
          class="!tw-text-white tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink tw-uppercase !tw-font-normal"
          v-bind="attrs"
          v-on="on"
        >
          Explore
        </div>
      </template>
      <v-list class="!tw-bg-modal-gray !tw-min-w-[200px]">
        <explore-list-item name="All NFTs" @close="close" />
        <explore-list-item name="Arts" :last="true" @close="close" />
      </v-list>
    </v-menu>
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
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
