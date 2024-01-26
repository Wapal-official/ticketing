<template>
  <div>
    <div
      class="tw-mx-3 custom-scrollbar"
      style="max-height: 60vh; min-height: 58vh; overflow: auto"
    >
      <div v-if="userNfts.length > 0">
        <nft-transfer-card
          class="tw-my-2 sm:tw-my-3 md:tw-my-4"
          :items="userNfts"
          @checkboxSelect="checkboxSelect"
        />
      </div>
      <div>
        <v-row justify="center">
          <v-col cols="12" align="center">
            <div class="tw-mt-4" v-if="!allLoaded">
              <nft-transfer-skeleton
                v-intersect.quiet="{
                  handler: onIntersect,
                  options: {
                    threshold: [],
                  },
                }"
                :cols="userNfts.length == 0 ? 10 : 5"
                class="my-2 my-sm-3"
              />
            </div>
            <span
              class="caption text-capitalize font14-semi-bold text--disabled my-10"
            >
              <span v-if="!allLoaded"> loading </span>
              <span v-else-if="userNfts.length > 0">no more nfts</span>
              <span v-else-if="userNfts.length > 0 && allLoaded == true"
                >No more nfts</span
              >
            </span>
          </v-col>
        </v-row>
      </div>
    </div>
    <div
      class="destination-bottom tw-px-5 tw-pt-4"
      style="border-top: 1px solid #25262b"
    >
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" lg="8" md="8" sm="8">
          <div>
            <label
              class="text-uppercase text-start font-bold label-text"
              for="amountInput"
              style="color: #c1c2c5"
              >Destination Address</label
            >
            <v-text-field
              v-model="wallet_address"
              placeholder="Enter wallet address"
              type="string"
              dense
              outlined
              class="custom-text-field tw-mt-2"
            >
            </v-text-field>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          md="4"
          sm="4"
          class="d-flex align-start justify-center sm:justify-end"
        >
          <button-primary
            title="Send"
            :small="false"
            :disabled="sendDisabled()"
            min-width="110px"
            style="width: 100%; max-width: 250px"
            @click="sendNfts"
          ></button-primary>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import nftTransferSkeleton from "~/components/Landing/NftTransfer/loader/nftTransferGridSkeleton.vue";
import nftTransferCard from "~/components/Landing/NftTransfer/nftTransferGridCard.vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import {
  getTokenOfNftTransfer,
  nftTransfer,
  getDetailCollection,
  getCollectionById,
} from "~/services/nftTransferService";
import { getFloorPrice } from "@/services/nftTransferService";

export default {
  components: {
    nftTransferCard,
    nftTransferSkeleton,
  },

  data() {
    return {
      allNftsPage: 0,
      allNftsLimit: 50,
      wallet_address: "",
      userNft: [],
      allLoaded: false,
      userCollectionData: [],
      collectionPage: 1,
      fetching: false,
      debounce: null,
      firstLoad: true,
      nftDebounce: null,
    };
  },
  watch: {
    walletAddress() {
      if (this.walletAddress) {
        this.currentUserCollection();
      }
    },
  },
  async mounted() {
    await this.currentUserNfts();
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    userNfts() {
      return this.$store.state.nftTransfer.allTransferableNfts;
    },
    selectedCheck() {
      return this.$store.state.nftTransfer.selectedCheck;
    },
  },
  methods: {
    checkboxSelect(e) {},
    sendDisabled() {
      if (this.wallet_address != "" && this.selectedCheck.length > 0) {
        return false;
      } else {
        return true;
      }
    },

    async sendNfts() {
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
      this.wallet_address = "";
      this.$store.commit("nftTransfer/setCheckData", []);
    },
    // In the currentUserNfts method
    async currentUserNfts() {
      if (!this.fetching) {
        this.fetching = true;
        try {
          this.allNftsPage++;
          const currentNfts = await getTokenOfNftTransfer({
            page: this.allNftsPage,
            limit: this.allNftsLimit,
            walletAddress: this.walletAddress,
            type: "non_listed",
          });

          // Commit a mutation to update userNft state in Vuex store
          this.$store.dispatch("nftTransfer/setNftTransfer", currentNfts);

          this.fetching = false;
          if (currentNfts.length === 0) {
            this.allLoaded = true;
          }
          if (currentNfts.length < this.allNftsLimit) {
            this.allLoaded = true;
          }

          await this.collectionIDFloor(currentNfts);
        } catch (err) {
          console.log("error:", err);
          this.allLoaded = true;
        }
      } else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.currentUserNfts();
        }, 50);
      }
    },

    async collectionIDFloor(currentNfts) {
      const uniqueCollectionIDs = [
        ...new Set(currentNfts.map((item) => item.collectionId)),
      ];

      for (const collectionId of uniqueCollectionIDs) {
        const filteredCollectionId =
          currentNfts.find((item) => item.collectionId === collectionId)
            .tokenStandard === "v1"
            ? collectionId.slice(2)
            : collectionId;

        const floorPrice = await this.extractFloorPrice(filteredCollectionId);

        this.$store.commit("nftTransfer/setFloorPrice", {
          collectionId: collectionId,
          floorPrice: floorPrice,
        });
        currentNfts
          .filter((item) => item.collectionId === collectionId)
          .forEach((item) => {
            this.$store.commit("nftTransfer/setFloorPriceOfToken", {
              token: item,
              floorPrice,
            });
          });
      }
    },
    async extractFloorPrice(collectionId) {
      try {
        let collectionDetailRes = await getCollectionById(collectionId);

        const getFloor = await getDetailCollection(
          collectionDetailRes.data.slug
        );

        return getFloor.floorPrice;
      } catch (error) {
        console.error("Error fetching floor price:", error);
        return 0;
      }
    },
    async currentUserCollection() {
      try {
        this.collectionPage++;

        const collections = await getCollectionsOfUser({
          walletAddress: this.walletAddress,
          page: this.collectionPage,
          limit: this.limit,
        });

        this.userCollectionData.push(...collections);
        console.Console("collectiondeta", this.userCollectionData);
        if (collections.length < this.limit) {
          this.allLoaded = true;
        }
      } catch (err) {
        console.log("error:", err);
        this.allLoaded = true;
      }
    },
    onIntersect(entries) {
      if (entries[0].isIntersecting) {
        this.currentUserNfts();
      }
    },
  },
};
</script>
<style class="css">
.label-text {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}
.destination-bottom {
  background-color: #101113;
}
.custom-scrollbar {
  scrollbar-width: none !important;
}

.custom-scrollbar::-webkit-scrollbar {
  display: none !important;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #101113;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #555;
}
</style>
