<template>
  <div>
    <AuctionDetail />
  </div>
</template>
<script>
import { publicRequest } from "@/services/fetcher";
export default {
  async asyncData({ params, error }) {
    const res = await publicRequest.get(`/api/auction/${params.id}`);
    const auction = res.data.auction;
    if (res.data.auction.length === 0) {
      error({ statusCode: 404, message: "Auction not found" });
    }
    return { auction };
  },
  head() {
    return {
      title: this.getTitle,
      meta: [
        { hid: "twitter:title", name: "twitter:title", content: this.getTitle },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:title", name: "twitter:title", content: this.getTitle },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.auction.nft.meta.image,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.auction.nft.meta.description,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-image",
          property: "og:image",
          content: this.auction.nft.meta.image,
        },
        { hid: "og:title", property: "og:title", content: this.getTitle },
        {
          hid: "description",
          name: "description",
          content: this.auction.nft.meta.description,
        },
      ],
    };
  },
  computed: {
    getTitle() {
      return this.auction ? "Auction - " + this.auction.nft.meta.name : "Wapal";
    },
  },
};
</script>
