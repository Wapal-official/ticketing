<template>
  <div class="tw-py-4">
    <v-row v-if="auctions.length > 0">
      <v-col v-for="(item, i) in auctions" :key="i" cols="12" lg="3" md="6">
        <v-card
          tile
          @click="$router.push('/dashboard/auction/' + item._id)"
          color="transparent"
        >
          <v-img :src="item.nft.meta.image"></v-img>
          <div
            class="tw-w-full tw-py-4 tw-text-center tw-border-l tw-border-r tw-border-b tw-border-wapal-pink"
          >
            <h4>{{ item.nft.meta.name }}</h4>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters v-else class="py-10" justify="center">
      <p v-if="end">No auctions</p>
      <ReusableLoading v-else />
    </v-row>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: getAuctions,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
    >
    </v-card>
  </div>
</template>
<script>
import { publicRequest } from "../../../services/fetcher";
export default {
  data() {
    return {
      end: false,
      auctions: [],
      page: 0,
      perPage: 10,
    };
  },
  mounted() {
    this.getAuctions();
  },
  methods: {
    getAuctions() {
      this.page++;
      publicRequest
        .get("/api/auction/user", {
          params: {
            page: this.page,
            perPage: this.perPage,
          },
        })
        .then((res) => {
          let resp = res.data.auctions;
          if (resp.length > 0) {
            for (var i = 0; i < resp.length; i++) {
              this.auctions.push(resp[i]);
            }
          } else {
            this.end = true;
          }
        })
        .catch((err) => console.log(err.response));
    },
  },
};
</script>
