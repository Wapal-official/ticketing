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
        message="You Do Not Have any NFTs of this type"
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
          text: "Minted",
          align: "start",
          sortable: true,
          value: "minted",
          width: "200px",
          class: "default-data-table-header",
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
