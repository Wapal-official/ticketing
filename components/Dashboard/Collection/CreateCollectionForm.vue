<template>
  <div class="tw-w-full" v-if="!loading" ref="top">
    <stepper :steps="steps" :stepNumber="stepNumber" @stepClicked="changeStep">
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
            rules="required|descriptionLength"
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
            rules="link|required"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="collection.twitter"
              clearable
              type="url"
              placeholder="Twitter Link"
              label="Twitter Link"
              :required="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            name="discord"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="collection.discord"
              label="Discord Link (Optional)"
              placeholder="Discord Link"
              type="url"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            name="instagram"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="collection.instagram"
              label="Instagram Link (Optional)"
              placeholder="Instagram Link"
              type="url"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            name="website"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="collection.website"
              label="Website Link (Optional)"
              placeholder="Website Link"
              type="url"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            <div class="tw-text-red-600 tw-text-sm" v-if="socialError">
              {{ socialErrorMessage }}
            </div>
          </ValidationProvider>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
          >
            <input-image-drag-and-drop
              label="Featured Image"
              :required="true"
              @fileSelected="imageSelected"
              :file="collection.image"
              fileSize="Upto 15 MB"
            />
            <div class="tw-text-red-600 tw-text-sm" v-if="imageError">
              {{ imageErrorMessage }}
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-end tw-justify-end"
          >
            <button-primary title="Next" @click="validateFormForNextStep" />
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="2">
        <ValidationObserver
          ref="royaltyForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Royalty and Assets
          </h2>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            name="royaltyPayeeAddress"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="collection.royalty_payee_address"
              label="Royalty Payee Address"
              :required="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            name="royaltyPercentage"
            rules="required|number|percentage"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="collection.royalty_percentage"
              label="Royalty Percentage"
              placeholder="Eg. 5.5"
              :required="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            name="baseurl"
            :rules="!tbd ? 'required' : ''"
            v-slot="{ errors }"
          >
            <input-auto-complete
              v-model="baseURL"
              :items="folders"
              placeholder="Select your NFT Vault"
              text="folder_name"
              @change="setSupply"
              label="Assets"
              :required="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
            name="supply"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              v-model="collection.supply"
              :disabled="true"
              label="Supply"
              placeholder="Supply"
              :required="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>

          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-end tw-justify-end"
          >
            <button-primary title="Next" @click="validateFormForNextStep" />
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="3">
        <ValidationObserver
          ref="phaseForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Sale Phase
          </h2>
          <div
            class="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-w-full md:tw-w-1/2"
          >
            <label>Whitelist Sale</label>
            <v-switch v-model="whitelistEnabled"></v-switch>
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-start"
            v-if="whitelistEnabled"
          >
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
            >
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
                name="whitelistSaleTime"
                rules="saleTime"
                v-slot="{ errors }"
                v-if="whitelistEnabled"
              >
                <input-date-picker
                  v-model="collection.whitelist_sale_time"
                  type="datetime"
                  placeholder="Select Whitelist Sale time"
                  :disabled="whitelistTBD"
                  label="Whitelist Sale Time"
                />
                <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
              </ValidationProvider>

              <v-checkbox
                v-model="whitelistTBD"
                label="TBD"
                :ripple="false"
                class="!tw-text-dark-2"
              ></v-checkbox>
            </div>
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
              name="whitelistSalePrice"
              rules="number"
              v-slot="{ errors }"
            >
              <input-text-field
                v-model="collection.whitelist_price"
                label="Whitelist Sale Price"
                placeholder="Eg: 0.1"
                :disabled="!whitelistEnabled"
              >
                <template #append-icon>
                  <img :src="aptIcon" alt="APT" />
                </template>
              </input-text-field>
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-gap-8 tw-w-full md:tw-flex-row md:tw-items-start"
          >
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
              name="publicSaleTime"
              :rules="
                !tbd
                  ? 'required|saleTime|public_sale_time:@whitelistSaleTime'
                  : 'saleTime|public_sale_time:@whitelistSaleTime'
              "
              v-slot="{ errors }"
            >
              <input-date-picker
                v-model="collection.public_sale_time"
                type="datetime"
                placeholder="Select Public Sale time"
                :disabled="publicSaleTBD"
                label="Public Sale Time"
                :required="!publicSaleTBD"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>

              <v-checkbox
                v-model="publicSaleTBD"
                label="TBD"
                :ripple="false"
                class="!tw-text-dark-2"
              ></v-checkbox>
            </ValidationProvider>
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
              name="publicSalePrice"
              :rules="!tbd ? 'required|number' : 'number'"
              v-slot="{ errors }"
            >
              <input-text-field
                v-model="collection.public_sale_price"
                placeholder="Eg: 0.1"
                label="Public Sale Price"
                :required="!publicSaleTBD"
              >
                <template #append-icon>
                  <img :src="aptIcon" alt="APT" />
                </template>
              </input-text-field>
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
          >
            <div
              v-for="(phase, index) in collection.phases"
              :key="index"
              class="tw-w-full"
            >
              <div
                class="tw-flex tw-flex-col tw-gap-4 tw-items-start tw-justify-between tw-w-full md:tw-flex-row"
              >
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input-text-field
                    v-model="phase.name"
                    placeholder="Phase Name"
                    label="Phase Name"
                    :required="true"
                  />
                  <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                  rules="required|saleTime|phase_sale_time:@publicSaleTime"
                  v-slot="{ errors }"
                >
                  <div
                    class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-w-full"
                  >
                    <input-date-picker
                      v-model="phase.mint_time"
                      type="datetime"
                      placeholder="Select Mint Time"
                      label="Mint Time"
                      :required="true"
                    ></input-date-picker>
                  </div>
                  <div class="tw-text-red-600 tw-text-sm">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                  rules="required|number"
                  v-slot="{ errors }"
                >
                  <div
                    class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-w-full"
                  >
                    <input-text-field
                      v-model="phase.mint_price"
                      placeholder="Mint Price"
                      label="Mint Price"
                      :required="true"
                    >
                      <template #append-icon>
                        <img :src="aptIcon" alt="APT" />
                      </template>
                    </input-text-field>

                    <button @click="removeMintPhase(index)" class="tw-mt-8">
                      <i class="bx bxs-trash tw-text-xl tw-text-dark-3"></i>
                    </button>
                  </div>
                  <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>

            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
            >
              <button-primary
                title="Add Phase"
                :bordered="true"
                @click="addMintPhase"
              >
                <template #prepend-icon>
                  <i class="bx bx-plus tw-text-xl tw-pr-4"></i>
                </template>
              </button-primary>
              <tool-tip>
                <template #text>
                  <i class="bx bx-info-circle tw-text-xl"></i>
                </template>
                <template #tip>
                  <div
                    class="tw-flex tw-flex-col tw-items-start-tw-justify-start tw-text-white tw-text-sm"
                  >
                    <div class="tw-font-semibold">Caution</div>
                    <div>
                      Click 'Start Next Phase' 3 minutes before the start
                    </div>
                    <div>
                      of each phase if you have set the different prices for
                    </div>
                    <div>different phases. No need for public mint.</div>
                  </div>
                </template>
              </tool-tip>
            </div>
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
              name="mintLimit"
              :rules="'required|number'"
              v-slot="{ errors }"
            >
              <input-text-field
                v-model="collection.public_mint_limit"
                placeholder="Eg: 0"
                label="Public Address Mint Limit"
                :required="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <v-checkbox
              v-model="saveAsDraft"
              label="Save as Draft"
              :ripple="false"
              v-if="!draft"
            ></v-checkbox>
            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
              :class="{ 'tw-justify-between': draft }"
            >
              <button-primary
                title="Save Changes"
                :loading="submitting"
                @click="saveDraft"
                v-if="draft"
              />
              <button-primary
                title="Next"
                :loading="submitting"
                @click="validateFormForNextStep"
              />
            </div>
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="4">
        <div
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Review
          </h2>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <h3 class="tw-leading-[150%] tw-font-bold">Details</h3>
            <button
              class="tw-text-sm tw-text-dark-3 tw-font-semibold"
              @click="stepNumber = 1"
            >
              Edit
            </button>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
          >
            <h4 class="tw-font-medium">{{ collection.name }}</h4>
            <div>
              {{ collection.description }}
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <h3 class="tw-leading-[150%] tw-font-bold">Royalty</h3>
            <button
              class="tw-text-sm tw-text-dark-3 tw-font-semibold"
              @click="stepNumber = 2"
            >
              Edit
            </button>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
          >
            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between"
            >
              <div>
                <div
                  class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
                >
                  Royalty Percentage
                </div>
                <div class="tw-text-white">
                  {{ collection.royalty_percentage }}%
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
                <div
                  class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
                >
                  Total Supply
                </div>
                <div class="tw-text-white">{{ collection.supply }}</div>
              </div>
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <h3 class="tw-leading-[150%] tw-font-bold">Phase</h3>
            <button
              class="tw-text-sm tw-text-dark-3 tw-font-semibold"
              @click="stepNumber = 3"
            >
              Edit
            </button>
          </div>
          <nft-mint-phase-box
            v-for="(phase, index) in collection.phases"
            :phase="{
              name: phase.name,
              mint_time: phase.mint_time,
              mint_price: phase.mint_price,
            }"
            :key="index"
            v-if="collection.phases.length > 0"
          />
          <nft-mint-phase-box
            :phase="{
              name: 'Whitelist Sale',
              mint_time: collection.whitelist_sale_time,
              mint_price: collection.whitelist_price,
            }"
            v-if="whitelistEnabled"
          />
          <nft-mint-phase-box
            :phase="{
              name: 'Public Sale',
              mint_time: collection.public_sale_time,
              mint_price: collection.public_sale_price,
            }"
          />
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
          >
            <button-primary
              title="Create"
              :loading="submitting"
              @click="submitCollection"
            />
          </div>
        </div>
      </v-stepper-content>
    </stepper>
  </div>
  <reusable-loading v-else />
</template>
<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import aptIcon from "@/assets/img/aptBlack.svg";
import {
  createCollection,
  createDraft,
  sortPhases,
  getDraftById,
  editDraft,
  editImage,
} from "@/services/CollectionService";
import { getAllFolder, getFolderById } from "@/services/AssetsService";
import { createCollectionV2 } from "@/services/AptosCollectionService";
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
    if (value <= target.target) {
      return false;
    }

    return true;
  },
  message: "Public Sale Time should be greater than whitelist sale time",
});

extend("saleTime", {
  validate(value) {
    if (new Date(value).getTime() <= Date.now()) {
      return false;
    }
    return true;
  },
  message: "Sale time should be greater than current time",
});

extend("phase_sale_time", {
  params: ["target"],
  validate(value, target: any) {
    if (new Date(value).getTime() >= new Date(target.target).getTime()) {
      return false;
    }
    return true;
  },
  message: "Sale time in phase should be less than Public Sale Time",
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
  },
  props: { draft: { type: Boolean, default: false } },
  data() {
    return {
      steps: ["Details", "Royalty", "Phase", "Review"],
      stepNumber: 1,
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
        phases: [{ name: "", mint_time: null, mint_price: null }],
        public_mint_limit: null,
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
      whitelistTBD: false,
      publicSaleTBD: false,
      loading: false,
      saveAsDraft: false,
      aptIcon,
    };
  },
  methods: {
    async changeStep(step: number) {
      this.stepNumber = step;
    },
    async validateFormForNextStep() {
      switch (this.stepNumber) {
        case 1:
          const detailValidated = await this.$refs.detailForm.validate();

          if (!detailValidated) {
            break;
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

            break;
          }

          if (!this.image.name && !this.collection.image) {
            this.imageError = true;
            this.imageErrorMessage = "Please select an image for collection";
            return;
          }

          if (this.imageError) {
            return;
          }

          this.stepNumber++;
          break;
        case 2:
          const royaltyValidated = await this.$refs.royaltyForm.validate();

          if (!royaltyValidated) {
            break;
          }

          this.stepNumber++;
          break;
        case 3:
          const phaseValidated = await this.$refs.phaseForm.validate();

          if (!phaseValidated) {
            break;
          }
          this.stepNumber++;
          break;
        default:
          break;
      }
    },
    async submitCollection() {
      const phaseValidated = await this.$refs.phaseForm.validate();

      if (!phaseValidated) {
        return;
      }
      try {
        this.submitting = true;

        const selectedFolder = this.folders.find(
          (folder: any) => folder.folder_name === this.baseURL
        );

        this.collection.baseURL = selectedFolder.metadata.baseURI;

        const tempCollection = { ...this.collection };

        tempCollection.whitelist_sale_time = tempCollection.whitelist_sale_time
          ? new Date(tempCollection.whitelist_sale_time).toISOString()
          : "";

        tempCollection.public_sale_time = tempCollection.public_sale_time
          ? new Date(tempCollection.public_sale_time).toISOString()
          : "";

        const phases: any[] = [];

        tempCollection.phases.map((phase: any) => {
          const id = phase.name.trim().replaceAll(" ", "-").toLowerCase();

          phases.push({
            id: id,
            name: phase.name,
            mint_time: phase.mint_time,
            mint_price: phase.mint_price,
          });
        });

        if (this.whitelistEnabled && !this.tbd && !this.saveAsDraft) {
          phases.push({
            id: "whitelist",
            name: "whitelist sale",
            mint_time: this.collection.whitelist_sale_time,
            mint_price: this.collection.whitelist_price,
          });
        }

        const sortedPhases = sortPhases(phases);

        tempCollection.phases = sortedPhases;

        if (this.tbd || this.saveAsDraft) {
          if (this.draft) {
            await this.saveDraft(tempCollection);
          } else {
            await this.sendDataToCreateDraft(tempCollection);
          }
          return;
        }

        await this.sendDataToCandyMachineCreator();

        tempCollection.txnhash = this.collection.txnhash;
        tempCollection.resource_account = this.collection.resource_account;

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
        formData.append("instagram", tempCollection.instagram);
        formData.append("resource_account", tempCollection.resource_account);
        formData.append("txnhash", tempCollection.txnhash);
        formData.append("candy_id", tempCollection.candy_id);
        formData.append("phases", JSON.stringify(tempCollection.phases));
        formData.append("isEdition", JSON.stringify(false));

        const draft_id = this.$route.params.id;

        if (draft_id) {
          formData.append("draft_id", draft_id);
        }

        if (this.image.name) {
          formData.append("image", this.image);
        } else {
          formData.append("image", tempCollection.image);
        }

        await createCollection(formData);

        this.submitting = false;

        this.message = "Collection Created Successfully";
        this.$toast.showMessage({ message: this.message, error: false });
        this.$router.push("/dashboard/collection/under-review");
      } catch (error: any) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });

        this.submitting = false;
      }
    },

    imageSelected(image: any) {
      this.image = image;

      if (Math.floor(this.image.size / (1024 * 1024)) >= 15) {
        this.imageError = true;
        this.imageErrorMessage = "Please Upload Image less than 15MB";
      } else {
        this.imageError = false;
      }
    },

    async sendDataToCandyMachineCreator() {
      let whitelistTime = null;
      let whitelist_price = this.collection.whitelist_price;

      let publicSaleTime = Math.floor(
        new Date(this.collection.public_sale_time).getTime() / 1000
      );

      whitelistTime = Math.floor(
        new Date(this.collection.whitelist_sale_time).getTime() / 1000
      );

      if (!this.whitelistEnabled) {
        whitelistTime = publicSaleTime;
        publicSaleTime += 1;
        whitelist_price = this.collection.public_sale_price;
      }

      if (this.collection.phases[0]) {
        whitelistTime = Math.floor(
          new Date(this.collection.phases[0].mint_time).getTime() / 1000
        );
        whitelist_price = this.collection.whitelist_price;
      }

      const pre_sale_price = parseFloat(
        (whitelist_price * Math.pow(10, 8)).toFixed(4)
      );
      const public_sale_price = parseFloat(
        (this.collection.public_sale_price * Math.pow(10, 8)).toFixed(4)
      );

      const candyMachineArguments = {
        collection_name: this.collection.name,
        collection_description: this.collection.description,
        baseuri: this.collection.baseURL,
        royalty_payee_address: this.collection.royalty_payee_address,
        royalty_points_denominator: 1000,
        royalty_points_numerator: this.collection.royalty_percentage * 10,
        presale_mint_time: whitelistTime,
        public_sale_mint_time: publicSaleTime,
        presale_mint_price: pre_sale_price,
        public_sale_mint_price: public_sale_price,
        total_supply: this.collection.supply,
        public_mint_limit: this.collection.public_mint_limit,
      };

      const res = await createCollectionV2(candyMachineArguments);

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
    async sendDataToCreateDraft(tempCollection: any) {
      const formData = new FormData();

      formData.append("name", tempCollection.name);
      formData.append("description", tempCollection.description);
      formData.append("royalty_percentage", tempCollection.royalty_percentage);

      formData.append(
        "royalty_payee_address",
        tempCollection.royalty_payee_address
      );
      formData.append("baseURL", tempCollection.baseURL);

      formData.append("supply", tempCollection.supply);

      formData.append("public_sale_price", tempCollection.public_sale_price);
      formData.append("whitelist_price", tempCollection.whitelist_price);
      formData.append("twitter", tempCollection.twitter);
      formData.append("discord", tempCollection.discord);
      formData.append("website", tempCollection.website);
      formData.append("instagram", tempCollection.instagram);
      formData.append("candy_id", tempCollection.candy_id);
      formData.append("phases", JSON.stringify(tempCollection.phases));
      formData.append("isApproved", "false");
      formData.append("isEdition", JSON.stringify(false));

      if (this.image.name) {
        formData.append("image", this.image);
      } else {
        formData.append("image", tempCollection.image);
      }

      if (!this.publicSaleTBD) {
        formData.append("public_sale_time", tempCollection.public_sale_time);
      }

      if (!this.whitelistTBD) {
        formData.append(
          "whitelist_sale_time",
          tempCollection.whitelist_sale_time
        );
      }

      await createDraft(formData);

      this.submitting = false;

      this.message = "Draft Created Successfully";
      this.$toast.showMessage({ message: this.message, error: false });
      this.$router.push("/dashboard/collection/draft");
    },
    async setCollectionDataFromDraft() {
      this.whitelistEnabled = true;

      const draftRes = await getDraftById(this.$route.params.id);

      const draftData = draftRes.data.draft.data;

      draftData.candy_id = this.collection.candy_id;

      this.collection = draftData;

      try {
        this.collection.phases = this.collection.phases
          ? JSON.parse(this.collection.phases)
          : [];
      } catch {
        this.collection.phases = this.collection.phases
          ? this.collection.phases
          : [];
      }

      this.collection.phases.map((phase: any) => {
        phase.mint_time = new Date(phase.mint_time);
      });

      this.folders.map((folder: any) => {
        if (folder.metadata.baseURI === this.collection.baseURL) {
          this.baseURL = folder.folder_name;
        }
      });

      this.whitelistTBD = this.collection.whitelist_sale_time ? false : true;
      this.publicSaleTBD = this.collection.public_sale_time ? false : true;

      if (this.collection.whitelist_sale_time) {
        this.collection.whitelist_sale_time = new Date(
          this.collection.whitelist_sale_time
        );
      }

      if (this.collection.public_sale_time) {
        this.collection.public_sale_time = new Date(
          this.collection.public_sale_time
        );
      }
    },
    async saveDraft() {
      try {
        const formData = new FormData();

        const selectedFolder = this.folders.find(
          (folder: any) => folder.folder_name === this.baseURL
        );

        this.collection.baseURL = selectedFolder.metadata.baseURI;

        const tempCollection = structuredClone(this.collection);

        await editDraft(this.$route.params.id, tempCollection);

        if (this.image.name) {
          formData.append("image", this.image);

          await editImage(this.$route.params.id, formData);
        }

        this.$toast.showMessage({ message: "Draft Updated Successfully" });

        this.$router.push("/dashboard/collection/draft");
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({
          message: "Something went wrong. Please try again",
          error: true,
        });
      }
    },
  },
  computed: {
    tbd() {
      return this.whitelistTBD || this.publicSaleTBD;
    },
  },
  async mounted() {
    if (this.draft) {
      this.loading = true;
    }

    this.collection.phases = [];
    const folderRes = await getFolderById(
      process.env.baseURL?.includes("staging")
        ? "642aeb3da50447f2631f38f3"
        : "64e88318505087cecc568176"
    );

    this.folders.push(folderRes.data.folderInfo);

    const res = await getAllFolder(this.$store.state.userStore.user.user_id);

    res.data.folderInfo.map((folder: any) => {
      if (folder.metadata.baseURI) {
        this.folders.push(folder);
      }
    });

    if (this.draft) {
      await this.setCollectionDataFromDraft();
    }
    this.loading = false;
  },
  watch: {
    whitelistTBD() {
      this.collection.whitelist_sale_time = "";
    },
    publicSaleTBD() {
      this.collection.public_sale_time = "";
    },
    whitelistEnabled() {
      this.collection.whitelist_sale_time = "";
      this.collection.whitelist_price = "";
    },
    stepNumber() {
      const container = document.getElementById("container");
      container?.scrollTo(0, 0);
    },
  },
};
</script>
<style scoped>
.image-collection {
  display: none;
  background-color: #878787;
}
</style>
