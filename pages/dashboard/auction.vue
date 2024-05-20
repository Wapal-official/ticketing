<template>
  <div>
    <div v-if="$route.name !== 'dashboard-auction-collectionId-tokenDataId'">
      <dashboard-page-heading heading="Auction" />
      <launchpad-guide
        title="Auction Guide"
        itemLink="https://docs.wapal.io/launchpad-overall-guide/create-an-auction"
      ></launchpad-guide>
      <div
        class="tw-pt-2 tw-pb-6 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
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
    </div>
    <Nuxt />
  </div>
</template>
<script>
import LaunchpadGuide from "~/components/Dashboard/launchpadGuide.vue";

export default {
  layout: "dashboard",
  components: {
    LaunchpadGuide,
  },
  data() {
    return {
      tab: 0,
      tabs: ["My NFTs", "Under Review Auctions", "Approved Auctions"],
    };
  },
  mounted() {
    // this.$router.push("/dashboard/auction/nfts");
    if (
      this.$route.path === "/dashboard/auction" ||
      this.$route.path === "/dashboard/auction/"
    ) {
      this.$router.push("/dashboard/auction/nfts");
      this.tab = 0;
    } else if (this.$route.path === "/dashboard/auction/under-review") {
      this.tab = 1;
    } else if (this.$route.path === "/dashboard/auction/list") {
      this.tab = 2;
    } else {
      this.tab = 0;
    }
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  watch: {
    path() {
      if (
        this.$route.path === "/dashboard/auction" ||
        this.$route.path === "/dashboard/auction/"
      ) {
        this.$router.push("/dashboard/auction/nfts");
        this.tab = 0;
      } else if (this.$route.path === "/dashboard/auction/under-review") {
        this.tab = 1;
      } else if (this.$route.path === "/dashboard/auction/list") {
        this.tab = 2;
      } else {
        this.tab = 0;
      }
    },
  },
  methods: {
    tabChanged(tab) {
      this.tab = tab;
      switch (tab) {
        case 0:
          this.$router.push("/dashboard/auction/nfts");
          break;
        case 1:
          this.$router.push("/dashboard/auction/under-review");
          break;
        case 2:
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
