<template>
  <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
    <div>
      <DashboardBreadcrumb
        class="tw-mb-1"
        :breadcrumbs="breadcrumb"
      ></DashboardBreadcrumb>
    </div>
    <h1 class="tw-text-xl tw-font-bold">Create Whitelist</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[60%]"
        @submit.prevent="handleSubmit(submitWhitelist)"
      >
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="collection"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Collection</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.name"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
              inputmode="numeric"
              disabled
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="collection"
          rules="required|number"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >No. of Spots</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="whitelist.whitelist_spots"
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
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="twitter_acc"
          v-slot="{ errors }"
        >
          <label>Twitter Account To Follow (Twitter Username)</label>
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="whitelist.twitter"
              placeholder="Eg: wapal_official"
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
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord_server"
          v-slot="{ errors }"
        >
          <label>Discord Server Name:</label>
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="whitelist.discord_server_name"
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
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord_id"
          v-slot="{ errors }"
        >
          <label>Discord server ID:</label>
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="whitelist.discord_server_id"
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
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord_url"
          rules="link"
          v-slot="{ errors }"
        >
          <label>Discord server URL:</label>
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="whitelist.discord_server_url"
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
        <div v-for="(role, index) in roles" :key="index">
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="discord_role_name"
            v-slot="{ errors }"
          >
            <label>Discord role name {{ `role ${index + 1}` }}:</label>
            <div class="dashboard-text-field-border tw-w-full">
              <v-text-field
                v-model="role.name"
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
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="discord_role_id"
            v-slot="{ errors }"
          >
            <label>Discord role id {{ `role ${index + 1}` }}:</label>
            <div class="dashboard-text-field-border tw-w-full">
              <v-text-field
                v-model="role.id"
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
          <div class="tw-w-half tw-text-left tw-pt-4">
            <button
              type="button"
              class="tw-px-8 tw-py-2 tw-mb-2 tw-bg-[#FF36AB] tw-font-semibold tw-rounded tw-flex-row tw-items-center tw-gap-4"
              @click="removeRole(index)"
              v-if="index != 0"
            >
              Remove Role
            </button>
          </div>
        </div>

        <div class="tw-w-half tw-text-right">
          <button
            class="tw-px-8 tw-py-2 tw-bg-[#A0A0A0] tw-font-semibold tw-rounded tw-flex-row tw-items-center tw-gap-4"
            @click.prevent="addRole()"
          >
            Add Role
          </button>
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center"
        >
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="whitelistSaleTime"
            rules="required"
            v-slot="{ errors }"
          >
            <label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Whitelist Start Time</label
            >
            <div class="dashboard-text-field-border tw-w-full">
              <date-picker
                v-model="whitelist.whitelist_start"
                type="datetime"
                placeholder="Select Whitelist Start time"
              ></date-picker>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="publicSaleTime"
            rules="required|whitelistEnd:@whitelistSaleTime"
            v-slot="{ errors }"
          >
            <label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Whitelist End Time</label
            >
            <div class="dashboard-text-field-border tw-w-full">
              <date-picker
                v-model="whitelist.whitelist_end"
                type="datetime"
                placeholder="Select Whitelist End time"
              ></date-picker>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4"
        >
          <gradient-border-button type="submit" :disabled="submitting">
            <v-progress-circular
              indeterminate
              color="white"
              v-if="submitting"
            ></v-progress-circular>
            Create
          </gradient-border-button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { getCollection } from "@/services/CollectionService";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import { createWhitelist } from "@/services/WhitelistService";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

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
  message: "White list end time should be greater than whitelist start time",
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
  components: {
    ValidationProvider,
    ValidationObserver,
    GradientBorderButton,
    DatePicker,
  },
  data() {
    return {
      whitelist: {
        collection_id: this.$route.params.id,
        whitelist_spots: null,
        twitter: null,
        discord_server_name: null,
        discord_server_id: null,
        discord_server_url: null,
        whitelist_start: null,
        whitelist_end: null,
      },
      roles: [
        {
          name: null,
          id: null,
        },
      ],
      selectCollectionOptions: [],
      nextId: 2,
      message: "",
      submitting: false,
      breadcrumb: [
        {
          text: "Whitelist",
          disabled: false,
          href: "/dashboard/whitelist",
        },
        {
          text: "Setup Whitelist",
          disabled: true,
        },
      ],
      collection: { name: null },
    };
  },
  async mounted() {
    const res = await getCollection(this.$route.params.id);

    this.collection = res.collection[0];
  },
  methods: {
    addRole() {
      this.roles.push({
        name: "",
        id: "",
      });
      this.nextId++;
    },
    removeRole(index: number) {
      this.roles.splice(index, 1);
    },
    async submitWhitelist() {
      try {
        this.submitting = true;

        const tempWhitelist = this.whitelist;

        tempWhitelist.whitelist_start = new Date(
          tempWhitelist.whitelist_start
        ).toISOString();

        tempWhitelist.whitelist_end = new Date(
          tempWhitelist.whitelist_end
        ).toISOString();

        tempWhitelist.discord_roles = this.roles;

        await createWhitelist(tempWhitelist);

        this.submitting = false;
        this.message = "Whitelist Created Successfully";
        this.$toast.showMessage({ message: this.message, error: false });
        this.$router.push("/dashboard/whitelist");
      } catch (error) {
        this.message = error;
        this.$toast.showMessage({ message: this.message, error: true });

        this.submitting = false;
      }
    },
  },
};
</script>
<style>
.mx-input-wrapper,
.mx-datepicker {
  width: 100% !important;
}

.mx-input {
  width: 100% !important;
  background: #0e0d0d !important;
  border: none !important;
  height: 50px !important;
  color: #d9d9d9 !important;
  font-size: 1em;
  border-radius: 7px !important;
}

.mx-icon-calendar,
.mx-icon-clear,
.mx-input::placeholder {
  color: #d9d9d9 !important;
}
</style>
