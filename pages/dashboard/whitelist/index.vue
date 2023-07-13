<template>
  <div class="tw-w-full">
    <dashboard-page-heading heading="Whitelist" class="tw-pb-8" />
    <tab-bordered :tabs="tabs" :tab="tab" @tabChanged="tabChanged" />
    <v-tabs-items
      v-model="tab"
      v-if="!loading"
      class="!tw-bg-transparent !tw-py-8"
    >
      <v-tab-item>
        <dashboard-collection-table
          :headers="collectionHeaders"
          :items="collections"
          @rowClicked="redirectToWhitelistPage"
        />
      </v-tab-item>
      <v-tab-item>
        <dashboard-collection-table
          :headers="whitelistHeaders"
          :items="whitelists"
          @rowClicked="redirectToWhitelistPage"
        />
      </v-tab-item>
    </v-tabs-items>
    <reusable-loading v-else />
  </div>
</template>
<script lang="ts">
import {
  getCollection,
  getCollectionsOfUser,
} from "@/services/CollectionService";
import {
  getWhitelistById,
  getWhitelistEntryById,
  getWhitelistOfUser,
} from "@/services/WhitelistService";
import { getCollectionDetails } from "@/services/AptosCollectionService";
export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
      collections: [{ _id: null }],
      whitelists: [{ _id: null }],
      loading: true,
      tabs: ["All Collection", "Whitelist Collection"],
      tab: 0,
      collectionHeaders: [
        {
          text: "Collection Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "264px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Price",
          align: "start",
          sortable: true,
          value: "price",
          width: "200px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
          showAptIcon: true,
        },
        {
          text: "Item",
          align: "start",
          sortable: true,
          value: "supply",
          width: "200px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
        },
        {
          text: "Minted",
          align: "start",
          sortable: true,
          value: "progress",
          width: "200px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
          progress: true,
        },
      ],
      whitelistHeaders: [
        {
          text: "Collection Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "264px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Price",
          align: "start",
          sortable: true,
          value: "price",
          width: "200px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
          showAptIcon: true,
        },
        {
          text: "Item",
          align: "start",
          sortable: true,
          value: "supply",
          width: "200px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
        },
        {
          text: "Spots",
          align: "start",
          sortable: true,
          value: "progress",
          width: "200px",
          class:
            "!tw-text-dark-2 !tw-border-b-dark-6 !tw-text-base tw-uppercase tw-font-bold tw-pb-8",
          progress: true,
        },
      ],
      fetchedCollections: false,
      fetchedWhitelists: false,
    };
  },
  computed: {},
  methods: {
    tabChanged(tab: number) {
      this.tab = tab;
      switch (tab) {
        case 0:
          if (!this.fetchedCollections) {
            this.mapCollections();
          }
          break;
        case 1:
          if (!this.fetchedWhitelists) {
            this.mapWhitelists();
          }
          break;
      }
    },
    getPrice(collection: any) {
      if (
        collection.candyMachine.whitelist_sale_time &&
        collection.candyMachine.public_sale_time
      ) {
        const whitelistDate = new Date(
          collection.candyMachine.whitelist_sale_time
        );
        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        );

        if (new Date() > publicSaleDate) {
          return collection.candyMachine.public_sale_price;
        }

        if (new Date() > whitelistDate) {
          return collection.candyMachine.whitelist_price;
        }
      }

      return collection.candyMachine.public_sale_price;
    },
    async mapCollections() {
      this.loading = true;
      const collectionRes = await getCollectionsOfUser(
        this.$store.state.userStore.user.user_id
      );

      const whitelistRes = await getWhitelistOfUser(
        this.$store.state.userStore.user.user_id
      );

      let collections = collectionRes.data.data.filter((collection: any) => {
        const whitelistSaleDate = new Date(
          collection.candyMachine.whitelist_sale_time
        ).getTime();

        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        ).getTime();

        if (publicSaleDate - whitelistSaleDate !== 1000) {
          return collection;
        }
      });

      const whitelists = whitelistRes.data.whitelists;

      collections = collections.filter((collection: any) => {
        try {
          this.whitelists.map((whitelist: any) => {
            if (whitelist.collection_id === collection._id) {
              throw new Error("Collection In Whitelist");
            }
          });
          return collection;
        } catch (error) {}
      });

      const mappedCollections = await Promise.all(
        collections.map(async (collection: any) => {
          //Get Collection Detail
          const resource = await getCollectionDetails(
            collection.candyMachine.candy_id,
            collection.candyMachine.resource_account
          );

          //Store minted and total supply of collection and calculate minted percent
          const collectionResource = {
            minted: resource.minted,
            total: resource.total_supply,
            progressPercent: Math.floor(
              (resource.minted / resource.total_supply) * 100
            ),
            text: `${resource.minted}/${resource.total_supply} Minted`,
          };

          collection.price = this.getPrice(collection);

          collection.progress = collectionResource;

          this.collections.push(collection);
        })
      );

      this.loading = false;
      this.fetchedCollections = true;
    },
    async mapWhitelists() {
      this.loading = true;
      const whitelistRes = await getWhitelistOfUser(
        this.$store.state.userStore.user.user_id
      );

      const whitelists = whitelistRes.data.whitelists;

      const mappedWhitelists = await Promise.all(
        whitelists.map(async (whitelist: any) => {
          //Get Whitelist Detail
          const { data } = await getWhitelistEntryById(
            whitelist.collection_id,
            1,
            1,
            "whitelist"
          );

          const collectionRes = await getCollection(whitelist.collection_id);

          whitelist.name = collectionRes.collection[0].name;
          whitelist.image = collectionRes.collection[0].image;
          whitelist.supply = collectionRes.collection[0].supply;
          whitelist.username = collectionRes.collection[0].username;

          //Store minted and total supply of collection and calculate minted percent
          const collectionResource = {
            total: data.spotsCount,
            occupied: whitelist.whitelist_spots,
            progressPercent: Math.floor(
              (data.spotsCount / whitelist.whitelist_spots) * 100
            ),
            text: `${data.spotsCount}/${whitelist.whitelist_spots} Spots Taken`,
          };

          whitelist.price = this.getPrice(collectionRes.collection[0]);

          whitelist.progress = collectionResource;

          this.whitelists.push(whitelist);
        })
      );
      this.loading = false;
      this.fetchedWhitelists = true;
    },
    redirectToWhitelistPage(whitelist: any) {
      this.$router.push(`/dashboard/whitelist/${whitelist.username}`);
    },
  },
  async mounted() {
    this.collections = [];
    this.whitelists = [];

    this.loading = false;
    await this.mapCollections();
  },
};
</script>
