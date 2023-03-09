<template>
  <div class="tw-bg-modal-gray tw-px-8 tw-py-4 tw-text-white tw-text-center">
    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
      <button class="tw-text-black tw-text-base" @click="close">
        <v-icon class="!tw-text-black !tw-font-semibold">mdi-close</v-icon>
      </button>
    </div>
    <p class="tw-text-sm md:tw-text-lg tw-font-normal tw-pb-4">
      Wallet registered successfully.
    </p>
    <p class="tw-text-sm md:tw-text-lg tw-font-normal tw-pb-4">
      Sign in a message to log in into Wapal
    </p>
    <primary-button @click.native="signMessage">Sign Message</primary-button>
  </div>
</template>
<script lang="ts">
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import { login } from "@/services/LoginService";

export default {
  components: { PrimaryButton },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async signMessage() {
      try {
        const res = await this.$store.dispatch("walletStore/signLoginMessage");
        console.log(res);

        const body = { walletAddress: "", signature: "" };
        if (res.result) {
          if (res.result.address) {
            body.walletAddress = res.result.address;
          } else {
            body.walletAddress =
              this.$store.state.walletStore.wallet.walletAddress;
          }

          if (Array.isArray(res.result.signature)) {
            body.signature = res.result.signature[0];
          } else {
            body.signature = res.result.signature;
          }
        } else {
          if (res.address) {
            body.walletAddress = res.address;
          } else {
            body.walletAddress =
              this.$store.state.walletStore.wallet.walletAddress;
          }

          if (Array.isArray(res.signature)) {
            body.signature = res.signature[0];
          } else {
            body.signature = res.signature;
          }
        }
        console.log(body);

        // const loginRes = await login(body);

        this.$toast.showMessage({ message: "Logged In Successfully" });
        this.$emit("close");
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
      }
    },
  },
};
</script>
