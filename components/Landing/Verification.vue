<template>
  <div class="tw-w-screen tw-h-screen">
    <div class="tw-px-8 !lg:px-24 tw-pt-6">
      <NuxtLink to="/">
        <img :src="logoHorizontal" alt="logo" width="120px" />
      </NuxtLink>
    </div>
    <div
      class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4 md:tw-px-0"
    >
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-px-4 tw-py-8 tw-bg-[#001233] tw-rounded tw-w-full md:tw-w-1/2 lg:tw-w-1/4"
      >
        <img :src="logo" alt="logo" width="165px" height="165px" />
        <ValidationObserver ref="inviteCode" class="tw-w-full">
          <ValidationProvider name="code" rules="required" v-slot="{ errors }">
            <input
              v-model="code"
              class="tw-text-white tw-bg-[#0C224B] tw-px-4 tw-py-3 tw-rounded tw-w-full focus:tw-outline-none"
              placeholder="Invite Code"
            />

            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
        </ValidationObserver>
        <button
          @click="submitCode"
          class="tw-bg-[#FF36AB] tw-text-white tw-w-full tw-rounded tw-py-2 tw-text-lg"
        >
          Submit
        </button>
        <div class="tw-text-white tw-text-sm">Apply for invite code</div>
        <!-- <button
          data-tf-popup="JQhGXFFd"
          data-tf-opacity="100"
          data-tf-size="100"
          data-tf-iframe-props="title=My typeform"
          data-tf-transitive-search-params
          data-tf-medium="snippet"
          style="
            all: unset;
            font-family: Helvetica, Arial, sans-serif;
            display: inline-block;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: #0445af;
            color: #fff;
            font-size: 20px;
            border-radius: 25px;
            padding: 0 33px;
            font-weight: bold;
            height: 50px;
            cursor: pointer;
            line-height: 50px;
            text-align: center;
            margin: 0;
            text-decoration: none;
          "
        >
          Try me!
        </button> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";

import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import { submitVerificationCode } from "@/services/VerificationService";

import logoHorizontal from "@/assets/img/logo/logo-horizontal-white.png";
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
  mounted() {
    if (process.client) {
      let script = document.createElement("script");
      script.src = "//embed.typeform.com/next/embed.js";
      document.body.appendChild(script);
    }
  },
};
</script>
