<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
  >
    <gradient-border-button @click.native="newFolderDialog = true">
      Create New NFT Vault +
    </gradient-border-button>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumb !tw-text-base">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-4" v-if="!loading">
      <button
        class="tw-bg-wapal-gray tw-px-4 tw-py-2 tw-text-black tw-rounded-sm tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-gray-300"
        v-if="folders[0].folder_name"
        v-for="folder in folders"
        :key="folder.folder_name"
        @click="folderClicked(folder._id)"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <v-icon class="!tw-text-black">mdi-folder</v-icon>
          {{ folder.folder_name }}
        </div>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <button v-bind="attrs" v-on="on">
              <v-icon class="!tw-text-black">mdi-dots-vertical</v-icon>
            </button>
          </template>
          <div
            class="tw-flex tw-flex-col tw-justify-items-start tw-items-start tw-bg-modal-gray tw-py-4"
          >
            <button
              class="tw-w-full tw-py-1 tw-px-4 tw-text-left tw-transition-all tw-duration-200 tw-ease-linear hover:tw-bg-black/60"
              @click="showRenameFolderDialog(folder)"
            >
              Rename
            </button>
            <button
              class="tw-w-full tw-py-1 tw-px-4 tw-text-left tw-transition-all tw-duration-200 tw-ease-linear hover:tw-bg-black/60"
              @click="showDeleteFolderDialog(folder)"
            >
              Delete
            </button>
          </div>
        </v-menu>
      </button>
    </div>
    <loading v-else />
    <v-dialog
      v-model="newFolderDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">
        {{ currentFolder.folder_name ? "Rename NFT Vault" : "New NFT Vault" }}
      </h2>
      <input
        v-model="newFolderName"
        class="tw-w-full tw-px-4 tw-py-2 tw-text-white tw-bg-transparent tw-rounded tw-border-solid tw-border-2 tw-border-wapal-gray focus:tw-outline-none"
        placeholder="Vault Name"
      />
      <div
        class="tw-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4"
      >
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink"
          @click="cancelCreatingNewFolder"
        >
          Cancel
        </button>
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink disabled:tw-bg-wapal-pink/80"
          :disabled="!newFolderName"
          @click="createNewFolder"
        >
          {{ currentFolder.folder_name ? "Rename" : "Create" }}
        </button>
      </div>
    </v-dialog>
    <v-dialog
      v-model="deleteFolderDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">Delete NFT Vault</h2>
      <p>Are you sure you want to Delete {{ currentFolder?.folder_name }}?</p>
      <div
        class="tw-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4"
      >
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink"
          @click="deleteFolderDialog = false"
        >
          No
        </button>
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink disabled:tw-bg-wapal-pink/80"
          @click="deleteFolder(currentFolder)"
        >
          Yes
        </button>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import Loading from "@/components/Reusable/Loading.vue";
import { defaultTheme } from "@/theme/wapaltheme";

import {
  createFolder,
  deleteFolder,
  getAllFolder,
  updateFolder,
} from "@/services/AssetsService";

export default {
  layout: "dashboard",
  components: { GradientBorderButton, Loading },
  data() {
    return {
      folders: [{ _id: "64119a4635d5e95d27526f99", folder_name: "Wapal" }],
      uploadedFolder: null,
      newFolderDialog: false,
      newFolderName: null,
      dropZoneClass: "tw-border-wapal-gray",
      uploading: false,
      uploadError: null,
      balanceNotEnoughError: {
        error: false,
        message: "",
        requiredBalance: 0,
        yourBalance: 0,
      },
      currentFolder: { folder_name: "" },
      deleteFolderDialog: false,
      breadcrumbs: [{ text: "Vaults" }],
      loading: true,
      defaultTheme,
    };
  },
  methods: {
    pushFolder(folder: any) {
      if (!this.folders[0] || !this.folders[0].folder_name) {
        this.folders = [];
      }
      this.folders.push(folder);
    },
    checkDuplicateFolder(item: any) {
      const duplicate = this.folders.find((folder: any) => {
        if (folder.folder_name.toLowerCase() === item.name.toLowerCase()) {
          return folder;
        }
      });

      return duplicate;
    },
    createNewFolder() {
      if (this.checkDuplicateFolder({ name: this.newFolderName })) {
        this.$toast.showMessage({
          message: "Please do not create duplicate Vault",
          error: true,
        });
        return;
      }

      if (!this.currentFolder.folder_name) {
        this.sendDataToCreateFolder(this.newFolderName);
      } else {
        this.renameFolder(this.currentFolder);
      }

      this.newFolderDialog = false;
    },
    folderClicked(folderName: string | null) {
      this.$router.push(`/dashboard/assets/${folderName}`);
    },
    async sendDataToCreateFolder(folderName: string) {
      this.uploading = true;

      try {
        const res = await createFolder({
          folder_name: folderName,
          user_id: this.$store.state.walletStore.user.user_id,
        });

        this.pushFolder({
          folder_name: folderName,
          _id: res.data.folderInfo._id,
        });

        this.$toast.showMessage({ message: "Vault Created Successfully" });

        this.uploading = false;
        this.uploadedFolder = null;
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
        this.uploading = false;
      }
    },
    showRenameFolderDialog(folder: any) {
      this.currentFolder = folder;
      this.newFolderDialog = true;
      this.newFolderName = folder.folder_name;
    },
    async renameFolder(folder: any) {
      try {
        if (this.checkDuplicateFolder({ name: this.newFolderName })) {
          throw new Error("Please do not create duplicate Vault");
        }
        folder.folder_name = this.newFolderName;
        await updateFolder(folder);

        this.currentFolder = { folder_name: "" };
        this.$toast.showMessage({
          message: "Vault Renamed Successfully",
        });
        this.mapFolders();
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async deleteFolder(folder: any) {
      try {
        await deleteFolder(folder);

        this.$toast.showMessage({
          message: "Vault Deleted Successfully",
        });

        this.deleteFolderDialog = false;

        this.currentFolder = { folder_name: "" };

        await this.mapFolders();
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async mapFolders() {
      const res = await getAllFolder(
        this.$store.state.walletStore.user.user_id
      );

      res.data.folderInfo.map((folder: any) => {
        this.folders.push(folder);
      });

      this.loading = false;
    },
    showDeleteFolderDialog(folder: any) {
      this.currentFolder = folder;
      this.deleteFolderDialog = true;
    },
    cancelCreatingNewFolder() {
      this.newFolderDialog = false;
      this.currentFolder = { folder_name: "" };
    },
  },
  watch: {
    newFolderDialog(showNewFolderDialog: any) {
      if (!showNewFolderDialog) {
        this.newFolderName = "";
      }
    },
  },
  mounted() {
    this.mapFolders();
  },
};
</script>
<style>
.v-breadcrumbs__item {
  font-size: 1rem !important;
}
</style>
