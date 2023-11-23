<template>
  <div class="tw-w-screen tw-h-screen !tw-bg-black">
    <div class="tw-px-8 !lg:px-24 tw-pt-6">
      <NuxtLink to="/">
        <img :src="logoHorizontal" alt="logo" width="140px" />
      </NuxtLink>
    </div>
    <div
      class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4 md:tw-px-0"
    >
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-px-4 tw-py-8 tw-rounded tw-border tw-border-dark-6 tw-w-full md:tw-w-1/2 lg:tw-w-1/3 xl:tw-w-1/4"
      >
        <img :src="logo" alt="logo" width="165px" height="165px" />
        <ValidationObserver ref="inviteCode" class="tw-w-full">
          <ValidationProvider name="code" rules="required" v-slot="{ errors }">
            <input-text-field v-model="code" placeholder="Invite Code" />

            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
        </ValidationObserver>
        <button-primary @click="submitCode" title="Submit" :fullWidth="true" />
        <a
          href="https://t.me/wapal_aptos"
          target="_blank"
          class="!tw-text-white"
        >
          Apply for invite code
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";

import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import { submitVerificationCode } from "@/services/VerificationService";

import logoHorizontal from "@/assets/img/logo/logo.svg";
import logo from "@/assets/img/logo/logo-vertical.png";

extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  components: { GradientBorderButton, ValidationProvider, ValidationObserver },
  data() {
    return {
      code: null,
      logo,
      logoHorizontal,
    };
  },
  methods: {
    async submitCode() {
      const validate = await this.$refs.inviteCode.validate();

      if (!validate) {
        return;
      }

      try {
        const res = await submitVerificationCode({ token: this.code });

        if (res.data.verified) {
          if (process.client) {
            localStorage.setItem("verified", "true");
          }

          this.$toast.showMessage({
            message: "Token Verified Successfully",
          });

          if (process.client) {
            location.reload();
          }
          return;
        }

        this.$toast.showMessage({
          message: "Invalid Token Please use another token",
          error: true,
        });
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
  },
};
</script>
