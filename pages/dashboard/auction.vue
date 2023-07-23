<template>
  <div>
    <div v-if="$route.fullPath !== '/dashboard/auction/start'">
      <dashboard-page-heading heading="Auction" />
      <div
        class="tw-py-6 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
      >
        <div class="tw-w-full">
          <tab-bordered :tabs="tabs" @tabChanged="tabChanged" :tab="tab" />
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start md:tw-justify-end"
        >
          <button-primary
            :bordered="true"
            title="Mint and Add to Auction"
            @click="$router.push('/dashboard/mint-auction')"
          >
            <template #prepend-icon>
              <i class="bx bx-plus tw-text-xl tw-text-white tw-pr-2"></i>
            </template>
          </button-primary>
        </div>
      </div>
      <!-- <v-row no-gutters>
        <ReusableThemeButton class="auction1" @click="$router.push('/dashboard/mint-auction')" small
          title="Mint And Add To Auction" />
      </v-row>
      <v-tabs background-color="transparent" v-model="tab" id="explore-tab" active-class="!tw-text-wapal-pink">
        <v-tab @click="$router.push('/dashboard/auction/nfts'), (tab = 0)" :ripple="false"
          class="!tw-text-white auction2">My Nfts</v-tab>
        <v-tab @click="$router.push('/dashboard/auction/list'), (tab = 1)" :ripple="false"
          class="!tw-text-white auction3">My Auctions</v-tab>
      </v-tabs> -->
    </div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      tab: 0,
      tabs: ["My NFTs", "My Auction"],
    };
  },
  mounted() {
    this.$router.push("/dashboard/auction/nfts");
  },
  methods: {
    tabChanged(tab) {
      this.tab = tab;
      switch (tab) {
        case 0:
          this.$router.push("/dashboard/auction/nfts");
          break;
        case 1:
          this.$router.push("/dashboard/auction/list");
          break;
        default:
          this.$router.push("/dashboard/auction/nfts");
          break;
      }
    },
  },
};
</script>
