<template>
  <div class="tw-py-4">
    <v-row v-if="nfts.length > 0" justify="start">
      <v-col
        v-for="(item, i) in nfts"
        :key="i"
        cols="12"
        lg="3"
        md="6"
        align="center"
      >
        <v-card
          tile
          @click="$router.push(`/dashboard/auction/${item.name}`)"
          color="transparent"
        >
          <v-img :src="item.image" class="tw-h-[350px]"></v-img>
          <div
            class="tw-w-full tw-py-4 tw-border-l tw-text-left tw-border-r tw-border-b tw-border-wapal-pink"
          >
            <h4
              class="tw-w-full tw-px-4 tw-flex tw-flex-row tw-items-center tw-justify-between"
            >
              {{ item.name }}
              <span class="tw-text-wapal-pink tw-pl-2">{{
                item.ownedNumber
              }}</span>
            </h4>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters v-else class="py-10" justify="center">
      <p v-if="end">No nfts</p>
      <ReusableLoading v-else />
    </v-row>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: fetchNfts,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      class="!tw-shadow-none"
    >
    </v-card>
  </div>
</template>
<script>
import {
  getOwnedCollectionsOfUser,
  getNumberOfTokensInOwnedCollectionOfUser,
} from "@/services/AuctionService";
export default {
  data() {
    return {
      end: false,
      nfts: [],
      metadata: [],
      offset: 0,
      page: 0,
      limit: 20,
    };
  },
  mounted() {
    this.fetchNfts();
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
  },
  methods: {
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
