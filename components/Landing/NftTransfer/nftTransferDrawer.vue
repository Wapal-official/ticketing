<template>
  <v-card>
    <v-navigation-drawer
      class="custom-scrollbar max-height"
      v-model="nftTransferDrawer"
      permanent
      style="background-color: #101113 !important; width: 100%"
      :height="drawerHeight()"
      :key="nftTransferDrawer"
    >
      <div class="tw-py-4 tw-px-3 custom-scrollbar">
        <v-row class="sticky" style="border-right: 2px solid #383a3f">
          <v-col>
            <p class="d-flex align-center tw-mb-0">
              <span>
                <!-- <box-icon
                  class="icon-box15"
                ></box-icon> -->
                <img
                  src="~/assets/img/collection-icon.svg"
                  alt="colleciton Icon"
                />
              </span>
              <span class="nav-paragraph2 tw-ml-2">COLLECTIONS</span>
            </p>
          </v-col>
        </v-row>
        <v-list v-if="items.length > 0" dense>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon class="tw-mr-1">
              <input-checkbox
                v-if="selectedData.includes(item)"
                style="margin-right: 6px; margin-left: -6px"
                icon="mdi-checkbox-marked"
                color="white"
                @click="checkSelection(item)"
              />
              <input-checkbox
                v-else
                style="margin-right: 6px; margin-left: -4px"
                icon=""
                color="lightGrey"
                @click="checkSelection(item)"
              />
            </v-list-item-icon>
            <v-list-item-icon
              class="hover-link"
              @click="checkSelection(item)"
              style="margin-right: 0 !important"
            >
              <v-img
                v-if="item.image == '' || item.image == null"
                style="background-color: white"
                class="text-start rounded-image-style tw-mr-4"
                src=""
                width="24"
                height="24"
              >
                <template v-slot:placeholder>
                  <v-row justify="center" no-gutters>
                    <h2 class="black--text">
                      <b>{{ item.name.substring(0, 1) }}</b>
                    </h2>
                  </v-row>
                </template>
              </v-img>
              <utility-image
                v-else
                :source="item.image"
                width="24px"
                height="24px"
                :alt="item.name"
                class="text-start rounded-image-style tw-mr-4"
              />
            </v-list-item-icon>

            <v-list-item-title
              class="tw-ml-1 hover-link"
              @click="checkSelection(item)"
            >
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <div v-else>
          <v-row v-for="(item, i) in 13" :key="i" no-gutters>
            <div class="d-flex align-center tw-mt-3">
              <loader-skeleton
                dynamicClass="rounded"
                class="tw-pl-2 tw-pr-2"
                :height="17"
                :width="17"
              />
              <loader-skeleton
                class="tw-pr-2 tw-pl-2"
                :height="25"
                :width="25"
              />
              <loader-skeleton :height="15" :width="115" />
            </div>
          </v-row>
        </div>
      </div>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import inputCheckbox from "~/components/Landing/NftTransfer/checkbox.vue";
import loaderSkeleton from "~/components/Landing/NftTransfer/loader/skeleton.vue";

export default {
  components: {
    inputCheckbox,
    loaderSkeleton,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      nftTransferDrawer: true,
    };
  },
  computed: {
    selectedData() {
      return this.$store.state.nftTransfer.selectedData;
    },
  },
  methods: {
    checkSelection(item) {
      if (this.selectedData.includes(item)) {
        this.$store.commit("nftTransfer/removeTransferCollection", item);
        this.$store.commit("nftTransfer/removeSelectedCollection", item);
      } else {
        this.$store.commit("nftTransfer/selectTransferCollection", []);
        this.$store.commit("nftTransfer/pushTransferCollection", item);
        this.$store.commit("nftTransfer/selectCollection", []);
        this.$store.commit("nftTransfer/pushSelectedCollection", item);
      }
    },
    drawerHeight() {
      if (process.client) {
        if (this.$vuetify.breakpoint.smAndUp) {
          return window.innerHeight - 185;
        } else {
          return window.innerHeight - 500;
        }
      }
    },
    closeDialogAndForceUpdate() {
      this.nftTransferDrawer = false;
      this.$forceUpdate();
    },
  },
};
</script>

<style>
.hover-link {
  cursor: pointer;
}
.sticky {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #101113;
}

.v-list-item__icon {
  margin-right: 0 !important;
}

.max-height {
  max-height: auto !important;
}

@media (max-width: 600px) {
  .max-height {
    max-height: 190px !important;
  }
}
</style>
