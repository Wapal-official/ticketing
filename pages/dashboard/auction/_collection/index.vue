<template>
  <div class="tw-py-4">
    <v-row v-if="nfts.length > 0" justify="start">
      <v-col
        v-for="(item, i) in metadata"
        :key="i"
        cols="12"
        lg="3"
        md="6"
        align="center"
      >
        <v-card
          tile
          @click="
            $router.push('/dashboard/auction/start'),
              $store.commit('auction/selectNft', { nft: nfts[i], meta: item })
          "
          color="transparent"
        >
          <v-img :src="item.image" class="tw-h-[350px]"></v-img>
          <div
            class="tw-w-full tw-py-4 tw-text-center tw-border-l tw-border-r tw-border-b tw-border-wapal-pink"
          >
            <h4>{{ item.name }}</h4>
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
import { getTokensOfCollection } from "@/services/AuctionService";
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
      let data = await getTokensOfCollection({
        limit: this.limit,
        offset: this.offset,
        walletAddress: this.walletAddress,
        collectionName: this.$route.params.collection,
      });

      if (data.data.current_token_ownerships.length > 0) {
        const nfts = data.data.current_token_ownerships;
        for (var x = 0; x < nfts.length; x++) {
          try {
            if (
              nfts[x].current_token_data.metadata_uri.slice(0, 4) === "ipfs"
            ) {
              const url = this.sliceIPFSUrl(
                nfts[x].current_token_data.metadata_uri
              );
              let meta = await this.$axios.get(
                `https://cloudflare-ipfs.com/ipfs/${url}`
              );
              this.metadata.push(meta.data);
              this.nfts.push(nfts[x]);
            } else {
              let meta = await this.$axios.get(
                nfts[x].current_token_data.metadata_uri
              );
              this.metadata.push(meta.data);
              this.nfts.push(nfts[x]);
            }
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
