<template>
  <div class="tw-w-full">
    <nft-detail :collection="getCollection" />
  </div>
</template>
<script lang="ts">
import {
  getCollection,
  getCollectionByUsername,
} from "@/services/CollectionService";
export default {
  async asyncData({ params }: { params: any }) {
    const name = params.name;
    let collection;

    if (name === "monkkesanturies") {
      collection = {
        name: "Aptos Monkeys Sanctuary",
        description:
          "Sanctuaries are homes to the fighting Monkeys who stood their ground to protect their lands and fortunes.",
        image:
          "https://aggregator-cache.wapal.io/api/cache?l=https://arweave.net/z92BGaOGx-DYVTP_O8W31rAsu3PUO7uAQjzgXIoB2vc/199.png",
        twitter: "https://twitter.com/AptosMonkeys",
        website: "https://www.aptosmonkeys.club/",
        discord: "https://discord.com/invite/sFfe75BHQ3",
        mintDetails: {
          link: "https://monkeys.wapal.io",
        },
        candyMachine: {
          public_sale_time: "2023-10-31T06:23:35.216Z",
          resource_account:
            "0x39f1338e6b69c3ed2f0caa95876e898dbe4c9b272d721626d577554015d033b8",
          candy_id:
            "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0",
        },
        status: {
          sold_out: true,
        },
        username: "monkkesanturies",
      };
      return { collection };
    }
    // if (name === "loonies") {
    //   collection = {
    //     id: "loonies",
    //     name: "loonies",
    //     description: "looniess",
    //     media2:
    //       "https://arweave.net/omyEpuu-pSHoDxW6eh7WlzNTRFpndzaMcD1Nu4UvyA8/0.mp4",

    //     twitter: "https://x.com/theloonies_nft",
    //     website: "https://theloonies.xyz/",
    //     discord: "https://t.co/jYRAyXBgfj",
    //     mintDetails: {
    //       link: " ",
    //     },
    //     candyMachine: {
    //       // public_sale_time: "2024-06-14T15:00:00.000Z",
    //       resource_account:
    //         "0x39f1338e6b69c3ed2f0caa95876e898dbe4c9b272d721626d577554015d033b8",
    //       candy_id:
    //         "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0",
    //       // public_sale_price: "",
    //       whitelist_price: "4.2",
    //       whitelist_sale_time: "2023-10-31T06:23:35.216Z",
    //     },
    //     phases: [
    //       {
    //         id: "whitelist-loonies",
    //         mint_price: "4.2",
    //         mint_time: "2024-06-13T15:00:00.000Z",
    //         name: "Whitelist Sale",
    //       },
    //     ],
    //     status: {
    //       sold_out: false,
    //     },
    //     username: "loonies",
    //   };
    //   return { collection };
    // }
    try {
      const collection = await getCollectionByUsername(name);
      console.log("collec", collection);
      if (collection) {
        if (collection._id === "651295af57079307bdb1cfe9") {
          delete collection["candyMachine"].whitelist_sale_time;
          delete collection["candyMachine"].whitelist_price;

          delete collection.phases;
        }
        return { collection };
      } else {
        throw new Error("Collection Not Found by Username");
      }
    } catch {
      try {
        const collection = await getCollection(name);
        if (collection._id === "651295af57079307bdb1cfe9") {
          delete collection["candyMachine"].whitelist_sale_time;
          delete collection["candyMachine"].whitelist_price;

          delete collection.phases;
        }

        return { collection };
      } catch (error) {
        collection = null;
        return { collection };
      }
    }
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
          content: this.collection.image,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.collection.description,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-image",
          property: "og:image",
          content: this.collection.image,
        },
        { hid: "og:title", property: "og:title", content: this.getTitle },

        {
          hid: "description",
          name: "description",
          content: this.collection.description,
        },
      ],
    };
  },
  computed: {
    getTitle() {
      return this.collection.name ? "Wapal - " + this.collection.name : "Title";
    },

    getImage() {
      return this.collection.image ? this.collection.image : "";
    },
    getDescription() {
      return this.collection.description ? this.collection.description : "";
    },
    checkWhitelistSale() {
      if (this.phases.length < 2) {
        return false;
      } else {
        return true;
      }
    },
    getCollection() {
      return this.collection;
    },
  },
};
</script>
