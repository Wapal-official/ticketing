<template>
    <div>
        <h1>KYC Verification</h1>
        <h2>Personal Details</h2>
        <div>
            <ValidationObserver>
                <form class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
                    @submit.prevent="">
                    <ValidationProvider
                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                        name="collection" rules="required" v-slot="{ errors }">
                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Select Collection:</label>
                        <div class="dashboard-text-field-border tw-w-full">
                            <v-text-field outlined single-line color="#fff" hide-details clearable
                                class="dashboard-input"></v-text-field>
                        </div>
                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                        name="whitelistSaleTime" rules="required" v-slot="{ errors }">
                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Whitelist Start
                            Time</label>
                        <div class="dashboard-text-field-border tw-w-full">
                            <v-text-field outlined single-line color="#fff" hide-details clearable type="datetime-local"
                                class="dashboard-input"></v-text-field>
                        </div>
                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>

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

        }
    }

}
</script>