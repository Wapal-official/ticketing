<template>
  <div>
    <v-card max-width="350" color="transaparent">
      <div style="border: 1px solid #ff36ab">
        <v-img :src="auction.nft.meta.image"></v-img>
        <v-card-title style="padding-bottom: 0px">{{
          auction.nft.meta.name
        }}</v-card-title>
        <v-container>
          <v-row no-gutters class="px-5">
            <v-col cols="7">
              <small>Ends In</small><br />
              <small class="theme-color">{{ endInterval }}</small>
            </v-col>
            <v-col>
              <small>Current Bid</small><br />
              <small class="theme-color">{{ auction.min_bid }}</small>
            </v-col>
          </v-row>
        </v-container>
        <v-row justify="center" no-gutters>
          <ReusableThemeButton
            style="margin: 10px"
            title="Place You bid"
            @click="$router.push('/auctions/' + auction._id)"
          />
        </v-row>
      </div>
    </v-card>
  </div>
</template>
<script>
import { getHms } from "../../services/AuctionService";
export default {
  props: {
    auction: {
      Type: Object,
      require: true,
    },
  },
  data() {
    return {
      endInterval: "",
    };
  },
  mounted() {
    setInterval(() => {
      let seconds =
        new Date(this.auction.endAt).getTime() / 1000 -
        new Date().getTime() / 1000;
      this.endInterval = getHms(seconds);
    }, 1000);
  },
};
</script>
<style>
.theme-color {
  color: #ff36ab;
}
</style>