<template>
  <v-row justify="center">
    <v-dialog
      v-model="nftTransferDialog"
      :fullscreen="isMobileSize"
      :scrim="false"
      persistent
      max-width="960"
      overlay-color="icon"
      :overlay-opacity="0.6"
    >
      <v-card style="overflow: hidden; background-color: #101113">
        <div>
          <v-row class="tw-p-3" align="center" justify="center" no-gutters>
            <v-col cols="6">
              <div class="tw-mr-2 lg:tw-mr-3 d-flex align-center">
                <box-icon
                  class="icon-box tw-mr-1"
                  name="transfer"
                  color="#FFF"
                ></box-icon>
                <p class="tw-mb-0 tw-mr-1">Nft Transfer</p>
              </div>
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-end">
              <v-icon
                class="mdi mdi-close"
                color="white"
                @click="$store.commit('dialog/setNftTransferDialog', false)"
              >
              </v-icon>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div>
          <v-row no-gutters>
            <v-col cols="12" dense align="start">
              <div class="">
                <v-tabs
                  v-model="tabs"
                  class="tabs mx-3 pr-10"
                  style="position: relative"
                >
                  <v-tab class="capitalize"> All Nfts </v-tab>
                  <v-tab class="capitalize"> NFTs by Collection </v-tab>
                  <v-tab class="capitalize"> Airdrop </v-tab>
                  <v-spacer class="hidden-sm-and-down"></v-spacer>
                  <div v-if="tabs == 0 || tabs == 1" class="d-flex mt-3">
                    <input-checkbox
                      v-if="blankBox"
                      style="margin-right: 6px; margin-left: -4px"
                      icon=""
                      color="lightGrey"
                      @click="checkAllSelection"
                    />
                    <input-checkbox
                      v-else-if="minusBox"
                      style="margin-right: 6px; margin-left: -6px"
                      icon="mdi-minus-box"
                      color="white"
                      @click="disCheckAllSelection"
                    />
                    <input-checkbox
                      v-else-if="markedBox"
                      style="margin-right: 6px; margin-left: -6px"
                      icon="mdi-checkbox-marked"
                      color="white"
                      @click="checkAllSelection"
                    />
                    <p class="mb-0 sellectAll-text">Select All</p>
                  </div>
                </v-tabs>
                <v-divider></v-divider>
                <v-tabs-items v-model="tabs" style="background: #101113">
                  <v-tab-item>
                    <div>
                      <SectionDialogsAllMultipleNftTransfer />
                    </div>
                  </v-tab-item>
                  <v-tab-item>
                    <div>
                      <v-row dense>
                        <v-col cols="12" lg="3" md="3" sm="3">
                          <nft-transfer-drawer :items="userCollectionData" />
                        </v-col>
                        <v-col
                          cols="12"
                          lg="9"
                          md="9"
                          sm="9"
                          style="
                            min-height: 65vh;
                            max-height: 75vh;
                            overflow: scroll;
                          "
                        >
                          <div v-if="userCollectionData.length > 0">
                            <nft-send-tbl
                              class="px-3"
                              :headers="headers"
                              :items="selectedTransferCollection"
                              :GridView="true"
                              :collectionsData="userCollectionData"
                            />
                          </div>
                          <v-row justify="center" no-gutters>
                            <v-col align="center">
                              <div
                                v-if="userCollectionData.length == 0"
                                class="mt-4"
                              >
                                <!-- loader need to added -->
                                <!-- <CustomLoaderRowSkeleton
                                  imageShape="rounded"
                                  nameClass="mr-10 ml-n3"
                                  class="mx-3"
                                  :nameWidth="200"
                                  dynamicClass="tw-mr-2"
                                  :row="1"
                                  :cols="3"
                                  :width="95"
                                  :height="24"
                                  :nameHeight="24"
                                  :imageSize="45"
                                />
                                <div class="mx-1">
                                  <CustomLoaderNftTransferGridSkeleton
                                    :cols="8"
                                  />
                                </div> -->
                                <!-- loader need to add -->
                              </div>
                              <!-- <div
                                v-else
                                class="caption text-capitalize font14-semi-bold text--disabled my-10"
                              >
                                <span v-if="userCollectionData.length == 0"
                                  >No Collections</span
                                >
                                <span v-if="userCollectionData.length > 0"
                                  >No Collections nfts</span
                                >
                              </div> -->
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-tab-item>
                  <v-tab-item>
                    <div>
                      <v-row dense>
                        <v-col cols="12" lg="3" md="3" sm="3">
                          <nft-transfer-drawer :items="userCollectionData" />
                        </v-col>
                        <v-col
                          cols="12"
                          lg="9"
                          md="9"
                          sm="9"
                          style="
                            min-height: 65vh;
                            max-height: 75vh;
                            overflow: scroll;
                          "
                        >
                          <div v-if="userCollectionData.length > 0">
                            <airdrop-transfer-tbl
                              class="px-3"
                              :headers="headers"
                              :items="selectedTransferCollection"
                              :GridView="true"
                              :collectionsData="userCollectionData"
                            />
                          </div>
                          <v-row class="mx-3" justify="center">
                            <v-col align="center">
                              <div
                                v-if="userCollectionData.length == 0"
                                class="mt-4"
                              >
                                <!-- loader needd tooo addddd -->

                                <!-- <CustomLoaderRowSkeleton
                                  imageShape="rounded"
                                  nameClass="mr-10 ml-n3"
                                  class="mx-3"
                                  :nameWidth="200"
                                  dynamicClass="tw-mr-2"
                                  :row="1"
                                  :cols="3"
                                  :width="95"
                                  :height="24"
                                  :nameHeight="24"
                                  :imageSize="45"
                                />
                                <div>
                                  <div class="skeleton-border px-5">
                                    <CustomLoaderRowSkeleton
                                      :row="6"
                                      :cols="2"
                                      :width="260"
                                      :height="18"
                                      :name="false"
                                    />
                                  </div>
                                  <div class="skeleton-border px-5 py-3 mt-5">
                                    <CustomLoaderSkeleton
                                      :height="30"
                                      :width="dynWidth()"
                                    />

                                    <CustomLoaderSkeleton
                                      class="mt-5"
                                      :height="15"
                                      :width="dynWidth()"
                                    />
                                    <CustomLoaderSkeleton
                                      class="mt-5"
                                      :height="30"
                                      :width="dynWidth()"
                                    />
                                  </div> 
                              </div> -->
                              </div>
                              <!-- loader needd tooo addddd -->
                              <!-- <div
                                v-else
                                class="caption text-capitalize font14-semi-bold text--disabled my-10"
                              >
                                <span v-if="userCollectionData.length == 0"
                                  >No Collections</span
                                >
                                <span v-if="userCollectionData.length > 0"
                                  >No Collections nfts</span
                                >
                              </div> -->
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import inputCheckbox from "~/components/Landing/NftTransfer/checkbox.vue";
import NftSendTbl from "~/components/Landing/NftTransfer/nftSendTbl.vue";
import nftTransferDrawer from "~/components/Landing/NftTransfer/nftTransferDrawer.vue";
import airdropTransferTbl from "~/components/Landing/NftTransfer/airdropTransferTbl.vue";
import {
  getNftTransferCollectionsOfUser,
  getPortfolioSummaryOfUser,
} from "~/services/nftTransferService";
export default {
  components: {
    NftSendTbl,
    inputCheckbox,
    nftTransferDrawer,
    airdropTransferTbl,
  },
  props: { propCollections: { type: Array, default: () => [] } },
  data() {
    return {
      nftTransferType: "NftTransfer",
      selectAll: false,
      headers: [
        { text: "Collection", value: "name" },
        { text: "Count", value: "count" },
        { text: "Floor", value: "floorPrice" },
        { text: "Value", value: "valuePrice" },
      ],
      boardsData: [
        {
          id: 1,
          collection: "bruh bears",
          image: "nft1.svg",
          count: "2",
          floor: "65",
          value: "130",
        },
        {
          id: 2,
          collection: "Aptomingos",
          image: "nft2.svg",
          count: "4",
          floor: "6",
          value: "24",
        },
        {
          id: 3,
          collection: "minos",
          image: "nft3.svg",
          count: "100",
          floor: "10",
          value: "1000",
        },
      ],
      nftTransferGridData: [
        {
          name: "nft",
          rarity: 52,
          image: "nft6.svg",
          listedPrice: 256,
          topBidPrice: "256",
          costPrice: "256",
          tooltipDate: "tooltipDate",
        },
        {
          name: "nft",
          image: "nft5.svg",
          rarity: 52,
          listedPrice: 256,
          topBidPrice: "256",
          costPrice: "256",
          tooltipDate: "tooltipDate",
        },
      ],
      collectionPage: 0,
      userCollectionData: [],
      airdropSelectedCollectionData: [],
      limit: 100,
      allLoaded: false,
      collections: [],
      userCollections: [],

      markedBox: false,
      minusBox: false,
      blankBox: true,
    };
  },
  watch: {
    nftTransferDialog(newVal) {
      if (newVal == true) {
        this.nftTransferDrawer = true;
      } else {
        this.$store.commit("nftTransfer/setNftTransferTabs", 0);
      }
    },
    tabs(newVal) {
      if (newVal) {
        this.$store.commit("nftTransfer/setCheckData", []);
      }
      if (this.walletAddress && newVal == 1) {
        this.currentUserCollection();
      } else if (this.walletAddress && newVal == 2) {
        this.currentUserCollection();
      }
    },
    selectedCheck(newVal) {
      if (this.tabs == 0) {
        if (
          this.collectionsNfts.length > 0 &&
          this.userNfts.length === newVal.length
        ) {
          this.markedBox = true;
          this.minusBox = false;
          this.blankBox = false;
        } else if (
          newVal.length > 0 &&
          this.userNfts.length !== newVal.length
        ) {
          this.markedBox = false;
          this.minusBox = true;
          this.blankBox = false;
        } else {
          this.markedBox = false;
          this.minusBox = false;
          this.blankBox = true;
        }
      } else if (this.tabs == 1) {
        if (
          this.collectionsNfts.length > 0 &&
          this.collectionsNfts.length === newVal.length
        ) {
          this.markedBox = true;
          this.minusBox = false;
          this.blankBox = false;
        } else if (
          newVal.length > 0 &&
          this.collectionsNfts.length !== newVal.length
        ) {
          this.markedBox = false;
          this.minusBox = true;
          this.blankBox = false;
        } else {
          this.markedBox = false;
          this.minusBox = false;
          this.blankBox = true;
        }
      }
    },
  },
  computed: {
    isMobileSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return true;
      } else {
        return false;
      }
    },
    nftTransferDialog: {
      get() {
        return this.$store.state.dialog.isNftTransferDialog;
      },
      set(value) {
        return this.$store.commit("dialog/setNftTransferDialog", value);
      },
    },
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    userNfts() {
      return this.$store.state.nftTransfer.allTransferableNfts;
    },
    selectedTransferCollection() {
      return this.$store.state.nftTransfer.selectedCollection;
    },
    selectedCheck() {
      return this.$store.state.nftTransfer.selectedCheck;
    },
    selectedData() {
      return this.$store.state.nftTransfer.selectedData;
    },
    collectionsNfts() {
      return this.$store.state.nftTransfer.collectionsNfts;
    },
    tabs: {
      get() {
        return this.$store.state.nftTransfer.tabs;
      },
      set(value) {
        return this.$store.commit("nftTransfer/setNftTransferTabs", value);
      },
    },
  },
  created() {
    this.blankBox = true;
  },
  methods: {
    checkAllSelection() {
      if (this.tabs == 0) {
        if (this.userNfts.length == this.selectedCheck.length) {
          this.$store.commit("nftTransfer/setCheckData", []);
        } else if (
          this.userNfts.length !== this.selectedCheck.length &&
          this.selectedCheck > 0
        ) {
        } else {
          this.$store.commit("nftTransfer/setCheckData", this.userNfts);
        }
      } else if (this.tabs == 1) {
        if (this.collectionsNfts.length === this.selectedCheck.length) {
          this.$store.commit("nftTransfer/setCheckData", []);
        } else if (
          this.collectionsNfts.length !== this.selectedCheck.length &&
          this.selectedCheck > 0
        ) {
        } else {
          this.$store.commit("nftTransfer/setCheckData", this.collectionsNfts);
        }
      }
    },
    disCheckAllSelection() {
      this.$store.commit("nftTransfer/setCheckData", []);
    },

    getTabIconColor(tabIndex) {
      return this.tab === tabIndex ? "#9D80FF" : "#5D5F65";
    },

    async currentUserCollection() {
      try {
        this.collectionPage++;

        const collections = await getNftTransferCollectionsOfUser({
          walletAddress: this.walletAddress,
          page: this.collectionPage,
          limit: this.limit,
        });

        const uniqueCollectionIDs = [
          ...new Set(collections.map((item) => item.collectionId)),
        ];

        const nftCount = await Promise.all(
          uniqueCollectionIDs.map((collectionId) =>
            this.getCollectionsDetails(collectionId)
          )
        );

        collections.forEach((item, index) => {
          item.count = nftCount[index].totalCount;
          item.valuePrice = this.valuation(collections, index);
        });
        this.$store.commit("nftTransfer/setNftCount", nftCount);

        this.userCollectionData.push(...collections);

        if (collections.length < this.limit) {
          this.allLoaded = true;
        }
      } catch (err) {
        console.log("error:", err);
        this.allLoaded = true;
      }
    },
    async getCollectionsDetails(collectionId) {
      const data = await getPortfolioSummaryOfUser({
        wallet_address: this.walletAddress,
        collectionId: collectionId,
      });
      return data;
    },
    valuation(collections, index) {
      let col = collections[index];
      let value = parseFloat(col.floorPrice) * parseFloat(col.count);
      let nanValue = 0;
      let parsedValue = isNaN(value) == false ? value : nanValue;
      return parsedValue;
    },
    dynWidth() {
      if (
        this.$vuetify.breakpoint.name == "lg" ||
        this.$vuetify.breakpoint.name == "xl"
      ) {
        return 750;
      } else if (this.$vuetify.breakpoint.name == "md") {
        return 600;
      } else {
        return 700 / 2;
      }
    },
    selectFile() {
      this.$refs.input.click();
    },
  },
};
</script>

<style lang="css">
.icon-hex {
  width: 32px;
  height: 32px;
}

.icon-text {
  font-size: 10px;
  margin-left: 2px;
}

.right-arrow-alt {
  max-width: 16px;
}

.arrow-back {
  max-width: 24px;
}

.icon-arrows {
  position: relative;
  height: 30px;
  width: 24px;
}

.icon-arrows .arrow1 {
  position: absolute;
  top: -10px;
  left: 0;
  margin: 0 auto;
  transform: rotate(-20deg);
}

.icon-arrows .arrow2 {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  transform: rotate(180deg);
}

.icon-arrows .arrow3 {
  position: absolute;
  bottom: -4px;
  left: 0;
  margin: 0 auto;
  transform: rotate(20deg);
}

.transfer-border {
  border: 1px solid #25262b;
  padding: 30px 24px 0 24px;
}

.skeleton-border {
  border: 1px solid #25262b;
}

.sellectAll-text {
  color: #5d5f65;
  margin-top: 2px;
  font-family: "Inter-Regular", sans-serif !important;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}

.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)
  > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(
    .v-slide-group--has-affixes
  )
  .v-slide-group__prev {
  display: inline;
  display: none;
  visibility: hidden;
}
</style>
