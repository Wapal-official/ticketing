<template>
  <div class="tw-w-full md:tw-px-8 lg:tw-px-0">
    <h1 class="tw-text-xl tw-font-bold">Create NFT Collection</h1>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form
        class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[60%]"
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
          <label>Image Collection</label>
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
                Change Image
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
              disabled
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
            rules="required|saleTime|public_sale_time:@whitelistSaleTime
              "
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
        <label>Mint Phases</label>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
        >
          <div v-for="(phase, index) in collection.phases" :key="index">
            <div
              class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-between tw-w-full md:tw-flex-row"
            >
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full dashboard-text-field-group md:tw-w-1/2"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="dashboard-text-field-border tw-w-full">
                  <v-text-field
                    v-model="phase.name"
                    placeholder="Phase Name"
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
                :rules="'required|number'"
                v-slot="{ errors }"
              >
                <div class="dashboard-text-field-border tw-w-full">
                  <v-text-field
                    v-model="phase.mint_price"
                    placeholder="Mint Price"
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
                rules="required|saleTime"
                v-slot="{ errors }"
              >
                <div class="dashboard-text-field-border tw-w-full">
                  <date-picker
                    v-model="phase.mint_time"
                    type="datetime"
                    placeholder="Select Mint Time"
                  ></date-picker>
                </div>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="tw-flex tw-flex-row tw-w-full tw-justify-end">
              <button
                class="tw-bg-[#A0A0A0] tw-rounded tw-py-2 tw-px-6 tw-text-white tw-my-2"
                @click.prevent="removeMintPhase(index)"
              >
                Remove Phase
              </button>
            </div>
          </div>
          <button
            class="tw-bg-[#A0A0A0] tw-rounded tw-py-2 tw-px-6 tw-text-white"
            @click.prevent="addMintPhase"
          >
            Add Phase
          </button>
        </div>
        <ValidationProvider
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          name="twitter"
          rules="link"
          v-slot="{ errors }"
        >
          <label>Twitter Link</label>
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
          rules="link"
          v-slot="{ errors }"
        >
          <label>Discord Link</label>
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
          name="instagram"
          rules="link"
          v-slot="{ errors }"
        >
          <label>Instagram Link</label>
          <div class="dashboard-text-field-border tw-w-full">
            <v-text-field
              v-model="collection.instagram"
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
          rules="link"
          v-slot="{ errors }"
        >
          <label ref="social">Website</label>
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
          <div class="tw-text-red-600" v-if="socialError">
            {{ socialErrorMessage }}
          </div>
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

import { createCollection, getDraftById } from "@/services/CollectionService";
import { getAllFolder, getFolderById } from "@/services/AssetsService";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

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

extend("social", {
  params: ["twitter", "discord"],
  validate(value, target: any) {
    if (!value && !target.twitter && !target.discord) {
      return false;
    }
    return true;
  },
  message: "Twitter URL, Discord URL or Website is required",
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
        instagram: null,
        resource_account: null,
        txnhash: null,
        un: "",
        candy_id: process.env.CANDY_MACHINE_ID,
        phases: [{ name: "", mint_time: null, mint_price: null }],
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
      socialErrorMessage: "",
      socialError: false,
      tbd: false,
    };
  },
  methods: {
    async submitCollection() {
      this.imageError = false;
      this.socialError = false;

      const socials = [
        this.collection.twitter,
        this.collection.discord,
        this.collection.website,
        this.collection.instagram,
      ];
      let counter = 0;

      socials.map((social) => {
        if (social) {
          counter++;
        }
      });

      if (counter <= 1) {
        this.socialError = true;
        this.socialErrorMessage = "Please Fill up at least 2 social links";

        this.$refs["social"].scrollIntoView({ behavior: "smooth" });

        return;
      }

      if (!this.collection.image) {
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

        const tempCollection = this.collection;

        tempCollection.whitelist_sale_time = tempCollection.whitelist_sale_time
          ? new Date(tempCollection.whitelist_sale_time).toISOString()
          : null;

        tempCollection.public_sale_time = new Date(
          tempCollection.public_sale_time
        ).toISOString();

        const phases: any[] = [];

        tempCollection.phases.map((phase: any) => {
          const id = phase.name.replaceAll(" ", "-").toLowerCase();

          phases.push({
            id: id,
            name: phase.name,
            mint_time: phase.mint_time,
            mint_price: phase.mint_price,
          });
        });

        tempCollection.phases = phases;

        await this.sendDataToCandyMachineCreator();

        const formData = new FormData();

        formData.append("name", tempCollection.name);
        formData.append("description", tempCollection.description);
        formData.append(
          "royalty_percentage",
          tempCollection.royalty_percentage
        );
        formData.append(
          "royalty_payee_address",
          tempCollection.royalty_payee_address
        );
        formData.append(
          "whitelist_sale_time",
          tempCollection.whitelist_sale_time
        );
        formData.append("public_sale_time", tempCollection.public_sale_time);
        formData.append("public_sale_price", tempCollection.public_sale_price);
        formData.append("whitelist_price", tempCollection.whitelist_price);
        formData.append("supply", tempCollection.supply);
        formData.append("twitter", tempCollection.twitter);
        formData.append("discord", tempCollection.discord);
        formData.append("website", tempCollection.website);
        formData.append("resource_account", tempCollection.resource_account);
        formData.append("txnhash", tempCollection.txnhash);
        formData.append("candy_id", tempCollection.candy_id);
        formData.append("phases", JSON.stringify(tempCollection.phases));
        if (this.image.name) {
          formData.append("image", this.image);
        } else {
          formData.append("image", tempCollection.image);
        }

        await createCollection(formData);

        this.submitting = false;

        this.message = "Collection Created Successfully";
        this.$toast.showMessage({ message: this.message, error: false });
        this.$router.push("/dashboard");
      } catch (error: any) {
        this.$toast.showMessage({ message: error, error: true });

        this.submitting = false;
      }
    },

    imageSelected(event: any) {
      this.image = event.target.files[0];
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
    addMintPhase() {
      this.collection.phases.push({ name: null, mintTime: null });
    },
    removeMintPhase(index: number) {
      this.collection.phases.splice(index, 1);
    },
  },
  async created() {
    this.collection.phases = [];

    const draftRes = await getDraftById(this.$route.params.id);

    this.collection = draftRes.data.draft.data;

    this.collection.phases = this.collection.phases
      ? JSON.parse(this.collection.phases)
      : [];

    this.collection.phases.map((phase: any) => {
      phase.mint_time = new Date(phase.mint_time);
    });

    if (this.collection.whitelist_price) {
      this.whitelistEnabled = true;
    }

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

    this.folders.map((folder: any) => {
      if (folder.metadata.baseURI === this.collection.baseURL) {
        this.baseURL = folder.folder_name;
      }
    });
  },
};
</script>
<style scoped>
.image-collection {
  display: none;
  background-color: #878787;
}

::v-deep .mx-input {
  background: #0e0d0d !important;
}
</style>
