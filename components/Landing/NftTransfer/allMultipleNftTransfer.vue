<template>
  <div>
    <div
      class="tw-mx-3"
      style="max-height: 60vh; min-height: 60vh; overflow: auto"
    >
      <nft-transfer-card class="tw-my-2 sm:my-3 md:my-4" :items="userNfts" />
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
          sm="4"
          class="tw-flex align-start tw-justify-center md:tw-justify-end"
        >
          <button-primary
            title="Send"
            :small="false"
            class="instance-sell"
            min-width="110px"
            style="width: 100%; max-width: 250px"
          >
          </button-primary>
        </v-col>
      </v-row>
    </div>
    <!-- </v-col>
    </v-row> -->
  </div>
</template>

<script>
import nftTransferCard from "~/components/Landing/NftTransfer/nftTransferGridCard.vue";
import {
  getTokenOfNftTransfer,
  getFloorPrice,
} from "~/services/nftTransferService";
import {
  getOwnedCollectionsOfUser,
  getNumberOfTokensInOwnedCollectionOfUser,
} from "@/services/AuctionService";
export default {
  components: {
    nftTransferCard,
  },
  data() {
    return {
      end: false,
      nfts: [],
      metadata: [],
      offset: 0,
      page: 0,
      limit: 20,
      ///
      userNfts: [],
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
    // this.fetchNfts();
    // console.log("fetched nfts", this.fetchNfts());
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
  },
  methods: {
    async currentUserNfts() {
      try {
        const currentNfts = await getTokenOfNftTransfer({
          page: 1,
          limit: 100,
          walletAddress: this.walletAddress,
        });
        const uniqueCollectionIDs = [
          ...new Set(currentNfts.map((item) => item.collectionId)),
        ];

        const floorPrices = await Promise.all(
          uniqueCollectionIDs.map((collectionId) =>
            this.extractFloorPrice(collectionId)
          )
        );

        currentNfts.forEach((item, index) => {
          item.floorPrice = floorPrices[index];
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

    async fetchNfts() {
      this.loading = true;
      this.offset = this.page * this.limit;
      this.page++;
      let data = await getOwnedCollectionsOfUser({
        limit: this.limit,
        offset: this.offset,
        walletAddress: this.walletAddress,
      });

      if (data.data.current_token_ownerships.length > 0) {
        const nfts = data.data.current_token_ownerships;
        for (var x = 0; x < nfts.length; x++) {
          try {
            let meta = null;
            const numberRes = await getNumberOfTokensInOwnedCollectionOfUser(
              nfts[x].current_token_data.collection_name,
              this.walletAddress
            );

            if (
              nfts[x].current_token_data.metadata_uri.slice(0, 4) === "ipfs"
            ) {
              const url = this.sliceIPFSUrl(
                nfts[x].current_token_data.metadata_uri
              );
              meta = await this.$axios.get(
                `https://cloudflare-ipfs.com/ipfs/${url}`
              );
            } else {
              meta = await this.$axios.get(
                nfts[x].current_token_data.metadata_uri
              );
            }

            let imageURL = meta.data.image;

            if (imageURL.slice(0, 4) === "ipfs") {
              const url = this.sliceIPFSUrl(imageURL);

              imageURL = `https://cloudflare-ipfs.com/ipfs/${url}`;
            }

            if (imageURL.includes("ipfs.apt.land")) {
              const index = imageURL.indexOf("ipfs.apt.land");

              const slicedURL = imageURL.slice(index, imageURL.length);

              imageURL = slicedURL.replaceAll("/", "-");

              imageURL =
                "https://ipfs.bluemove.net/uploads/cdn-image/" + imageURL;
            }

            this.nfts.push({
              name: nfts[x].current_token_data.collection_name,
              image: imageURL,
              ownedNumber:
                numberRes.data.current_token_ownerships_aggregate.aggregate
                  .count,
            });
          } catch {}
        }
      } else {
        this.end = true;
      }
    },
    sliceIPFSUrl(url) {
      return url.slice(7, url.length);
    },
  },
};
</script>
<style class="css">
.destination-bottom {
  background-color: #101113;
  /* position: absolute;
  bottom: 0;
  left: 0;
  right: 0; */
}
.custom-text-field {
  margin-top: 4px !important;
}
</style>
