<template>
  <div class="tw-w-full">
    <div class="tw-w-full">
      <dashboard-collection-table
        :headers="tableHeaders"
        :items="drafts"
        @rowClicked="redirectToEditPage"
        v-if="drafts[0]"
      />
      <dashboard-no-collection
        message="You do not have any Drafts"
        buttonTitle="Create Draft"
        @click="$router.push('/dashboard/edition/create')"
        v-if="drafts.length === 0 && !loading"
      />
    </div>

    <div class="py-16" v-if="loading">
      <reusable-loading />
    </div>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: mapDrafts,
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
import { getDraftsOfUser } from "@/services/CollectionService";

export default {
  data() {
    return {
      drafts: [{ _id: 0 }],
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
    async mapDrafts() {
      this.loading = true;
      this.page++;

      const drafts = await getDraftsOfUser(this.page);

      const mappedCollections = await Promise.all(
        drafts.map(async (draft: any) => {
          //Set minted to 0 and
          const collectionResource = {
            minted: 0,
            total: draft.data.supply,
            progressPercent: Math.floor((0 / draft.data.supply) * 100),
            text: `0/${draft.data.supply} Minted`,
          };

          draft.data.progress = collectionResource;

          draft.data.price = this.getPrice(draft.data);

          draft.data._id = draft._id;

          this.drafts.push(draft.data);
        })
      );

      if (drafts.length === 0) {
        this.end = true;
      }

      this.loading = false;
    },
    getPrice(draft: any) {
      if (!draft.whitelist_price || !draft.public_sale_price) {
        return "TBD";
      }

      const whitelistDate = new Date(draft.whitelist_sale_time);
      const publicSaleDate = new Date(draft.public_sale_time);

      if (new Date() > publicSaleDate) {
        return draft.public_sale_price;
      }

      if (new Date() > whitelistDate) {
        return draft.whitelist_price;
      }

      return draft.public_sale_price;
    },
    redirectToEditPage(draft: any) {
      this.$router.push(`/dashboard/draft/${draft._id}`);
    },
  },
  created() {
    this.drafts = [];
  },
};
</script>
