<template>
  <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
    <div>
      <DashboardBreadcrumb class="tw-mb-1" :breadcrumbs="breadcrumb" />
    </div>
    <h1 class="tw-text-xl tw-font-bold">Create NFT Collection</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full lg:tw-w-[60%]"
        @submit.prevent="handleSubmit(submitCollection)"
        novalidate
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
          rules="required|descriptionLength"
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
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Image Collection</label
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
                v-if="!image.name"
              >
                <v-icon class="!tw-text-wapal-gray">mdi-image</v-icon>
                Select Image
              </div>
              <div
                class="tw-bg-wapal-background tw-px-4 tw-py-2 tw-rounded-lg tw-max-w-4/5 tw-overflow-hidden"
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
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="baseurl"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Assets</label
          >
          <div class="dashboard-text-field-border tw-w-full">
            <v-autocomplete
              v-model="baseURL"
              :items="folders"
              outlined
              color="#fff"
              class="dashboard-input"
              placeholder="Select your NFT Vault"
              item-text="folder_name"
              @change="setSupply"
              hide-details
              clearable
            >
            </v-autocomplete>
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
          rules="required|number|percentage"
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
              inputmode="numeric"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <div
          class="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-w-full md:tw-w-1/2"
        >
          <label>Whitelist Sale</label>
          <v-switch v-model="whitelistEnabled"></v-switch>
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-center"
        >
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="whitelistSaleTime"
            rules="saleTime"
            v-slot="{ errors }"
            v-if="whitelistEnabled"
          >
            <label>Whitelist Sale Time</label>
            <div class="dashboard-text-field-border tw-w-full">
              <date-picker
                v-model="collection.whitelist_sale_time"
                type="datetime"
                placeholder="Select Whitelist Sale time"
              ></date-picker>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="publicSaleTime"
            rules="required|saleTime|public_sale_time:@whitelistSaleTime"
            v-slot="{ errors }"
          >
            <label
              class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
              >Public Sale Time</label
            >
            <div class="dashboard-text-field-border tw-w-full">
              <date-picker
                v-model="collection.public_sale_time"
                type="datetime"
                placeholder="Select Public Sale time"
              ></date-picker>
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
            rules="number"
            v-slot="{ errors }"
            v-if="whitelistEnabled"
            ><label>Whitelist Sale Price in Apt</label>
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
                inputmode="numeric"
                :disabled="!whitelistEnabled"
              >
              </v-text-field>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
            name="publicSalePrice"
            rules="required|number"
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
                inputmode="numeric"
              >
              </v-text-field>
            </div>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="supply"
          rules="required|number"
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
              inputmode="numeric"
              disabled
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="twitter"
          rules="required|link"
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
              type="url"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="discord"
          rules="required|link"
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
              type="url"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="website"
          rules="required|link"
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
              type="url"
            >
            </v-text-field>
          </div>
          <div class="tw-text-red-600">{{ errors[0] }}</div>
        </ValidationProvider>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-4"
        >
          <gradient-border-button type="submit" :disabled="submitting">
            <v-progress-circular
              indeterminate
              color="white"
              v-if="submitting"
            ></v-progress-circular>
            Submit
          </gradient-border-button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";

import { createCollection } from "@/services/CollectionService";
import { getAllFolder, getFolderById } from "@/services/AssetsService";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import AWS from "aws-sdk";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("link", {
  validate(value) {
    try {
      const givenURL = new URL(value);
    } catch (error) {
      return false;
    }
    return true;
  },
  message: "Please enter a valid link",
});

extend("public_sale_time", {
  params: ["target"],
  validate(value, target: any) {
    if (value < target.target) {
      return false;
    }

    return true;
  },
  message: "Public Sale Time should be greater than whitelist sale time",
});

extend("saleTime", {
  validate(value) {
    if (new Date(value).getTime() < Date.now()) {
      return false;
    }
    return true;
  },
  message: "Sale time should be greater than current time",
});

extend("percentage", {
  validate(value) {
    const getDecimalVal = value.toString().indexOf(".");
    if (getDecimalVal < 1) {
      return true;
    }
    const decimalPart = value.toString().substring(getDecimalVal + 1);
    if (decimalPart.length > 1) {
      return false;
    }
    return true;
  },
  message: "Please enter only one decimal point in percentage",
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

extend("descriptionLength", {
  validate(value) {
    if (value.length > 200) {
      return false;
    }
    return true;
  },
  message: "This field must not exceed 200 characters",
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
      collection: {
        name: null,
        description: null,
        image: null,
        baseURL: null,
        royalty_payee_address:
          this.$store.state.walletStore.wallet.walletAddress,
        royalty_percentage: null,
        whitelist_sale_time: null,
        public_sale_time: null,
        public_sale_price: null,
        whitelist_price: null,
        supply: null,
        twitter: null,
        discord: null,
        website: null,
        resource_account: null,
        txnhash: null,
        un: "",
        candy_id: process.env.CANDY_MACHINE_ID,
      },
      message: "",
      image: { name: null },
      imageErrorMessage: "",
      imageError: false,
      submitting: false,
      breadcrumb: [
        {
          text: "Launchpad",
          disabled: false,
          href: "/dashboard",
        },
        {
          text: "Create Collection",
          disabled: true,
          href: "/dashboard/create-whitelist",
        },
      ],
      folders: [],
      folderInfo: null,
      baseURL: null,
      whitelistEnabled: false,
    };
  },
  methods: {
    async submitCollection() {
      this.imageError = false;
      if (!this.image.name) {
        this.imageError = true;
        this.imageErrorMessage = "Please select an image for collection";
        this.$refs["imageSelect"].scrollIntoView({ behavior: "smooth" });
        return;
      }
      try {
        this.submitting = true;

        if (this.imageError) {
          return;
        }

        const selectedFolder = this.folders.find(
          (folder: any) => folder.folder_name === this.baseURL
        );

        this.collection.baseURL = selectedFolder.metadata.baseURI;

        await this.sendDataToCandyMachineCreator();

        const tempCollection = this.collection;

        const imageUploaded = await this.uploadImage();

        if (!imageUploaded) {
          this.$refs["imageSelect"].scrollIntoView({ behavior: "smooth" });
          this.submitting = false;
          return;
        }

        tempCollection.whitelist_sale_time = tempCollection.whitelist_sale_time
          ? new Date(tempCollection.whitelist_sale_time).toISOString()
          : null;

        tempCollection.public_sale_time = new Date(
          tempCollection.public_sale_time
        ).toISOString();

        await createCollection(tempCollection);

        this.submitting = false;

        this.message = "Collection Created Successfully";
        this.$toast.showMessage({ message: this.message, error: false });
        this.$router.push("/dashboard");
      } catch (error: any) {
        this.$toast.showMessage({ message: error, error: true });

        this.submitting = false;
      }
    },
    async uploadImage() {
      this.imageError = false;

      try {
        const res = await this.awsUpload();
        this.collection.image = res.Location;
        return true;
      } catch (error) {
        this.message = "Something Went Wrong Please try again";
        this.$toast.showMessage({ message: this.message, error: true });
        return false;
      }
    },

    imageSelected(event: any) {
      this.image = event.target.files[0];
    },
    setImage(image: string) {
      this.collection.image = image;
    },

    awsUpload() {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const key = Date.now() + this.image.name;

      const params = {
        Bucket: "wapal-images",
        Key: key,
        Body: this.image,
      };
      return new Promise((resolve, reject) => {
        s3.upload(params, (err: any, data: any) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    },
    async sendDataToCandyMachineCreator() {
      let whitelistTime = null;

      let publicSaleTime = null;

      if (this.whitelistEnabled) {
        whitelistTime = Math.floor(
          new Date(this.collection.whitelist_sale_time).getTime() / 1000
        );
        publicSaleTime = Math.floor(
          new Date(this.collection.public_sale_time).getTime() / 1000
        );
      } else {
        whitelistTime = Math.floor(
          new Date(this.collection.public_sale_time).getTime() / 1000
        );
        publicSaleTime =
          Math.floor(
            new Date(this.collection.public_sale_time).getTime() / 1000
          ) + 1;
      }

      const whitelist_price = this.collection.whitelist_price
        ? this.collection.whitelist_price
        : this.collection.public_sale_price;

      const candyMachineArguments = {
        collection_name: this.collection.name,
        collection_description: this.collection.description,
        baseuri: this.collection.baseURL,
        royalty_payee_address: this.collection.royalty_payee_address,
        royalty_points_denominator: 1000,
        royalty_points_numerator: this.collection.royalty_percentage * 10,
        presale_mint_time: whitelistTime,
        public_sale_mint_time: publicSaleTime,
        presale_mint_price: whitelist_price * 100000000,
        public_sale_mint_price: this.collection.public_sale_price * 100000000,
        total_supply: this.collection.supply,
      };

      const res = await this.$store.dispatch(
        "walletStore/createCandyMachine",
        candyMachineArguments
      );

      this.collection.resource_account = res.resourceAccount;
      this.collection.txnhash = res.transactionHash;
    },
    setSupply() {
      const selectedFolder = this.folders.find(
        (folder: any) => folder.folder_name === this.baseURL
      );
      if (selectedFolder) {
        this.collection.supply = selectedFolder.metadata.files.length
          ? selectedFolder.metadata.files.length
          : null;
      } else {
        this.collection.supply = null;
      }
    },
  },
  async mounted() {
    const folderRes = await getFolderById(
      process.env.baseURL?.includes("staging")
        ? "642aeb3da50447f2631f38f3"
        : "642aecdd6d6d89ea7763a839"
    );

    this.folders.push(folderRes.data.folderInfo);

    const res = await getAllFolder(this.$store.state.userStore.user.user_id);

    res.data.folderInfo.map((folder: any) => {
      if (folder.metadata.baseURI) {
        this.folders.push(folder);
      }
    });
  },
};
</script>
<style>
.image-collection {
  display: none;
  background-color: #878787;
}

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
