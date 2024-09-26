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
        <div v-if="loading" class="tw-text-white">Verifying...</div>
        <div v-else-if="error" class="tw-text-red-600">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { submitVerificationCode } from "@/services/VerificationService";
import logoHorizontal from "@/assets/img/logo/logo.svg";
import logo from "@/assets/img/logo/logo-vertical.png";

export default {
  data() {
    return {
      loading: true,
      error: null,
      logo,
      logoHorizontal,
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem("inviteToken"); 
      if (token) {
        const res = await submitVerificationCode({ token });
        if (res.data.verified) {
          localStorage.setItem("verified", "true");
          this.$toast.showMessage({
            message: "Token Verified Successfully",
          });
          this.$router.push("/next-page"); 
        } else {
          this.error = "Invalid Token. Please use another token.";
        }
      } else {
        this.error = "No token found. Please provide a valid token.";
      }
    } catch (error) {
      this.error = "An error occurred during verification.";
      this.$toast.showMessage({ message: this.error, error: true });
    } finally {
      this.loading = false; 
    }
  },
};
</script>