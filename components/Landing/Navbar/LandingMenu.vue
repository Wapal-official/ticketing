<template>
  <div
    class="flex flex-col items-start justify-start w-full text-base gap-8 md:w-1/2 lg:w-full lg:flex-row lg:justify-between lg:items-center"
  >
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div
          class="!text-white transition duration-200 ease-linear hover:!text-wapal-pink uppercase !font-normal"
          v-bind="attrs"
          v-on="on"
        >
          Explore
        </div>
      </template>
      <v-list class="!bg-modal-gray !min-w-[200px]">
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
