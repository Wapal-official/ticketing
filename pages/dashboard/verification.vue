<template>
    <div class="tw-w-full md:tw-px-16 lg:tw-px-0">
        <div class="tw-w-full md:tw-px-16 lg:tw-px-7 tw-flex tw-flex-row tw-items-center tw-justify-space-between tw-py-4">
            <h1>KYC Verification</h1>
            <v-spacer></v-spacer>
            <span class="tw-d-block">Step {{ steps }} of 2</span>
            <!-- <span v-if="e1 = 1" class="tw-d-block">Step 1 of 2</span> -->
            <!-- <span v-else class="tw-d-block">Step 2 of 2</span> -->
            <v-spacer></v-spacer>
        </div>
        <div>
            <ValidationObserver>
                <!-- Verification form -->
                <form class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
                    @submit.prevent="">
                    <!-- vuetify steppers start -->
                    <!-- <VueCountryRegionSelect v-model="selected" :country-options="countries" :region-options="regions"
                        :country-placeholder="'Select country'" :region-placeholder="'Select region'" :disabled="loading" /> -->

                    <v-stepper v-model="e1" alt-labels flat dense style="background: transparent" class="">
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
                                    name="res_country" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Country:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select :items="resCountry" item-text="name" item-value="isoCode"
                                            v-model="verification.res_country" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="res_state" rules="required" v-slot="{ errors }">
                                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">State:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select :items="resState" item-text="name" item-value="isoCode"
                                            v-model="verification.res_state" outlined single-line color="#fff" hide-details
                                            clearable class="dashboard-input"></v-select>
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
                                <!-- <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="per_country" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Country:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select :items="perCountry" item-text="name" item-value="isoCode"
                                            v-model="verification.per_country" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-py-1 tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="per_state" rules="required" v-slot="{ errors }">
                                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">State:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select :items="verification.per_country ? perState : []" item-text="name"
                                            item-value="isoCode" v-model="verification.per_state" outlined single-line
                                            color="#fff" hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider> -->
                                <v-select v-model="verification.per_country" :items="countries" label="Country"
                                    item-value="_id" item-text="name" />
                                <v-select v-model="verification.per_state" :items="states" label="State" item-value="_id"
                                    item-text="name" />
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
                                <!-- <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4">
                                    <button class="dashboard-gradient-button tw-font-semibold" type="submit"
                                        @click="nextClick">
                                        Next
                                    </button>
                                </div> -->
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
                                                <div class="tw-bg-[#878787] border-dashed tw-px-8 tw-py-14 tw-rounded-lg tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
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
                                    <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-py-4">
                                        <button type="button"
                                            class="tw-px-8 tw-py-2 tw-bg-[#FF36AB] tw-font-semibold tw-rounded tw-flex-row tw-items-center tw-gap-4"
                                            @click="cancelClick">
                                            Cancel
                                        </button>
                                        <!-- <v-spacer></v-spacer> -->
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

                            <!-- <v-stepper-content step="3"> 
                                <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2">
                                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Image
                                        Collection</label>
                                    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full md:tw-flex-row md:tw-justify-start dashboard-text-field-group"
                                        ref="imageSelect">
                                        <label class="dashboard-text-field-border tw-cursor-pointer tw-w-full md:tw-w-fit">
                                            <div class="tw-bg-wapal-background tw-px-4 tw-py-1 tw-rounded-lg tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
                                                v-if="!image.name">
                                                <v-icon class="!tw-text-wapal-gray">mdi-image</v-icon>
                                                Select Image
                                            </div>
                                            <div class="tw-bg-wapal-background tw-px-4 tw-py-1 tw-rounded-lg tw-max-w-4/5 tw-overflow-hidden"
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
                                <v-btn color="primary" @click="e1 = 1">
                                    Continue
                                </v-btn>
                            </v-stepper-content> -->
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
import { createCollection } from "@/services/CollectionService";
// import countryList from "country-list";
// import VueCountryRegionSelect from 'vue-country-region-select';
// import CountryStateCity from 'country-state-city';
import { Country, State, City } from 'country-state-city';
import { getStatesByCountryId, getCitiesByStateId } from '@/services/countryStateCity';
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
                res_country: null,
                res_state: null,
                res_city: null,
                res_code: null,
                per_country: null,
                per_state: null,
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
            perCountry: [],
            perState: [],
            resCountry: [],
            resState: [],
            countries: [],
            states: []
        }
    },
    methods: {
        imageSelected(event: any) {
            this.image = event.target.files[0];
        },

        copyAddress() {
            const { res_country, res_state, res_code, res_city, } = this.verification;
            this.verification = {
                ...this.verification,
                per_counter: res_country,
                per_state: res_state,
                per_code: res_code,
                per_city: res_city,
            };
        },
        nextClick() {
            this.e1 = 2;
            this.steps = 2;
        },
        cancelClick() {
            this.e1 = 1;
            this.steps = 1;
        },
        // getStatesByCountry() {
        //     if (this.selectedCountry) {
        //         const countryStates = State.getStatesOfCountry(this.selectedCountry.isoCode);
        //         this.states = countryStates;
        //     } else {
        //         this.states = [];
        //     }
        // },
        // getCountries() {
        //     const allCountries = Country.getAllCountries();
        //     this.countries = allCountries;
        // },
        // async updateStates() {
        //     if (this.selectedCountry) {
        //         this.states = await State.getStatesOfCountry(this.selectedCountry.isoCode);
        //     } else {
        //         this.states = [];
        //     }
        //     this.selectedState = null;
        // },
    },

    async created() {

    },
    computed: {
        // perStates() {
        //     const selectedCountry = this.verification.per_country;
        //     if (!selectedCountry) {
        //         return [];
        //     }
        //     return this.states.filter((state: { country_id: any; }) => state.country_id === selectedCountry);
        // },
    },

    async mounted() {
        this.countries = await Country.getAllCountries();
        // console.log(this.countries.isoCode == "IN");
        // console.log(Country.getAllCountries())
        // console.log(State.getStateByCode())
        const resCountries: any[] = await Country.getAllCountries();
        resCountries.map((resCountryList: any) => {
            this.resCountry.push({
                name: resCountryList.name,
                isoCode: resCountryList._id
            });
            // console.log(countries)
        });
        const resStates: any[] = await State.getAllStates();
        resStates.map((resStateList: any) => {
            this.resState.push({
                name: resStateList.name,
                isoCode: resStateList._id
            });
            // console.log(countries)
        });
        // const states: any[] = await State.getAllStates();
        // states.map((stateList: any) => {
        //     this.perState.push({
        //         name: stateList.name,
        //         _id: stateList._id
        //     });
        // })
        // console.log(await Country.getAllCountries())
        const countries: any[] = await Country.getAllCountries();
        this.perCountry = countries.map((countryList: { name: any; _id: any; }) => {
            return {
                name: countryList.name,
                isoCode: countryList._id
            };
        });

        if (this.perCountry.isoCode == this.perState.isoCode) {
            const perStates: any[] = await State.getAllStates();
            perStates.map((perStateList: any) => {
                this.perState.push({
                    name: perStateList.name,
                    isoCode: perStateList._id
                });
                // console.log(countries)
            });
        }
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://api.countrystatecity.in/v1/countries',
            headers: {
                'X-CSCAPI-KEY': 'MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==Y'
            }
        };

        axios(config)
            .then(function (response: { data: any; }) {
                console.log("axxxxios" + JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                console.log(error);
            });

        // const headers = new Headers();
        // headers.append("X-CSCAPI-KEY", "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==");

        // const requestOptions: RequestInit = {
        //     method: 'GET',
        //     headers: headers,
        //     redirect: 'follow'
        // };

        // const countries: any[] = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
        // const response = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions);
        // const countries = await response.json();
        // return countries;

        // countries.map((countryList: any) => {
        //     this.perCountry.push({
        //         name: countryList.name,
        //         value: countryList._id
        //     });
        //     console.log(countries)
        // }),
        // const headers = new Headers({ "X-CSCAPI-KEY": "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==" });

        // const getCountries = fetch("https://api.countrystatecity.in/v1/countries", {
        //     method: 'GET',
        //     headers: headers,
        //     redirect: 'follow'
        // })
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));



        // const getStates = fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
        //     method: 'GET',
        //     headers: headers,
        //     redirect: 'follow'
        // })
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));

        const headers = new Headers({ "X-CSCAPI-KEY": "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==" });

        const getCountries = fetch("https://api.countrystatecity.in/v1/countries", {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => {
                this.countries = data.map((country: { name: any; iso2: any; }) => {
                    return {
                        name: country.name,
                        _id: country.iso2
                    };
                });
            })
            .catch(error => console.log('error', error));

        const getStates = fetch(`https://api.countrystatecity.in/v1/countries/${this.verification.per_country}/states`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => {
                this.states = data.map((state: { name: any; id: any; }) => {
                    return {
                        name: state.name,
                        _id: state.id
                    };
                });
            })
            .catch(error => console.log('error', error));

    },
    watch: {
        'verification.per_country': function (newValue: string, oldValue: string) {
            if (newValue) {
                const headers = new Headers({ "X-CSCAPI-KEY": "MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==" });
                fetch(`https://api.countrystatecity.in/v1/countries/${newValue}/states`, {
                    method: 'GET',
                    headers: headers,
                    redirect: 'follow'
                })
                    .then(response => response.json())
                    .then(data => {
                        this.perStates = data.map((state: any) => ({ name: state.name, _id: state.iso2 }));
                    })
                    .catch(error => console.log('error', error));
            }
        },
    }
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
</style>