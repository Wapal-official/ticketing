<template>
  <v-row justify="center">
    <v-dialog
      v-model="nftTransferDialog"
      :fullscreen="isMobileSize"
      :scrim="false"
      persistent
      max-width="900"
      overlay-color="icon"
      :overlay-opacity="0.6"
    >
      <v-card style="overflow: hidden; background-color: #101113">
        <div>
          <v-row class="tw-p-3" align="center" justify="center" no-gutters>
            <v-col cols="6">
              <div class="d-flex align-center">
                <img
                  class="tw-mr-2"
                  src="~/assets/img/transfer.svg"
                  alt="nft transfer"
                />
                <p
                  class="tw-mr-1 transfer-text"
                  style="margin-bottom: 0 !important"
                >
                  Nft Transfer
                </p>
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
                  class="tabs mx-3"
                  color="#8759FF"
                  style="
                    position: relative;
                    background-color: #101113 !important;
                  "
                >
                  <v-tab> All Nfts </v-tab>
                  <v-tab> NFTs by Collection </v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-tabs-items v-model="tabs" style="background: #101113">
                  <v-tab-item>
                    <!-- <div v-if="nftTransferType == 'NftTransfer'">
                      <SectionDialogsAllSingleNftTransfer />
                    </div>
                    <div v-else-if="nftTransferType == 'NftTransferCollection'">
                      <CustomTablesNftSendTbl
                        :headers="headers"
                        :items="boardsData"
                        :listView="true"
                      />
                    </div> -->
                    <div>
                      <LandingNftTransferAllMultipleNftTransfer />
                    </div>
                  </v-tab-item>
                  <v-tab-item>
                    <div style="min-height: 75vh; overflow: auto">
                      <nft-send-tbl
                        class="tw-px-2"
                        :headers="headers"
                        :items="boardsData"
                        :GridView="true"
                        :nftTransferGridData="nftTransferGridData"
                      />
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
import NftSendTbl from "~/components/Landing/NftTransfer/nftSendTbl.vue";
import {
  getCurrentUserNfts,
  getCollectionsOfUser,
} from "~/services/nftTransferService";
import {
  getOwnedCollectionsOfUser,
  getNumberOfTokensInOwnedCollectionOfUser,
} from "@/services/AuctionService";

export default {
  components: { NftSendTbl },
  data() {
    return {
      nftTransferType: "NftTransfer",
      nftTransferDrawer: true,
      tabs: 0,
      selectAll: false,
      headers: [
        { text: "Collection", value: "collection" },
        { text: "Count", value: "count" },
        { text: "Floor", value: "floor" },
        { text: "Value", value: "value" },
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
        {
          name: "nft",
          image: "nft4.svg",
          rarity: 52,
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
        {
          name: "nft",
          image: "nft3.svg",
          rarity: 52,
          listedPrice: 256,
          topBidPrice: "256",
          costPrice: "256",
          tooltipDate: "tooltipDate",
        },
        {
          name: "nft",
          image: "nft2.svg",
          rarity: 52,
          listedPrice: 256,
          topBidPrice: "256",
          costPrice: "256",
          tooltipDate: "tooltipDate",
        },
        {
          name: "nft",
          image: "nft1.svg",
          rarity: 52,
          listedPrice: 256,
          topBidPrice: "256",
          costPrice: "256",
          tooltipDate: "tooltipDate",
        },
        {
          name: "nft",
          image: "nft3.svg",
          rarity: 52,
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
        {
          name: "nft",
          image: "nft3.svg",
          rarity: 52,
          listedPrice: 256,
          topBidPrice: "256",
          costPrice: "256",
          tooltipDate: "tooltipDate",
        },
      ],
      userCollectionData: [],
      collectionPage: 15,
      limit: 100,
      allLoaded: false,
    };
  },
  mounted() {
    // this.fetchNfts();
    // this.console.log("nft fetch", this.fetchNfts());
    // this.currentUserCollection();
    // console.log("Component mounted");
    // console.log("mounting collections", this.currentUserCollection);
  },
  watch: {
    nftTransferDialog(newVal) {
      if (newVal == true) {
        this.nftTransferDrawer = true;
      }
    },
  },

  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
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
  },
  methods: {
    async fetchUserCollections() {
      try {
        const walletAddress = this.walletAddress;
        const collections = await getUserCollections(walletAddress);

        collections.forEach((collection) => {
          console.log("Collection ID:", collection.collectionId);
          console.log("Collection Name:", collection.name);
        });
      } catch (error) {
        console.error("Failed to fetch user collections:", error.message);
      }
    },
    async currentUserCollection() {
      try {
        console.log("Before fetching collections");
        this.collectionPage++;

        const collections = await getCollectionsOfUser({
          walletAddress: this.walletAddress,
          page: this.collectionPage,
          limit: this.limit,
        });

        console.log("Collections fetched:", collections);

        this.userCollectionData.push(...collections);

        if (collections.length < this.limit) {
          this.allLoaded = true;
        }
      } catch (err) {
        console.log("Error fetching collections:", err);
        this.allLoaded = true;
      }
    },
  },
};
</script>

<style lang="css">
.transfer-text {
  color: #8759ff;
  cursor: pointer;
  fill: var(--primary-primary, #8759ff);
  filter: drop-shadow(2px 2px 4px rgba(198, 189, 255, 0.2))
    drop-shadow(-2px -2px 4px rgba(198, 189, 255, 0.2));
}

.theme--dark.v-tabs > .v-tabs-bar {
  background-color: #101113 !important;
}
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
  border: 1px solid #25262b;
  padding: 30px 24px 0 24px;
}
</style>
