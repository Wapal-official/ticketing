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
          <label
            class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
            >Image Collection</label
          >
          <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full md:tw-flex-row md:tw-justify-start dashboard-text-field-group"
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
            <button
              class="tw-px-8 tw-py-2 tw-bg-[#A0A0A0] tw-font-semibold tw-rounded disabled:tw-cursor-not-allowed tw-flex tw-flex-row tw-items-center tw-gap-4"
              @click.prevent="uploadImage"
              :disabled="!image.name || uploading"
            >
              <v-progress-circular
                indeterminate
                color="#000"
                v-if="uploading"
              ></v-progress-circular>

              Upload
            </button>
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
              inputmode="numeric"
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
                class="dashboard-input tw-w-full focus:tw-outline-none"
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
                class="dashboard-input focus:tw-outline-none"
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
                inputmode="numeric"
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
              inputmode="numeric"
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
          <button
            class="dashboard-gradient-button tw-font-semibold"
            type="submit"
          >
            Submit
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
import AWS from "aws-sdk";
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
      message: "",
      image: { name: null },
      imageErrorMessage: "",
      imageError: false,
      uploading: false,
    };
  },
  methods: {
    async submitCollection() {
      this.imageError = false;
      if (!this.collection.image) {
        this.imageError = true;
        this.imageErrorMessage = "Please upload an image for collection";
        return;
      }
      try {
        await createCollection(this.collection);
        this.message = "Collection Created Successfully";
        this.$toast.showMessage({ message: this.message, error: false });
        this.$router.push("/dashboard");
      } catch (error) {
        this.message = error;
        this.$toast.showMessage({ message: this.message, error: true });
      }
    },
    async uploadImage() {
      this.imageError = false;
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

      if (!allowedExtensions.exec(this.image.name.toLowerCase())) {
        this.imageError = true;
        this.imageErrorMessage = "Please upload a jpg, jpeg or png image";
        return;
      }

      try {
        this.uploading = true;
        const res = await this.awsUpload();
        this.uploading = false;
        this.$toast.showMessage({
          message: "Image Uploaded Successfully",
          error: false,
        });
        this.collection.image = res.Location;
      } catch (error) {
        console.log(error);
        console.log(
          process.env.AWS_ACCESS_KEY,
          process.env.AWS_SECRET_ACCESS_KEY
        );
        this.message = "Something Went Wrong Please try again";
        this.$toast.showMessage({ message: this.message, error: true });
      }
    },

    imageSelected(event: any) {
      this.image = event.target.files[0];
    },
    setImage(image: string) {
      console.log(image);

      this.collection.image = image;
      console.log(this.collection.image);
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
  },
};
</script>
<style>
.image-collection {
  display: none;
}
</style>
