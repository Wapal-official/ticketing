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
import sanctuary from "@/assets/img/199.png";
export default {
  async asyncData({ params }: { params: any }) {
    const name = params.name;
    let collection;

    if (name === "aptos-monkeys-sanctuary") {
      collection = {
        name: "Aptos Monkeys Sanctuary",
        description:
          "Sanctuaries are homes to the fighting Monkeys who stood their ground to protect their lands and fortunes.",
        image: sanctuary,
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
        username: "aptos-monkeys-sanctuary",
      };
      return { collection };
    } else if (name === "lions-mint") {
      collection = {
        name: "Lions Mint",
        description: "Lions Mint",
        image:
          "https://storage.googleapis.com/wapal_staging_images/1698574323228_6.png",
        twitter: "https://twitter.com",
        discord: "https://discord.com",
        mintDetails: {
          whitelist_mint_function: "mint_lions",
          public_mint_function: "public_mint_lions",
          module_name: "lions",
          check_whitelist_function: "count",
          many: false,
          all_mint_at_same_time: true,
        },
        candyMachine: {
          public_sale_time: "2023-10-31T06:23:35.216Z",
          public_sale_price: "0.0000001",
          whitelist_price: 0,
          resource_account:
            "0x2ae83e98e54f39eaa6ad6040157189f038495c1a03722aeb2aae3abd4419ea1c",
          candy_id:
            "0x826bfc7488ad2b0b9e31c9067f83811a46e6c427f1cff9703cf96842bf93ebfe",
        },
        status: {
          sold_out: false,
        },
        username: "lions-mint",
      };
      return { collection };
    }
    try {
      const res = await getCollectionByUsername(name);
      collection = res.data.collection[0];

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
        const res = await getCollection(name);
        collection = res.collection[0];

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
