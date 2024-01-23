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
            <div v-if="userNfts.length == 0" class="tw-mt-4">
              <nft-transfer-skeleton
                v-intersect.quiet="{
                  handler: onIntersect,
                  options: {
                    threshold: [],
                  },
                }"
                :cols="10"
                class="my-2 my-sm-3"
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
    <div
      class="destination-bottom tw-px-5 tw-pt-4"
      style="border-top: 1px solid #25262b"
    >
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="12" sm="8" class="tw-pr-0 md:tw-pr-5">
          <div>
            <label
              class="text-uppercase text-start font-bold"
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
          class="tw-flex align-start tw-justify-center md:tw-justify-end"
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
import {
  getTokenOfNftTransfer,
  nftTransfer,
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
    // walletAddress() {
    //   if (this.walletAddress) {
    //     this.currentUserCollection();
    //   }
    // },
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
    checkboxSelect(e) {
      console.log("selectedCheck:", this.selectedCheck);
    },
    sendDisabled() {
      // if (this.wallet_address != "" && this.selectedCheck.length > 0) {
      //   return false;
      // } else {
      //   return true;
      // }
    },

    async sendNfts() {
      const destinationAddress = this.wallet_address;
      if (!destinationAddress) {
        console.error("Please enter a destination address.");
        return;
      }

      console.log("select checc valu", this.selectedCheck);
      const nftTransferRes = await nftTransfer(this.selectedCheck, [
        this.wallet_address,
      ]);
      console.log("resajsdasd", nftTransferRes);
      this.$toast.showMessage({
        message: `Nft Transfred to ${this.wallet_address}.`,
      });
      // this.wallet_address = "";
      // this.$store.commit("nftTransfer/setCheckData", []);
    },
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

          console.log("currentNfts", currentNfts);
          await this.collectionIDFloor(currentNfts);

          this.userNft.push(...currentNfts);
          console.log("console unser", this.userNft);
          this.$store.dispatch("nftTransfer/setNftTransfer", this.userNft);
          this.fetching = false;
          if (currentNfts.length === 0) {
            this.allloaded = true;
          }
          if (currentNfts.length < this.limit) {
            this.allLoaded = true;
          }
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
        const floorPrice = await this.extractFloorPrice(collectionId);

        this.$store.commit("nftTransfer/setFloorPrice", {
          collectionId: collectionId,
          floorPrice: floorPrice,
        });
        currentNfts
          .filter((item) => item.collectionId === collectionId)
          .forEach((item) => {
            item.floorPrice = floorPrice;
          });
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
    onIntersect(entries) {
      if (entries[0].isIntersecting) {
        this.currentUserNfts();
      }
    },
    // async currentUserCollection() {
    //   try {
    //     this.collectionPage++;

    //     const collections = await getCollectionsOfUser({
    //       walletAddress: this.walletAddress,
    //       page: this.collectionPage,
    //       limit: this.limit,
    //     });

    //     this.userCollectionData.push(...collections);
    //     console.Console("collectiondeta", this.userCollectionData);
    //     if (collections.length < this.limit) {
    //       this.allLoaded = true;
    //     }
    //   } catch (err) {
    //     console.log("error:", err);
    //     this.allLoaded = true;
    //   }
    // },
  },
};
</script>
<style class="css">
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
