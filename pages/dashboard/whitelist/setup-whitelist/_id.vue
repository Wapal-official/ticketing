<template>
  <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
    <div>
      <DashboardBreadcrumb
        class="tw-mb-1"
        :breadcrumbs="breadcrumb"
      ></DashboardBreadcrumb>
    </div>
    <h1 class="tw-text-xl tw-font-bold">Create Whitelist</h1>
    <ValidationObserver>
      <div
        class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[60%]"
      >
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="collection"
          rules="required"
          v-slot="{ errors }"
        >
          <input-text-field
            v-model="collection.name"
            :disabled="true"
            label="Collection"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="collection"
          rules="required|number"
          v-slot="{ errors }"
        >
          <input-text-field
            v-model="whitelist.whitelist_spots"
            label="No. of Spots"
            placeholder="Eg 100"
            :required="true"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="twitter_acc"
          v-slot="{ errors }"
          rules="twitterUsername"
        >
          <input-text-field
            v-model="whitelist.twitter"
            label="Twitter Account To Follow (Twitter Username)"
            placeholder="Eg wapal_official"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord_server"
          v-slot="{ errors }"
        >
          <input-text-field
            v-model="whitelist.discord_server_name"
            label="Discord Server Name"
            placeholder="Eg Wapal"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord_id"
          v-slot="{ errors }"
        >
          <input-text-field
            v-model="whitelist.discord_server_id"
            label="Discord Server Id"
            placeholder="Discord Server Id"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord_url"
          rules="link"
          v-slot="{ errors }"
        >
          <input-text-field
            v-model="whitelist.discord_server_url"
            label="Discord Server Url"
            placeholder="Discord Server Url"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <div v-for="(role, index) in roles" :key="index">
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row"
          >
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group tw-w-full"
              name="discord_role_name"
              v-slot="{ errors }"
            >
              <input-text-field
                v-model="role.name"
                :label="`Discord Role Name role ${index + 1}`"
                placeholder="Role Name"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group tw-w-full"
              name="phase_name"
              v-slot="{ errors }"
            >
              <input-auto-complete
                v-model="role.phase"
                :items="phases"
                itemValue="id"
                placeholder="Select Mint Phase"
                label="Mint Phase"
                text="name"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="discord_role_id"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="role.id"
              :label="`Discord role id role ${index + 1}`"
              placeholder="Discord Role Id"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <div class="tw-w-half tw-text-left tw-pt-4">
            <button-primary
              @click="removeRole(index)"
              v-if="index != 0"
              title="Remove Role"
            />
          </div>
        </div>

        <div class="tw-w-half tw-text-right">
          <button-primary @click="addRole" :bordered="true" title="Add Role" />
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
            <input-date-picker
              v-model="whitelist.whitelist_start"
              type="datetime"
              label="Whitelist Start Time"
              placeholder="Select Whitelist Start time"
              :required="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="publicSaleTime"
            rules="required|whitelistEnd:@whitelistSaleTime"
            v-slot="{ errors }"
          >
            <input-date-picker
              v-model="whitelist.whitelist_end"
              type="datetime"
              label="Whitelist End Time"
              placeholder="Select Whitelist End time"
              :required="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4"
        >
          <button-primary
            title="Create"
            :loading="submitting"
            :disabled="submitting"
            @click="submitWhitelist"
          />
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { getCollection } from "@/services/CollectionService";
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

extend("twitterUsername", {
  validate(value) {
    try {
      const givenURL = new URL(value);
    } catch (error) {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );

      if (pattern.test(value)) {
        return false;
      }

      return true;
    }
    return false;
  },
  message: "Please Enter Twitter Username",
});

export default {
  layout: "dashboard",
  components: {
    ValidationProvider,
    ValidationObserver,
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
          phase: null,
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
      phases: [{ name: "", mint_time: "", mint_price: "" }],
    };
  },
  async mounted() {
    this.phases = [];
    const res = await getCollection(this.$route.params.id);

    this.collection = res.collection[0];

    this.phases = this.collection.phases ? this.collection.phases : [];
  },
  methods: {
    addRole() {
      this.roles.push({
        name: "",
        id: "",
        phase: "",
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

        console.log(tempWhitelist);

        await createWhitelist(tempWhitelist);

        this.submitting = false;
        this.message = "Whitelist Created Successfully";
        this.$toast.showMessage({ message: this.message, error: false });
        this.$router.push(`/dashboard/whitelist/${this.collection.username}`);
      } catch (error) {
        this.message = error;
        this.$toast.showMessage({ message: this.message, error: true });

        this.submitting = false;
      }
    },
  },
};
</script>
