<template>
  <div class="tw-w-full md:tw-px-16 lg:tw-px-0">
    <h1 class="tw-text-xl tw-font-bold">Create NFT Collection</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
        @submit.prevent="handleSubmit(submitCollection)"
      >
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="name"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Collection Name</label
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
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="description"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Collection Description</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-textarea
              v-model="collection.description"
              class="dashboard-input"
              background-color="transparent"
              color="#fff"
              outlined
              single-line
            ></v-textarea>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
        >
          <label>Image Collection</label>
          <button
            class="tw-px-8 tw-py-2 tw-bg-[#A0A0A0] tw-font-semibold tw-rounded"
            @click="uploadImage"
          >
            Upload
          </button>
        </div>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="baseurl"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Baseurl</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.baseURL"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="royaltyPayeeAddress"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Royalty Payee Address</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.royalty_payee_address"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="royaltyPercentage"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Royalty Percentage</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.royalty_percentage"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
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
              >Whitelist Sale Time</label
            >
            <div class="dashboard-text-field-border tw-w-full">
              <v-text-field
                v-model="collection.whitelist_sale_time"
                outlined
                single-line
                color="#fff"
                hide-details
                clearable
                class="dashboard-input tw-w-full"
                type="datetime-local"
              >
              </v-text-field>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="publicSaleTime"
            rules="required"
            v-slot="{ errors }"
          >
            <label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Public Sale Time</label
            >
            <div class="dashboard-text-field-border tw-w-full">
              <v-text-field
                v-model="collection.public_sale_time"
                outlined
                single-line
                color="#fff"
                hide-details
                clearable
                class="dashboard-input"
                type="datetime-local"
              >
              </v-text-field>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center"
        >
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="whitelistSalePrice"
            rules="required"
            v-slot="{ errors }"
            ><label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Whitelist Sale Price in Apt</label
            >
            <div class="dashboard-text-field-border tw-w-full">
              <v-text-field
                v-model="collection.whitelist_price"
                placeholder="eg: 0.1"
                outlined
                single-line
                color="#fff"
                hide-details
                clearable
                class="dashboard-input"
              >
              </v-text-field>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="publicSalePrice"
            rules="required"
            v-slot="{ errors }"
          >
            <label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Public Sale Price in Apt</label
            >
            <div class="dashboard-text-field-border tw-w-full">
              <v-text-field
                v-model="collection.public_sale_price"
                placeholder="eg: 0.1"
                outlined
                single-line
                color="#fff"
                hide-details
                clearable
                class="dashboard-input"
              >
              </v-text-field>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="supply"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Supply</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.supply"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="twitter"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Twitter Link</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.twitter"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Discord Link</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.discord"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="website"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Website</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.website"
              outlined
              single-line
              color="#fff"
              hide-details
              clearable
              class="dashboard-input"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4"
        >
          <button
            class="dashboard-gradient-button tw-font-semibold !tw-px-12"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </ValidationObserver>
    <v-snackbar
      v-model="showCreateCollectionMessage"
      :timeout="3000"
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
<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { createCollection } from "@/services/CollectionService";
import fox from "@/assets/img/fox.png";
import astronaut from "@/assets/img/6195.png";
import pirate from "@/assets/img/6197.png";
import undead from "@/assets/img/3469.png";
import { defaultTheme } from "@/theme/wapaltheme";

extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  layout: "dashboard",
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      collection: {
        name: null,
        description: null,
        image: null,
        baseURL: null,
        royalty_payee_address: null,
        royalty_percentage: null,
        whitelist_sale_time: null,
        public_sale_time: null,
        public_sale_price: null,
        whitelist_price: null,
        supply: null,
        twitter: null,
        discord: null,
        website: null,
      },
      showCreateCollectionMessage: false,
      message: "",
      error: false,
      fox,
      pirate,
      astronaut,
      undead,
      defaultTheme,
    };
  },
  methods: {
    async submitCollection() {
      try {
        // const rng = Math.floor(Math.random() * 3);
        // if (rng === 0) {
        //   this.collection.image = astronaut;
        // } else if (rng === 1) {
        //   this.collection.image = pirate;
        // } else {
        //   this.collection.image = fox;
        // }
        this.collection.image = astronaut;
        await createCollection(this.collection);
        this.error = false;
        this.showCreateCollectionMessage = true;
        this.message = "Collection Created Successfully";
        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 700);
      } catch (error) {
        this.error = true;
        this.showCreateCollectionMessage = true;
        this.message = error;
      }
    },
    uploadImage() {},
  },
};
</script>
<style>
.dashboard-gradient-button {
  background: linear-gradient(
    264.44deg,
    #fe87ff 2.87%,
    #c202d3 34.05%,
    #48cae4 67.82%,
    #48cae4 99.15%
  );
  @apply tw-rounded tw-text-sm tw-px-4 tw-py-2 !tw-text-white;
}
.dashboard-text-field-border {
  padding: 1px;
  border-radius: 7px;
}

.dashboard-text-field-group:nth-child(odd) .dashboard-text-field-border {
  background: linear-gradient(
    270deg,
    rgba(254, 135, 255, 1),
    rgba(194, 2, 211, 1),
    rgba(72, 202, 228, 1),
    rgba(72, 202, 228, 1)
  );
}

.dashboard-text-field-group:nth-child(even) .dashboard-text-field-border {
  background: linear-gradient(
    270deg,
    rgba(254, 135, 255, 1),
    rgba(194, 2, 211, 1),
    rgba(72, 202, 228, 1),
    rgba(25, 5, 218, 1)
  );
}

.dashboard-input {
  border-radius: 7px !important;
  @apply !tw-bg-wapal-background;
}
.dashboard-input.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 50px !important;
}
.dashboard-input.v-text-field--outlined fieldset {
  border: none !important;
}
.dashboard-input.v-text-field--enclosed .v-input__append-inner {
  margin-top: 15px !important;
}

.dashboard-input.v-text-field--outlined.v-input--is-focused
  .v-input__slot:before {
  border: none !important;
}
.dashboard-input.v-text-field--outlined .v-label {
  top: 15px !important;
}
</style>
