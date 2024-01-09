<template>
  <div>
    <v-row class="justify-center ms:justify-start" no-gutters>
      <v-col
        dense
        v-for="(item, index) in items"
        :key="index"
        class="grid-col-styling tw-pa-0"
        align="center"
      >
        <v-card
          :class="checkBorder(item)"
          @mouseenter="(hovered = item), checkBorder(item)"
          @mouseleave="(hovered = ''), checkBorder(item)"
          @click="toggleSelectionCard(item)"
          class="bulk-card my-2"
        >
          <v-img
            v-if="item.image == '' || item.image == null"
            style="background-color: white"
            src=""
            aspect-ratio="1"
            height="120"
            width="154"
            class="bulk-card-image"
          >
            <template v-slot:placeholder>
              <v-row align="center" justify="center" no-gutters>
                <p
                  v-if="item.name"
                  class="black--text"
                  style="font-size: 110px"
                >
                  <b>{{ item.name.substring(0, 1) }}</b>
                </p>
              </v-row>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <div class="grid-nft-rarity text-center">
              <span
                class="grid-nft-rarity-value"
                :class="rarityColor(item.rarity)"
                v-if="item.rarity"
              >
                {{ rarity(item.rarity) }}
              </span>
              <v-spacer></v-spacer>
              <input-checkbox
                v-if="selectedCheck.includes(item)"
                class="grid-nft-checkbox"
                icon="mdi-checkbox-marked"
                color="primary"
              />
              <input-checkbox
                v-else
                icon="mdi-checkbox-blank"
                class="grid-nft-checkbox"
                color="lightGrey"
              />
            </div>
          </v-img>
          <v-img
            v-else
            :src="item.image"
            aspect-ratio="1"
            height="120"
            width="154"
            class="bulk-card-image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <div class="grid-nft-rarity text-center">
              <span
                class="grid-nft-rarity-value"
                :class="rarityColor(item.rarity)"
                v-if="item.rarity"
              >
                {{ rarity(item.rarity) }}
              </span>
              <v-spacer></v-spacer>
              <input-checkbox
                v-if="selectedCheck.includes(item)"
                class="grid-nft-checkbox"
                icon="mdi-checkbox-marked"
                color="primary"
              />
              <input-checkbox
                v-else
                icon="mdi-checkbox-blank"
                class="grid-nft-checkbox"
                color="#25262B"
                style="opacity: 0.5600000023841858"
              />
            </div>
          </v-img>
          <div
            class="d-flex align-center tw-py-3 tw-px-2"
            style="
              display: flex;
              justify-content: space-between !important;
              width: 100%;
            "
          >
            <div><p class="transfer-value tw:mr-12">Floor</p></div>
            <!-- <v-spacer></v-spacer> -->
            <div>
              <p
                class="transfer-value-price nft-table-font d-flex align-center"
              >
                {{ decimal_fixed(item.listedPrice) }}
                <img
                  v-if="item.listedPrice != null"
                  :src="require('@/assets/img/aptos-grey.svg')"
                  alt="icon"
                  height="14"
                  width="14"
                  style="margin-left: 2px !important"
                />
              </p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import inputCheckbox from "~/components/Landing/NftTransfer/checkbox.vue";
export default {
  components: {
    inputCheckbox,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      yes: true,
      no: false,
      hovered: "",
      offerPrice: null,
    };
  },
  watch: {
    selectedData(newVal, oldVal) {
      if (newVal.length == 0) {
        this.$store.commit("dialog/setSelectedCheck", []);
      }
    },
    items(newVal) {
      console.log("newVAl:", newVal);
    },
  },
  computed: {
    selectAll: {
      get() {
        return this.$store.state.dialog.selectAll;
      },
      set(newVal) {
        return this.$store.commit("dialog/setSelection", newVal);
      },
    },
    selectedData() {
      return this.$store.state.dialog.selectedData;
    },
    selectedCheck() {
      return this.$store.state.dialog.selectedCheck;
    },
  },
  methods: {
    decimal_fixed(value) {
      if (value != null) {
        let val = parseFloat(value.toFixed(3));
        return val.toString();
      }
    },
    toggleSelectionCard(item) {
      console.log("item:", item);
      const selectedCopy = [...this.selectedCheck];
      if (selectedCopy.includes(item)) {
        this.$store.commit("dialog/setSingleCheck", true);
        selectedCopy.splice(selectedCopy.indexOf(item), 1);
      } else {
        this.$store.commit("dialog/setSingleCheck", true);
        selectedCopy.push(item);
      }
      this.$store.commit("dialog/setSelectedCheck", selectedCopy);
      if (this.items.length === this.selectedCheck.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
      this.$emit("checkboxSelect", this.selectedCheck);
    },
    rarity(item) {
      if (item != null) {
        let rarity = parseFloat(item);
        return Math.round(rarity);
        // return rarity.toFixed(2)
      } else {
        return "-";
      }
    },
    checkBorder(item) {
      if (item == this.hovered) {
        if (!this.selectedCheck.includes(item)) {
          return "white-selected";
        } else {
          return "selected";
        }
      } else {
        if (this.selectedCheck.includes(item)) {
          return "selected";
        } else {
          return "grey-selected";
        }
      }
    },
    toggleSelection(item) {
      const selectedCopy = [...this.selectedCheck];
      if (selectedCopy.includes(item)) {
        this.$store.commit("dialog/setSingleCheck", true);
        selectedCopy.splice(selectedCopy.indexOf(item), 1);
      } else {
        this.$store.commit("dialog/setSingleCheck", false);
        selectedCopy.push(item);
      }
      this.$store.commit("dialog/setSelectedCheck", selectedCopy);
      if (this.items.length == this.selectedCheck.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
      this.$emit("checkboxSelect", this.selectedCheck);
    },
    handleClick(index) {
      this.$emit("nameClick", this.items[index]);
    },
    toggleAllSelection() {
      if (this.items.length == this.selectedCheck.length) {
        this.$store.commit("dialog/setSelectedCheck", []);
      } else {
        this.$store.commit("dialog/setSelectedCheck", this.items);
      }
      this.checkBorder();
      this.$emit("checkboxSelectAll", this.selectedCheck);
    },
    rarityColor(rarity) {
      if (rarity <= 100) {
        return "top1Rarity";
      } else if (rarity <= 1000) {
        return "top15Rarity";
      } else if (rarity <= 2000) {
        return "top25Rarity";
      } else {
        return "normalRarity";
      }
    },
  },
};
</script>

<style scoped>
.top1Rarity {
  color: #ff576d !important;
  text-shadow: 0px 0px 5px rgba(255, 87, 109, 0.56);
}

.top15Rarity {
  color: #c84bf2 !important;
  text-shadow: 0px 0px 5px rgba(200, 75, 242, 0.44);
}

.top25Rarity {
  color: #ffffff;
}

.normalRarity {
  color: #909296;
}

.header-card-action .v-input--selection-controls {
  margin-top: 0 !important;
  padding: 0 !important;
}

.grid-col-styling {
  min-width: 156px !important;
  max-width: 156px !important;
  margin: 8px !important;
}

.white-selected {
  border: 1px solid white;
}

.grey-selected {
  border: 1px solid #383a3f;
  transition: 0.3s ease-in-out;
}

.selected {
  background-color: #25262b;
  border: 3px solid #8759ff !important;
  transition: 0.3s ease-in-out;
}

.grid-nft-rarity {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 90%;
}

.grid-nft-rarity-value {
  padding: 2px 4px;
  margin: 4px;
  min-width: 20px;
  background: #101113;
  border-radius: 2px;
  color: #909296;
  text-align: right;
  font-family: "JetBrains-Regular", sans-serif !important;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.grid-nft-checkbox {
  margin-top: 2px;
  margin-right: 8px;
}

.grid-aptos {
  margin-bottom: -2px;
  margin-left: -6px;
}

.bulk-card {
  display: flex;
  width: 154px;
  height: 164px;
  flex-direction: column;
  align-items: flex-start;
}

.transfer-value {
  margin-bottom: 0 !important;
  color: #909296;
  font-family: "Inter-Regular", sans-serif !important;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.24px;
  text-transform: uppercase;
}

.transfer-value-price {
  color: #fff;
  margin-bottom: 0 !important;
  font-family: "JetBrains-Regular", sans-serif !important;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
</style>
