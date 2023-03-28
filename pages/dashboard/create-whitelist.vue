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
        class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
        @submit.prevent="submitWhitelist"
      >
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="collection"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Select Collection:</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-select
              :items="selectCollectionOptions"
              item-text="name"
              item-value="value"
              v-model="whitelist.collection_id"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            ></v-select>
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
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Twitter Account To Follow:</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="whitelist.twitter"
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
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Discord Server Name:</label
          >
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
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Discord server ID:</label
          >
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
          rules="required|link"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Discord server URL:</label
          >
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
            rules="required"
            v-slot="{ errors }"
          >
            <label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Discord role name {{ `role ${index + 1}` }}:</label
            >
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
            rules="required"
            v-slot="{ errors }"
          >
            <label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Discord role id {{ `role ${index + 1}` }}:</label
            >
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
              <v-text-field
                v-model="whitelist.whitelist_start"
                outlined
                single-line
                color="#fff"
                hide-details
                clearable
                type="datetime-local"
                class="dashboard-input"
                ref="whitelistSaleTime"
              ></v-text-field>
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
              <v-text-field
                v-model="whitelist.whitelist_end"
                outlined
                single-line
                color="#fff"
                hide-details
                clearable
                type="datetime-local"
                class="dashboard-input"
              ></v-text-field>
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
import { getCollectionsOfUser } from "@/services/CollectionService";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import { createWhitelist } from "@/services/WhitelistService";

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
  props: { collection: { type: Array } },
  components: { ValidationProvider, ValidationObserver, GradientBorderButton },
  data() {
    return {
      whitelist: {
        collection_id: null,
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
          text: "WhiteList",
          disabled: false,
          href: "/dashboard/whitelist",
        },
        {
          text: "Create Whitelist",
          disabled: true,
          href: "/dashboard/create-whitelist",
        },
      ],
    };
  },
  async mounted() {
    const res = await getCollectionsOfUser(
      this.$store.state.userStore.user.user_id
    );

    const selectCollections: any[] = res.data.data;

    selectCollections.map((whitelistCollection: any) => {
      this.selectCollectionOptions.push({
        name: whitelistCollection.name,
        value: whitelistCollection._id,
      });
    });
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
