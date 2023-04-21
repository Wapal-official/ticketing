<template>
  <div>
    <v-card max-width="400" color="transaparent">
      <div style="border: 1px solid #ff36ab">
        <v-col align="center">
          <v-img :src="auction.nft.meta.image"></v-img>
          <v-card-title>{{ auction.nft.meta.name }}</v-card-title>
          <v-row no-gutters>
            <v-col>
              <small>Ends In</small><br />
              <small>{{ endInterval }}</small>
            </v-col>
            <v-col>
              <small>Current Bid</small><br />
              <small>{{ auction.min_bid }}</small>
            </v-col>
          </v-row>
          <ReusableThemeButton
            style="margin: 10px"
            title="Place You bid"
            @click="$router.push('/dashboard/auction/' + auction._id)"
          />
        </v-col>
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
  data(){
    return{
      endInterval:''
    }
  },
  mounted(){
    setInterval(() => {
        let seconds =
          new Date(this.auction.endAt).getTime() / 1000 -
          new Date().getTime() / 1000;
        this.endInterval = getHms(seconds);
      }, 1000);
  }
};
</script>