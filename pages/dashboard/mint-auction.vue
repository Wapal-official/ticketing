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
            v-model="mint.colDesc"
            :rules="[validRules.required]"
            placeholder="My token description"
          />

          <v-row>
            <v-col>
              <label for="">Start Date</label>

              <v-menu
                ref="startmenu"
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    v-model="mint.startDate"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="#FF36AB"
                  v-model="mint.startDate"
                  :active-picker.sync="activePicker"
                  max="2030-01-01"
                  min="2020-01-01"
                  @change="saveStart"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <label for="">End Date</label>
              <v-menu
                ref="endmenu"
                v-model="endMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    v-model="mint.endDate"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="#FF36AB"
                  v-model="mint.endDate"
                  :active-picker.sync="activePicker"
                  max="2030-01-01"
                  min="2020-01-01"
                  @change="saveEnd"
                ></v-date-picker>
              </v-menu>
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
                    v-model="mint.attributes[i].attribute"
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
export default {
  layout: "dashboard",
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
  },
  mounted() {
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
    nextStep() {
      if (this.$refs.colRef.validate()) {
        this.step == 2;
      }
    },
    addAttribute() {
      this.mint.attributes.push({
        attribute: this.attribute,
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
      if (this.$refs.colRef.validate()) {
        if (this.file != null) {
          if (this.mint.attributes.length > 0) {
            this.loading = true;
            //uploading and creating metadata file
            const metaUri = await uploadAndCreateFile(this.file, {
              name: this.mint.tokenName,
              description: this.mint.tokenDesc,
              attributes: this.mint.attributes,
            });
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
                presale_mint_time: Math.floor(new Date().getTime() / 1000) + 30,
                public_sale_mint_time:
                  Math.floor(new Date().getTime() / 1000) + 50,
                presale_mint_price: this.mint.minBid * 100000000,
                public_sale_mint_price: this.mint.minBid * 100000000,
                total_supply: 1,
              }
            );

            //saving collection to db
            const formData = new FormData();

            formData.append("name", this.mint.colName);
            formData.append("description", this.mint.colDesc);
            formData.append("royalty_percentage", this.mint.royalty);
            formData.append("royalty_payee_address", this.walletAddress);
            formData.append("whitelist_sale_time", this.mint.startDate);

            formData.append(
              "public_sale_time",
              tempCollection.public_sale_time
            );
            formData.append(
              "public_sale_price",
              tempCollection.public_sale_price
            );
            formData.append("whitelist_price", tempCollection.whitelist_price);
            formData.append("supply", tempCollection.supply);
            formData.append("twitter", tempCollection.twitter);
            formData.append("discord", tempCollection.discord);
            formData.append("website", tempCollection.website);
            formData.append(
              "resource_account",
              tempCollection.resource_account
            );
            formData.append("txnhash", tempCollection.txnhash);
            formData.append("candy_id", tempCollection.candy_id);
            formData.append("image", this.image);

            await createCollection(formData);
            //mint
            console.log("candy:", candymachine);

            const mint = await this.$store.dispatch(
              "walletStore/mintCollection",
              {
                resourceAccount: candymachine.resourceAccount,
                publicMint: true,
                collectionId: "",
                candyMachineId: process.env.cn,
              }
            );

            //auction

            this.loading = false;
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
