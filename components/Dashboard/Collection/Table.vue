<template>
  <div class="tw-w-full">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="dashboard-data-table"
      :class="{ 'with-checkbox': isCheckbox }"
      mobile-breakpoint="0"
      :hide-default-footer="true"
      :hide-default-header="isCheckbox ? true : false"
      disable-pagination
    >
      <template v-slot:header="{ props }">
        <thead class="header-template" v-if="isCheckbox">
          <tr>
            <th v-for="(header, index) in props.headers" :key="index">
              <div
                v-if="header.text === 'Discord Username'"
                class="tw-flex tw-justify-start"
                style="align-items: center; min-width: 200px"
              >
                <v-checkbox
                  v-model="selectAll"
                  class="!tw-text-dark-2 check-box"
                  :ripple="false"
                  @change="selectAllItems"
                  style="font-size: 16px; margin-right: 12px"
                ></v-checkbox>

                <span>{{ header.text }}</span>
              </div>
              <div
                v-else-if="header.text === 'Mint Limit'"
                class="tw-flex tw-justify-start"
                style="align-items: center; min-width: 80px"
              >
                <span>{{ header.text }}</span>
              </div>
              <div
                v-else-if="header.text === 'Date Joined'"
                class="tw-flex tw-justify-start"
                style="align-items: center; min-width: 110px"
              >
                <span>{{ header.text }}</span>
              </div>
              <div v-else>
                <span>{{ header.text }}</span>
              </div>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            class="tw-cursor-pointer hover:!tw-bg-black/60"
            @click="$emit('rowClicked', item)"
          >
            <td
              :class="{ '!tw-py-4 ': !isCheckbox }"
              class="!tw-border-b-dark-6 tw-font-medium !tw-text-base"
              v-for="(header, index) in headers"
              :key="index"
            >
              <div
                v-if="isCheckbox && header.text == 'Discord Username'"
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
              >
                <v-checkbox
                  v-model="item.checkbox"
                  :ripple="false"
                  class="!tw-text-dark-2 check-box"
                  style="font-size: 16px !important"
                  @change="selectedItem(item, item.checkbox)"
                >
                  <template v-slot:label>
                    <span style="font-size: 12px">{{ itemIndex + 1 }}.</span>
                  </template>
                </v-checkbox>
              </div>
              <div
                v-if="header.showSerialNumber && header.showImage"
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
              >
                {{ itemIndex + 1 }}.
                <utility-image
                  v-if="isImage(item.image)"
                  :source="item.image"
                  :onerror="imageNotFound()"
                  :alt="item[header.value]"
                  class="tw-w-[64px] tw-h-[64px] tw-object-cover tw-rounded"
                />
                <!-- <video-player-listed
                  v-else-if="isVideo(item.image)"
                  :source="item.image"
                  style="max-width: 65px !important; height: 65px"
                /> -->
                {{ item[header.value] }}
              </div>
              <div
                v-else-if="header.progress"
                class="tw-w-full tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-2"
              >
                <div class="tw-text-sm tw-text-white/70">
                  {{ item[header.value]["text"] }}
                </div>
                <div
                  class="tw-relative tw-w-full tw-rounded-full tw-h-2 tw-bg-white/20"
                >
                  <div
                    class="tw-absolute tw-top-0 tw-h-2 tw-rounded-full tw-bg-primary-1"
                    :style="`width:${item[header.value]['progressPercent']}%`"
                  ></div>
                </div>
              </div>
              <div
                v-else-if="header.showAptIcon"
                class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <span>{{ item[header.value] }}</span>
                <span v-if="item[header.value] !== 'TBD'">
                  <img
                    :src="getCoinTypeOfCollection(item).imageDark"
                    alt="coin type"
                    width="14px"
                    height="14px"
                /></span>
              </div>
              <div
                v-else-if="header.showSocialLink"
                class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <a
                  :href="item.twitter"
                  target="_blank"
                  v-if="item.twitter"
                  @click.stop
                >
                  <i
                    class="bx bxl-twitter tw-text-xl tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:tw-text-primary-1"
                  ></i
                ></a>
                <a
                  :href="item.discord"
                  target="_blank"
                  v-if="item.discord"
                  @click.stop
                >
                  <i
                    class="bx bxl-discord-alt tw-text-xl tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:tw-text-primary-1"
                  ></i
                ></a>
                <a
                  :href="item.instagram"
                  target="_blank"
                  v-if="item.instagram"
                  @click.stop
                >
                  <i
                    class="bx bxl-instagram tw-text-xl tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:tw-text-primary-1"
                  ></i
                ></a>
              </div>
              <div v-else>{{ item[header.value] }}</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import aptIcon from "@/assets/img/aptBlack.svg";
import imageNotFound from "@/utils/imageNotFound";
import { getCoinType } from "@/utils/getCoinType";
export default {
  props: {
    headers: { type: Array },
    items: { type: Array },
    isCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      aptIcon,
      imageNotFound,
      selectedItems: [],
      selectAll: false,
      selectAllIndeterminate: false,
      selectedAddresses: [],
      selectedCheckboxItem: null,
    };
  },
  watch: {
    selectedData(newValue) {
      this.selectedItems = [...newValue];
      if (newValue.length > 0 && newValue.length == this.items.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
  },
  computed: {
    selectedData() {
      return this.$store.state.general.selectedItem;
    },
  },
  methods: {
    isImage(source) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp",
            "svg",
            "ico",
            "tiff",
          ].includes(extension)
        : false;
    },
    isVideo(source) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp4",
            "mkv",
            "m4v",
            "webm",
            "avi",
            "mov",
            "wmv",
            "flv",
            "3gp",
            "ogv",
            "mpeg",
            "mpg",
            "divx",
            "rm",
            "asf",
            "vob",
            "ts",
            "m2ts",
          ].includes(extension)
        : false;
    },
    selectAllItems() {
      if (this.selectAll) {
        this.$store.commit("general/setSelectedItem", []);
        this.items.forEach((item) => {
          item.checkbox = true;
          this.$store.commit("general/setSelectedItem", this.items);
        });
      } else {
        this.selectedItems = [];
        this.items.forEach((item) => {
          item.checkbox = false;
        });
        this.$store.commit("general/setSelectedItem", []);
      }
    },
    selectedItem(item, value) {
      if (value) {
        this.$store.commit("general/setSelectedItem", [
          ...this.selectedData,
          structuredClone(item),
        ]);
      } else {
        this.$store.commit("general/removeSelectedItem", item);
      }
    },

    handleHeaderClick(header) {
      if (header.text === "Wallet Address") {
        this.selectedItems = [];
        this.$store.commit("general/setSelectedItem", []);
      }
    },
    handleClearSelection() {
      this.$emit("clearSelection");
    },
    getCoinTypeOfCollection(collection) {
      if (collection.coin_type) {
        return getCoinType(collection.coin_type);
      }

      return getCoinType(
        collection.seed && collection.seed.coin_type
          ? collection.seed.coin_type
          : ""
      );
    },
  },
};
</script>
<style>
.with-checkbox .header-template {
  position: relative !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.with-checkbox .header-template tr th {
  color: #909296 !important;
  font-size: 14px !important;
}

.with-checkbox .header-template tr th div span {
  font-family: "inter";
  text-transform: uppercase !important;
}

.dashboard-data-table {
  min-width: 100% !important;
  max-width: 100% !important;
  overflow-x: auto !important;
  background: transparent !important;
}

::v-deep .dashboard-data-table .v-data-table__wrapper::-webkit-scrollbar {
  display: none;
}

::v-deep .dashboard-data-table .v-data-table__wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.dashboard-data-table .v-data-table__wrapper {
  padding-bottom: 20px;
  margin-bottom: 30px;
}
.check-box .v-input__control {
  padding-right: 12px;
}
.check-box
  .v-input__control
  .v-input__slot
  .v-input--selection-controls__input
  .mdi-checkbox-blank-outline {
  font-size: 18px !important;
}
.check-box
  .v-input__control
  .v-input__slot
  .v-input--selection-controls__input
  .v-icon {
  font-size: 18px !important;
}
.check-box
  .v-input__control
  .v-input__slot
  .v-input--selection-controls__input {
  margin-right: 4px !important;
}
.check-box
  .v-input__control
  .v-input__slot
  .v-input--selection-controls__input {
  margin-right: 2px !important;
}
</style>
