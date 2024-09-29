<template>
  <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
    <div
      class="tw-w-full md:tw-px-0 lg:tw-px-0 tw-flex tw-flex-row tw-items-center tw-justify-space-between tw-py-2"
    >
      <h1>KYC Verification</h1>
      <v-spacer></v-spacer>
      <span class="tw-block">Step {{ steps }} of 2</span>
      <v-spacer class="tw-hidden lg:tw-block"></v-spacer>
    </div>
    <div>
      <!-- <ValidationObserver ref="observer" v-slot="{ handleSubmit }"> -->
      <!-- Verification form -->
      <div
        class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
      >
        <v-stepper
          v-model="e1"
          alt-labels
          flat
          dense
          style="background: transparent"
          class="mx-0 px-0"
        >
          <v-stepper-items>
            <ValidationObserver ref="observer" v-slot="{ nextHandle }">
              <v-stepper-content step="1" class="tw-pa-1">
                <form @submit.prevent="">
                  <div class="border-bar tw-px-4 tw-mt-2 tw-mb-4">
                    <h2 class="">Personal Details</h2>
                  </div>
                  <ValidationProvider
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label
                      class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                      >Full Name:</label
                    >
                    <div class="dashboard-text-field-border tw-w-full">
                      <v-text-field
                        v-model="verification.full_name"
                        outlined
                        single-line
                        color="#fff"
                        hide-details
                        clearable
                        class="dashboard-input"
                      ></v-text-field>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <div
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center"
                  >
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                      name="dob"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Date of Birth</label
                      >
                      <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field
                          v-model="verification.dob"
                          outlined
                          single-line
                          color="#fff"
                          hide-details
                          clearable
                          type="date"
                          class="dashboard-input"
                        ></v-text-field>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                      class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                      name="gender"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Gender:</label
                      >
                      <div class="dashboard-text-field-border tw-w-full">
                        <v-select
                          v-model="verification.gender"
                          item-value="value"
                          item-text="label"
                          :items="genderOptions"
                          outlined
                          single-line
                          color="#fff"
                          hide-details
                          clearable
                          class="dashboard-input"
                          :null-value="true"
                        ></v-select>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="border-bar tw-px-4 tw-mt-8 tw-mb-4">
                    <h2 class="">Other Information</h2>
                  </div>
                  <ValidationProvider
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="occupation"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label
                      class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                      >Occupation:</label
                    >
                    <div class="dashboard-text-field-border tw-w-full">
                      <v-text-field
                        v-model="verification.occupation"
                        outlined
                        single-line
                        color="#fff"
                        hide-details
                        clearable
                        class="dashboard-input"
                      ></v-text-field>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <ValidationProvider
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <label
                      class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                      >E-Mail:</label
                    >
                    <div class="dashboard-text-field-border tw-w-full">
                      <v-text-field
                        v-model="verification.email"
                        outlined
                        single-line
                        color="#fff"
                        hide-details
                        clearable
                        class="dashboard-input"
                      ></v-text-field>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <div class="border-bar tw-px-4 tw-mt-8 tw-mb-4">
                    <h2>Residential Address</h2>
                  </div>
                  <ValidationProvider
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="res_country"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label
                      class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                      >Country:</label
                    >
                    <div class="dashboard-text-field-border tw-w-full">
                      <v-select
                        v-model="verification.residential_address.country"
                        :items="resCountryList"
                        outlined
                        single-line
                        color="#fff"
                        hide-details
                        clearable
                        class="dashboard-input"
                        item-value="iso2"
                        item-text="name"
                        @change="onChangeResCountry"
                      ></v-select>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <ValidationProvider
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="res_state"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label
                      class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                      >State:</label
                    >
                    <div class="dashboard-text-field-border tw-w-full">
                      <v-select
                        v-model="verification.residential_address.state"
                        :items="resStateList"
                        outlined
                        single-line
                        color="#fff"
                        hide-details
                        clearable
                        class="dashboard-input"
                        item-value="name"
                        item-text="name"
                      ></v-select>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                  </ValidationProvider>

                  <div
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center"
                  >
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                      name="res_city"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >City/Town/Village</label
                      >
                      <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field
                          v-model="verification.residential_address.city"
                          outlined
                          single-line
                          color="#fff"
                          hide-details
                          clearable
                          aria-placeholder="Eg: Kathmandu"
                          class="dashboard-input"
                          label="Eg: Kathmandu"
                        ></v-text-field>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                      class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                      name="res_code"
                      rules="required|number"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Zip Code</label
                      >
                      <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field
                          v-model="verification.residential_address.zip_code"
                          outlined
                          single-line
                          color="#fff"
                          hide-details
                          clearable
                          aria-placeholder="Eg: 00456"
                          class="dashboard-input"
                          label="Eg: 00456"
                        ></v-text-field>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>

                  <div class="border-bar tw-px-4 tw-mt-8 tw-mb-4">
                    <h2>Permanent Address</h2>
                  </div>
                  <gradient-border-button
                    class="tw-mb-4"
                    @click.native="copyAddress"
                  >
                    Same as Current Address
                  </gradient-border-button>
                  <ValidationProvider
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="per_country"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label
                      class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                      >Country:</label
                    >
                    <div class="dashboard-text-field-border tw-w-full">
                      <v-select
                        v-model="verification.permanent_address.country"
                        :items="countryList"
                        outlined
                        single-line
                        color="#fff"
                        hide-details
                        clearable
                        class="dashboard-input"
                        item-value="iso2"
                        item-text="name"
                        @change="onChangeCountry"
                      ></v-select>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <ValidationProvider
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="per_state"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label
                      class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                      >State:</label
                    >
                    <div class="dashboard-text-field-border tw-w-full">
                      <v-select
                        v-model="verification.permanent_address.state"
                        :items="stateList"
                        outlined
                        single-line
                        color="#fff"
                        hide-details
                        clearable
                        class="dashboard-input"
                        item-value="name"
                        item-text="name"
                      ></v-select>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <div
                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center"
                  >
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                      name="per_city"
                      rules="required|"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >City/Town/Village</label
                      >
                      <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field
                          v-model="verification.permanent_address.city"
                          outlined
                          single-line
                          color="#fff"
                          hide-details
                          clearable
                          class="dashboard-input"
                          label="Eg: Kathmandu"
                        ></v-text-field>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                      class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                      name="per_code"
                      rules="required|number"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Zip Code</label
                      >
                      <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field
                          v-model="verification.permanent_address.zip_code"
                          outlined
                          single-line
                          color="#fff"
                          hide-details
                          clearable
                          class="dashboard-input"
                          label="Eg: 00456"
                        ></v-text-field>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div
                    class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4"
                  >
                    <button
                      class="landing-gradient-border-button tw-w-fit !tw-text-white tw-transition-all tw-duration-500 tw-ease-linear"
                      type="submit"
                      @click="nextClick"
                    >
                      <div
                        class="tw-rounded tw-h-full tw-bg-wapal-background tw-px-6 tw-py-2"
                      >
                        Next
                      </div>
                    </button>
                  </div>
                </form>
              </v-stepper-content>
            </ValidationObserver>

            <ValidationObserver ref="submitObserver" v-slot="{ handleSubmit }">
              <v-stepper-content step="2">
                <form @submit.prevent="handleSubmit(submitVerificationForm)">
                  <div
                    class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
                  >
                    <div class="border-bar tw-px-4 tw-mb-4">
                      <h2>Upload Your Picture</h2>
                    </div>
                    <div
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Profile Picture</label
                      >
                      <div
                        class="tw-flex border-dashed tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full md:tw-flex-row md:tw-justify-start dashboard-text-field-group"
                        ref="documentSelect"
                      >
                        <label
                          class="border-dashed-gradient tw-p-16 tw-cursor-pointer tw-w-full md:tw-w-fit"
                        >
                          <div
                            class="tw-bg-[#878787] border-dashed tw-px-8 tw-py-14 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2"
                            v-if="!image.name"
                          >
                            <v-icon class="!tw-text-wapal-gray"
                              >mdi-image</v-icon
                            >
                            Browse
                          </div>
                          <div
                            class="tw-bg-[#878787] border-dashed tw-px-8 tw-py-14 tw-max-w-4/5 tw-overflow-hidden"
                            v-else
                          >
                            {{ image.name }}
                          </div>
                          <input
                            type="file"
                            class="image-collection"
                            accept="image/*"
                            @change="imageSelected"
                          />
                        </label>
                      </div>
                      <div class="tw-text-red-600" v-if="imageError">
                        {{ imageErrorMessage }}
                      </div>
                    </div>
                    <div
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Document</label
                      >
                      <div
                        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full md:tw-flex-row md:tw-justify-start dashboard-text-field-group"
                        ref="imageSelect"
                      >
                        <label
                          class="dashboard-text-field-border tw-cursor-pointer tw-w-full md:tw-w-fit"
                        >
                          <div
                            class="tw-bg-wapal-background tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
                            v-if="!document[0].name"
                          >
                            Select Document
                          </div>
                          <div
                            class="tw-bg-wapal-background tw-px-4 tw-py-2 tw-rounded-lg tw-max-w-4/5 tw-overflow-hidden"
                            v-else
                          >
                            <span
                              v-for="(singleDocument, index) in document"
                              :key="index"
                            >
                              {{
                                index === document.length - 1
                                  ? singleDocument.name
                                  : `${singleDocument.name},`
                              }}</span
                            >
                          </div>
                          <input
                            type="file"
                            class="image-collection"
                            @change="documentSelected"
                            multiple
                          />
                        </label>
                      </div>
                      <div class="tw-text-red-600" v-if="documentError">
                        {{ documentErrorMessage }}
                      </div>
                    </div>
                    <ValidationProvider
                      class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group"
                      name="gender"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Document Type:</label
                      >
                      <div class="dashboard-text-field-border tw-w-full">
                        <v-select
                          v-model="verification.document.type"
                          item-value="value"
                          item-text="label"
                          :items="documentTypeOptions"
                          outlined
                          single-line
                          color="#fff"
                          hide-details
                          clearable
                          class="dashboard-input"
                          :null-value="true"
                        ></v-select>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <div
                      class="tw-w-full tw-flex tw-items-center tw-justify-center sm:justify-between sm:tw-flex-row tw-flex-col tw-gap-8 tw-py-4"
                    >
                      <button
                        type="button"
                        class="tw-px-8 tw-py-2 tw-bg-[#FF36AB] tw-font-semibold tw-rounded tw-flex-row tw-items-center tw-gap-4"
                        @click="cancelClick"
                      >
                        Back
                      </button>
                      <gradient-border-button
                        type="submit"
                        :disabled="submitting"
                        @click="submitVerificationForm"
                      >
                        <v-progress-circular
                          indeterminate
                          color="white"
                          v-if="submitting"
                        ></v-progress-circular>
                        Submit
                      </gradient-border-button>
                    </div>
                    <div
                      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4"
                    ></div>
                  </div>
                </form>
              </v-stepper-content>
            </ValidationObserver>
          </v-stepper-items>
        </v-stepper>
      </div>
      <!-- vuetify stepper end -->
    </div>
  </div>
</template>

<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";

import { requestVerification } from "@/services/VerificationService";

import AWS from "aws-sdk";

extend("required", {
  ...required,
  message: "This field is required verification",
});

extend("email", {
  validate(value) {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!pattern.test(value)) {
      return false;
    }
    return true;
  },
  message: "Please enter a valid email",
});

extend("number", {
  validate(value) {
    if (isNaN(value)) {
      return false;
    }
    return true;
  },
  message: "This field must be a number",
});

export default {
  layout: "dashboard",
  components: { ValidationProvider, ValidationObserver, GradientBorderButton },
  data() {
    return {
      e1: 1,
      steps: "1",
      invalid: false,
      verification: {
        full_name: null,
        dob: null,
        gender: null,
        occupation: null,
        email: null,
        residential_address: { country: "", state: "", city: "", zip_code: "" },
        permanent_address: { country: "", state: "", city: "", zip_code: "" },
        image: null,
        document: { type: "", documents: [] },
      },
      message: "",
      image: { name: null },
      imageErrorMessage: "",
      imageError: false,
      submitting: false,
      genderOptions: [
        { label: "Select Gender", value: null, disabled: true },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      resSelectedCountryCode: null,
      resSelectedStateId: null,
      resCountryList: [],
      resStateList: [],
      selectedCountryCode: null,
      selectedStateId: null,
      countryList: [],
      stateList: [],
      profilePicture: { name: null },
      document: [{ name: "" }],
      documentTypeOptions: [
        { label: "Select Document Type", value: null, disabled: true },
        { label: "Citizenship", value: "citizenship" },
        { label: "Passport", value: "passport" },
      ],
      documentError: false,
      documentErrorMessage: "",
    };
  },
  methods: {
    imageSelected(event: any) {
      if (event.target.files) {
        this.image = event.target.files[0];
      }
    },

    copyAddress() {
      this.countryList = this.resCountryList;
      this.stateList = this.resStateList;

      this.verification.permanent_address.city =
        this.verification.residential_address.city;

      this.verification.permanent_address.zip_code =
        this.verification.residential_address.zip_code;

      this.verification.permanent_address.country =
        this.verification.residential_address.country;

      this.verification.permanent_address.state =
        this.verification.residential_address.state;
    },
    async nextClick() {
      try {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          this.e1 = 2;
          this.steps = "2";
        }
      } catch (error) {
        this.message = error;
        this.invalid = true;
      }
    },
    cancelClick() {
      this.e1 = 1;
      this.steps = 1;
    },

    fetchCountries() {
      fetch("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.countryList = data.map((country: { iso2: any; name: any }) => ({
            iso2: country.iso2,
            name: country.name,
          }));
        })
        .catch((error) => console.error(error));
    },
    fetchStates() {
      fetch(
        `https://api.countrystatecity.in/v1/countries/${this.verification.permanent_address.country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.stateList = data.map((state: { name: any }) => ({
            name: state.name,
          }));
        })
        .catch((error) => console.error(error));
    },
    onChangeCountry() {
      this.selectedStateId = null;
      this.fetchStates();
    },

    fetchResCountries() {
      fetch("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.resCountryList = data.map(
            (country: { iso2: any; name: any }) => ({
              iso2: country.iso2,
              name: country.name,
            })
          );
        })
        .catch((error) => console.error(error));
    },
    fetchResStates() {
      fetch(
        `https://api.countrystatecity.in/v1/countries/${this.verification.residential_address.country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.resStateList = data.map((state: { name: any }) => ({
            name: state.name,
          }));
        })
        .catch((error) => console.error(error));
    },

    onChangeResCountry() {
      this.resSelectedStateId = null;
      this.fetchResStates();
    },
    documentSelected(event: any) {
      if (!this.document[0].name) {
        this.document = [];
      }
      this.document.push(event.target.files[0]);
    },
    async uploadImage() {
      this.imageError = false;
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(this.image.name.toLowerCase())) {
        this.imageError = true;
        this.imageErrorMessage = "Please upload a jpg, jpeg, png or gif image";
        throw Error("Please upload a jpg, jpeg, png or gif image");
      }

      try {
        const res = await this.awsUpload(this.image);
        this.verification.image = res.Location;
        return true;
      } catch (error) {
        console.log(error);
        this.message = "Something Went Wrong Please try again";
        this.$toast.showMessage({ message: this.message, error: true });
        return false;
      }
    },
    async uploadDocument() {
      this.documentError = false;
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

      this.document.map((singleDocument: any) => {
        if (!allowedExtensions.exec(singleDocument.name.toLowerCase())) {
          this.documentError = true;
          this.documentErrorMessage =
            "Please upload a jpg, jpeg, png or pdf document";
          throw Error("Please upload a jpg, jpeg, png or pdf document");
        }
      });

      try {
        const res: any[] = await Promise.all(
          this.document.map(async (singleDocument: any) => {
            const res = await this.awsUpload(singleDocument);
            return res;
          })
        );

        this.verification.document.documents.push(res[0].Location);
        this.verification.document.documents.push(res[1].Location);
        return true;
      } catch (error) {
        console.log(error);
        this.message = "Something Went Wrong Please try again";
        this.$toast.showMessage({ message: this.message, error: true });
        return false;
      }
    },
    awsUpload(file: any) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const key = Date.now() + this.image.name;

      const params = {
        Bucket: "wapal-images",
        Key: key,
        Body: file,
      };
      return new Promise((resolve, reject) => {
        s3.upload(params, (err: any, data: any) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    },
    async submitVerificationForm() {
      this.submitting = true;

      try {
        await this.uploadImage();
        await this.uploadDocument();

        await requestVerification(this.verification);

        this.$toast.showMessage({
          message: "Verification Request Sent Successfully",
        });

        this.verification = {
          full_name: null,
          dob: null,
          gender: null,
          occupation: null,
          email: null,
          residential_address: {
            country: "",
            state: "",
            city: "",
            zip_code: "",
          },
          permanent_address: { country: "", state: "", city: "", zip_code: "" },
          image: null,
          document: { type: "", documents: [] },
        };

        this.$router.push("/dashboard/");

        this.submitting = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.submitting = false;
      }
    },
  },

  async mounted() {
    this.e1 = 1;
    this.fetchCountries();
    this.fetchResCountries();
  },
};
</script>

<style type="css">
.document .v-text-field__details {
  display: none;
}

.image-collection {
  display: none;
}

.v-stepper__content {
  padding: 0 !important;
}

.border-dashed-gradient {
  display: inline-block;
  border: 2px dashed #0e0d0d;
  background: linear-gradient(#0e0d0d 0 0) padding-box,
    linear-gradient(
        rgba(254, 135, 255, 1),
        rgba(194, 2, 211, 1),
        rgba(94, 15, 255, 1),
        rgba(25, 5, 218, 1)
      )
      border-box;
}
</style>
