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
