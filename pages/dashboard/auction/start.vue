<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="5">
          <v-img
            :src="selectedNft.meta.image"
            max-width="400"
            height="400"
            class="theme-border"
          ></v-img>
        </v-col>
        <v-col cols="7">
          <v-card color="#001233" class="pa-5">
            <v-container>
              <v-col>
                <v-row no-gutters>
                  <v-btn outlined x-small color="#EA59BE" tile>Doxxed</v-btn>
                </v-row>
                <p class="text-h4 mt-2">{{ selectedNft.meta.name }}</p>
                <p>
                  {{ selectedNft.meta.description }}
                </p>
                <v-card color="#0C224B" class="mb-2 pa-4">
                  <h3 class="theme-text" style="margin:5px">Create Auction</h3>

                  <v-container class="pa-3">
                    <v-form v-model="valid" ref="form" class="pa-0">
                      <v-row no-gutters>
                        <v-col>
                          <label for="startTime">Start Time</label>
                          <date-picker
                            v-model="start_date"
                            type="datetime"
                            placeholder="Select Whitelist Sale time"
                            :rules="[validRules.required]"
                          ></date-picker>
                        </v-col>

                        <v-col>
                          <label for="startTime">End Time</label>
                          <date-picker
                            v-model="end_date"
                            type="datetime"
                            placeholder="Select Whitelist Sale time"
                          ></date-picker>
                        </v-col>
                      </v-row>
                      <v-row no-gutters style="margin-top: 10px;">
                        <v-col cols="6">
                        <label for="startTime">Min Bid Amount</label>
                        <v-text-field
                          v-model="apt"
                          outlined
                          placeholder="eg: 1.5 APT"
                          dense
                          type="number"
                          :rules="[validRules.required, validRules.positive]"
                        ></v-text-field>
                      </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <ReusableThemeButton title="Add to auction" @click="startAuction" :loading="loading" />
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card>
              </v-col>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  <script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { publicRequest } from "../../../services/fetcher";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      start_date: null,
      end_date: null,
      apt: "",
      valid: true,
      loading:false,
      validRules: {
        required: (value) => !!value || "Required.",
        positive: (v) => (v && v > 0) || "Should be more than zero.",
      },
    };
  },
  computed: {
    selectedNft() {
      return this.$store.state.auction.selectedNft;
    },
  },
  mounted() {
    if (!this.selectedNft) {
      this.$router.push("/dashboard/auction");
    }
  },
  methods: {
    async startAuction() {
      if (this.$refs.form.validate()) {
        this.loading=true
        let auction = await this.$store.dispatch("walletStore/createAuction", {
          start_date: this.start_date,
          end_date: this.end_date,
          min_bid: this.apt,
        });
        console.log("auc:", auction.cur_auction_id);
        publicRequest
          .post("/api/auction", {
            nft: this.selectedNft,
            startAt: this.start_date,
            endAt: this.end_date,
            min_bid: this.apt,
            id: auction.cur_auction_id,
          })
          .then((res) => {
            this.$toast.showMessage({
              message: "Auction Created Successfully",
              error: false,
            });
            this.loading=false
            this.$router.push("/dashboard/auction/list");
          })
          .catch((err) => console.log(err.response));
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