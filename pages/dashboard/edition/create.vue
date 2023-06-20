<template>
  <div>
    <p class="tw-text-3xl tw-text-wapal-gray !tw-font-medium">NFT Details</p>

    <v-stepper v-model="step" class="!tw-bg-transparent">
      <v-stepper-items>
        <v-stepper-content step="1">
          <p class="text-h6">Collection</p>
          <ValidationObserver ref="collectionForm" v-slot="{ handleSubmit }">
            <form
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 xl:tw-w-1/2"
              @submit.prevent="handleSubmit(nextStep)"
            >
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Collection Name</label
                >
                <reusable-text-field
                  v-model="mint.colName"
                  type="text"
                  placeholder="Collection Name"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Collection Description</label
                >
                <reusable-text-area
                  v-model="mint.colDesc"
                  placeholder="Collection Description"
                  type="text"
                ></reusable-text-area>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="link"
                v-slot="{ errors }"
              >
                <label ref="social">Twitter Link</label>
                <reusable-text-field
                  v-model="mint.twitter"
                  type="text"
                  placeholder="Twitter Link"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="link"
                v-slot="{ errors }"
              >
                <label>Instagram Link</label>
                <reusable-text-field
                  v-model="mint.instagram"
                  type="text"
                  placeholder="Instagram Link"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <div v-if="socialError" class="tw-text-red-600">
                {{ socialErrorMessage }}
              </div>
              <p class="text-h6">Token Details</p>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Token Name</label
                >
                <reusable-text-field
                  v-model="mint.tokenName"
                  placeholder="Token Name"
                  type="text"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Token Description</label
                >
                <reusable-text-area
                  v-model="mint.tokenDesc"
                  placeholder="Token Description"
                  type="text"
                ></reusable-text-area>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <div
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
              >
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required"
                  name="auction_start"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >NFT Type</label
                  >
                  <reusable-auto-complete
                    v-model="mint.type"
                    placeholder="Select NFT Type"
                    text="name"
                    value="id"
                    itemValue="id"
                    :items="nftType"
                  />
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|percentage"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >Royalties Fees in Percent</label
                  >
                  <reusable-text-field
                    v-model="mint.royalty"
                    type="text"
                    placeholder="Eg. 2"
                  ></reusable-text-field>
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
                v-if="mint.type === 'limited-edition'"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Supply</label
                >
                <reusable-text-field
                  v-model="mint.supply"
                  type="text"
                  placeholder="Eg. 2"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <div class="upload-bar tw-w-full" id="drop-container">
                <v-col style="padding: 30px" align="center">
                  <img :src="uploadIcon" alt="upload" /><br />
                  <small>Drag And Drop Your Files Here</small><br />
                  <small>OR</small><br />
                  <button
                    class="tw-px-6 tw-py-2 tw-rounded tw-bg-wapal-gray tw-text-black"
                    @click.prevent="$refs.imageUploader.click()"
                    v-if="file == null"
                  >
                    Browse
                  </button>
                  <button
                    class="tw-px-6 tw-py-2 tw-rounded tw-bg-wapal-gray tw-text-black"
                    @click.prevent="$refs.imageUploader.click()"
                    v-else
                  >
                    {{ file.name }}
                  </button>
                  <div v-if="imageError" class="tw-text-red-600">
                    {{ imageErrorMessage }}
                  </div>
                </v-col>
              </div>
              <input
                ref="imageUploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="selectImage"
              />
              <reusable-theme-button title="Next" />
            </form>
          </ValidationObserver>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="text-h6 tw-py-2">NFT</div>
          <div
            class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2"
          >
            <div class="tw-w-full" id="image-preview"></div>
            <ValidationObserver v-slot="{ handleSubmit }" ref="attributeForm">
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label>Name</label>
                <reusable-text-field
                  v-model="mint.tokenName"
                  type="text"
                  :disabled="true"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label>Description</label>
                <reusable-text-area
                  v-model="mint.tokenDesc"
                  type="text"
                  :readOnly="true"
                ></reusable-text-area>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <form @submit.prevent="handleSubmit(submit)">
                <div class="tw-pb-2">Add Attributes</div>
                <div
                  class="tw-w-full"
                  v-for="(attribute, index) in mint.attributes"
                  :key="index"
                >
                  <div
                    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-start md:tw-justify-between md:tw-gap-4"
                  >
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2 tw-text-sm"
                        >Attribute Type</label
                      >
                      <reusable-text-field
                        v-model="attribute.trait_type"
                        type="text"
                        placeholder="Background"
                      ></reusable-text-field>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2 tw-text-sm"
                        >Value</label
                      >
                      <div
                        class="tw-flex tw-flex-row tw-items-baseline tw-justify-start tw-gap-2"
                      >
                        <reusable-text-field
                          v-model="attribute.value"
                          type="text"
                          placeholder="Blue"
                        ></reusable-text-field>
                        <button
                          class="tw-bg-transparent !tw-border !tw-border-solid !tw-border-wapal-pink tw-text-white tw-px-4 tw-py-2 tw-mb-4 tw-rounded-lg"
                          @click.prevent="removeAttribute(index)"
                        >
                          <v-icon>mdi-trash-can</v-icon>
                        </button>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </div>
                <button
                  class="tw-bg-transparent !tw-border !tw-border-solid !tw-border-wapal-pink tw-text-white tw-px-6 tw-py-2 tw-mb-4 tw-rounded-lg"
                  @click.prevent="addAttribute"
                >
                  <v-icon class="!tw-text-white !tw-pr-2">mdi-plus</v-icon
                  ><span>Add</span>
                </button>
                <div
                  class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
                >
                  <reusable-theme-button title="Back" @click="step = 1" />
                  <reusable-theme-button
                    title="Submit"
                    @click="submit"
                    :loading="loading"
                  />
                </div>
              </form>
            </ValidationObserver>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
import uploadIcon from "@/assets/img/upload-icon.svg";
import { defaultTheme } from "@/theme/wapaltheme";
import { uploadAndCreateFile } from "@/services/AuctionService";

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

export default {
  layout: "dashboard",
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      step: 1,
      mint: {
        colName: "",
        colDesc: "",
        tokenName: "",
        tokenDesc: "",
        royalty: "",
        colImage: "",
        nftName: "",
        nftDesc: "",
        attributes: [{ trait_type: "", value: "" }],
        twitter: "",
        type: "",
        supply: "",
        instagram: "",
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
      createEditionModal: false,
      progress: 0,
      showCloseModal: false,
      error: false,
      oneOnOneSteps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Collection" },
        { step: 3, name: "Minting Collection" },
      ],
      limitedEditionSteps: [],
      openEditionSteps: [],
      nftType: [
        { name: "One on One", id: "1/1" },
        { name: "Limited Edition", id: "limited-edition" },
        { name: "Open Edition", id: "open-edition" },
      ],
      socialError: false,
      socialErrorMessage: "",
      defaultTheme,
      uploadIcon,
    };
  },
  watch: {
    startMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
    },
    endMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
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
      if (this.mint.type === "1/1") {
        return this.oneOnOneSteps;
      } else if (this.mint.type === "limited-edition") {
        return this.limitedEditionSteps;
      } else {
        return this.openEditionSteps;
      }
    },
    getName() {
      return "Create Edition";
    },
    getDescription() {
      return "Please review and approve up to four transactions in your wallet window to create your edition.";
    },
  },
  async mounted() {
    const dropContainer = document.getElementById("drop-container");

    dropContainer.addEventListener("dragenter", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropContainer.classList.add("dragover");
    });

    dropContainer.addEventListener("dragleave", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropContainer.classList.remove("dragover");
    });

    dropContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    dropContainer.addEventListener("drop", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropContainer.classList.remove("dragover");
      const files = e.dataTransfer.files;
      this.file = files[0];
      this.displayImage();
    });
  },
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

      if (!this.mint.twitter && !this.mint.instagram) {
        this.socialError = true;
        this.socialErrorMessage =
          "Please provide a twitter link or instagram link";

        this.$refs["social"].scrollIntoView({ behavior: "smooth" });

        return;
      }
      this.step = 2;
    },
    addAttribute() {
      this.mint.attributes.push({
        trait_type: "",
        value: "",
      });
    },
    removeAttribute(index) {
      this.mint.attributes.splice(index, 1);
    },
    displayImage() {
      const imgElement = document.createElement("img");

      imgElement.src = URL.createObjectURL(this.file);
      imgElement.classList.add("tw-w-full");
      imgElement.classList.add("tw-h-full");
      imgElement.classList.add("tw-object-fill");
      imgElement.classList.add("tw-max-h-[580px]");

      const previewElement = document.getElementById("image-preview");

      if (previewElement.firstChild) {
        previewElement.removeChild(previewElement.firstChild);
      }

      previewElement.prepend(imgElement);
    },
    selectImage(e) {
      this.file = e.target.files[0];
      this.displayImage();
    },
    async submit() {
      const validate = await this.$refs.attributeForm.validate();

      if (!validate) {
        return;
      }

      if (this.mint.type === "1/1") {
        await this.createOneOnOneCollection();
      }
    },
    async createOneOnOneCollection() {
      try {
        if (!this.mint.attributes.length > 0) {
          throw new Error("Please provide at least one attribute");
        }

        this.error = false;
        this.loading = true;
        this.createEditionModal = true;

        this.progress = 1;

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
            name: this.mint.tokenName,
            description: this.mint.tokenDesc,
            attributes: this.mint.attributes,
          })) + "/";

        let mintTime = Math.floor(new Date().getTime() / 1000) + 10;

        if (this.$store.state.walletStore.wallet.wallet === "Martian") {
          mintTime += 20;
        }

        this.progress = 2;

        //creating collection
        const candymachine = await this.$store.dispatch(
          "walletStore/createCandyMachine",
          {
            collection_name: this.mint.colName,
            collection_description: this.mint.colDesc,
            baseuri: metaUri,
            royalty_payee_address: this.walletAddress,
            royalty_points_denominator: 1000,
            royalty_points_numerator: this.mint.royalty * 10,
            presale_mint_time: mintTime,
            public_sale_mint_time: mintTime + 1,
            presale_mint_price: 0,
            public_sale_mint_price: 0,
            total_supply: 1,
          }
        );

        const resource_account = candymachine.resourceAccount;
        const txnhash = candymachine.transactionHash;

        //mint
        setTimeout(async () => {
          try {
            this.progress = 3;

            const mint = await this.$store.dispatch(
              "walletStore/mintCollection",
              {
                resourceAccount: resource_account,
                publicMint: true,
                candyMachineId: process.env.CANDY_MACHINE_ID,
              }
            );

            this.$toast.showMessage({
              message: "1/1 Collection Minted Successfully",
            });

            this.$router.push("/dashboard/edition");
          } catch (error) {
            console.log(error);
            this.loading = false;
            this.error = true;
            this.showCloseModal = true;
            this.$toast.showMessage({ message: error, error: true });
          }
        });
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.error = true;
        this.showCloseModal = true;
        this.$toast.showMessage({ message: error, error: true });
      }
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
