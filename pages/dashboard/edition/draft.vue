<template>
  <div class="tw-w-full">
    <div class="tw-w-full">
      <dashboard-collection-table
        :headers="tableHeaders"
        :items="drafts"
        @rowClicked="redirectToEditPage"
        @remove-item="handleDeleteDraft"
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
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Delete Draft</v-card-title>
        <v-card-text>
          Are you sure you want to delete this draft?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn 
            color="error" 
            text 
            @click="confirmDelete"
            :loading="deleteLoading"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { getDraftsOfUser, deleteDraft } from "@/services/CollectionService";
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      drafts: [{ _id: 0 }],
      loading: true,
      end: false,
      page: 0,
      showDeleteDialog: false,
      deleteLoading: false,
      draftToDelete: null,
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
          const collectionResource = {
            minted: 0,
            total: draft.data.supply,
            progressPercent: Math.floor((0 / draft.data.supply) * 100),
            text: `0 sold`,
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

    handleDeleteDraft(index: any) {
      this.draftToDelete = this.drafts[index];
      this.showDeleteDialog = true;
    },

    async confirmDelete() {
      try {
        this.deleteLoading = true;
        await deleteDraft(this.draftToDelete._id);
        
        // Remove the draft from the local array
        const index = this.drafts.findIndex((draft: any) => draft._id === this.draftToDelete._id);
        if (index !== -1) {
          this.drafts.splice(index, 1);
        }
        
        // Use your custom toast
        this.$toast.showMessage({
          message: 'Draft deleted successfully',
          error: false,
        });
      } catch (error) {
        console.error('Error deleting draft:', error);
        // Show error toast
        this.$toast.showMessage({
          message: 'Failed to delete draft',
          error: true,
        });
      } finally {
        this.deleteLoading = false;
        this.showDeleteDialog = false;
        this.draftToDelete = null;
      }
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
});
</script>
<style scoped>
.default-button {
  color: black; /* Default button color */
}

/* Additional styles if needed */
</style>