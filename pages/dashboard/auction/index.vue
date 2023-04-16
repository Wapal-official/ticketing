<template>
  <div>
    <v-tabs background-color="transparent">
      <v-tab @click="tab = 1">My Nfts</v-tab>
      <v-tab @click="tab = 2">My Auctions</v-tab>
    </v-tabs>
    <AuctionNftList v-if="tab==1" />
    <AuctionMyAuction v-else />
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      tab: 1,
    };
  },
};
</script>
<style>
.co {
  color: rgb(255, 54, 171);
}
</style>