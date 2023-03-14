<template>
  <div
    class="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-w-full md:tw-w-1/2 lg:tw-w-1/4"
    >
      <ValidationProvider
        class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-gap-2 dashboard-text-field-group tw-w-full"
        name="code"
        rules="required"
        v-slot="{ errors }"
      >
        <label
          class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
          >Code</label
        >
        <div class="dashboard-text-field-border tw-w-full">
          <v-text-field
            v-model="code"
            outlined
            single-line
            color="#fff"
            hide-details
            clearable
            class="dashboard-input"
            type="url"
          >
          </v-text-field>
        </div>
        <div class="tw-text-red-600">{{ errors[0] }}</div>
      </ValidationProvider>
      <gradient-border-button @click.native="submitCode">
        Go
      </gradient-border-button>
    </div>
  </div>
</template>
<script lang="ts">
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";

import { extend, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import { submitVerificationCode } from "@/services/VerificationService";

extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  components: { GradientBorderButton, ValidationProvider },
  data() {
    return {
      code: null,
    };
  },
  methods: {
    async submitCode() {
      try {
        const res = await submitVerificationCode({ token: this.code });

        if (res.data.verified) {
          if (process.client) {
            localStorage.setItem("verified", "true");
          }

          this.$toast.showMessage({
            message: "Token Verified Successfully",
          });

          this.$router.push("/");
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
