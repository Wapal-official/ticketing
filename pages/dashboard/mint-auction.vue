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
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
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
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
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
              <form @submit.prevent="handleSubmit()">
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
    <v-dialog
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-1/3 3xl:!tw-w-1/4"
      v-model="createAuctionModal"
      persistent
    >
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-bg-[#141414] tw-rounded tw-px-8 tw-py-4"
      >
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
        >
          <button
            @click="createAuctionModal = false"
            v-if="showCloseAuctionModal"
          >
            <v-icon class="!tw-text-white">mdi-close</v-icon>
          </button>
        </div>
        <h3 class="tw-text-2xl tw-font-semibold">Wallet Approval</h3>
        <div class="tw-h-[1px] tw-bg-[#ffffff4d] tw-w-full"></div>
        <h4 class="tw-text-lg tw-font-semibold">Create Auction</h4>
        <p>
          Please review and approve up to three transactions in your wallet
          window to create your NFT.
        </p>
        <div
          class="tw-rounded tw-bg-[#262525] tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-py-4 tw-px-4"
        >
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
          >
            <span>1. Uploading Image and Metadata</span>
            <div v-if="auctionProgress < 1">-</div>
            <div v-else>
              <div v-if="auctionProgress === 1 && !createError">
                <v-progress-circular
                  width="4"
                  size="24"
                  :color="defaultTheme.wapalPink"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div v-else>
                <v-icon
                  class="!tw-font-light !tw-text-wapal-pink"
                  v-if="auctionProgress > 1"
                  >mdi-check-circle-outline</v-icon
                >
                <v-icon class="!tw-font-light !tw-text-red-600" v-else
                  >mdi-close-circle-outline</v-icon
                >
              </div>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
          >
            <span>2. Creating Collection</span>
            <div v-if="auctionProgress < 2">-</div>
            <div v-else>
              <div v-if="auctionProgress === 2 && !createError">
                <v-progress-circular
                  width="4"
                  size="24"
                  :color="defaultTheme.wapalPink"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div v-else>
                <v-icon
                  class="!tw-font-light !tw-text-wapal-pink"
                  v-if="auctionProgress > 2"
                  >mdi-check-circle-outline</v-icon
                >
                <v-icon class="!tw-font-light !tw-text-red-600" v-else
                  >mdi-close-circle-outline</v-icon
                >
              </div>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
          >
            <span>3. Minting Collection</span>
            <div v-if="auctionProgress < 3">-</div>
            <div v-else>
              <div v-if="auctionProgress === 3 && !createError">
                <v-progress-circular
                  width="4"
                  size="24"
                  :color="defaultTheme.wapalPink"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div v-else>
                <v-icon
                  class="!tw-font-light !tw-text-wapal-pink"
                  v-if="auctionProgress > 3"
                  >mdi-check-circle-outline</v-icon
                >
                <v-icon class="!tw-font-light !tw-text-red-600" v-else
                  >mdi-close-circle-outline</v-icon
                >
              </div>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
          >
            <span>4. Adding Collection To Auction</span>
            <div v-if="auctionProgress < 4">-</div>
            <div v-else>
              <div v-if="auctionProgress === 4 && !createError">
                <v-progress-circular
                  width="4"
                  size="24"
                  :color="defaultTheme.wapalPink"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div v-else>
                <v-icon
                  class="!tw-font-light !tw-text-wapal-pink"
                  v-if="auctionProgress > 4"
                  >mdi-check-circle-outline</v-icon
                >
                <v-icon class="!tw-font-light !tw-text-red-600" v-else
                  >mdi-close-circle-outline</v-icon
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
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
import { defaultTheme } from "@/theme/wapaltheme";

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
      createAuctionModal: false,
      auctionProgress: 0,
      showCloseAuctionModal: false,
      createError: false,
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
      const validate = this.$refs.attributeForm.validate();

      if (!validate) {
        return;
      }

      try {
        if (this.file != null) {
          if (this.mint.attributes.length > 0) {
            this.createError = false;
            this.loading = true;
            this.createAuctionModal = true;

            this.auctionProgress = 1;

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

            this.auctionProgress = 2;

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
                this.auctionProgress = 3;

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
                  this.auctionProgress = 4;

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

                  const auction_name = this.selectedNft.meta.name.replaceAll(
                    "#",
                    ""
                  );

                  await publicRequest.post("/api/auction", {
                    nft: this.selectedNft,
                    startAt: this.mint.startDate,
                    endAt: this.mint.endDate,
                    min_bid: this.mint.minBid,
                    id: auction.cur_auction_id,
                    auction_name: auction_name,
                  });

                  this.$toast.showMessage({
                    message: "Auction Created Successfully",
                    error: false,
                  });
                  this.loading = false;
                  this.createAuctionModal = false;

                  this.auctionProgress = 5;

                  this.$router.push("/dashboard/auction/list");
                }

                this.loading = false;
              } catch (error) {
                console.log(error);
                this.$toast.showMessage({ message: error, error: true });
                this.loading = false;
                this.createError = true;
                this.showCloseAuctionModal = true;
              }
            }, 5000);
          } else {
            this.$toast.showMessage({
              message: "Provide at least one attribute",
              error: true,
              c,
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

        this.createError = true;
        this.showCloseAuctionModal = true;
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
