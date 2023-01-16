<template>
  <div
    class="flex flex-row items-center justify-center gap-8 h-full py-60 md:py-80 lg:py-40 relative overflow-hidden"
  >
    <div
      class="text-white px-8 lg:w-[60%] flex flex-col items-center justify-center gap-10 text-center"
    >
      <h1
        class="text-3xl font-semibold text-wapal-gray flex flex-col items-center justify-center gap-2"
      >
        Zero Code, Zero Fee NFT Creator Studio on
        <span>Aptos and Sui</span>
      </h1>
      <primary-button @click.native="checkWalletStatus"
        >Sign Up Early</primary-button
      >
    </div>
    <div
      class="absolute z-[999] top-[30%] left-1/5 md:left-1/2 lg:left-[70%] px-24 py-4 bg-[#EA59BE] text-white transition duration-1000 ease-linear transform"
      :class="signUpToastClass"
    >
      Connect Your wallet First
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
export default {
  name: "IndexPage",
  components: { PrimaryButton },
  data() {
    return {
      signUpToastClass: "translate-x-[700%]",
    };
  },
  methods: {
    checkWalletStatus() {
      if (this.$store.state.walletStore.wallet.wallet) {
        this.$router.push("/signup");
      } else {
        this.signUpToastClass = "translate-x-0";
        setTimeout(() => {
          this.signUpToastClass = "translate-x-[700%]";
        }, 5000);
      }
    },
  },
};
</script>
