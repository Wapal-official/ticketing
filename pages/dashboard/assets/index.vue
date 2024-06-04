<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <dashboard-page-heading heading="Assets" />
      <button-primary
        :bordered="true"
        title="Create NFT Vault"
        @click="newFolderDialog = true"
      >
        <template #prepend-icon>
          <i class="bx bx-plus tw-text-xl tw-pr-2"></i>
        </template>
      </button-primary>
    </div>
    <v-breadcrumbs
      :items="breadcrumbs"
      class="breadcrumb !tw-text-base !tw-font-medium"
    >
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-4" v-if="!loading">
      <button
        class="tw-bg-dark-4 tw-px-4 tw-py-3 tw-text-white tw-rounded tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-dark-5"
        v-if="folders[0].folder_name"
        v-for="(folder, index) in folders"
        :key="folder.folder_name"
        @click="folderClicked(folder._id)"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-font-medium"
        >
          <i class="bx bxs-folder tw-text-2xl"></i>
          <span>{{ folder.folder_name }}</span>
        </div>
        <v-menu v-if="index !== 0">
          <template v-slot:activator="{ on, attrs }">
            <button
              v-bind="attrs"
              v-on="on"
              class="tw-flex tw-flex-row tw-items-center tw-justify-center"
            >
              <i class="bx bx-dots-vertical-rounded tw-text-xl"></i>
            </button>
          </template>
          <div
            class="tw-flex tw-flex-col tw-justify-items-start tw-items-start tw-bg-dark-7 tw-py-4 tw-min-w-[100px]"
          >
            <button
              class="tw-w-full tw-py-2 tw-px-4 tw-text-left tw-transition-all tw-duration-200 tw-ease-linear hover:tw-bg-black/60"
              @click="showRenameFolderDialog(folder)"
            >
              Rename
            </button>
            <button
              class="tw-w-full tw-py-2 tw-px-4 tw-text-left tw-transition-all tw-duration-200 tw-ease-linear hover:tw-bg-black/60"
              @click="showDeleteFolderDialog(folder)"
            >
              Delete
            </button>
          </div>
        </v-menu>
      </button>
    </div>
    <reusable-loading v-else />
    <v-dialog
      v-model="newFolderDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-dark-7  tw-text-dark-0 tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">
        {{ currentFolder.folder_name ? "Rename NFT Vault" : "New NFT Vault" }}
      </h2>
      <input
        v-model="newFolderName"
        class="tw-w-full tw-px-4 tw-py-2 tw-dark-0 tw-bg-transparent tw-rounded tw-border-solid tw-border-2 tw-border-wapal-gray focus:tw-outline-none"
        placeholder="Vault Name"
        @input="validateVaultName"
      />
      <div class="tw-text-red-600 tw-text-sm" v-if="vaultNameError">
        Please remove spaces and special characters from vault name
      </div>
      <div
        class="tw-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4"
      >
        <button-primary
          title="Cancel"
          :bordered="true"
          @click="cancelCreatingNewFolder"
        />
        <button-primary
          :disabled="!newFolderName || vaultNameError"
          :title="currentFolder.folder_name ? 'Rename' : 'Create'"
          @click="createNewFolder"
        />
      </div>
    </v-dialog>
    <v-dialog
      v-model="deleteFolderDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-dark-7 tw-text-dark-0 tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">Delete NFT Vault</h2>
      <p>Are you sure you want to Delete {{ currentFolder?.folder_name }}?</p>
      <div
        class="tw-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4"
      >
        <button-primary
          title="No"
          :bordered="true"
          @click="deleteFolderDialog = false"
        />
        <button-primary title="Yes" @click="deleteFolder(currentFolder)" />
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";

import {
  createFolder,
  deleteFolder,
  getAllFolder,
  updateFolder,
} from "@/services/AssetsService";

export default {
  layout: "dashboard",
  data() {
    return {
      folders: [
        {
          _id: "",
          folder_name: "",
        },
      ],
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
      vaultNameError: false,
      defaultTheme,
    };
  },
  computed: {
    getFolderId() {
      return process.env.baseURL?.includes("staging")
        ? "642aeb3da50447f2631f38f3"
        : "64e88318505087cecc568176";
    },
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
      this.vaultNameError = false;
    },
    folderClicked(folderName: string | null) {
      this.$router.push(`/dashboard/assets/${folderName}`);
    },
    async sendDataToCreateFolder(folderName: string) {
      this.uploading = true;

      try {
        const res = await createFolder({
          folder_name: folderName,
          user_id: this.$store.state.userStore.user.user_id,
        });

        this.pushFolder({
          folder_name: folderName,
          _id: res.data.folderInfo._id,
        });

        this.$toast.showMessage({ message: "Vault Created Successfully" });

        this.uploading = false;
        this.uploadedFolder = null;
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.msg) {
          this.$toast.showMessage({
            message: error.response.data.msg,
            error: true,
          });
        } else {
          this.$toast.showMessage({ message: error, error: true });
        }

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
      this.folders = [];

      const res = await getAllFolder(this.$store.state.userStore.user.user_id);
      this.folders.push({ _id: this.getFolderId, folder_name: "sample" });

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
    validateVaultName() {
      const vaultNameRegex = /[^a-zA-Z0-9_]/g;
      if (!vaultNameRegex.test(this.newFolderName)) {
        this.vaultNameError = false;
        return;
      }

      this.vaultNameError = true;
    },
  },
  watch: {
    newFolderDialog(showNewFolderDialog: any) {
      if (!showNewFolderDialog) {
        this.newFolderName = "";
        this.vaultNameError = false;
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
