<template>
  <div class="tw-w-full">
    <div class="tw-w-full">
      <dashboard-collection-table
        :headers="tableHeaders"
        :items="editions"
        v-if="editions[0]"
        @rowClicked="redirectToMintPage"
      />
      <dashboard-no-collection
        message="You Do Not Have any Events"
        buttonTitle="Create Event"
        @click="$router.push('/dashboard/edition/create')"
        v-if="editions.length === 0 && !loading"
      />
    </div>

    <div class="py-16" v-if="loading">
      <reusable-loading />
    </div>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: mapOpenEditions,
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
import { getOpenEditionsOfUser } from "@/services/EditionService";
import { getCollectionDetails } from "@/services/AptosCollectionService";
export default {
  data() {
    return {
      editions: [],
      loading: true,
      page: 0,
      limit: 20,
      tableHeaders: [
        {
          text: "Event Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "264px",
          class: "default-data-table-header",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Ticket Price",
          align: "start",
          sortable: true,
          value: "price",
          width: "200px",
          class: "default-data-table-header",
          showAptIcon: true,
        },
        {
          text: "Ticket Sold",
          align: "start",
          sortable: true,
          value: "progress",
          width: "200px",
          class: "default-data-table-header",
          progress: true,
        },
      ],
      end: false,
    };
  },
  async mounted() {
    this.page = 0;
    this.loading = true;
    await this.mapOpenEditions();
    this.loading = false;
  },
  methods: {
    async mapOpenEditions() {
      this.page++;
      const user_id = this.$store.state.userStore.user.user_id;

      const res = await getOpenEditionsOfUser({
        user_id: user_id,
        page: this.page,
        limit: this.limit,
      });
      console.log("es", res);
      const editionRes = await Promise.all(
        res.map(async (edition: any) => {
          const resource = await getCollectionDetails({
            candyMachineId: edition.candyMachine.candy_id,
            candy_object: edition.candyMachine.resource_account,
          });

          edition.price = edition.candyMachine.public_sale_price;
          edition.minted = resource.minted;

          edition.progress = {
            minted: resource.minted,
            total: Infinity,
            progressPercent: 0,
            text: `${resource.minted} Sold`,
          };

          this.editions.push(edition);
        })
      );

      if (res.length === 0) {
        this.end = true;
      }
    },
    redirectToMintPage(edition: any) {
      this.$router.push(`/dashboard/collection/edit/${edition._id}`);
    },
  },
};
</script>

<!-- <template>
  <div class="tw-w-full">
    <div class="tw-w-full">
      <dashboard-collection-table
        :headers="tableHeaders"
        :items="collections"
        @rowClicked="redirectToEditPage"
        v-if="collections[0]"
      />
      <dashboard-no-collection
        message="You do not have any Live Events"
        buttonTitle="Create New Event"
        @click="$router.push('/dashboard/edition/create')"
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
            candy_object: collection.candyMachine.resource_account,
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
</script> -->
