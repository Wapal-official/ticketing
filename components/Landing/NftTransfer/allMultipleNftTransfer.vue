<template>
  <div>
    <div
      class="mx-3"
      style="max-height: 60vh; min-height: 58vh; overflow: scroll"
    >
      <div v-if="userNfts.length > 0">
        <nft-transfer-card
          class="tw-my-2 sm:my-3 md:my-4"
          :items="userNfts"
          @checkboxSelect="checkboxSelect"
        />
      </div>
      <div>
        <v-row justify="center">
          <v-col cols="12" align="center">
            <div v-if="userNfts.length == 0" class="mt-4">
              <!-- <CustomLoaderNftTransferGridSkeleton
                :cols="10"
                class="my-2 my-sm-3"
              /> -->
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
      class="destination-bottom px-5 pt-4"
      style="border-top: 1px solid #25262b"
    >
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" lg="8" md="8" sm="8">
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
              class="custom-text-field mt-2"
            >
            </v-text-field>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          md="4"
          sm="4"
          class="d-flex align-start justify-end"
        >
          <primary-button
            title="Send"
            :small="false"
            :disabled="sendDisabled()"
            min-width="110px"
            style="width: 100%; max-width: 250px"
            @click="sendNfts"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import nftTransferCard from "~/components/Landing/NftTransfer/nftTransferGridCard.vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import {
  getTokenOfNftTransfer,
  nftTransfer,
} from "~/services/nftTransferService";
import { getFloorPrice } from "@/services/nftTransferService";

export default {
  components: {
    nftTransferCard,
    PrimaryButton,
  },

  data() {
    return {
      allNftsPage: 0,
      allNftsLimit: 1500,
      wallet_address: "",
      userNft: [],
      allLoaded: false,
      userCollectionData: [],
      collectionPage: 1,
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
      try {
        this.allNftsPage++;
        const currentNfts = await getTokenOfNftTransfer({
          page: this.allNftsPage,
          limit: this.allNftsLimit,
          walletAddress: this.walletAddress,
          type: "non_listed",
        });

        const uniqueCollectionIDs = [
          ...new Set(currentNfts.map((item) => item.collectionId)),
        ];

        for (const collectionId of uniqueCollectionIDs) {
          const floorPrice = await this.extractFloorPrice(collectionId);

          currentNfts
            .filter((item) => item.collectionId === collectionId)
            .forEach((item) => {
              item.floorPrice = floorPrice;
            });
        }

        this.userNft.push(...currentNfts);
        console.log("console unser", this.userNft);
        this.$store.dispatch("nftTransfer/setNftTransfer", this.userNft);

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
  },
};
</script>
<style class="css">
.destination-bottom {
  background-color: #101113;
}
</style>
