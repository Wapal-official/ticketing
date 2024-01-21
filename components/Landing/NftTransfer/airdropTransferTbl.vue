<template>
  <div class="main-container">
    <v-divider></v-divider>
    <table class="py-2">
      <thead>
        <tr class="mx-3">
          <th class="py- px-3" v-for="(header, index) in headers" :key="index">
            <div
              class="d-flex justify-end nft-table-header"
              :class="headerAlign(header, index)"
              v-if="header.text === 'Count'"
            >
              {{ header.text }}
            </div>
            <div
              class="d-flex justify-end nft-table-header"
              :class="headerAlign(header, index)"
              v-else-if="header.text === 'Limit'"
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
        </tr>
      </thead>
      <tbody v-for="(item, index2) in items" :key="index2">
        <tr class="main-tr mx-3">
          <td
            v-for="(column, columnIndex) in headers"
            :key="columnIndex"
            class="px-3 py-1"
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
                  class="mr-3"
                  alt="nfts"
                  height="40"
                  width="40"
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
                      class="fill-height ma-0"
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
                  class="mr-3"
                  :src="item.image"
                  alt="nfts"
                  height="40"
                  width="40"
                  style="max-width: 40px; max-height: 40px"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
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
                  class="bx bxs-badge-check verified-icon verified-icon-small pl-1"
                  v-if="item.isVerified"
                ></i>
              </span>
            </div>

            <div
              v-else-if="column.value === 'count'"
              class="d-flex justify-end mr-1"
              style="align-items: flex-end"
            >
              <span class="align-center nft-table-font">
                {{ item.count }}
              </span>
            </div>

            <div
              v-else-if="column.value === 'floorPrice'"
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
              <span class="nft-table-font">
                <span
                  v-if="item.valuePrice != null"
                  class="nft-table-font mr-n2"
                >
                  {{ decimal_fixed(item.valuePrice) }}
                </span>
                <img
                  v-if="item.valuePrice != null"
                  class="mr-n1"
                  src="~/assets/img/aptos-grey.svg"
                  alt="aptos icon"
                  style="vertical-align: text-bottom"
                />
                <span v-else>-</span>
                <v-icon
                  v-if="listView == true || GridView == true"
                  style="font-size: 14px; margin-left: 3px; margin-right: -4px"
                  @click.stop="expandClick(item, index2)"
                  small
                >
                  {{
                    isExpandedIcon ? "mdi-chevron-down" : "mdi-chevron-up"
                  }}</v-icon
                ></span
              >
            </div>

            <div v-else>
              {{
                getValue(column, item) != null ? getValue(column, item) : "-"
              }}
            </div>
          </td>
        </tr>

        <tr
          v-if="selectedExpand.includes(item.collectionId) && GridView == true"
        >
          <td
            :colspan="headers.length"
            class="px-0 pt-3"
            style="position: relative"
          >
            <div class="td-border">
              <v-form ref="form">
                <v-row justify="space-between" align="center" no-gutters>
                  <v-col cols="9">
                    <CustomUiSearchBar
                      class="mr-5"
                      v-model="searchQuery"
                      placeholder="search address..."
                      @input="handleInput"
                    />
                  </v-col>
                  <v-col cols="3" class="d-flex flex-column align-end">
                    <span>Limit Count</span>
                    <span>{{ totalLimitCount }}</span>
                  </v-col>
                </v-row>
                <div
                  class="airdrop-expand-table-border"
                  style="min-height: 26vh; max-height: 28vh; overflow: scroll"
                >
                  <CustomTablesAirdropTransferTbl
                    class="px-3"
                    :headers="airdropHeaders"
                    :items="filteredAirdropData"
                  />
                </div>
                <div class=" ">
                  <div class="mb-6 mt-3">
                    <v-row
                      v-if="inputAddressDialog == true"
                      no-gutters
                      align="start"
                    >
                      <v-col cols="5" class="px-1">
                        <v-text-field
                          v-model="inputWallet"
                          placeholder="Wallet Address"
                          type="string"
                          dense
                          outlined
                          hide-details="true"
                          class="custom-text-field mt-2"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="5" class="px-1">
                        <v-text-field
                          v-model="inputLimit"
                          placeholder="Limit"
                          type="number"
                          dense
                          outlined
                          hide-details="true"
                          class="custom-text-field mt-2"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="2" class="px-1">
                        <CustomButtonsThemBtn
                          class="mt-2"
                          title="add"
                          :small="false"
                          :disabled="addDisabled()"
                          @click="handleAddAddress"
                          style="width: 100%"
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                      <v-col cols="6" align="center" style="position: relative">
                        <input
                          class="import-csv"
                          type="file"
                          id="fileInput"
                          @change="handleFileUpload"
                          accept=".csv"
                        />
                        <v-btn
                          class="outlined-btn"
                          outlined
                          style="width: 100%"
                        >
                          Import CSV
                          <box-icon
                            name="import"
                            class="icon-box ml-2"
                            color="#fff"
                          ></box-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-btn
                            class="mx-2 outlined-btn"
                            outlined
                            style="width: 100%"
                            @click="openInputField()"
                          >
                            <box-icon
                              name="plus-circle"
                              class="icon-box mr-2"
                              color="#fff"
                            ></box-icon>
                            Add Address
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="d-flex align-center justify-center">
                    <CustomButtonsThemBtn
                      title="Send"
                      :small="false"
                      style="width: 100%; max-width: 250px"
                      @click="sendNfts()"
                      :disabled="checkDisable()"
                    />
                  </div>
                </div>
              </v-form>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  getTokenOfNftTransfer,
  nftTransfer,
} from "~/services/nftTransferService";

export default {
  data() {
    return {
      expand: false,
      per_page: null,
      selectedExpand: [],
      isExpandedIcon: false,
      userNft: [],
      allLoaded: false,
      airdropHeaders: [
        { text: "Wallet Address", value: "Wallet" },
        { text: "Limit", value: "Limit" },
      ],
      // airdropData: [],
      inputAddressDialog: false,
      inputWallet: "",
      inputLimit: "",
      additionalInput: [],
      searchQuery: "",
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
    walletAddress() {
      if (this.walletAddress) {
        this.currentUserCollection();
      }
    },
    items(newVal) {
      if (newVal.length > 0) {
        const selectedIndex = 0;
        this.currentUserNfts(newVal[0].collectionId, selectedIndex);
        this.selectedExpand.push(newVal[0].collectionId);
      }
    },
    selectedData(newVal, oldVal) {
      if (newVal != oldVal) {
        this.searchQuery = "";
        this.$store.commit("nftTransfer/setAirdropData", []);
      }
    },
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    airdropData() {
      return this.$store.state.nftTransfer.airdropData;
    },
    filteredAirdropData() {
      return this.airdropData.filter((item) =>
        Object.values(item).some((value) =>
          value.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
    totalLimitCount() {
      return this.filteredAirdropData.reduce((total, item) => {
        const limit = Number(item.Limit) || 0;
        return total + limit;
      }, 0);
    },
    selectedData() {
      return this.$store.state.nftTransfer.selectedData;
    },
    collectionsNfts() {
      return this.$store.state.nftTransfer.collectionsNfts;
    },
  },
  mounted() {
    if (this.collectionsData && this.collectionsData.length > 0) {
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
      try {
        this.isCollectionNfts = true;
        this.$store.dispatch("nftTransfer/setCollectionsNftTransfer", []);
        this.userNft = [];
        // this.collectionsNfts = [];
        // this.allNftsPage++
        const currentNfts = await getTokenOfNftTransfer({
          // page: this.allNftsPage,
          // limit: this.allNftsLimit,
          page: 1,
          limit: 500,
          walletAddress: this.walletAddress,
          collectionId: collectionId,
          type: "non_listed",
        });

        currentNfts.forEach((item, index) => {
          item.floorPrice = this.items[colIndex].floorPrice;
        });

        this.userNft.push(...currentNfts);
        this.$store.dispatch(
          "nftTransfer/setCollectionsNftTransfer",
          this.userNft
        );

        if (this.collectionsNfts.length == 0) {
          this.isCollectionNfts = false;
        }

        if (currentNfts.length < this.limit) {
          this.allLoaded = true;
        }
      } catch (err) {
        console.log("error:", err);
        this.allLoaded = true;
      }
    },
    checkDisable() {
      if (this.items.length > 0) {
        if (this.items[0].count <= this.totalLimitCount) {
          this.$toast.showMessage({
            message: `Wallet Address Must be equal to or less than Nft Count.`,
          });
          return true;
        }
      }
    },
    addDisabled() {
      if (this.inputLimit != "" && this.inputWallet != "") {
        return false;
      } else {
        return true;
      }
    },
    openInputField() {
      this.inputAddressDialog = true;
    },
    handleAddAddress() {
      // Validate input before adding to the list
      if (this.inputWallet.trim() && this.inputLimit.trim()) {
        this.$store.commit("nftTransfer/pushAirdropData", {
          Wallet: this.inputWallet.trim(),
          Limit: this.inputLimit.trim(),
        });

        // Clear input fields
        this.inputWallet = "";
        this.inputLimit = "";
        this.inputAddressDialog = false; // Close the input dialog if needed
      }
    },
    handleFileUpload(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const csv = reader.result;
          this.parseCSVToJson(csv);
          fileInput.value = null;
        };

        reader.readAsText(file);
      }
    },
    parseCSVToJson(csv) {
      const rows = csv.split("\n");
      const headers = rows[0].split(",");
      const jsonData = [];

      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(",");

        if (values.length === headers.length) {
          const entry = {};
          for (let j = 0; j < headers.length; j++) {
            entry[headers[j].trim()] = values[j].trim();
          }
          jsonData.push(entry);
        }
      }
      this.$store.commit(
        "nftTransfer/setAirdropData",
        this.airdropData.concat(jsonData)
      );
    },

    async sendNfts() {
      const walletAddressesRes = this.airdropData.reduce((acc, item) => {
        let limit = parseInt(item.Limit);
        return acc.concat(Array.from({ length: limit }, () => item.Wallet));
      }, []);

      // const sendableNfts = this.userNft
      // if (limit >= sendableNfts) {
      //   //display only limited datas here
      // }

      const sendableNfts = this.userNft.slice(0, this.totalLimitCount);

      const nftTransferRes = await nftTransfer(
        sendableNfts,
        walletAddressesRes
      );
    },

    handleInput() {
      if (!this.searchQuery) {
        return;
      }
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
      this.userNfts = [];
      if (this.selectedExpand.includes(item.collectionId)) {
        const indexToRemove = this.selectedExpand.indexOf(item.collectionId);
        this.selectedExpand.splice(indexToRemove, 1);
      } else {
        this.selectedExpand.push(item.collectionId);
        this.currentUserNfts(item.collectionId, colIndex);
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
    dynamicTd(column, item, columnIndex) {
      if (columnIndex == 0) {
        // return "width-40";
      } else if (columnIndex == 3) {
        return "width-80";
      } else {
        return "text-end";
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
      } else if (header.value === "wallet_address") {
        return "text-start";
      } else if (header.value === "limit") {
        return "text-end";
      } else {
        return "text-end";
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  overflow-x: auto;
  background: #101113;
}

.main-tr {
  background-color: #101113;
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
  color: #909296;
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

.airdrop-expand-table-border {
  padding: 0;
  margin: 12px 0 0 0;
  border-radius: 5px;
  border: 1px solid #383a3f;
}

.airdrop-expand-border {
  padding: 20px 16px;
  margin: 12px 0 0 0;
  border-radius: 5px;
  border: 1px solid #383a3f;
}

.td-border {
  border-radius: 8px !important;
  border: 1px solid #383a3f;
  padding: 16px !important;
}

.csv-border {
  display: flex;
  height: 40px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--dark-dark--4, #383a3f);
}

.import-csv {
  position: absolute;
  z-index: 2;
  opacity: 0;
  cursor: pointer !important;
  width: 100%;
  min-height: 40px;
}
</style>
