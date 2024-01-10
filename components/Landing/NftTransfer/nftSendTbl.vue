<template>
  <div style="overflow: auto">
    <v-divider></v-divider>
    <table class="tw-py-3">
      <thead class="header-table">
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
            class="d-flex justify-end nft-table-header"
            :class="headerAlign(header, index)"
            v-else-if="header.text === 'Floor'"
          >
            {{ header.text }}
          </div>
          <div
            class="d-flex justify-end nft-table-header"
            :class="headerAlign(header, index)"
            v-else-if="header.text === 'Value'"
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
        <tr class="main-tr tw-mx-3">
          <td
            v-for="(column, columnIndex) in headers"
            :key="columnIndex"
            class="tw-px-3 tw-py-3"
            @click="expandClick(item, index2)"
            style="cursor: pointer"
          >
            <div v-if="column.value === 'value'" class="d-flex justify-end">
              <span class="nft-table-font d-flex align-center">
                <span class="nft-table-font tw-mr-n2">
                  {{ item.value }}
                </span>
                <img
                  class="tw-mr-n2"
                  src="~/assets/img/aptos-grey.svg"
                  alt="aptos icon"
                  style="vertical-align: text-bottom"
                />
                <v-icon
                  class="nft-tranfer-dropdown-icon"
                  v-if="listView == true || GridView == true"
                  @click.stop="expandClick(item, index2)"
                >
                  {{
                    isExpandedIcon ? "mdi-chevron-down" : "mdi-chevron-up"
                  }}</v-icon
                ></span
              >
            </div>

            <div
              v-else-if="column.value === 'collection'"
              class="d-flex justify-start"
              style="align-items: flex-end"
            >
              <span class="d-flex align-center">
                <img
                  class="tw-mr-3"
                  :src="require(`~/assets/img/dialogs/${item.image}`)"
                  alt="nfts"
                />
                {{ item.collection }}
              </span>
            </div>
            <div
              v-else-if="column.value === 'count'"
              class="d-flex justify-end only:"
              style="align-items: flex-end"
            >
              <span class="align-center nft-table-font">
                {{ item.count }}
              </span>
            </div>
            <div
              v-if="column.value === 'floor'"
              class="d-flex align-center justify-end"
              style="align-items: flex-end"
            >
              <span class="nft-table-font">
                {{ item.floor }}
              </span>
              <img
                src="~/assets/img/aptos-grey.svg"
                alt="aptos icon"
                style="vertical-align: text-bottom; margin-left: 2px"
              />
            </div>
          </td>
        </tr>
        <tr v-if="selectedExpand.includes(item.id) && listView == true">
          <td :colspan="items.length">
            <LandingNftTransferNftTransferInput />
            <LandingNftTransferTransferInput />
          </td>
        </tr>
        <tr v-if="selectedExpand.includes(item.id) && GridView">
          <td
            :colspan="headers.length"
            class="tw-p-0"
            style="position: relative"
          >
            <nft-transfer-card :items="nftTransferGridData" />

            <div
              class="destination-bottom tw-px-2 tw-pt-4 tw-pb-4 sm:tw-pb-2 md:tw-pb-0"
            >
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="12" sm="8" class=" ">
                  <div>
                    <label
                      class="text-uppercase text-start font-bold"
                      for="amountInput"
                      style="color: #c1c2c5"
                      >Destination Address</label
                    >
                    <v-text-field
                      placeholder="Enter wallet address"
                      type="string"
                      dense
                      outlined
                      class="custom-text-field tw-mt-2"
                      style="margin-top: 4px !important"
                    >
                    </v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  class="d-flex align-start justify-center md:justify-end"
                >
                  <button-primary
                    title="Send"
                    :small="false"
                    class="instance-sell"
                    min-width="110px"
                    style="width: 100%; max-width: 190px"
                  >
                  </button-primary>
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
import nftTransferCard from "~/components/Landing/NftTransfer/nftTransferGridCard.vue";

export default {
  components: {
    nftTransferCard,
  },
  data() {
    return {
      expand: false,
      selectedExpand: [],
      isExpandedIcon: false,
    };
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    nftTransferGridData: {
      type: Array,
      default: null,
    },
    listView: {
      type: Boolean,
      default: false,
    },
    GridView: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log("headers:", this.headers);
    console.log("items:", this.items);
    if (this.items.length > 0) {
      this.selectedExpand.push(this.items[0].id);
    }
  },
  methods: {
    expandClick(item, index2) {
      this.isExpandedIcon = !this.isExpandedIcon;
      const isExpanded = this.selectedExpand.includes(item.id);

      if (isExpanded) {
        const indexToRemove = this.selectedExpand.indexOf(item.id);
        if (indexToRemove !== -1) {
          this.selectedExpand.splice(indexToRemove, 1);
        }
      } else {
        this.selectedExpand.push(item.id);
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
        return "width-40";
      } else if (columnIndex == 3) {
        return "width-80";
      }
    },
    headerAlign(header, index) {
      if (index == 0) {
        return "text-start";
      } else if (index == 1) {
        return "text-start";
      } else if (index == 2) {
        return "text-end";
      } else if (index == 3) {
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
  border-top: 1px solid #383a3f;
  border-bottom: 1px solid #383a3f;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
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
  /* max-width: 120px; */
}
.width-80 {
  width: 80px;
}
.width-40 {
  width: 40px;
}

.nft-table-font {
  font: 14px;
  font-family: "JetBrains-Regular";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}

.nft-table-header {
  color: var(--dark-dark--2, #909296);
  font-family: "Inter";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.24px;
  text-transform: uppercase;
}

.cards-min-width {
  min-width: 960px;
}

.nft-tranfer-dropdown-icon {
  font-size: 16px !important;
  color: #a6a7ab !important;
}
</style>

<!-- <template>
  <div class="main-container">
    <v-divider></v-divider>
    <table class="py-2">
      <thead>
        <th class="py-3 px-3" v-for="(header, index) in headers" :key="index">
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
            class="px-3 py-3"
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
              <span class="nft-table-font">
                <span
                  v-if="item.valuePrice != null"
                  class="nft-table-font mr-n2"
                >
                  {{ decimal_fixed(item.valuePrice) }}
                </span>
                <img
                  v-if="item.valuePrice != null"
                  class="mr-n2"
                  src="~/assets/img/aptos-grey.svg"
                  alt="aptos icon"
                  style="vertical-align: text-bottom"
                />
                <span v-else>-</span>
                <v-icon
                  v-if="listView == true || GridView == true"
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
        <tr
          v-if="selectedExpand.includes(item.collectionId) && listView == true"
        >
          <td :colspan="items.length">
            <CustomUiNftTransferInput />
            <CustomUiNftTransferInput />
          </td>
        </tr>
        <tr v-if="selectedExpand.includes(item.collectionId) && GridView">
          <td :colspan="headers.length" class="pa-0" style="position: relative">
            <div style="max-height: 50vh; overflow: scroll">
              <div v-if="userNfts.length > 0">
                <CustomUiNftTransferGridCard
                  :items="userNfts"
                  class="my-2 my-sm-3 my-md-4"
                />
              </div>
              <div>
                <v-row justify="center">
                  <v-col cols="12" align="center">
                    <div v-if="userNfts.length == 0" class="mt-4">
                      <CustomLoaderNftTransferGridSkeleton
                        :cols="10"
                        class="my-2 my-sm-3 my-md-4"
                      />
                    </div>
                    <span
                      v-else
                      class="caption text-capitalize font14-semi-bold text--disabled my-10"
                    >
                      <span v-if="userNfts.length == 0">No nfts</span>
                      <span v-if="userNfts.length > 0">No more nfts</span>
                    </span>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div class="destination-bottom px-5 pt-4">
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="12" sm="8">
                  <div>
                    <label
                      class="text-uppercase text-start font-bold"
                      for="amountInput"
                      style="color: #c1c2c5"
                      >Destination Address</label
                    >
                    <v-text-field
                      placeholder="Enter wallet address"
                      type="string"
                      dense
                      outlined
                      class="custom-text-field mt-2"
                    >
                    </v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  class="d-flex align-start justify-center justify-sm-end"
                >
                  <CustomButtonsThemBtn
                    title="Send"
                    :small="false"
                    class="instance-sell"
                    min-width="110px"
                    style="width: 100%; max-width: 250px"
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
import {
  getFloorPric,
  getTokenOfNftTransfer,
} from "@/services/nftTransferService";

export default {
  data() {
    return {
      expand: false,
      selectedExpand: [],
      isExpandedIcon: false,
      userNfts: [],
      allLoaded: false,
    };
  },
  props: {
    headers: {
      type: Array,
      required: true,
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
  },
  watch: {
    walletAddress() {
      if (this.walletAddress) {
        this.currentUserCollection();
      }
    },
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
  },
  methods: {
    async currentUserNfts(collectionId, colIndex) {
      try {
        const currentNfts = await getTokenOfNftTransfer({
          page: 1,
          limit: 100,
          walletAddress: this.walletAddress,
          collectionId: collectionId,
        });

        currentNfts.forEach((item, index) => {
          item.floorPrice = this.items[colIndex].floorPrice;
        });

        this.userNfts.push(...currentNfts);

        if (currentNfts.length < this.limit) {
          this.allLoaded = true;
        }
      } catch (err) {
        console.log("error:", err);
        this.allLoaded = true;
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
        return "text-start";
      } else if (index == 1) {
        return "text-start";
      } else if (index == 2) {
        return "text-end";
      } else if (index == 3) {
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
</style> -->
