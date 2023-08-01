<template>
  <div class="tw-py-4">
    <div v-if="auctions.length > 0" justify="start">
      <dashboard-collection-table
        :headers="headers"
        :items="auctions"
        @rowClicked="redirectToAuctionPage"
      />
    </div>
    <v-row no-gutters v-else class="py-10" justify="center">
      <dashboard-no-collection
        message="You Do Not Have Any Auctions"
        buttonTitle="Create Auction"
        @click="$router.push('/dashboard/auction/nfts')"
        v-if="end"
      />
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
      class="!tw-shadow-none"
    >
    </v-card>
  </div>
</template>
<script>
import { publicRequest } from "@/services/fetcher";
export default {
  data() {
    return {
      end: false,
      auctions: [],
      page: 0,
      perPage: 10,
      headers: [
        {
          text: "Collection Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "264px",
          class: "default-data-table-header",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Social Link",
          align: "start",
          sortable: true,
          value: "socialLink",
          width: "200px",
          class: "default-data-table-header",
          showSocialLink: true,
        },
        {
          text: "Highest Bid",
          align: "start",
          sortable: true,
          value: "highestBid",
          width: "200px",
          class: "default-data-table-header",
          showAptIcon: true,
        },
      ],
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
            resp.map((auction) => {
              auction.name = auction.nft.meta.name;
              auction.image = auction.nft.meta.image;

              auction.highestBid = auction.biddings
                ? auction.biddings[auction.bidding.length - 1]
                : auction.min_bid;

              this.auctions.push(auction);
            });
          } else {
            this.end = true;
          }
        })
        .catch((err) => console.log(err.response));
    },
    redirectToAuctionPage(item) {
      this.$router.push(`/auctions/${item.auction_name}`);
    },
  },
};
</script>
