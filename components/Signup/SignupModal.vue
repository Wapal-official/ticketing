<template>
  <div
    class="tw-bg-dark-7 tw-px-8 tw-py-4 tw-text-white tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
      <button class="tw-text-black tw-text-base" @click="close">
        <i class="bx bx-x !tw-text-dark-0 !tw-font-semibold tw-text-2xl"></i>
      </button>
    </div>
    <p class="tw-text-sm md:tw-text-lg tw-font-normal tw-pb-4 tw-text-dark-0">
      {{ message }}
    </p>
    <button-primary @click="signMessage" title="Sign Message" />
  </div>
</template>
<script lang="ts">
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import { login } from "@/services/LoginService";
import { HexString } from "aptos";
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

        let signature: any = "";
        let publicKey: any = this.$store.state.walletStore.wallet.publicKey;

        if (res.result) {
          if (res.result.address) {
            body.wallet_address = res.result.address;
          } else {
            body.wallet_address =
              this.$store.state.walletStore.wallet.walletAddress;
          }

          if (res.result.signature[0].data) {
            signature = HexString.fromBuffer(res.result.signature[0].data);
          } else {
            signature = HexString.fromBuffer(res.result.signature);
          }

          body.message = res.result.fullMessage;
        } else {
          if (
            res.signature.signature &&
            res.signature.signature.ephemeralSignature
          ) {
            if (res.address) {
              body.wallet_address = res.address;
            } else {
              body.wallet_address =
                this.$store.state.walletStore.wallet.walletAddress;
            }

            signature = HexString.fromBuffer(
              res.signature.signature.ephemeralSignature.signature.data.data
            );

            const publicKeyHexString: any = HexString.fromBuffer(
              res.signature.signature.ephemeralPublicKey.publicKey.key.data
            );

            publicKey = publicKeyHexString.hexString;
          } else {
            if (res.address) {
              body.wallet_address = res.address;
            } else {
              body.wallet_address =
                this.$store.state.walletStore.wallet.walletAddress;
            }

            if (Array.isArray(res.signature)) {
              if (res.signature[0].data) {
                signature = HexString.fromBuffer(res.signature[0].data.data);
              } else {
                signature = res.signature[0];
              }
            } else {
              if (res.signature.data) {
                signature = HexString.fromBuffer(res.signature.data.data);
              } else {
                signature = res.signature;
              }
            }
          }

          body.message = res.fullMessage;
        }

        let messageBytes = new TextEncoder().encode(body.message);

        body.signature = signature.hexString ? signature.hexString : signature;

        let data = {
          message: encodeBase64(messageBytes),
          wallet_address: body.wallet_address,
          publicKey: publicKey,
          signature: body.signature,
        };

        const loginRes = await login(data);

        this.$store.dispatch("userStore/loginUser", {
          token: loginRes.data.token,
          user_id: loginRes.data.user._id,
        });

        this.$toast.showMessage({ message: "Logged In Successfully" });
        this.$emit("close");
        this.$router.push("/dashboard/edition/open-edition");
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
      }
    },
  },
};
</script>
