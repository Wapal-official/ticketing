<template>
  <div class="tw-w-full">
    <nft-detail :collection="getCollection" />
  </div>
</template>
<script lang="ts">
import { getCollectionByUsername } from "@/services/CollectionService";
export default {
  async asyncData({ params }: { params: any }) {
    const name = params.name;
    let collection;

    try {
      collection = await getCollectionByUsername(name);

      return { collection };
    } catch {
      collection = null;
      return { collection };
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
