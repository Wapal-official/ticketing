<template>
  <div>
    <v-card :height="getHeight" color="transparent">
      <v-container>
        <v-row v-if="auction">
          <v-col cols="12" lg="5">
            <v-img
              :src="auction.nft.meta.image"
              max-width="400"
              height="400"
              class="theme-border"
            ></v-img>
            <p class="text-h6 theme-text">Auction end in {{ endInterval }}</p>
          </v-col>
          <v-col cols="12" lg="7">
            <v-card color="#001233">
              <v-col>
                <v-row no-gutters>
                  <v-btn outlined x-small color="#EA59BE" tile>Doxxed</v-btn>
                </v-row>
                <p class="text-h4 mt-2">{{ auction.nft.name }}</p>
                <p>
                  {{ auction.nft.description }}
                </p>
                <v-card color="#0C224B">
                  <v-row no-gutters style="padding: 15px 10px">
                    <div>
                      <v-list-item-subtitle
                        ><small>Current Bid</small></v-list-item-subtitle
                      >
                      <p>{{ current_bid }} APT</p>
                    </div>
                    <v-spacer></v-spacer>
                    <v-form v-model="valid" ref="form">
                      <v-text-field
                        v-model="bid"
                        :rules="[validRules.required]"
                        :error="error"
                        :error-messages="errMsg"
                        dense
                        type="number"
                        outlined
                      ></v-text-field>
                    </v-form>
                    <v-spacer></v-spacer>
                    <ReusableThemeButton
                      title="Place your bid"
                      @click="placeBid"
                      :loading="loading"
                    />
                  </v-row>
                </v-card>
                <p class="mb-0 mt-5 theme-text">Last Bid</p>
                <v-list
                  v-if="auction.biddings.length > 0"
                  dense
                  style="background-color: transparent"
                >
                  <v-list-item v-for="(item, i) in auction.biddings" :key="i">
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >{{
                          item.user_id.wallet_address.slice(0, 5) +
                          "..." +
                          item.user_id.wallet_address.slice(-5, -1)
                        }}
                        bid for {{ item.bid }} APT</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        ><small>{{
                          $moment(item.time).fromNow()
                        }}</small></v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <hr v-if="i < auction.biddings.length - 1" />
                  </v-list-item>
                </v-list>
                <p v-else class="text-center">No biddings yet</p>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <ReusableLoading />
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

    
<script>
import { publicRequest } from "../../services/fetcher";
import { getCurrentBid, getHms } from "../../services/AuctionService";
export default {
  data() {
    return {
      valid: true,
      auction: "",
      errMsg: "",
      current_bid: "",
      error: false,
      loading: false,
      validRules: {
        required: (value) => !!value || "Required.",
      },
      bid: 0,
      endInterval: 0,
    };
  },
  watch: {
    bid() {
      this.error = false;
      this.errMsg = "";
    },
  },
  computed: {
    getHeight() {
      if (process.client) {
        return window.innerHeight;
      }
    },
  },
  mounted() {
    this.getAuctionDetails();
  },
  methods: {
    getAuctionDetails() {
      publicRequest
        .get(`/api/auction/${this.$route.params.id}`)
        .then((res) => {
          let response = res.data.auction[0];
          let rev = response.biddings.reverse();
          response.biddings = rev;
          this.auction = response;
          this.current_bid = getCurrentBid(this.auction);
          this.getInterval();
        })
        .catch((err) => console.log(err.response));
    },
    getInterval() {
      setInterval(() => {
        let seconds =
          new Date(this.auction.endAt).getTime() / 1000 -
          new Date().getTime() / 1000;
        this.endInterval = getHms(seconds);
      }, 1000);
    },
    async placeBid() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let cur_bid = getCurrentBid(this.auction);
        if (this.bid <= cur_bid) {
          this.error = true;
          this.errMsg = "Should be more than current bid";
          this.loading = false;
          return;
        }
        let resource = await this.$store.dispatch("walletStore/placeBid", {
          detail: this.auction,
          offer_price: this.bid,
        });
        if (!resource) {
          this.loading = false;
          return;
        }
        publicRequest
          .post("/api/auction/bid", {
            bid: this.bid,
            auction_id: this.auction._id,
          })
          .then((res) => {
            this.auction.biddings=res.data.newBid.biddings
            this.loading = false;
            this.$refs.form.reset();
          });
      }
    },
  },
};
</script>

    
<style>
.theme-border {
  border: 2px solid rgb(250, 8, 222);
}

.theme-text {
  color: #ff36ab;
}
</style>
