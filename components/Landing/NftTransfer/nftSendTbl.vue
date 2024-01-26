<template>
  <div class="main-container">
    <v-divider></v-divider>
    <table class="tw-py-2">
      <thead>
        <th
          class="tw-py-3 tw-px-3"
          v-for="(header, index) in headers"
          :key="index"
        >
          <div
            class="d-flex justify-end nft-table-header"
            :class="headerAlign(header, index)"
            v-if="header.text === 'Count'"
          >
            {{ header.text }}
          </div>
          <div
            class="d-flex justify-center nft-table-header"
            :class="headerAlign(header, index)"
            v-else-if="header.text === 'Floor'"
          >
            {{ header.text }}
          </div>
          <div
            v-else
            class="text-center name-width nft-table-header"
            :class="headerAlign(header, index)"
          >
            {{ header.text }}
          </div>
        </th>
      </thead>
      <tbody v-for="(item, index2) in items" :key="index2">
        <tr class="main-tr mx-3">
          <td
            v-for="(column, columnIndex) in headers"
            :key="columnIndex"
            class="tw-px-3 tw-py-3"
            :class="dynamicTd(column, item, columnIndex)"
            @click="expandClick(item, index2)"
            style="cursor: pointer"
          >
            <div
              v-if="column.value === 'name'"
              class="d-flex justify-start"
              style="align-items: flex-end"
            >
              <span class="d-flex align-center">
                <v-img
                  v-if="item.image == null"
                  src=""
                  class="tw-mr-3"
                  alt="nfts"
                  height="40"
                  width="40"
                  :ref="`image${index}`"
                  @error="getUncachedImageUrl(index)"
                  style="
                    max-width: 40px;
                    max-height: 40px;
                    background-color: white;
                  "
                >
                  <template v-slot:placeholder>
                    <v-row align="center" justify="center" no-gutters>
                      <p
                        v-if="item.name"
                        class="black--text"
                        style="font-size: 30px; margin-top: 10px"
                      >
                        <b>{{ item.name.substring(0, 1) }}</b>
                      </p>
                    </v-row>
                    <v-row
                      class="fill-height tw-m-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-img
                  v-else
                  class="tw-mr-3"
                  :src="item.image"
                  alt="nfts"
                  height="40"
                  width="40"
                  style="max-width: 40px; max-height: 40px"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height tw-m-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                {{ item.name }}
                <i
                  class="bx bxs-badge-check verified-icon verified-icon-small tw-pl-1"
                  v-if="item.isVerified"
                ></i>
              </span>
            </div>

            <div
              v-else-if="column.value === 'count'"
              class="d-flex justify-end tw-mr-1"
              style="align-items: flex-end"
            >
              <span class="align-center nft-table-font">
                {{ item.count }}
              </span>
            </div>

            <div
              v-if="column.value === 'floorPrice'"
              class="d-flex justify-center"
              style="align-items: flex-end"
            >
              <span v-if="item.floorPrice != null" class="nft-table-font">
                {{ decimal_fixed(item.floorPrice) }}
              </span>
              <img
                v-if="item.floorPrice != null"
                src="~/assets/img/aptos-grey.svg"
                alt="aptos icon"
                style="vertical-align: text-bottom; margin-left: 2px"
              />
              <span v-else>-</span>
            </div>

            <div
              v-else-if="column.value === 'valuePrice'"
              class="d-flex justify-end"
              style="align-items: flex-end"
            >
              <span class="nft-table-font tw-flex">
                <span
                  v-if="item.valuePrice != null"
                  class="nft-table-font tw-mr-n2"
                >
                  {{ decimal_fixed(item.valuePrice) }}
                </span>
                <img
                  v-if="item.valuePrice != null"
                  class="tw-mr-1"
                  src="~/assets/img/aptos-grey.svg"
                  alt="aptos icon"
                />
                <span v-else>-</span>
                <v-icon
                  v-if="listView == true || GridView == true"
                  style="
                    font-size: 14px;
                    margin-left: 3px;
                    max-height: 10px;
                    max-width: 10px;
                    margin: auto;
                  "
                  @click.stop="expandClick(item, index2)"
                >
                  {{
                    isExpandedIcon ? "mdi-chevron-down" : "mdi-chevron-up"
                  }}</v-icon
                ></span
              >
            </div>
          </td>
        </tr>
        <tr v-if="selectedExpand.includes(item.collectionId) && GridView">
          <td
            :colspan="headers.length"
            class="tw-p-0"
            style="position: relative"
          >
            <div
              class="align-center custom-scrollbar justify-center"
              style="
                min-height: 42vh;
                max-height: 44vh;
                overflow: auto;
                justify-content: center;
                align-items: center;
              "
            >
              <div v-if="collectionsNfts.length > 0">
                <nft-Transfer-Card
                  :items="collectionsNfts"
                  @checkboxSelect="checkboxSelect"
                  class="tw-my-2 sm:tw-my-3 md:tw-my-4"
                />
              </div>
              <div class="align-center justify-center">
                <v-row justify="center">
                  <v-col cols="12" align="center">
                    <div class="tw-mt-4" v-if="!allLoaded">
                      <nft-transfer-skeleton
                        :cols="collectionsNfts.length == 0 ? 8 : 4"
                        class="tw-my-2 sm:tw-my-3 md:tw-my-4"
                        v-intersect.quiet="{
                          handler: onIntersect,
                          options: {
                            threshold: [],
                          },
                        }"
                      />
                    </div>
                    <!-- <span
                      v-else
                      class="caption text-capitalize font14-semi-bold text--disabled my-10"
                    >
                      <span
                        v-if="
                          collectionsNfts.length == 0 &&
                          isCollectionNfts == false
                        "
                        >No nfts For Transfer</span
                      >
                      <span
                        v-if="
                          collectionsNfts.length == 0 &&
                          isCollectionNfts == true
                        "
                        >No nfts</span
                      >
                      <span v-if="collectionsNfts.length > 0"
                        >No more nfts</span
                      >
                    </span> -->
                  </v-col>
                </v-row>
              </div>
            </div>
            <div
              v-if="collectionsNfts.length > 0 && isCollectionNfts == true"
              class="destination-bottom tw-pt-2 tw-px-5"
            >
              <v-row align="end" justify="space-between" no-gutters>
                <v-col
                  cols="12"
                  lg="7"
                  md="7"
                  sm="8"
                  class="tw-mb-2 sm:tw-mb-0"
                  align="start"
                >
                  <div>
                    <label
                      class="text-uppercase label-text text-start font-bold"
                      for="amountInput"
                      style="color: #c1c2c5"
                      >Destination Address</label
                    >
                    <v-text-field
                      v-model="wallet_address"
                      placeholder="Enter wallet address"
                      type="string"
                      hide-details="true"
                      dense
                      outlined
                      class="custom-text-field mt-2"
                    >
                    </v-text-field>
                  </div>
                </v-col>
                <v-col
                  class="tw-flex tw-justify-center"
                  cols="12"
                  lg="4"
                  md="4"
                  sm="4"
                  align="end"
                >
                  <button-primary
                    title="Send"
                    :small="false"
                    :disabled="sendDisabled()"
                    min-width="110px"
                    style="width: 100%; max-width: 200px"
                    @click="sendNfts"
                  />
                </v-col>
              </v-row>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import nftTransferCard from "~/components/Landing/NftTransfer/nftTransferGridCard.vue";
import nftTransferSkeleton from "~/components/Landing/NftTransfer/loader/nftTransferGridSkeleton.vue";
import {
  checkIfImageIsFromCacheServer,
  extractImageLinkFromCacheServerUrl,
} from "@/utils/imageCache";
import { getFloorPrice } from "@/services/nftTransferService";
import {
  getTokenOfNftTransfer,
  nftTransfer,
} from "~/services/nftTransferService";

export default {
  components: {
    nftTransferCard,
    nftTransferSkeleton,
  },
  data() {
    return {
      allNftsPage: 0,
      allNftsLimit: 48,
      wallet_address: "",
      expand: false,
      selectedExpand: [],
      isExpandedIcon: false,
      isCollectionNfts: true,
      userNft: [],
      allLoaded: false,
      collectionPage: 1,
      fetching: false,
      debounce: null,
    };
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    collectionsData: {
      type: Array,
      default: null,
    },
    items: {
      type: Array,
      required: true,
    },
    listView: {
      type: Boolean,
      default: false,
    },
    GridView: {
      type: Boolean,
      default: false,
    },
    airdrop: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    items(newVal) {
      if (newVal.length > 0) {
        const selectedIndex = 0;
        // this.currentUserNfts(newVal[0].collectionId, selectedIndex);
        this.selectedExpand.push(newVal[0].collectionId);
      }
    },
    selectedData(newVal, oldVal) {
      if (newVal != oldVal) {
        this.wallet_address = "";
        this.allNftsPage = 0;
        this.allLoaded = false;
        this.$store.commit("nftTransfer/setCheckData", []);
        // this.$store.dispatch("nftTransfer/setUserCollectionDataDisplay", []);
        this.$store.commit("nftTransfer/setCollectionsNftTransfer", []);
        this.currentUserNfts(newVal[0].collectionId, 0);
      }
    },
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
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
  },
  mounted() {
    if (this.collectionsData.length > 0) {
      this.$store.commit("nftTransfer/selectTransferCollection", []);
      this.$store.commit("nftTransfer/selectCollection", []);
      this.$store.commit(
        "nftTransfer/pushTransferCollection",
        this.collectionsData[0]
      );
      this.$store.commit(
        "nftTransfer/pushSelectedCollection",
        this.collectionsData[0]
      );
    }
  },
  methods: {
    async currentUserNfts(collectionId, colIndex) {
      if (!collectionId) {
        return;
      }
      if (!this.fetching) {
        this.fetching = true;
        try {
          this.isCollectionNfts = true;
          this.$store.dispatch("nftTransfer/setCollectionsNftTransfer", []);
          this.userNft = [];
          // this.collectionsNfts = [];
          this.allNftsPage++;

          const currentNfts = await getTokenOfNftTransfer({
            // page: this.allNftsPage,
            // limit: this.allNftsLimit,
            page: this.allNftsPage,
            limit: this.allNftsLimit,
            walletAddress: this.walletAddress,
            collectionId: collectionId,
            type: "non_listed",
          });
          // this.$store.commit(
          //   "nftTransfer/setUserCollectionDataDisplay",
          //   currentNfts
          // );
          currentNfts.forEach((item, index) => {
            if (this.items[colIndex]) {
              item.floorPrice = this.items[colIndex].floorPrice;
            }
          });
          this.$store.dispatch(
            "nftTransfer/setCollectionsNftTransfer",
            currentNfts
          );
          this.fetching = false;

          // if (currentNfts.length == 0) {
          //   this.allLoaded = true;
          // }

          if (currentNfts.length < this.allNftsLimit) {
            this.allLoaded = true;
          }
        } catch (err) {
          this.fetching = false;
          console.log("error:", err);
        }
      } else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.currentUserNfts(collectionId, 0);
        }, 50);
      }
    },
    async extractFloorPrice(collectionId) {
      try {
        const floorPrice = await getFloorPrice(collectionId);
        return floorPrice;
      } catch (error) {
        console.error("Error fetching floor price:", error);
        return 0;
      }
    },
    checkboxSelect(e) {},
    sendDisabled() {
      if (this.wallet_address != "" && this.selectedCheck.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    async sendNfts() {
      // this.$toast.showMessage({
      //   message: `Nft Transfred to ${this.wallet_address}.`,
      // });
      // this.wallet_address = "";
      // this.$store.commit("nftTransfer/setCheckData", []);
      const destinationAddress = this.wallet_address;
      if (!destinationAddress) {
        this.$toast.showMessage({
          error: true,
          message: `Please, Enter the wallet`,
        });
      }

      const nftTransferRes = await nftTransfer(this.selectedCheck, [
        this.wallet_address,
      ]);
      this.$toast.showMessage({
        message: `Nft Transferred to ${this.wallet_address.slice(
          0,
          4
        )}.....${this.wallet_address.slice(-4)}`,
      });
      this.$store.commit("nftTransfer/removeNftTransfer", this.selectedCheck);
      this.$store.commit("nftTransfer/setCheckData", []);
      //   this.$toast.showMessage({
      //     message: `Nft Transfred to ${this.wallet_address}.`,
      //   });
    },
    expandClick(item, index2) {
      this.isExpandedIcon = !this.isExpandedIcon;
      if (
        this.selectedExpand.length == 1 &&
        !this.selectedExpand.includes(item.collectionId)
      ) {
        this.selectedExpand = [];
        this.expandFunction(item, index2);
      } else {
        this.expandFunction(item, index2);
      }
    },

    expandFunction(item, colIndex) {
      this.$store.dispatch("nftTransfer/setCollectionsNftTransfer", []);
      // this.collectionsNfts = [];
      if (this.selectedExpand.includes(item.collectionId)) {
        const indexToRemove = this.selectedExpand.indexOf(item.collectionId);
        this.selectedExpand.splice(indexToRemove, 1);
      } else {
        this.selectedExpand.push(item.collectionId);
        // this.currentUserNfts(item.collectionId, colIndex);
      }
    },
    decimal_fixed(value) {
      if (value != null) {
        let val = parseFloat(value.toFixed(3));
        return val.toString();
      }
    },

    getValue(column, item) {
      let keys = Object.keys(item);
      let key = keys.find((keyItem) => keyItem == column.value);
      return item[key];
    },
    nameClass(column, item, columnIndex) {
      if (columnIndex == 0) {
        return "text-start";
      } else if (columnIndex == 1) {
        return "text-start";
      } else if (columnIndex == 2) {
        return "text-end";
      } else if (columnIndex == 3) {
        return "text-end";
      }
    },
    dynamicTd(column, item, columnIndex) {
      if (columnIndex == 0) {
        // return "width-40";
      } else if (columnIndex == 3) {
        return "width-80";
      }
    },
    headerAlign(header, index) {
      if (index == 0) {
        if (this.$vuetify.breakpoint.mdAndUp == true) {
          return "text-start min-width-200";
        } else {
          return "text-start";
        }
      } else if (index == 1) {
        return "text-start";
      } else if (index == 2) {
        return "text-end";
      } else if (index == 3) {
        return "text-end";
      }
    },
    async getUncachedImageUrl(index) {
      const image = this.items[index].image;

      if (this.items) {
        if (checkIfImageIsFromCacheServer(image)) {
          const res = await this.$axios.get(image);

          if (res.headers["content-type"].includes("image")) {
            this.$refs[`image${index}`][0].image.src = image;
          } else {
            const link = extractImageLinkFromCacheServerUrl(image);

            this.$refs[`image${index}`][0].image.src = link;
          }
        } else {
          this.$refs[`image${index}`][0].image.src = image;
        }
      }
    },
    onIntersect(entries) {
      if (entries[0].isIntersecting) {
        this.currentUserNfts(this.items[0].collectionId, 0);
      }
    },
  },
};
</script>

<style scoped>
.label-text {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}
.main-container {
  overflow-x: auto;
  background: #101113;
}

.main-tr {
  background-color: #101113;
  border-top: 1px solid #383a3f;
  border-bottom: 1px solid #383a3f;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  top: 0;
  position: sticky !important;
  color: #fff;
  font-family: "Inter", sans-serif !important;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
  text-transform: uppercase;
}

td {
  color: #fff;
  font-family: "JetBrains", sans-serif !important;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.name-width {
  min-width: 100px;
  max-width: 100px;
}
.width-80 {
  width: 80px;
}
.width-40 {
  width: 40px;
}

.min-width-200 {
  min-width: 200px;
}

.nft-table-font {
  font: 14px;
  font-family: "JetBrains-Regular";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.nft-table-header {
  color: var(--dark-dark--2, #909296);
  font-family: "Inter";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.24px;
  text-transform: uppercase;
}

.cards-min-width {
  min-width: 960px;
}
</style>
