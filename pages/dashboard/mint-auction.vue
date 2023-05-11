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
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
              >
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|auctionTime"
                  name="auction_start"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >Start Date</label
                  >
                  <reusable-date-picker
                    v-model="mint.startDate"
                    placeholder="Select Auction Start Time"
                    type="datetime"
                  />
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|endTime:@auction_start"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >End Date</label
                  >
                  <reusable-date-picker
                    v-model="mint.endDate"
                    placeholder="Select Auction End Time"
                    type="datetime"
                  />
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
              >
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|bidAmount"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >Min. Bid in Apt</label
                  >
                  <reusable-text-field
                    v-model="mint.minBid"
                    placeholder="Eg. 1"
                    type="text"
                  ></reusable-text-field>
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
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit()">
                <div class="tw-pb-2">Attributes</div>
                <div
                  class="tw-w-full"
                  v-for="(attribute, index) in mint.attributes"
                  :key="index"
                >
                  <div
                    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-center md:tw-justify-between md:tw-gap-4"
                  >
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
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
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                        >Value</label
                      >
                      <reusable-text-field
                        v-model="attribute.value"
                        type="text"
                        placeholder="Blue"
                      ></reusable-text-field>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="tw-flex tw-flex-row tw-w-full tw-justify-end">
                    <button
                      class="tw-bg-[#A0A0A0] tw-text-white tw-px-6 tw-py-2 tw-mb-4 tw-rounded"
                      @click="removeAttribute(index)"
                    >
                      Remove Attribute
                    </button>
                  </div>
                </div>
                <button
                  class="tw-bg-[#A0A0A0] tw-text-white tw-px-6 tw-py-2 tw-mb-4 tw-rounded"
                  @click.prevent="addAttribute"
                >
                  Add Attribute
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
  </div>
</template>

<script>
import { uploadAndCreateFile } from "../../services/AuctionService";
import { createCollection } from "@/services/CollectionService";
import { getWalletNFT } from "@/services/AuctionService";
import { publicRequest } from "@/services/fetcher";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import uploadIcon from "@/assets/img/upload-icon.svg";

extend("bidAmount", {
  validate(value) {
    if (value <= 0) {
      return false;
    }
    return true;
  },
  message: "Minimum bid amount should be greater than zero",
});

extend("auctionTime", {
  validate(value) {
    const difference = Math.floor(
      value.getTime() / (1000 * 60) - new Date().getTime() / (1000 * 60)
    );

    if (difference < 3) {
      return false;
    }

    return true;
  },
  message:
    "Auction Start Time should be at least 3 minutes greater than current time",
});

extend("endTime", {
  params: ["target"],
  validate(value, target) {
    if (new Date(target.target).getTime() > value.getTime()) {
      return false;
    }

    return true;
  },
  message: "Auction End Time should be greater than Auction Start Time",
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

export default {
  layout: "dashboard",
  components: { DatePicker, ValidationObserver, ValidationProvider },
  data() {
    return {
      step: 1,
      validRules: {
        required: (value) => !!value || "Required.",
        positive: (v) => (v && v > 0) || "Should be more than zero.",
      },
      mint: {
        colName: "",
        colDesc: "",
        tokenName: "",
        tokenDesc: "",
        startDate: "",
        endDate: "",
        minBid: "",
        royalty: "",
        colImage: "",
        nftName: "",
        nftDesc: "",
        attributes: [{ trait_type: "", value: "" }],
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
      try {
        if (this.file != null) {
          if (this.mint.attributes.length > 0) {
            let mintTime = Math.floor(new Date().getTime() / 1000) + 25;

            if (this.$store.state.walletStore.wallet.wallet === "Martian") {
              mintTime += 20;
            }

            this.loading = true;
            //uploading and creating metadata file
            const metaUri =
              (await uploadAndCreateFile(this.file, {
                name: this.mint.tokenName,
                description: this.mint.tokenDesc,
                attributes: this.mint.attributes,
              })) + "/";
            console.log("meta:", metaUri);

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

            //saving collection to db
            const formData = new FormData();

            formData.append("name", this.mint.colName);
            formData.append("description", this.mint.colDesc);
            formData.append("royalty_percentage", this.mint.royalty);
            formData.append("royalty_payee_address", this.walletAddress);
            formData.append(
              "whitelist_sale_time",
              Math.floor(new Date().getTime() / 1000) + 10
            );
            formData.append(
              "public_sale_time",
              Math.floor(new Date().getTime() / 1000) + 10
            );

            formData.append("public_sale_price", this.mint.minBid * 100000000);
            formData.append("whitelist_price", this.mint.minBid * 100000000);
            formData.append("supply", 1);
            formData.append("twitter", "");
            formData.append("discord", "");
            formData.append("website", "");
            formData.append("resource_account", resource_account);
            formData.append("txnhash", txnhash);
            formData.append("candy_id", process.env.CANDY_MACHINE_ID);
            formData.append("image", this.file);
            formData.append("phases", JSON.stringify([]));

            await createCollection(formData);

            //mint
            setTimeout(async () => {
              try {
                const mint = await this.$store.dispatch(
                  "walletStore/mintCollection",
                  {
                    resourceAccount: resource_account,
                    publicMint: true,
                    collectionId: "",
                    candyMachineId: process.env.CANDY_MACHINE_ID,
                  }
                );

                if (mint.success) {
                  //auction
                  const nftRes = await getWalletNFT({
                    creatorAddress: this.walletAddress,
                    collectionName: this.mint.colName,
                    tokenName: this.mint.colName + " #0",
                  });

                  const nft = nftRes.data.current_token_ownerships[0];

                  const meta = await this.$axios.get(
                    nft.current_token_data.metadata_uri
                  );

                  this.$store.commit("auction/selectNft", {
                    nft: nft,
                    meta: meta.data,
                  });

                  const auction = await this.$store.dispatch(
                    "walletStore/createAuction",
                    {
                      start_date: this.mint.startDate,
                      end_date: this.mint.endDate,
                      min_bid: this.mint.minBid,
                    }
                  );

                  await publicRequest.post("/api/auction", {
                    nft: this.selectedNft,
                    startAt: this.mint.startDate,
                    endAt: this.mint.endDate,
                    min_bid: this.mint.minBid,
                    id: auction.cur_auction_id,
                    auction_name: this.selectedNft.meta.name,
                  });

                  this.$toast.showMessage({
                    message: "Auction Created Successfully",
                    error: false,
                  });
                  this.loading = false;
                  this.$router.push("/dashboard/auction/list");
                }

                this.loading = false;
              } catch (error) {
                console.log(error);
                this.$toast.showMessage({ message: error, error: true });
                this.loading = false;
              }
            }, 5000);
          } else {
            this.$toast.showMessage({
              message: "Provide at least one attribute",
              error: true,
            });
          }
        } else {
          this.$toast.showMessage({
            message: "Please select image",
            error: true,
          });
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
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
</style>
