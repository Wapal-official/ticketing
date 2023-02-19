<template>
    <div class="tw-w-full md:tw-px-16 lg:tw-px-0">
        <h1>KYC Verification</h1>
        <div>
            <ValidationObserver>
                <!-- Verification form -->
                <form class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
                    @submit.prevent="">
                    <!-- vuetify steppers start -->
                    <v-stepper v-model="e1" alt-labels flat dense style="background: transparent">
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <h2 class="tw-text-wapal-pink">Personal Details</h2>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Full
                                        Name:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-text-field v-model="verification.name" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-text-field>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <div
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="whitelistSaleTime" rules="required" v-slot="{ errors }">
                                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Date of
                                            Birth</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.dob" outlined single-line color="#fff"
                                                hide-details clearable type="datetime-local"
                                                class="dashboard-input"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="collection" rules="required" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Gender:</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-select v-model="verification.gender" outlined single-line color="#fff"
                                                hide-details clearable class="dashboard-input"></v-select>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                </div>
                                <h2>Other Information</h2>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Occupation:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-text-field v-model="verification.name" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-text-field>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">E-Mail:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-text-field v-model="verification.name" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-text-field>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4">
                                    <button class="dashboard-gradient-button tw-font-semibold" @click="e1 = 2"
                                        type="submit">
                                        Next
                                    </button>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <h2>Current Address</h2>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Province:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="verification.gender" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">District:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="verification.gender" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">RM/Municipality:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="verification.gender" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <div
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="whitelistSaleTime" rules="required|wnitelistStart" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Tole</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.cur_tole" outlined single-line color="#fff"
                                                hide-details clearable type="datetime-local"
                                                class="dashboard-input"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="whitelistSaleTime" rules="required|wnitelistStart" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Ward</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.cur_tole" outlined single-line color="#fff"
                                                hide-details clearable type="datetime-local"
                                                class="dashboard-input"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                </div>

                                <h2>Permanent Address</h2>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Province:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="verification.gender" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">District:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="verification.gender" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <ValidationProvider
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                                    name="collection" rules="required" v-slot="{ errors }">
                                    <label
                                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">RM/Municipality:</label>
                                    <div class="dashboard-text-field-border tw-w-full">
                                        <v-select v-model="verification.gender" outlined single-line color="#fff"
                                            hide-details clearable class="dashboard-input"></v-select>
                                    </div>
                                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                                </ValidationProvider>
                                <div
                                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="whitelistSaleTime" rules="required|wnitelistStart" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Tole</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.cur_tole" outlined single-line color="#fff"
                                                hide-details clearable type="datetime-local"
                                                class="dashboard-input"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                    <ValidationProvider
                                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                                        name="whitelistSaleTime" rules="required|wnitelistStart" v-slot="{ errors }">
                                        <label
                                            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Ward</label>
                                        <div class="dashboard-text-field-border tw-w-full">
                                            <v-text-field v-model="verification.cur_tole" outlined single-line color="#fff"
                                                hide-details clearable type="datetime-local"
                                                class="dashboard-input"></v-text-field>
                                        </div>
                                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                                    </ValidationProvider>
                                </div>

                                <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4">
                                    <button class="dashboard-gradient-button tw-font-semibold" @click="e1 = 3"
                                        type="submit">
                                        Next
                                    </button>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="3">

                                <v-btn color="primary" @click="e1 = 1">
                                    Continue
                                </v-btn>
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
import { createCollection } from "@/services/CollectionService";
extend("required", {
    ...required,
    message: "This field is required",
});

extend("link", {
    validate(value) {
        const pattern =
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

        if (!pattern.test(value)) {
            return false;
        }
        return true;
    },
    message: "Please enter a valid link",
});
export default {
    layout: "dashboard",
    components: { ValidationProvider, ValidationObserver },
    data() {
        return {
            e1: 1,
            verification: {
                name: null,
                dob: null,
                gender: null,
                occupation: null,
                email: null,
                cur_province: null,
                cur_district: null,
                cur_municipality: null,
                cur_tole: null,
                cur_ward: null,
                per_province: null,
                per_district: null,
                per_municipality: null,
                per_tole: null,
                per_ward: null,
                verification_img: null,
                document: null,
            }
        }
    }

}
</script>