<template>
  <div>
    <v-row no-gutters>
      <ReusableThemeButton
        @click="$router.push('/dashboard/mint-auction')"
        small
        title="Mint And Add To Auction"
      />
    </v-row>
    <v-tabs background-color="transparent" v-model="tab">
      <v-tab @click="$router.push('/dashboard/auction/nfts'), (tab = 0)"
        >My Nfts</v-tab
      >
      <v-tab @click="$router.push('/dashboard/auction/list'), (tab = 1)"
        >My Auctions</v-tab
      >
    </v-tabs>
    <Nuxt />
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      tab: null,
    };
  },
  mounted() {
    this.$router.push("/dashboard/auction/nfts");
  },
};
</script>
