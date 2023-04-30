<template>
  <div>
    <v-container>
      <v-row v-if="metadata.length > 0" justify="center">
        <v-col
          v-for="(item, i) in metadata"
          :key="i"
          cols="12"
          lg="3"
          md="6"
          align="center"
        >
          <v-card
            max-width="300"
            tile
            style="border: 1px solid rgba(255, 54, 171, 0.5)"
            @click="
              $router.push('/dashboard/auction/start'),
                $store.commit('auction/selectNft', { nft: nfts[i], meta: item })
            "
          >
            <v-img :src="item.image"></v-img>
            <h4 class="ma-2">{{ item.name }}</h4>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-else class="py-10" justify="center">
        <p v-if="end">No nfts</p>
        <ReusableLoading v-else />
      </v-row>
    </v-container>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: fetchNfts,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
    >
    </v-card>
  </div>
</template>
<script>
import { fetchWalletNfts } from "@/services/AuctionService";
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
      this.offset = this.page * this.limit;
      this.page++;
      let data = await fetchWalletNfts({
        limit: this.limit,
        offset: this.offset,
        walletAddress: this.walletAddress,
      });
      if (data.data.current_token_ownerships.length > 0) {
        this.nfts = data.data.current_token_ownerships;
        for (var x = 0; x < this.nfts.length; x++) {
          try {
            let meta = await this.$axios.get(
              this.nfts[x].current_token_data.metadata_uri
            );
            this.metadata.push(meta.data);
          } catch (e) {}
        }
      } else {
        this.end = true;
      }
    },
  },
};
</script>
