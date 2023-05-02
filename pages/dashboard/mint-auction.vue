<template>
  <div>
    <p class="text-h5">NFT Details</p>

    <p class="text-h6">Collection</p>
    <v-row>
      <v-col cols="12" lg="4" md="6">
        <v-form v-model="valid" ref="colRef">
          <label for="">Collection Name</label>
          <ReusableTextField
            v-model="mint.colName"
            :rules="[validRules.required]"
            placeholder="My nft"
          />

          <label for="">Collection Description</label>
          <ReusableTextArea
            v-model="mint.colDesc"
            :rules="[validRules.required]"
            placeholder="My nft description"
          />

          <p class="text-h6">Token Details</p>
          <label for="">Token Name</label>
          <ReusableTextField
            v-model="mint.tokenName"
            :rules="[validRules.required]"
            placeholder="My Token"
          />

          <label for="">Description</label>
          <ReusableTextArea
            v-model="mint.tokenDesc"
            :rules="[validRules.required]"
            placeholder="My token description"
          />

          <v-row>
            <v-col>
              <label for="">Start Date</label>
              <v-row>
                <date-picker
                  v-model="mint.startDate"
                  type="datetime"
                  placeholder="Select Auction Start Time"
                ></date-picker>
              </v-row>
            </v-col>
            <v-col>
              <label for="">End Date</label>
              <v-row>
                <date-picker
                  v-model="mint.endDate"
                  type="datetime"
                  placeholder="Select Auction End Time"
                ></date-picker>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <label for="">Min. Bid</label>
              <ReusableTextField
                v-model="mint.minBid"
                type="number"
                :rules="[validRules.required, validRules.positive]"
                placeholder="1.5 APT"
              />
            </v-col>
            <v-col>
              <label for="">Royalties Fees</label>
              <ReusableTextField
                v-model="mint.royalty"
                type="number"
                :rules="[validRules.required, validRules.positive]"
                placeholder="1.25%"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="12" lg="4" md="6">
        <v-row no-gutters>
          <p class="text-h6">NFT</p>
        </v-row>
        <v-row>
          <v-col>
            <v-form v-model="valid" ref="">
              <div class="upload-bar" id="drop-container">
                <!-- <v-col align="center" style="padding:0px">
              <v-btn
                style="margin:10px"
                light
                @click="$refs.imageUploader.click()"
                :uploading="uploading"
                >Change</v-btn
              >
            </v-col> -->
                <v-col
                  v-if="this.file == null"
                  style="padding: 30px"
                  align="center"
                >
                  <v-icon large>mdi-upload</v-icon><br />
                  <small>Drag And Drop Your Files Here</small><br />
                  <small>OR</small><br />
                  <v-btn light @click="$refs.imageUploader.click()"
                    >Browse</v-btn
                  >
                </v-col>
              </div>
              <input
                ref="imageUploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="selectImage"
              />
              <label for="">Atrributes</label>
              <v-row v-for="(item, i) in mint.attributes" :key="i">
                <v-col>
                  <small>Attributes Type</small>
                  <v-text-field
                    readonly
                    v-model="mint.attributes[i].trait_type"
                    placeholder="Background"
                    hide-details=""
                  />
                </v-col>
                <v-col>
                  <small>Value</small>
                  <v-text-field
                    readonly
                    v-model="mint.attributes[i].value"
                    placeholder="Blue"
                    hide-details=""
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <small>Attributes Type</small>
                  <ReusableTextField
                    v-model="attribute"
                    :rules="[validRules.required]"
                    placeholder="Background"
                  />
                </v-col>
                <v-col>
                  <small>Value</small>
                  <ReusableTextField
                    v-model="value"
                    :rules="[validRules.required]"
                    placeholder="Blue"
                  />
                </v-col>
              </v-row>
              <v-btn outlined color="red" small @click="addAttribute()"
                >Add</v-btn
              >
              <v-divider style="margin: 20px 0px"></v-divider>
              <v-btn outlined color="red" @click="mint.attributes.pop()" small
                >Delete</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <ReusableThemeButton
        title="Submit"
        :loading="loading"
        @click="submit()"
      />
    </v-row>
  </div>
</template>

<script>
import { uploadAndCreateFile } from "../../services/AuctionService";
import { createCollection } from "@/services/CollectionService";
import { getWalletNFT } from "@/services/AuctionService";
import { publicRequest } from "@/services/fetcher";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  layout: "dashboard",
  components: { DatePicker },
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
        attributes: [],
      },
      attribute: "",
      value: "",
      loading: false,
      valid: true,
      activePicker: "",
      startMenu: false,
      endMenu: false,
      file: null,
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

    const nftRes = await getWalletNFT({
      creatorAddress: this.walletAddress,
      collectionName: "Martian NFT",
      tokenName: "Martian NFT #0",
    });

    console.log(nftRes);

    const res = await this.$axios.get(
      "https://arweave.net/s8tjxeEQdtF7fJhQMVanIzCrtyNZlNTSXc59SRigfiU/0.json"
    );

    console.log(res);
  },
  methods: {
    saveStart(date) {
      this.$refs.startmenu.save(date);
    },
    saveEnd(date) {
      this.$refs.endmenu.save(date);
    },
    nextStep() {
      if (this.$refs.colRef.validate()) {
        this.step == 2;
      }
    },
    addAttribute() {
      this.mint.attributes.push({
        trait_type: this.attribute,
        value: this.value,
      });
      this.attribute = "";
      this.value = "";
    },
    displayImage() {
      const imgElement = document.createElement("img");
      imgElement.src = URL.createObjectURL(this.file);
      const previewElement = document.getElementById("drop-container");
      previewElement.prepend(imgElement);
    },
    selectImage(e) {
      this.file = e.target.files[0];
      this.displayImage();
    },
    async submit() {
      try {
        if (this.$refs.colRef.validate()) {
          if (this.file != null) {
            if (this.mint.attributes.length > 0) {
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
                  presale_mint_time:
                    Math.floor(new Date().getTime() / 1000) + 20,
                  public_sale_mint_time:
                    Math.floor(new Date().getTime() / 1000) + 21,
                  presale_mint_price: this.mint.minBid * 100000000,
                  public_sale_mint_price: this.mint.minBid * 100000000,
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

              formData.append(
                "public_sale_price",
                this.mint.minBid * 100000000
              );
              formData.append("whitelist_price", this.mint.minBid * 100000000);
              formData.append("supply", 1);
              formData.append("twitter", "");
              formData.append("discord", "");
              formData.append("website", "");
              formData.append("resource_account", resource_account);
              formData.append("txnhash", txnhash);
              formData.append("candy_id", process.env.CANDY_MACHINE_ID);
              formData.append("image", this.file);

              await createCollection(formData);

              //mint
              setTimeout(async () => {
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
                  });

                  this.$toast.showMessage({
                    message: "Auction Created Successfully",
                    error: false,
                  });
                  this.loading = false;
                  this.$router.push("/dashboard/auction/list");
                }

                this.loading = false;
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

<style>
.upload-bar {
  margin: 0px 0px 30px 0px;
  width: 100%;
  border: 1px dashed white;
}
</style>
