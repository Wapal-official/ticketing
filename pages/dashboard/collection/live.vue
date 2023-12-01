<template>
  <div class="tw-w-full">
    <div class="tw-w-full">
      <dashboard-collection-table
        :headers="tableHeaders"
        :items="collections"
        @rowClicked="redirectToEditPage"
        v-if="collections[0]"
      />
      <dashboard-no-collection
        message="You do not have any Live Collection"
        buttonTitle="Create Collection"
        @click="$router.push('/dashboard/create-collection')"
        v-if="collections.length === 0 && !loading"
      />
    </div>

    <div class="py-16" v-if="loading">
      <reusable-loading />
    </div>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: mapCollections,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      class="!tw-shadow-none"
    >
    </v-card>
  </div>
</template>
<script lang="ts">
import { getApprovedCollectionsOfUser } from "@/services/CollectionService";
import { getCollectionDetails } from "@/services/AptosCollectionService";

export default {
  data() {
    return {
      collections: [{ _id: 0 }],
      loading: true,
      end: false,
      page: 0,
      tableHeaders: [
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
          text: "Price",
          align: "start",
          sortable: true,
          value: "price",
          width: "200px",
          class: "default-data-table-header",
          showAptIcon: true,
        },
        {
          text: "Item",
          align: "start",
          sortable: true,
          value: "supply",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          text: "Minted",
          align: "start",
          sortable: true,
          value: "progress",
          width: "200px",
          class: "default-data-table-header",
          progress: true,
        },
      ],
    };
  },
  methods: {
    async mapCollections() {
      this.loading = true;
      this.page++;

      const collections = await getApprovedCollectionsOfUser(
        this.$store.state.userStore.user.user_id,
        this.page
      );

      const mappedCollections = await Promise.all(
        collections.map(async (collection: any) => {
          //Get Collection Detail
          const resource = await getCollectionDetails({
            candyMachineId: collection.candyMachine.candy_id,
            candyObject: collection.candyMachine.resource_account,
          });

          //Store minted and total supply of collection and calculate minted percent
          const collectionResource = {
            minted: resource.minted,
            total: resource.total_supply,
            progressPercent: Math.floor(
              (resource.minted / resource.total_supply) * 100
            ),
            text: `${resource.minted}/${resource.total_supply} Minted`,
          };

          collection.progress = collectionResource;

          collection.price = this.getPrice(collection);

          this.collections.push(collection);
        })
      );

      if (collections.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
    getPrice(collection: any) {
      const whitelistDate = new Date(
        collection.candyMachine.whitelist_sale_time
      );
      const publicSaleDate = new Date(collection.candyMachine.public_sale_time);

      if (new Date() > publicSaleDate) {
        return collection.candyMachine.public_sale_price;
      }

      if (new Date() > whitelistDate) {
        return collection.candyMachine.whitelist_price;
      }

      return collection.candyMachine.public_sale_price;
    },
    redirectToEditPage(collection: any) {
      this.$router.push(`/dashboard/collection/edit/${collection._id}`);
    },
  },
  created() {
    this.collections = [];
  },
};
</script>
