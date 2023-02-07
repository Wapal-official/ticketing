<template>
  <div
    class="tw-px-8 tw-pb-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-w-full tw-text-center tw-text-wapal-gray"
  >
    <h2 class="tw-text-3xl tw-text-wapal-gray tw-py-4 tw-font-semibold">
      Wapal
    </h2>
    <p class="tw-text-lg">Sign Up Early to get a chance for free promotion.</p>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center"></div>
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-text-left tw-w-full md:tw-w-1/2 lg:tw-w-1/4"
    >
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-gap-4 tw-justify-start"
      >
        <label
          class="tw-text-wapal-gray tw-text-lg after:tw-content-['*'] after:tw-text-red-700"
          >Email
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.email"
          label="Enter your Email"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input tw-w-full"
          :rules="rules.email"
          ref="email"
          type="email"
        ></v-text-field>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-gap-4 tw-justify-start"
      >
        <label
          class="tw-text-wapal-gray tw-text-lg after:tw-content-['*'] after:tw-text-red-700"
          >Discord
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.discord"
          label="Enter your Discord Server"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input tw-w-full"
          :rules="rules.discord"
          ref="discord"
        ></v-text-field>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-gap-4 tw-justify-start"
      >
        <label
          class="tw-text-wapal-gray tw-text-lg after:tw-content-['*'] after:tw-text-red-700"
          >Twitter
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.twitter"
          label="Enter your Twitter Handle"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input tw-w-full"
          :rules="rules.twitter"
          ref="twitter"
          type="email"
        ></v-text-field>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-gap-4 tw-justify-start"
      >
        <label
          class="tw-text-wapal-gray tw-text-lg after:tw-content-['*'] after:tw-text-red-700"
          >Website
        </label>
        <v-text-field
          outlined
          single-line
          v-model="signupForm.website"
          label="Enter your Website"
          clearable
          :color="defaultTheme.wapalGray"
          class="signup-input tw-w-full"
          :rules="rules.website"
          ref="website"
          type="url"
        ></v-text-field>
      </div>

      <primary-button
        class="tw-px-6 tw-py-2 tw-bg-wapal-gray tw-text-black tw-rounded tw-text-lg tw-mx-auto tw-mt-8"
        @click.native="validateInputs"
        >Submit
      </primary-button>
    </div>

    <v-dialog
      v-model="showJoinUsDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white  md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
        <button class="tw-text-black tw-text-base" @click="close">
          <v-icon class="!tw-text-black !tw-font-semibold">mdi-close</v-icon>
        </button>
      </div>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4"
      >
        <h3 class="tw-text-base md:tw-text-lg">
          Request Submitted Successfully
        </h3>

        <h4 class="tw-text-xl">Join us on</h4>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8"
        >
          <a href="https://twitter.com/wapal_official" target="_blank">
            <v-icon
              class="!tw-text-4xl tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-blue-800"
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
        class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2"
      >
        <v-icon class="!tw-text-green-500" v-if="!error"
          >mdi-check-circle</v-icon
        ><v-icon class="!tw-text-red-600" v-else>mdi-close-circle</v-icon
        ><span class="tw-capitalize">{{ message }}</span>
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
