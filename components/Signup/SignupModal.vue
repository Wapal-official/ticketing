<template>
  <div class="tw-bg-modal-gray tw-px-8 tw-py-4 tw-text-white tw-text-center">
    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
      <button class="tw-text-black tw-text-base" @click="close">
        <i class="bx bx-x !tw-text-black !tw-font-semibold tw-text-2xl"></i>
      </button>
    </div>
    <p class="tw-text-sm md:tw-text-lg tw-font-normal tw-pb-4">
      {{ message }}
    </p>
    <primary-button @click.native="signMessage">Sign Message</primary-button>
  </div>
</template>
<script lang="ts">
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import { login } from "@/services/LoginService";
import nacl from "tweetnacl";
import { encodeBase64 } from "tweetnacl-util";

export default {
  props: {
    message: { type: String, default: "Sign a message to log in into Wapal" },
  },
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

        const body = { wallet_address: "", message: "", signature: "" };

        if (res.result) {
          if (res.result.address) {
            body.wallet_address = res.result.address;
          } else {
            body.wallet_address =
              this.$store.state.walletStore.wallet.walletAddress;
          }

          if (Array.isArray(res.result.signature)) {
            body.signature = res.result.signature[0];
          } else {
            body.signature = res.result.signature;
          }

          body.message = res.result.fullMessage;
        } else {
          if (res.address) {
            body.wallet_address = res.address;
          } else {
            body.wallet_address =
              this.$store.state.walletStore.wallet.walletAddress;
          }

          if (Array.isArray(res.signature)) {
            body.signature = res.signature[0];
          } else {
            body.signature = res.signature;
          }
          body.message = res.fullMessage;
        }

        let messageBytes = new TextEncoder().encode(body.message);

        let data = {
          message: encodeBase64(messageBytes),
          wallet_address: body.wallet_address,
          publicKey: this.$store.state.walletStore.wallet.publicKey,
          signature: body.signature,
        };

        const loginRes = await login(data);

        this.$store.dispatch("userStore/loginUser", {
          token: loginRes.data.token,
          user_id: loginRes.data.user._id,
        });

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
