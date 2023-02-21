<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
  >
    <button class="dashboard-gradient-button" @click="newFolderDialog = true">
      Create New Folder +
    </button>
    <assets-bread-crumbs />
    <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-4">
      <button
        class="tw-bg-wapal-gray tw-px-4 tw-py-2 tw-text-black tw-rounded-sm tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-gray-300"
        v-if="folders[0].folder_name"
        v-for="folder in folders"
        :key="folder.folder_name"
        @click="folderClicked(folder.folder_name)"
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
            <!-- <button
              class="tw-w-full tw-py-2 tw-px-8 tw-transition-all tw-duration-200 tw-ease-linear hover:tw-bg-black/60"
              @click="showRenameFolderDialog(folder)"
            >
              Rename
            </button> -->
            <button
              class="tw-w-full tw-py-2 tw-px-8 tw-transition-all tw-duration-200 tw-ease-linear hover:tw-bg-black/60"
              @click="deleteFolder(folder)"
            >
              Delete
            </button>
          </div>
        </v-menu>
      </button>
    </div>
    <form
      class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-8"
      @submit.prevent
    >
      <label
        class="tw-w-full tw-h-full tw-px-8 tw-py-8 tw-border-2 tw-border-dashed tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-cursor-pointer md:tw-w-1/2"
        :class="dropZoneClass"
        id="drop-zone"
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
      >
        <img :src="UploadIcon" alt="upload" />
        <div id="drop-zone">Drag and Drop Your Folders Here</div>
        <div id="drop-zone">OR</div>
        <div
          id="drop-zone"
          class="tw-bg-wapal-gray tw-text-white tw-px-8 tw-py-2 tw-rounded tw-cursor-pointer"
        >
          Browse
        </div>
        <input
          type="file"
          class="!tw-hidden"
          webkitdirectory
          mozdirectory
          msdirectory
          odirectory
          directory
          @change="fileChanged"
      /></label>
    </form>
    <v-dialog
      v-model="newFolderDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">New Folder</h2>
      <input
        v-model="newFolderName"
        class="tw-w-full tw-px-4 tw-py-2 tw-text-white tw-bg-transparent tw-rounded tw-border-solid tw-border-2 tw-border-wapal-gray focus:tw-outline-none"
        placeholder="Folder Name"
      />
      <div
        class="tw-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4"
      >
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink"
          @click="newFolderDialog = false"
        >
          Cancel
        </button>
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink disabled:tw-bg-wapal-pink/80"
          :disabled="!newFolderName"
          @click="createNewFolder"
        >
          {{ currentFolder ? "Rename" : "Create" }}
        </button>
      </div>
    </v-dialog>
    <v-dialog
      v-model="uploading"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
      persistent
    >
      <h2 class="tw-text-lg tw-font-semibold">Uploading Folder</h2>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
      >
        <v-progress-circular
          indeterminate
          :color="defaultTheme.wapalPink"
        ></v-progress-circular>
      </div>
      <div
        class="tw-text-red-600 tw-flex tw-flex-col tw-gap-2 tw-w-full"
        v-if="balanceNotEnoughError.error"
      >
        {{ balanceNotEnoughError.message }}
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
        >
          <div>
            Required Balance: {{ balanceNotEnoughError.requiredBalance }}
          </div>
          <div>Your Balance: {{ balanceNotEnoughError.yourBalance }}</div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import AssetsBreadCrumbs from "@/components/Dashboard/Assets/AssetsBreadCrumbs.vue";
import UploadIcon from "@/assets/img/upload-icon.svg";
import { defaultTheme } from "@/theme/wapaltheme";
import {
  createFolder,
  deleteFolder,
  updateFolder,
} from "@/services/AssetsService";

export default {
  layout: "dashboard",
  components: { GradientBorderButton, AssetsBreadCrumbs },
  data() {
    return {
      folders: [{ _id: null, folder_name: "" }],
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
      currentFolder: null,
      defaultTheme,
      UploadIcon,
    };
  },
  methods: {
    dragover(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-green-600";
    },
    dragleave(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-wapal-gray";
    },
    async drop(event: any) {
      const items = event.dataTransfer.items;

      const item = items[0].webkitGetAsEntry();

      if (this.checkDuplicateFolder(item)) {
        this.$toast.showMessage({
          message: "Please do not upload duplicate Folders",
          error: true,
        });
        return;
      }

      if (item.isDirectory) {
        const files: File[] = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === "file") {
            if (typeof item.webkitGetAsEntry === "function") {
              const entry = item.webkitGetAsEntry();
              const entryContent = await this.readEntryContentAsync(entry);
              files.push(...entryContent);
              continue;
            }

            const file = item.getAsFile();
            if (file) {
              files.push(file);
            }
          }
        }
        this.uploadedFolder = files;

        this.sendDataToCreateFolder(item.name);

        this.dropZoneClass = "tw-border-wapal-gray";
      } else {
        this.$toast.showMessage({
          message: "Please Upload a Folder",
          error: true,
        });
      }
    },
    readEntryContentAsync(entry: any) {
      return new Promise<File[]>((resolve, reject) => {
        let reading = 0;
        const contents: File[] = [];

        readEntry(entry);

        function readEntry(entry: any) {
          if (entry.isFile) {
            reading++;
            entry.file((file: any) => {
              reading--;
              contents.push(file);

              if (reading === 0) {
                resolve(contents);
              }
            });
          } else if (entry.isDirectory) {
            readReaderContent(entry.createReader());
          }
        }

        function readReaderContent(reader: any) {
          reading++;

          reader.readEntries(function (entries: any) {
            reading--;
            for (const entry of entries) {
              readEntry(entry);
            }

            if (reading === 0) {
              resolve(contents);
            }
          });
        }
      });
    },
    fileChanged(event: any) {
      this.uploadedFolder = event.target.files;

      const relativePath = this.uploadedFolder[0].webkitRelativePath;

      const folderName = relativePath.split("/")[0];

      if (this.checkDuplicateFolder({ name: folderName })) {
        this.$toast.showMessage({
          message: "Please do not upload duplicate Folders",
          error: true,
        });
        return;
      }

      this.sendDataToCreateFolder(folderName, this.uploadedFolder);
    },

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
          message: "Please do not create duplicate Folder",
          error: true,
        });
        return;
      }

      if (!this.currentFolder) {
        this.sendDataToCreateFolder(this.newFolderName);
      } else {
        this.renameFolder(this.currentFolder);
      }

      this.newFolderDialog = false;
    },
    folderClicked(folderName: string) {
      this.$router.push(`/dashboard/assets/${folderName}`);
    },
    async sendDataToCreateFolder(folderName: string) {
      this.uploading = true;
      const formData = new FormData();

      if (folderName && !this.uploadedFolder) {
        formData.append("folder_name", folderName);
      } else {
        [...this.uploadedFolder].forEach((file) => {
          formData.append("files", file);
        });

        // [...this.uploadedFolder].forEach((file) => {
        //   files.push(file);
        // });
        // console.log(JSON.stringify(files));
        // formData.set("files", JSON.stringify(files));

        formData.append("folder_name", folderName);
        formData.append("user_id", "63a2c4031fd037c1629eb63d");
      }

      try {
        const res = await createFolder({
          folder_name: folderName,
          user_id: "63a2c4031fd037c1629eb63d",
        });

        this.pushFolder({
          folder_name: folderName,
          _id: res.data.folderInfo._id,
        });

        this.$toast.showMessage({ message: "Folder Uploaded Successfully" });

        this.uploading = false;
        this.uploadedFolder = null;
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
        this.uploading = false;
      }

      // const balance = await this.$store.dispatch(
      //   "walletStore/checkBalanceForFolderUpload"
      // );

      // if (balance.error) {
      //   this.balanceNotEnoughError.error = true;
      //   this.balanceNotEnoughError.message =
      //     "Your Account Does Not Have Enough Balance";
      //   this.balanceNotEnoughError.requiredBalance = balance.requiredBalance;
      //   this.balanceNotEnoughError.yourBalance = balance.yourBalance;

      //   return;
      // }
    },
    showRenameFolderDialog(folder: any) {
      this.currentFolder = folder;
      this.newFolderDialog = true;
      this.newFolderName = folder.folder_name;
    },
    async renameFolder(folder: any) {
      try {
        folder.folder_name = this.newFolderName;
        await updateFolder(folder);

        this.folders.forEach((tempFolder: any) => {
          if (tempFolder._id === folder._id) {
            tempFolder.folder_name = this.newFolderName;
          }
        });
        this.currentFolder = null;
        this.$toast.showMessage({
          message: "Folder Renamed Successfully",
        });
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async deleteFolder(folder: any) {
      try {
        await deleteFolder(folder);

        this.folders = this.folders.filter(
          (tempFolder: any) => tempFolder._id !== folder._id
        );
        this.$toast.showMessage({
          message: "Folder Deleted Successfully",
        });
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
  },
  watch: {
    newFolderDialog(showNewFolderDialog: any) {
      if (!showNewFolderDialog) {
        this.newFolderName = "";
      }
    },
  },
};
</script>
