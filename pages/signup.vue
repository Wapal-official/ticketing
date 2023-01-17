<template>
  <div
    class="px-8 pb-8 flex flex-col items-center justify-center h-full w-full text-center text-wapal-gray"
  >
    <h2 class="text-3xl text-wapal-gray py-4 font-semibold">Wapal</h2>
    <p class="text-lg">Sign Up Early to get a chance for free promotion.</p>
    <div class="flex flex-col items-center justify-center"></div>
    <div
      class="flex flex-col items-start justify-start text-left w-full md:w-1/2 lg:w-1/4"
    >
      <div class="w-full flex flex-col items-start gap-4 justify-start">
        <label
          class="text-wapal-gray text-lg after:content-['*'] after:text-red-700"
          >Email
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.email"
          label="Enter your Email"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input w-full"
          :rules="rules.email"
          ref="email"
        ></v-text-field>
      </div>
      <div class="w-full flex flex-col items-start gap-4 justify-start">
        <label
          class="text-wapal-gray text-lg after:content-['*'] after:text-red-700"
          >Discord
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.discord"
          label="Enter your Discord Server"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input w-full"
          :rules="rules.discord"
          ref="discord"
        ></v-text-field>
      </div>
      <div class="w-full flex flex-col items-start gap-4 justify-start">
        <label
          class="text-wapal-gray text-lg after:content-['*'] after:text-red-700"
          >Twitter
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.twitter"
          label="Enter your Twitter Handle"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input w-full"
          :rules="rules.twitter"
          ref="twitter"
        ></v-text-field>
      </div>
      <div class="w-full flex flex-col items-start gap-4 justify-start">
        <label
          class="text-wapal-gray text-lg after:content-['*'] after:text-red-700"
          >Website
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.website"
          label="Enter your Website"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input w-full"
          :rules="rules.website"
          ref="website"
        ></v-text-field>
      </div>

      <primary-button
        class="px-6 py-2 bg-wapal-gray text-black rounded text-lg mx-auto mt-8"
        @click.native="validateInputs"
      >
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-[#000000] via-[#34107B] to-[#1B0051]"
          >Submit</span
        >
      </primary-button>
    </div>

    <v-dialog
      v-model="showJoinUsDialog"
      content-class="!w-full mx-4 px-8 py-4 bg-modal-gray border-none text-white  md:!w-1/2 lg:!w-[30%]"
    >
      <div class="w-full flex flex-row items-center justify-end">
        <button class="text-black text-base" @click="close">
          <v-icon class="!text-black !font-semibold">mdi-close</v-icon>
        </button>
      </div>
      <div class="flex flex-col items-center justify-center gap-4">
        <h3 class="text-base md:text-lg">Request Submitted Successfully</h3>

        <h4 class="text-xl">Join us on</h4>
        <div class="flex flex-row items-center justify-between gap-8">
          <a href="https://twitter.com/wapal_official" target="_blank">
            <v-icon
              class="!text-4xl transition duration-200 ease-linear hover:!text-blue-800"
              >mdi-twitter</v-icon
            > </a
          ><a
            href="https://t.co/3KwwcoQ2xW"
            target="_blank"
            class="discord-icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </v-dialog>
    <v-snackbar
      v-model="signupMessage"
      :timeout="5000"
      top
      centered
      :color="defaultTheme.modalGray"
    >
      <div
        class="w-full h-full flex flex-row items-center justify-center gap-2"
      >
        <v-icon class="!text-green-500" v-if="!error">mdi-check-circle</v-icon
        ><v-icon class="!text-red-600" v-else>mdi-close-circle</v-icon
        ><span class="capitalize">{{ message }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { defaultTheme } from "@/theme/wapaltheme";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import SignupService from "@/services/SignupService";
export default {
  middleware: ["signup"],
  components: { PrimaryButton },
  data() {
    return {
      signupForm: {
        email: "",
        wallet_address: "",
        discord: "",
        twitter: "",
        website: "",
      },
      rules: {
        email: [
          (value) => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!(value || "").length > 0) {
              return "Please enter your email";
            } else if (!pattern.test(value)) {
              return "Please enter a valid email";
            }
            return true;
          },
        ],
        discord: [(value) => !!value || "Please enter your discord server"],
        twitter: [(value) => !!value || "Please enter your twitter handle"],
        website: [
          (value) => {
            const pattern =
              /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            if (!(value || "").length > 0) {
              return "Please enter your website";
            } else if (!pattern.test(value)) {
              return "Please enter a valid website";
            }
            return true;
          },
        ],
      },
      formHasErrors: false,
      showJoinUsDialog: false,
      message: "",
      signupMessage: false,
      error: false,
      defaultTheme,
    };
  },
  computed: {
    form() {
      return {
        email: this.signupForm.email,
        discord: this.signupForm.discord,
        twitter: this.signupForm.twitter,
        website: this.signupForm.website,
      };
    },
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
  },
  methods: {
    async validateInputs() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.$refs[f].validate(true)) this.formHasErrors = true;
      });

      if (!this.formHasErrors) {
        this.signupForm.wallet_address = this.walletAddress;

        try {
          await SignupService.signup(this.signupForm);
          this.error = false;
          this.signupMessage = true;
          this.message = "Request Submitted Successfully";
          this.showJoinUsDialog = true;

          Object.keys(this.form).forEach((f) => {
            this.$refs[f].reset();
          });
        } catch (error) {
          this.signupMessage = true;
          this.error = true;
          this.message = error.response.data.msg;
        }
      }
    },
    close() {
      this.showJoinUsDialog = false;
    },
  },
  watch: {
    walletAddress(walletAddress) {
      if (!walletAddress) {
        this.$router.push("/");
      }
    },
  },
};
</script>
