<template>
  <div>
    <v-container>
      <v-row v-if="nfts.length > 0" justify="center">
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
            @click="$router.push('/dashboard/auction/start')"
          >
            <v-img :src="item.image"></v-img>
            <h4 class="ma-2">{{ item.name }}</h4>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <ReusableLoading />
      </v-row>
    </v-container>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      nfts: [],
      metadata: [],
      offset: 0,
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
      let data = await this.$axios.post(
        "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql",
        {
          operationName: "AccountTokensData",
          query:
            `query AccountTokensData {
        current_token_ownerships(
          limit: 10
          offset:` +
            this.offset +
            `
          where: {owner_address: {_eq: "` +
            this.walletAddress +
            `"}}
          ) {
          current_token_data {
            name
            metadata_uri
            description
            collection_name
            creator_address
            token_data_id_hash
          }
        }
      }`,
          variables: null,
        }
      );
      this.nfts = data.data.data.current_token_ownerships;
      for (var x = 0; x < this.nfts.length; x++) {
        try{
          let meta =await this.$axios.get(this.nfts[x].current_token_data.metadata_uri)
          this.metadata.push(meta.data)
        }catch(e){

        }
      }
    },
  },
};
</script>