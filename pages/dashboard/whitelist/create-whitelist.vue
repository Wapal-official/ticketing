<template>
    <div class="tw-w-full md:tw-px-16 lg:te-px-0">
        <h1 class="tw-text-xl tw-font-blod">Create Whitelist</h1>
        <ValidationObserver v-slot="{ hadleSubmit }">
            <form class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
                @submit.prevent="">
                <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="collection" rules="required" v-slot="{ errors }">
                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Select Collection:</label>
                    <div class="dashboard-text-field-border tw-w-full">
                        <v-select v-model="whitelist.selectCollection" outlined single-line color="#fff" hide-details
                            clearable class="dashboard-input"></v-select>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="twitter_acc" rules="required|link" v-slot="{ errors }">
                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Twitter Account To
                        Follow:</label>
                    <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field v-model="whitelist.twitter_acc" outlined single-line color="#fff" hide-details
                            clearable class="dashboard-input"></v-text-field>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="discord_server" rules="required|link" v-slot="{ errors }">
                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Discord Server
                        Name:</label>
                    <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field v-model="whitelist.discord_server" outlined single-line color="#fff" hide-details
                            clearable class="dashboard-input"></v-text-field>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="discord_id" rules="required|link" v-slot="{ errors }">
                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">discord server ID:</label>
                    <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field v-model="whitelist.discord_id" outlined single-line color="#fff" hide-details
                            clearable class="dashboard-input"></v-text-field>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                    name="discord_url" rules="required|link" v-slot="{ errors }">
                    <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Discord server
                        URL:</label>
                    <div class="dashboard-text-field-border tw-w-full">
                        <v-text-field v-model="whitelist.discord_url" outlined single-line color="#fff" hide-details
                            clearable class="dashboard-input"></v-text-field>
                    </div>
                    <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <div v-for="(role, index) in roles" :key="index.id">
                    <ValidationProvider
                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                        name="discord_role_name" rules="required" v-slot="{ errors }">
                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Discord role name
                            {{ `role ${index + 1}` }}:</label>
                        <div class="dashboard-text-field-border tw-w-full">
                            <v-text-field v-model="role.discord_role_name" outlined single-line color="#fff" hide-details
                                clearable class="dashboard-input"></v-text-field>
                        </div>
                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
                        name="discord_role_id" rules="required" v-slot="{ errors }">
                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Discord role name
                            {{ `role ${index + 1}` }}:</label>
                        <div class="dashboard-text-field-border tw-w-full">
                            <v-text-field v-model="role.discord_role_id" outlined single-line color="#fff" hide-details
                                clearable class="dashboard-input"></v-text-field>
                        </div>
                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <div class="tw-w-half tw-text-left tw-pt-4">
                        <button type="button"
                            class="tw-px-8 tw-py-2 tw-bg-[#FF36AB] tw-font-semibold tw-rounded tw-flex-row tw-items-center tw-gap-4"
                            @click="removeRole(index)" v-show="index != 0">
                            Remove Role
                        </button>
                    </div>
                </div>

                <div class="tw-w-half tw-text-right">
                    <button
                        class="tw-px-8 tw-py-2 tw-bg-[#A0A0A0] tw-font-semibold tw-rounded tw-flex-row tw-items-center tw-gap-4"
                        @click.prevent="addRole()">Add Role</button>
                </div>
                <div
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center">
                    <ValidationProvider
                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                        name="whitelistSaleTime" rules="required|wnitelistStart" v-slot="{ errors }">
                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Whitelist Start
                            Time</label>
                        <div class="dashboard-text-field-border tw-w-full">
                            <v-text-field v-model="whitelist.whitelist_start" outlined single-line color="#fff" hide-details
                                clearable type="datetime-local" class="dashboard-input"></v-text-field>
                        </div>
                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                        name="publicSaleTime" rules="required|whitelistEnd" v-slot="{ errors }">
                        <label class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2">Whitelist End
                            Time</label>
                        <div class="dashboard-text-field-border tw-w-full">
                            <v-text-field v-model="whitelist.whitelist_end" outlined single-line color="#fff" hide-details
                                clearable type="datetime-local" class="dashboard-input"></v-text-field>
                        </div>
                        <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                </div>
                <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4">
                    <button class="dashboard-gradient-button tw-font-semibold" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { createCollection } from "@/services/CollectionService";
import Collection from "@/interfaces/collection";

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

extend("whitelistEnd", {
    params: ["target"],
    validate(value, target: any) {
        if (value < target.target) {
            return false;
        }

        return true;
    },
    message: "White list end time should be greater than whitelist start"
});

extend("whitelistStart", {
    validate(value) {
        if (new Date(value).getTime() < Date.now()) {
            return false;
        }
        return true;
    },
    message: "Whitelist Start time should be greater than current time",
});

export default {
    layout: "dashboard",
    components: { ValidationProvider, ValidationObserver },
    data() {
        return {
            whitelist: {
                selectCollection: null,
                twitter_acc: null,
                discord_server: null,
                discord_id: null,
                discord_url: null,
                whitelist_start: null,
                whitelist_end: null
            },
            roles: [{
                id: 1,
                discord_role_name: null,
                discord_role_id: null,
            }],
            // items: ['Item 1', 'Item 2', 'Item 3'],
            nextId: 2,
            message: "",
        }
    },
    mounted() {
        const collections: Collection[] = this.collections;
        this.selectCollection = collections;
    },
    methods: {
        addRole() {
            this.roles.push({
                id: this.nextId,
                discord_role_name: "",
                discord_role_id: "",
            });
            this.nextId++;
        },
        removeRole(index) {
            this.roles.splice(index, 1)
        },
    }

}
</script>