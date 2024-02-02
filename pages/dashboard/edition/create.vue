<template>
  <div class="tw-w-full" ref="top">
    <stepper
      :steps="formSteps"
      :stepNumber="formStepNumber"
      @stepClicked="changeStep"
    >
      <v-stepper-content step="1">
        <ValidationObserver
          ref="detailForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Nft Collection Details
          </h2>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="name"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Collection Name"
              :required="true"
              v-model="collection.name"
              placeholder="Collection Name"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="description"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-area
              label="Collection Description"
              :required="true"
              v-model="collection.description"
              placeholder="Collection Description"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="twitter"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Twitter Link"
              v-model="collection.twitter"
              placeholder="Twitter Link"
            />
            <div class="tw-text-red-600 tw-text-sm">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="discord"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Discord Link"
              v-model="collection.discord"
              placeholder="Discord Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="website"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Website Link"
              v-model="collection.website"
              placeholder="Website Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="instagram"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Instagram Link"
              v-model="collection.instagram"
              placeholder="Instagram Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            <div class="tw-text-red-600 tw-text-sm" v-if="socialError">
              {{ socialErrorMessage }}
            </div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="tweetLength"
            rules="tweetLength"
            v-slot="{ errors }"
          >
            <input-text-area
              label="Tweet Template (Optional)"
              v-model="collection.tweet"
              placeholder="Craft your tweetable moment! It's shareable on Twitter after minting your NFT."
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
          >
            <button-primary title="Next" @click="validateFormForNextStep" />
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="2">
        <ValidationObserver
          ref="tokenDetailForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Token Details
          </h2>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="tokenName"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              :required="true"
              label="Token Name"
              v-model="collection.tokenName"
              placeholder="Token Name"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="tokenDescription"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-area
              :required="true"
              label="Token Description"
              v-model="collection.tokenDesc"
              placeholder="Token Description"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
          >
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="type"
              rules="required"
              v-slot="{ errors }"
            >
              <input-auto-complete
                :required="true"
                label="NFT Type"
                v-model="collection.type"
                placeholder="Select NFT Type"
                :items="nftType"
                text="name"
                itemValue="id"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="royalty_percentage"
              rules="required|percentage"
              v-slot="{ errors }"
            >
              <input-text-field
                :required="true"
                label="Royalty Percentage"
                v-model="collection.royalty_percentage"
                placeholder="Eg. 4"
                :showPercentage="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
            v-if="collection.type !== '1-1'"
          >
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="mint_time"
              rules="required"
              v-slot="{ errors }"
            >
              <input-date-picker
                :required="true"
                label="Mint Date"
                v-model="collection.public_sale_time"
                placeholder="Select Mint Time"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="mint_price"
              rules="required"
              v-slot="{ errors }"
            >
              <input-text-field
                :required="true"
                label="Mint Price"
                v-model="collection.public_sale_price"
                placeholder="Eg. 1"
              >
                <template #append-icon>
                  <img
                    :src="selectedCoinType.imageWhite"
                    alt="Coin Type"
                    width="14px"
                    height="14px"
                  />
                </template>
              </input-text-field>
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
            v-if="collection.type !== '1-1'"
          >
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
              rules="required"
              v-slot="{ errors }"
            >
              <input-text-field
                v-model="collection.public_mint_limit"
                label="Mint Limit (0 for unlimited mint)"
                :required="true"
                placeholder="Eg. 10"
              />
              <div class="tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
              rules="required"
              v-slot="{ errors }"
              v-if="collection.type === 'limited-edition'"
            >
              <input-text-field
                v-model="collection.supply"
                label="Supply"
                :required="true"
                placeholder="Eg. 2"
              />
              <div class="tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
            rules="required"
            v-slot="{ errors }"
          >
            <input-auto-complete
              :required="true"
              label="Coin Type"
              v-model="collection.coinType"
              placeholder="Select Coin Type"
              :items="coinTypes"
              text="name"
              itemValue="id"
            />
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          >
            <input-image-drag-and-drop
              :required="true"
              label="Image"
              :file="collection.image"
              @fileSelected="selectImage"
            />
            <div class="tw-text-red-600 tw-text-sm" v-if="imageError">
              {{ imageErrorMessage }}
            </div>
          </ValidationProvider>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
          >
            <button-primary title="Next" @click="validateFormForNextStep" />
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="3">
        <ValidationObserver
          ref="attributeForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Attributes
          </h2>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-pb-14 md:tw-items-start md:tw-justify-start lg:tw-flex-row lg:tw-justify-start"
          >
            <div
              id="image-preview"
              class="tw-w-full tw-h-[300px] md:tw-w-[300px]"
            ></div>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-w-full lg:tw-w-[540px]"
            >
              <div
                v-for="(attribute, index) in collection.attributes"
                :key="index"
                class="tw-w-full"
              >
                <div
                  class="tw-flex tw-flex-col tw-gap-6 tw-items-start tw-justify-between tw-w-full md:tw-flex-row"
                >
                  <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input-text-field
                      v-model="attribute.trait_type"
                      placeholder="Attribute Type"
                      label="Attribute Type"
                      :required="true"
                    />
                    <div class="tw-text-red-600 tw-text-sm">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input-text-field
                      v-model="attribute.value"
                      placeholder="Value"
                      label="Value"
                      :required="true"
                    />

                    <div class="tw-text-red-600 tw-text-sm">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>

                  <button @click="removeAttribute(index)" class="tw-mt-10">
                    <i class="bx bxs-trash tw-text-xl tw-text-dark-3"></i>
                  </button>
                </div>
              </div>
              <button-primary
                title="Add Attribute"
                :bordered="true"
                @click="addAttribute"
                class="tw-my-5"
              >
                <template #prepend-icon>
                  <i class="bx bx-plus tw-text-xl tw-pr-4"></i>
                </template>
              </button-primary>
              <div class="tw-text-sm tw-text-red-600" v-if="attributeError">
                Please add at least 1 attribute
              </div>
              <div
                class="tw-w-full tw-flex tw-items-center tw-flex-row tw-justify-end"
              >
                <button-primary title="Next" @click="validateFormForNextStep" />
              </div>
            </div>
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="4">
        <div
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Review
          </h2>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 md:tw-items-center md:tw-justify-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start"
          >
            <div
              id="image-review"
              class="tw-w-full tw-h-[300px] md:tw-w-[300px]"
            ></div>
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1 lg:tw-w-[540px]"
            >
              <h1
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 tw-font-medium tw-pb-2"
              >
                {{ collection.name }}
                <i class="bx bxs-badge-check tw-text-xl tw-text-primary-1"></i>
              </h1>
              <h2 class="tw-text-white tw-text-[1.375em] tw-font-medium">
                {{ collection.tokenName }}
              </h2>
              <div class="tw-pb-4 tw-text-dark-0 tw-text-sm">
                {{ collection.tokenDesc }}
              </div>

              <div
                class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5 tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-start md:tw-justify-between"
              >
                <div
                  class="tw-w-full tw-flex tw-flex-col tw-items-stat tw-justify-start tw-gap-3"
                >
                  <div>
                    <div
                      class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                    >
                      Royalties
                    </div>
                    <div
                      class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
                    >
                      {{ collection.royalty_percentage }}%
                    </div>
                  </div>
                </div>
                <div
                  class="tw-w-full tw-flex tw-flex-col tw-items-stat tw-justify-start md:tw-items-end md:tw-justify-end"
                >
                  <div
                    class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                  >
                    Edition
                  </div>
                  <div
                    class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
                  >
                    {{ getSelectedType }}
                  </div>
                </div>
              </div>
              <div class="tw-w-full tw-pt-2" v-if="collection.type !== '1-1'">
                <nft-mint-phase-box
                  :phase="{
                    name: 'Public Sale',
                    mint_time: collection.public_sale_time,
                    mint_price: collection.public_sale_price,
                  }"
                  :coinType="collection.coinType"
                />
              </div>

              <div
                class="tw-w-full tw-flex tw-items-center tw-flex-row tw-justify-end tw-py-5"
              >
                <button-primary title="Create" @click="submit" />
              </div>
            </div>
          </div>
        </div>
      </v-stepper-content>
    </stepper>
    <reusable-progress-modal
      :showProgressModal="createEditionModal"
      :showClose="showCloseModal"
      :progress="progress"
      :error="error"
      :steps="getSteps"
      :name="getName"
      :description="getDescription"
      @closeProgressModal="createEditionModal = false"
    />
  </div>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { uploadAndCreateFile } from "@/services/AuctionService";
import {
  createCollectionV2,
  mintCollection,
} from "@/services/AptosCollectionService";
import { createCollection } from "@/services/CollectionService";

import axios from "axios";
import { getAvailableCoinTypes, getCoinType } from "@/utils/getCoinType";

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

extend("tweetLength", {
  validate(value) {
    if (value.length > 256) {
      return false;
    }
    return true;
  },
  message: "This field must not exceed 256 characters",
});

export default {
  layout: "dashboard",
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      step: 1,
      collection: {
        name: "",
        description: "",
        image: "",
        baseURL: "",
        royalty_payee_address:
          this.$store.state.walletStore.wallet.walletAddress,
        royalty_percentage: "",
        whitelist_sale_time: null,
        public_sale_time: null,
        public_sale_price: "",
        whitelist_price: "",
        supply: "",
        twitter: "",
        discord: "",
        website: "",
        instagram: "",
        resource_account: "",
        txnhash: "",
        un: "",
        candy_id: process.env.CANDY_MACHINE_V2,
        tokenName: "",
        tokenDesc: "",
        attributes: [{ trait_type: "", value: "" }],
        twitter: "",
        instagram: "",
        discord: "",
        website: "",
        type: "",
        public_mint_limit: "",
        seedz: false,
        coinType: "APT",
        tweet: "",
      },
      attribute: "",
      value: "",
      loading: false,
      valid: true,
      activePicker: "",
      startMenu: false,
      endMenu: false,
      file: null,
      imageError: false,
      imageErrorMessage: "",
      attributeError: false,
      createEditionModal: false,
      progress: 0,
      showCloseModal: false,
      error: false,
      oneOnOneSteps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Collection" },
        { step: 3, name: "Minting Collection" },
      ],
      limitedEditionSteps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Collection" },
      ],
      openEditionSteps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Collection" },
      ],
      nftType: [
        { name: "One on One", id: "1-1" },
        // { name: "Limited Edition", id: "limited-edition" },
        { name: "Open Edition", id: "open-edition" },
      ],
      coinTypes: getAvailableCoinTypes(),
      coinType: "APT",
      socialError: false,
      socialErrorMessage: "",
      formSteps: ["Details", "Token", "Attributes", "Review"],
      formStepNumber: 1,
    };
  },
  watch: {
    startMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
    },
    endMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
    },
    formStepNumber() {
      const container = document.getElementById("container");
      container?.scrollTo(0, 0);
    },
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    selectedNft() {
      return this.$store.state.auction.selectedNft;
    },
    getSteps() {
      if (this.collection.type === "1-1") {
        return this.oneOnOneSteps;
      } else if (this.collection.type === "limited-edition") {
        return this.limitedEditionSteps;
      } else {
        return this.openEditionSteps;
      }
    },
    getName() {
      return "Create Edition";
    },
    getDescription() {
      return `Please review and approve up to ${this.getSteps.length} transactions in your wallet window to create your edition.`;
    },
    getSelectedType() {
      let selectedType = "1/1";

      switch (this.collection.type) {
        case "1-1":
          selectedType = "1/1";
          break;
        case "open-edition":
          selectedType = "Open Edition";
          break;
        case "limited-edition":
          selectedType = "Limited Edition";
          break;
        default:
          break;
      }

      return selectedType;
    },
    selectedCoinType() {
      return getCoinType(this.collection.coinType);
    },
  },
  async mounted() {},
  methods: {
    saveStart(date) {
      this.$refs.startmenu.save(date);
    },
    saveEnd(date) {
      this.$refs.endmenu.save(date);
    },
    async nextStep() {
      this.imageError = false;
      if (!this.file) {
        this.imageError = true;
        this.imageErrorMessage = "Please Select an Image";
        return;
      }

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

        return;
      }

      this.step = 2;
    },
    addAttribute() {
      this.collection.attributes.push({
        trait_type: "",
        value: "",
      });
    },
    removeAttribute(index) {
      this.collection.attributes.splice(index, 1);
    },
    displayImage() {
      const previewImgElement = document.createElement("img");
      const reviewImgElement = document.createElement("img");

      reviewImgElement.src = previewImgElement.src = URL.createObjectURL(
        this.file
      );
      previewImgElement.classList.add("tw-w-full");
      previewImgElement.classList.add("tw-h-full");
      previewImgElement.classList.add("tw-object-fill");
      previewImgElement.classList.add("tw-max-h-[300px]");
      previewImgElement.classList.add("tw-rounded");

      reviewImgElement.classList.add("tw-w-full");
      reviewImgElement.classList.add("tw-h-full");
      reviewImgElement.classList.add("tw-object-fill");
      reviewImgElement.classList.add("tw-max-h-[300px]");
      reviewImgElement.classList.add("tw-rounded");

      const previewElement = document.getElementById("image-preview");
      const reviewElement = document.getElementById("image-review");

      if (previewElement.firstChild) {
        previewElement.removeChild(previewElement.firstChild);
      }

      if (reviewElement.firstChild) {
        reviewElement.removeChild(reviewElement.firstChild);
      }

      previewElement.prepend(previewImgElement);

      reviewElement.prepend(reviewImgElement);
    },
    selectImage(file) {
      this.file = file;
      this.displayImage();
    },
    async submit() {
      const validate = await this.$refs.attributeForm.validate();

      if (!validate) {
        return;
      }

      this.checkCoinType();

      switch (this.collection.type) {
        case "1-1":
          await this.createOneOnOneCollection();
          break;
        case "open-edition":
          await this.createOpenEdition();
          break;
        case "limited-edition":
          await this.createLimitedEdition();
          break;
        default:
          break;
      }
    },
    async createOneOnOneCollection() {
      try {
        if (!this.collection.attributes.length > 0) {
          throw new Error("Please provide at least one attribute");
        }

        this.error = false;
        this.loading = true;
        this.createEditionModal = true;

        this.progress = 1;

        //uploading and creating metadata file
        const metaUri = await this.uploadImageAndMetadata();

        this.collection.baseURL = metaUri;

        let mintTime = Math.floor(new Date().getTime() / 1000) + 30;

        this.progress = 2;

        const candyMachineArguments = {
          collection_name: this.collection.name,
          collection_description: this.collection.description,
          baseuri: this.collection.baseURL,
          royalty_payee_address: this.collection.royalty_payee_address,
          royalty_points_denominator: 1000,
          royalty_points_numerator: this.collection.royalty_percentage * 10,
          presale_mint_time: mintTime,
          public_sale_mint_time: mintTime + 1,
          presale_mint_price: 0,
          public_sale_mint_price: 0,
          total_supply: 1,
          public_mint_limit: 0,
          is_open_edition: false,
          coinType: this.collection.coinType,
        };

        const res = await createCollectionV2(candyMachineArguments);

        const resource_account = res.resourceAccount;
        const txnhash = res.transactionHash;

        //mint
        setTimeout(async () => {
          try {
            this.progress = 3;

            const mint = await mintCollection({
              candy_machine_id: this.collection.candy_id,
              candy_object: resource_account,
              amount: 1,
              publicMint: true,
            });

            this.$toast.showMessage({
              message: "1/1 Collection Minted Successfully",
            });

            this.$router.push("/dashboard/edition/one-one");
          } catch (error) {
            console.log(error);
            this.loading = false;
            this.error = true;
            this.showCloseModal = true;
            this.$toast.showMessage({ message: error, error: true });
          }
        }, 30000);
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.error = true;
        this.showCloseModal = true;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async validateFormForNextStep() {
      this.attributeError = false;
      this.socialError = false;
      this.imageError = false;
      switch (this.formStepNumber) {
        case 1:
          const detailValidated = await this.$refs.detailForm.validate();

          if (!detailValidated) {
            break;
          }

          this.socialError = false;

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

            break;
          }

          this.formStepNumber++;
          break;

        case 2:
          const tokenValidated = await this.$refs.tokenDetailForm.validate();

          if (!tokenValidated) {
            break;
          }

          if (!this.file || !this.file.name) {
            this.imageError = true;
            this.imageErrorMessage = "Please select an image for collection";
            break;
          }

          this.formStepNumber++;
          break;
        case 3:
          if (this.collection.attributes.length < 1) {
            this.attributeError = true;
            break;
          }

          const validate = await this.$refs.attributeForm.validate();

          if (!validate) {
            break;
          }
          this.formStepNumber++;
          break;
        default:
          break;
      }
    },
    changeStep(step) {
      this.formStepNumber = step;
    },
    formatDate(date) {
      return date;
    },
    async createOpenEdition() {
      try {
        this.error = false;
        this.loading = true;
        this.createEditionModal = true;

        this.progress = 1;

        await this.createOpenEditionInChain();

        const tempCollection = structuredClone(this.collection);

        tempCollection.public_sale_time = new Date(
          tempCollection.public_sale_time
        ).toISOString();

        const metadataRes = await axios.get(this.collection.baseURL);

        const metadata = metadataRes.data;

        const imageUrl = metadata.image;

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
          tempCollection.public_sale_mint_time
        );
        formData.append("public_sale_time", tempCollection.public_sale_time);
        formData.append("public_sale_price", tempCollection.public_sale_price);
        formData.append("whitelist_price", tempCollection.public_sale_price);
        formData.append("supply", tempCollection.supply);
        formData.append("twitter", tempCollection.twitter);
        formData.append("discord", tempCollection.discord);
        formData.append("website", tempCollection.website);
        formData.append("instagram", tempCollection.instagram);
        formData.append("resource_account", tempCollection.resource_account);
        formData.append("txnhash", tempCollection.txnhash);
        formData.append("candy_id", tempCollection.candy_id);
        formData.append("phases", JSON.stringify([]));
        formData.append("tweet", tempCollection.tweet);

        formData.append("image", imageUrl);

        formData.append("isEdition", true);
        formData.append("edition", tempCollection.type);

        formData.append("seedz", JSON.stringify(tempCollection.seedz));
        formData.append("coin_type", tempCollection.coinType);

        const res = await createCollection(formData);

        this.$toast.showMessage({
          message: "Open Edition Created Successfully",
          error: false,
        });

        this.$router.push("/dashboard/edition/open-edition");
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
        this.error = true;
        this.showCloseModal = true;
      }
    },
    async uploadImageAndMetadata() {
      const aptRes = await this.$store.dispatch(
        "walletStore/getAptForFileUpload"
      );

      const transactionRes = await this.$store.dispatch(
        "walletStore/signTransactionForFileUpload",
        aptRes.requiredBalance
      );

      if (!transactionRes.success) {
        throw new Error("Transaction Not Successful Please Try Again");
      }

      //uploading and creating metadata file
      const metaUri =
        (await uploadAndCreateFile(this.file, {
          name: this.collection.tokenName,
          description: this.collection.tokenDesc,
          attributes: this.collection.attributes,
        })) + "/";

      return metaUri;
    },
    async createOpenEditionInChain() {
      const metadataUri = await this.uploadImageAndMetadata();

      this.progress = 2;

      this.collection.baseURL = metadataUri;

      const tempCollection = structuredClone(this.collection);

      const mintTime = Math.floor(
        new Date(tempCollection.public_sale_time).getTime() / 1000
      );

      const mint_price = parseFloat(
        (tempCollection.public_sale_price * Math.pow(10, 8)).toFixed(4)
      );

      const candyMachineArguments = {
        collection_name: this.collection.name,
        collection_description: this.collection.description,
        baseuri: this.collection.baseURL,
        royalty_payee_address: this.collection.royalty_payee_address,
        royalty_points_denominator: 1000,
        royalty_points_numerator: this.collection.royalty_percentage * 10,
        presale_mint_time: mintTime,
        public_sale_mint_time: mintTime + 1,
        presale_mint_price: mint_price,
        public_sale_mint_price: mint_price,
        total_supply: 1,
        public_mint_limit: this.collection.public_mint_limit,
        is_open_edition: true,
        coinType: this.collection.coinType,
      };

      const res = await createCollectionV2(candyMachineArguments);

      this.collection.resource_account = res.resourceAccount;
      this.collection.txnhash = res.transactionHash;
    },
    checkCoinType() {
      const coinTypeObject = getCoinType(this.collection.coinType);

      this.collection.candy_id = coinTypeObject.candy_id;
    },
  },
};
</script>

<style scoped>
.upload-bar {
  margin: 0px 0px 30px 0px;
  width: 100%;
  border: 2px dashed #d9d9d9;
}

.v-stepper__content {
  padding: 0px !important;
}

.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.mint-auction-stepper .v-stepper__step__step {
  background: black !important;
}
</style>
