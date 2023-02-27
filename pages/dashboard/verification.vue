<template>
    <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
        <div class="tw-w-full md:tw-px-0 lg:tw-px-0 tw-flex tw-flex-row tw-items-center tw-justify-space-between tw-py-2">
            <h1>KYC Verification</h1>
            <v-spacer></v-spacer>
            <span class="tw-block">Step {{ steps }} of 2</span>
            <v-spacer class="tw-hidden lg:tw-block"></v-spacer>
        </div>
        <div>
            <ValidationObserver>
                <!-- Verification form -->
                <form class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
                    @submit.prevent="">
                    <v-stepper v-model="e1" alt-labels flat dense style="background: transparent" class="mx-0 px-0">
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <div class="border-bar tw-px-4 tw-mb-4">
                                    <h2 class="">Personal Details</h2>
                                </div>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="name" rules="required" v-slot="{ errors }">
                                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Full
                                        Name:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-text-field v-model="verification.name" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-text-field>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <div
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="dob" rules="required" v-slot="{ errors }">
                                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Date of
                                            Birth</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.dob" outlined single-line color="#fff"
                                                hide-details clearable type="date" class="dashboard-input"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                    <ValidationProvider
                                        class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="gender" rules="required" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Gender:</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-select v-model="verification.gender" item-value="value" item-text="label"
                                                :items="genderOptions" outlined single-line color="#fff" hide-details
                                                clearable class="dashboard-input" :null-value="true"></v-select>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                </div>
                                <!-- <div class="border-bar tw-py-4">
                                    <h2>Other Information</h2>
                                </div> -->
                                <div class="border-bar tw-px-4 tw-mt-8 tw-mb-4">
                                    <h2 class="">Other Information</h2>
                                </div>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="occupation" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Occupation:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-text-field v-model="verification.occupation" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-text-field>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="email" rules="required|email" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">E-Mail:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-text-field v-model="verification.email" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-text-field>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <div class="border-bar tw-px-4 tw-mt-8 tw-mb-4">
                                    <h2>Residential Address</h2>
                                </div>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="per_country" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Country:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="resSelectedCountryCode" :items="resCountryList" outlined
                                            single-line color="#fff" hide-details clearable class="dashboard-input"
                                            item-value="iso2" item-text="name" @change="onChangeResCountry"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="per_state" rules="required" v-slot="{ errors }">
                                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">State:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="resSelectedStateId" :items="resStateList" outlined single-line
                                            color="#fff" hide-details clearable class="dashboard-input" item-value="id"
                                            item-text="name"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>

                                <div
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="res_city" rules="required" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">City/Town/Village</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.res_city" outlined single-line color="#fff"
                                                hide-details clearable aria-placeholder="Eg: Kathmandu"
                                                class="dashboard-input" label="Eg: Kathmandu"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                    <ValidationProvider
                                        class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="res_code" rules="required|number" v-slot="{ errors }">
                                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Zip
                                            Code</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.res_code" outlined single-line color="#fff"
                                                hide-details clearable aria-placeholder="Eg: 00456" class="dashboard-input"
                                                label="Eg: 00456"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                </div>

                                <div class="border-bar tw-px-4 tw-mt-8 tw-mb-4">
                                    <h2>Permanent Address</h2>
                                </div>
                                <gradient-border-button class="tw-mb-4" @click.native="copyAddress">
                                    Same as Current Address
                                </gradient-border-button>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="per_country" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Country:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="selectedCountryCode" :items="countryList" outlined single-line
                                            color="#fff" hide-details clearable class="dashboard-input" item-value="iso2"
                                            item-text="name" @change="onChangeCountry"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="per_state" rules="required" v-slot="{ errors }">
                                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">State:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="selectedStateId" :items="stateList" outlined single-line
                                            color="#fff" hide-details clearable class="dashboard-input" item-value="id"
                                            item-text="name"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <div
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="per_city" rules="required|" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">City/Town/Village</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.per_city" outlined single-line color="#fff"
                                                hide-details clearable class="dashboard-input"
                                                label="Eg: Kathmandu"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                    <ValidationProvider
                                        class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="per_code" rules="required|number" v-slot="{ errors }">
                                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Zip
                                            Code</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.per_code" outlined single-line color="#fff"
                                                hide-details clearable class="dashboard-input"
                                                label="Eg: 00456"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                </div>
                                <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4">
                                    <button
                                        class="landing-gradient-border-button tw-w-fit !tw-text-white tw-transition-all tw-duration-500 tw-ease-linear"
                                        type="submit" @click="nextClick">
                                        <div class="tw-rounded tw-h-full tw-bg-wapal-background tw-px-6 tw-py-2">
                                            Next
                                        </div>
                                    </button>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <div
                                    class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]">
                                    <div class="border-bar tw-px-4 tw-mb-4">
                                        <h2>Upload Your Picture</h2>
                                    </div>
                                    <div class="tw-flex tw-px-8 tw-flex-col tw-items-start tw-justify-start tw-gap-2">
                                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Profile
                                            Picture</label>
                                        <div class="tw-flex border-dashed tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full md:tw-flex-row md:tw-justify-start dashboard-text-field-group"
                                            ref="imageSelect">
                                            <label
                                                class="dashboard-text-field-border tw-cursor-pointer tw-w-full md:tw-w-fit">
                                                <div class="tw-bg-[#878787] border-dashed tw-px-8 tw-py-14 tw-rounded-lg tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2"
                                                    v-if="!image.name">
                                                    <v-icon class="!tw-text-wapal-gray">mdi-image</v-icon>
                                                    Browse
                                                </div>
                                                <div class="tw-bg-[#878787] border-dashed tw-px-8 tw-py-14 tw-rounded-lg tw-max-w-4/5 tw-overflow-hidden"
                                                    v-else>
                                                    {{ image.name }}
                                                </div>
                                                <input type="file" class="image-collection" accept="image/*"
                                                    @change="imageSelected" />
                                            </label>
                                        </div>
                                        <div class="tw-text-red-600" v-if="imageError">
                                            {{ imageErrorMessage }}
                                        </div>
                                    </div>
                                    <ValidationProvider
                                        class="tw-flex tww-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                        name="description" rules="required" v-slot="{ errors }">
                                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Upload
                                            Document</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-file-input v-model="verification.document" multiple
                                                class="dashboard-input document" background-color="transparent" color="#fff"
                                                outlined single-line></v-file-input>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                    <div
                                        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center sm:justify-between sm:tw-flex-row tw-flex-col tw-gap-8 tw-py-4">
                                        <button type="button"
                                            class="tw-px-8 tw-py-2 tw-bg-[#FF36AB] tw-font-semibold tw-rounded tw-flex-row tw-items-center tw-gap-4"
                                            @click="cancelClick">
                                            Back
                                        </button>
                                        <gradient-border-button type="submit" :disabled="submitting">
                                            <v-progress-circular indeterminate color="white"
                                                v-if="submitting"></v-progress-circular>
                                            Submit
                                        </gradient-border-button>
                                    </div>
                                    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4">

                                    </div>
                                </div>
                            </v-stepper-content>

                        </v-stepper-items>
                    </v-stepper>
                    <!-- vuetify stepper end -->
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";



extend("required", {
    ...required,
    message: "This field is required",
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
            steps: '1',
            verification: {
                name: null,
                dob: null,
                gender: null,
                occupation: null,
                email: null,
                // res_country: null,
                // res_state: null,
                res_city: null,
                res_code: null,
                // per_country: null,
                // per_state: null,
                per_city: null,
                per_code: null,
                verification_img: null,
                document: null,
            },
            message: "",
            image: { name: null },
            imageErrorMessage: "",
            imageError: false,
            submitting: false,
            genderOptions: [
                { label: 'select', value: null, disabled: true },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
            ],
            resSelectedCountryCode: null,
            resSelectedStateId: null,
            resCountryList: [],
            resStateList: [],
            selectedCountryCode: null,
            selectedStateId: null,
            countryList: [],
            stateList: []
        }
    },
    methods: {
        imageSelected(event: any) {
            this.image = event.target.files[0];
        },

        copyAddress() {
            this.verification.per_code = this.verification.res_city;
            this.verification.per_city = this.verification.res_city;
            this.selectedCountryCode = this.resSelectedCountryCode;
            this.stateList = this.resStateList;
            this.selectedStateId = this.resSelectedStateId;

        },
        nextClick() {
            this.e1 = 2;
            this.steps = 2;
        },
        cancelClick() {
            this.e1 = 1;
            this.steps = 1;
        },

        fetchCountries() {
            fetch("https://api.countrystatecity.in/v1/countries", {
                headers: {
                    "X-CSCAPI-KEY": "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ=="
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.countryList = data.map((country: { iso2: any; name: any; }) => ({
                        iso2: country.iso2,
                        name: country.name
                    }))
                })
                .catch(error => console.error(error))
        },
        fetchStates() {
            fetch(`https://api.countrystatecity.in/v1/countries/${this.selectedCountryCode}/states`, {
                headers: {
                    "X-CSCAPI-KEY": "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ=="
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.stateList = data.map((state: { id: any; name: any; }) => ({
                        id: state.id,
                        name: state.name
                    }))
                })
                .catch(error => console.error(error))
        },
        onChangeCountry() {
            this.selectedStateId = null
            this.fetchStates()
        },

        fetchResCountries() {
            fetch("https://api.countrystatecity.in/v1/countries", {
                headers: {
                    "X-CSCAPI-KEY": "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ=="
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.resCountryList = data.map((country: { iso2: any; name: any; }) => ({
                        iso2: country.iso2,
                        name: country.name
                    }))
                })
                .catch(error => console.error(error))
        },
        fetchResStates() {
            fetch(`https://api.countrystatecity.in/v1/countries/${this.resSelectedCountryCode}/states`, {
                headers: {
                    "X-CSCAPI-KEY": "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ=="
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.resStateList = data.map((state: { id: any; name: any; }) => ({
                        id: state.id,
                        name: state.name
                    }))
                })
                .catch(error => console.error(error))
        },

        onChangeResCountry() {
            this.resSelectedStateId = null
            this.fetchResStates()

        },
    },

    async mounted() {
        this.fetchCountries();
        this.fetchResCountries();
    },
}
</script>

<style type="css">
.document .v-text-field__details {
    display: none;
}

.image-collection {
    display: none;
}

.border-dashed {
    border-style: dotted;
}

.v-stepper__content {
    padding: 0 !important;
}
</style>