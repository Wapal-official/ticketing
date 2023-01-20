<template>
  <div
    class="flex flex-col items-start justify-start w-full text-base gap-8 md:w-1/2 lg:w-full lg:flex-row lg:justify-between lg:items-center"
  >
    <menu-item text="FAQS" link="/faq" @close="close" />
    <connect-wallet @close="close" />
  </div>
</template>
<script lang="ts">
import MenuItem from "@/components/Landing/Navbar/MenuItem.vue";
import ConnectWallet from "@/components/Reusable/ConnectWallet.vue";
export default {
  components: { MenuItem, ConnectWallet },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
