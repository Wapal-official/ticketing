<template>
  <div class="tw-w-full" v-if="!loading">
    <whitelist-detail :collection="collection" :whitelist="whitelist" />
    <whitelist-participate-box :whitelist="whitelist" />
  </div>
  <loading-collection v-else />
</template>
<script lang="ts">
import { getWhitelistByUsername } from "@/services/WhitelistService";

import { getCollectionByUsername } from "@/services/CollectionService";

export default {
  components: {},
  async asyncData({ redirect, params }: { redirect: any; params: any }) {
    try {
      const res = await getCollectionByUsername(params.name);

      const collection = res.data.collection[0];

      return { collection };
    } catch {
      redirect("/");
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
  data() {
    return {
      loading: true,
      collection: {
        candyMachine: {
          public_sale_price: null,
          public_sale_time: "",
          resource_account: null,
          whitelist_price: null,
          whitelist_sale_time: "",
        },
        _id: null,
        name: "",
        description: null,
        image: "",
        twitter: "",
        discord: "",
        isVerified: false,
      },
      whitelist: {
        whitelist_start: "",
        discord_roles: [{ name: "", id: "" }],
        whitelist_spots: "",
        discord_server_name: "",
        discord_server_url: "",
        twitter: "",
      },
    };
  },
  methods: {
    enableVerifyAndEnterButton() {
      setTimeout(() => {
        this.disableVerifyAndEnter = false;
      }, 3000);
    },
  },
  computed: {
    getTitle() {
      return this.collection.name
        ? "Whitelist - " + this.collection.name
        : "Title";
    },

    getImage() {
      return this.collection.image ? this.collection.image : "";
    },
    getDescription() {
      return this.collection.description ? this.collection.description : "";
    },
  },
  async mounted() {
    const res = await getWhitelistByUsername(this.$route.params.name);

    this.whitelist = res.data.whitelist;

    this.loading = false;
  },
};
</script>
