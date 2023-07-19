<template>
  <div class="tw-w-full">
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
              v-model="mint.colName"
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
              v-model="mint.colDesc"
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
              v-model="mint.twitter"
              placeholder="Twitter Link"
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
              v-model="mint.instagram"
              placeholder="Instagram Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            <div class="tw-text-red-600 tw-text-sm" v-if="socialError">
              {{ socialErrorMessage }}
            </div>
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
              v-model="mint.tokenName"
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
              v-model="mint.tokenDesc"
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
                v-model="mint.type"
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
                v-model="mint.royalty"
                placeholder="Eg. 4"
                :showPercentage="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
            rules="required"
            v-slot="{ errors }"
            v-if="mint.type === 'limited-edition'"
          >
            <input-text-field
              v-model="mint.supply"
              label="Supply"
              :required="true"
              placeholder="Eg. 2"
            />
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          >
            <input-image-drag-and-drop
              :required="true"
              label="Image"
              :file="mint.colImage"
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
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-pb-14 md:tw-flex-row md:tw-justify-start"
          >
            <div
              id="image-preview"
              class="tw-w-full tw-h-[300px] md:tw-w-[300px]"
            ></div>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-w-full lg:tw-w-[540px]"
            >
              <div
                v-for="(attribute, index) in mint.attributes"
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
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 md:tw-flex-row md:tw-items-start md:tw-justify-start"
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
                {{ mint.colName }}
                <i class="bx bxs-badge-check tw-text-xl tw-text-primary-1"></i>
              </h1>
              <h2 class="tw-text-white tw-text-[1.375em] tw-font-medium">
                {{ mint.tokenName }}
              </h2>
              <div class="tw-pb-4 tw-text-dark-0 tw-text-sm">
                {{ mint.tokenDesc }}
              </div>

              <div
                class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5 tw-flex tw-flex-row tw-items-start tw-justify-between"
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
                      {{ mint.royalty }}%
                    </div>
                  </div>
                </div>
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
    async validateFormForNextStep() {
      switch (this.formStepNumber) {
        case 1:
          const detailValidated = await this.$refs.detailForm.validate();

          if (!detailValidated) {
            break;
          }

          this.socialError = false;

          if (!this.mint.twitter && !this.mint.instagram) {
            this.socialError = true;
            this.socialErrorMessage =
              "Please provide a twitter link or instagram link";

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
